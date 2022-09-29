import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { itemDeleted, itemTitleChanged } from "../store/cards";
import { EditText } from "react-edit-text";
import Modal from "./modal";

function CardItem({ provided, innerRef, onDescChange, item, card }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <div>
      <li
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={innerRef}
        className="drag"
      >
        <span
          onChange={(e) =>
            dispatch(
              itemTitleChanged({
                title: e.target.value,
                itemId: item.id,
                cardId: item.cardId,
              })
            )
          }
        >
          <EditText defaultValue={item.title} />
        </span>

        <i className="bi bi-pen" onClick={() => setIsOpen(true)}></i>
        <Modal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          item={item}
          card={card}
        >
          <button
            onClick={() =>
              dispatch(itemDeleted({ itemId: item.id, cardId: card.id }))
            }
            className="modal__eliminar"
          >
            Eliminar tarjeta
          </button>
        </Modal>
      </li>
    </div>
  );
}

export default CardItem;
