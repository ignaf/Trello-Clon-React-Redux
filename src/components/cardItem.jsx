import React, { useState } from "react";
import { EditText } from "react-edit-text";
import Modal from "./modal";

function CardItem({
  provided,
  innerRef,
  onTextChange,
  onDescChange,
  onDelete,
  item,
  card,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <li
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={innerRef}
        className="drag"
      >
        <EditText
          defaultValue={item.title}
          onChange={(e) => onTextChange(e, card, item)}
        />

        <i className="bi bi-pen" onClick={() => setIsOpen(true)}></i>
        <Modal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          item={item}
          card={card}
          onTextChange={onTextChange}
          onDescChange={onDescChange}
          onChange={(e) => onDescChange(e, card, item)}
        >
          <button
            onClick={() => onDelete(card, item)}
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
