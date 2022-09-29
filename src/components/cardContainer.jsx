import React, { Component } from "react";
import Card from "./card";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { connect } from "react-redux";
import { cardAdded, itemAdded, draggablesReordered } from "../store/cards";

class CardContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="card-container" id="card-container">
        <div className="listas-wraper">
          <DragDropContext
            onDragEnd={(result) => this.props.draggablesReordered(result)}
          >
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
                  {this.props.cards.map((card, index) => (
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
              onClick={() => this.props.addCard()}
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

const mapStateToProps = (state) => ({
  cards: state.cards,
});

const mapDispatchToProps = (dispatch) => ({
  addCard: () => dispatch(cardAdded()),
  addItem: (id) => dispatch(itemAdded(id)),
  draggablesReordered: (result) => dispatch(draggablesReordered(result)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);
