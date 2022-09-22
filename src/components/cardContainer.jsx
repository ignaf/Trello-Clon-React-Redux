import React, { Component } from "react";
import Card from "./card";
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

class CardContainer extends Component {
  state = {
    cards: [],
  };

  handleAddCard = () => {
    const currentCards = [...this.state.cards];
    const newCard = { id: uuid() + 1, title: "Nueva lista", items: [] };
    const cards = [...currentCards, newCard];
    this.setState({ cards });
  };

  handleAddItem = (card) => {
    const cardToUpdate = this.findCard(card);
    const newItem = {
      id: uuid(),
      title: "Nueva tarjeta",
      cardId: card.id,
      description: "Añada una descripción más detallada...",
    };
    const items = [...cardToUpdate.items, newItem];
    cardToUpdate.items = items;
    this.updateCard(cardToUpdate, this.findCardIndex(card));
  };

  handleTextChange = (e, card, item = null) => {
    const cardToUpdate = this.findCard(card);
    if (!item) {
      cardToUpdate.title = e.target.value;
    } else {
      const itemIndex = cardToUpdate.items.indexOf(item);
      const items = { ...cardToUpdate.items };
      const itemToUpdate = items[itemIndex];
      itemToUpdate.title = e.target.value;
      items[itemIndex] = itemToUpdate;
    }
    this.updateCard(cardToUpdate, this.findCardIndex(card));
  };
  handleDescChange = (e, card, item) => {
    const cardToUpdate = this.findCard(card);
    const itemIndex = cardToUpdate.items.indexOf(item);
    const items = { ...cardToUpdate.items };
    const itemToUpdate = items[itemIndex];
    itemToUpdate.description = e.target.value;
    items[itemIndex] = itemToUpdate;
    this.updateCard(cardToUpdate, this.findCardIndex(card));
    console.log("descchang");
  };

  handleReorder = (result) => {
    const { source, destination, draggableId, type } = result;

    if (!destination) {
      return;
    }
    if (type == "items") {
      const sourceCard = this.findCardWithId(source.droppableId);
      const destCard = this.findCardWithId(destination.droppableId);

      if (source.droppableId !== destination.droppableId) {
        const prevSourceItems = [...sourceCard[0].items];
        const movingItem = prevSourceItems.filter((i) => i.id == draggableId);
        const prevDestItems = [...destCard[0].items];
        const sourceItems = prevSourceItems.filter((i) => i.id !== draggableId);
        const destItems = prevDestItems.concat(movingItem);

        const updateSourceCard = this.findCard(sourceCard[0]);
        updateSourceCard.items = sourceItems;
        const updateDestCard = this.findCard(destCard[0]);
        updateDestCard.items = destItems;
        this.updateCard(updateSourceCard, this.findCardIndex(sourceCard[0]));
        this.updateCard(updateDestCard, this.findCardIndex(destCard[0]));
        return;
      }
      if (
        source.index === destination.index &&
        source.droppableId === destination.droppableId
      ) {
        return;
      } else {
        const reorderedItems = reorder(
          sourceCard[0].items,
          source.index,
          destination.index
        );
        sourceCard[0].items = [...reorderedItems];
        const cardToUpdate = this.findCard(sourceCard[0]);
        this.updateCard(cardToUpdate, this.findCardIndex(sourceCard[0]));
      }
    }
    if (type == "columns") {
      const currentCards = [...this.state.cards];
      const cards = reorder(currentCards, source.index, destination.index);
      this.setState({ cards });
    }
  };

  handleDelete = (card, item) => {
    const cardToUpdate = this.findCard(card);
    const prevItems = cardToUpdate.items;
    const items = prevItems.filter((i) => i.id !== item.id);
    cardToUpdate.items = items;
    this.updateCard(cardToUpdate, this.findCardIndex(card));
  };

  findCardIndex = (card) => {
    const currentCards = [...this.state.cards];
    return currentCards.indexOf(card);
  };

  findCard = (card) => {
    const currentCards = [...this.state.cards];
    return currentCards[this.findCardIndex(card)];
  };
  findCardWithId = (cardId) => {
    const cards = [...this.state.cards];
    return cards.filter((c) => c.id === cardId);
  };
  updateCard = (cardToUpdate, index) => {
    let cards = [...this.state.cards];
    cards[index] = cardToUpdate;
    this.setState({ cards });
  };

  render() {
    return (
      <div className="card-container" id="card-container">
        <div className="listas-wraper">
          <DragDropContext onDragEnd={(result) => this.handleReorder(result)}>
            <Droppable
              droppableId="listas"
              direction="horizontal"
              type="columns"
            >
              {(droppableProvided) => (
                <div
                  className="listas"
                  {...droppableProvided.droppableProps}
                  ref={droppableProvided.innerRef}
                >
                  {this.state.cards.map((card, index) => (
                    <Draggable
                      key={card.id}
                      draggableId={card.id}
                      index={index}
                    >
                      {(draggableProvided) => (
                        <Droppable
                          droppableId={card.id}
                          key={card.id}
                          type="items"
                        >
                          {(droppableProvided) => (
                            <ul
                              {...draggableProvided.draggableProps}
                              {...draggableProvided.dragHandleProps}
                              ref={draggableProvided.innerRef}
                            >
                              <Card
                                key={card.id}
                                card={card}
                                onAddItem={this.handleAddItem}
                                onTextChange={this.handleTextChange}
                                onDescChange={this.handleDescChange}
                                onDelete={this.handleDelete}
                                onReorder={this.handleReorder}
                                {...droppableProvided}
                              ></Card>

                              {droppableProvided.placeholder}
                            </ul>
                          )}
                        </Droppable>
                      )}
                    </Draggable>
                  ))}
                  {droppableProvided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div>
            <button
              onClick={this.handleAddCard}
              className="btn__add-card"
              id="add-card"
              type="button"
            >
              <i className="bi bi-plus"></i>
              Añada otra lista
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CardContainer;
