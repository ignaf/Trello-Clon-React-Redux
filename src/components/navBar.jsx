import React from "react";
import { ReactComponent as Logo } from "../img/Trello_logo.svg";

function NavBar(props) {
  return (
    <nav className="nav-bar">
      <div className="menu-icon">
        <span className="fas fa-bars"></span>
      </div>
      <div className="logo">
        <Logo className="logo" />
      </div>
      <div className="nav-items">
        <li>
          <a href="#">
            Espacios de trabajo <i className="bi bi-chevron-down"></i>
          </a>
        </li>
        <li>
          <a href="#">
            Reciente <i className="bi bi-chevron-down"></i>
          </a>
        </li>
        <li>
          <a href="#">
            Marcado <i className="bi bi-chevron-down"></i>
          </a>
        </li>
        <li>
          <a href="#">
            Plantillas <i className="bi bi-chevron-down"></i>
          </a>
        </li>
        <li>
          <a className="btn--crear" href="#">
            Crear
          </a>
        </li>
      </div>
      <div className="search-icon">
        <span className="fas fa-search"></span>
      </div>
      <div className="cancel-icon">
        <span className="fas fa-times"></span>
      </div>
      <form action="#">
        <input
          type="search"
          className="search-data"
          placeholder="Buscar"
          required
        />
      </form>
      <div className="nav__icon-container">
        <i className="bi bi-info-circle"></i>
      </div>
      <div className="nav__icon-container">
        <i className="bi bi-bell"></i>
      </div>
      <span className="nav-user">IF</span>
    </nav>
  );
}

export default NavBar;
