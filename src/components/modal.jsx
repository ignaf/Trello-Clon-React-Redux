import React from "react";
import ReactDom from "react-dom";
import { EditText } from "react-edit-text";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fafafa",
  padding: "2rem",
  zIndex: 1000,
  width: "25%",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

export default function Modal({
  open,
  children,
  onClose,
  item,
  card,
  onTextChange,
  onDescChange,
}) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES} className="modal">
        <div>
          <div className="modal__title">
            <i className="bi bi-credit-card-2-front-fill"></i>
            <h3 onChange={(e) => onTextChange(e, card, item)}>
              <EditText defaultValue={item.title} />
            </h3>
          </div>
          <p>
            en la lista <u>{card.title}</u>
          </p>
          <div onChange={(e) => onDescChange(e, card, item)}>
            <div className="modal__desc-title">
              <i className="bi bi-justify-left"></i>
              <h4>Descripción</h4>
            </div>
            <div className="modal__desc">
              <EditText defaultValue={item.description} />
            </div>
          </div>
          {children}
        </div>
        <div>
          <i className="bi bi-x-lg modal__close" onClick={onClose}></i>{" "}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}
