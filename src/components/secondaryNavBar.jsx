import React from "react";

function SecondaryNavBar(props) {
  return (
    <React.Fragment>
      <nav className="nav-bar--secondary">
        <div className="nav-items--secondary">
          <li>
            <a href="" className="btn--nav--secondary">
              <i className="bi bi-kanban nav-secondary-icon"></i>Tablero
              <i className="bi bi-chevron-down"></i>
            </a>
          </li>
          <li>
            <h2>Trello Clon</h2>
          </li>
          <li>
            <a className="btn--nav--secondary" href="">
              <i className="bi bi-star"></i>
            </a>
          </li>
          <li>
            <a className="btn--nav--secondary" href="">
              Mox It
            </a>
          </li>
          <li>
            <a className="btn--nav--secondary" href="">
              <i className="bi bi-people nav-secondary-icon"></i>Visible para el
              espacio de trabajo
            </a>
          </li>
        </div>
        <div className="nav-items--secondary">
          <li>
            <a className="btn--nav--secondary--white" href="#">
              <i className="bi bi-person-plus icon--black nav-secondary-icon"></i>
              Compartir
            </a>
          </li>
          <li>
            <a className="btn--nav--secondary" href="#">
              <i className="bi bi-airplane nav-secondary-icon"></i>Power-Ups
            </a>
          </li>
          <li>
            <a className="btn--nav--secondary" href="#">
              <i className="bi bi-lightning-charge-fill nav-secondary-icon"></i>
              Automatización
            </a>
          </li>
          <li>
            <a className="btn--nav--secondary" href="#">
              <i className="bi bi-filter nav-secondary-icon"></i>Filtrar
            </a>
          </li>
          <li>
            <a className="btn--nav--secondary" href="#">
              <i className="bi bi-three-dots nav-secondary-icon"></i>Mostrar
              Menú
            </a>
          </li>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default SecondaryNavBar;
