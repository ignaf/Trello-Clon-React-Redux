import React from "react";
import { useDispatch } from "react-redux";
import { cardTitleChanged } from "../store/cards";
import { EditText } from "react-edit-text";

import "react-edit-text/dist/index.css";

function CardHeader({ card }) {
  const dispatch = useDispatch();

  return (
    <div
      className="card__header"
      onChange={(e) =>
        dispatch(cardTitleChanged({ title: e.target.value, id: card.id }))
      }
    >
      <EditText defaultValue={card.title} />
      <i className="bi bi-three-dots nav-secondary-icon collapsible-menu"></i>
    </div>
  );
}

export default CardHeader;
