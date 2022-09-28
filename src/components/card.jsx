import React from "react";
import { useDispatch } from "react-redux";
import { itemAdded } from "../store/cards";
import { Draggable } from "@hello-pangea/dnd";
import CardItem from "./cardItem";
import CardHeader from "./cardHeader";

export default function Card(props) {
  const {
    card,
    onReorder,
    onDelete,
    onTextChange,
    onDescChange,
    ...droppableProvided
  } = props;

  const dispatch = useDispatch();

  return (
    <div className="card">
      <CardHeader card={card} />
      <div className="card__content">
        <ul
          className="list"
          {...droppableProvided.droppableProps}
          ref={droppableProvided.innerRef}
        >
          {card.items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(draggableProvided) => (
                <CardItem
                  provided={draggableProvided}
                  innerRef={draggableProvided.innerRef}
                  item={item}
                  card={card}
                  onTextChange={onTextChange}
                  onDescChange={onDescChange}
                  onDelete={onDelete}
                />
              )}
            </Draggable>
          ))}
        </ul>
        <button
          onClick={() => dispatch(itemAdded({ id: card.id }))}
          type="button"
          className="btn__add-item"
        >
          <i className="bi bi-plus"></i>Añada una tarjeta
        </button>
      </div>
    </div>
  );
}
