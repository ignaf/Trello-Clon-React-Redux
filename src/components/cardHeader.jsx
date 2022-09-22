import React from "react";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";

function CardHeader({ card, onTextChange }) {
  return (
    <div className="card__header" onChange={(e) => onTextChange(e, card)}>
      <EditText defaultValue={card.title} />
      <i className="bi bi-three-dots nav-secondary-icon collapsible-menu"></i>
    </div>
  );
}

export default CardHeader;
