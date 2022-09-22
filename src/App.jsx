import React from "react";
import CardContainer from "./components/cardContainer";
import NavBar from "./components/navBar";
import SecondaryNavBar from "./components/secondaryNavBar";
import SideBar from "./components/sideBar";
import "./Styles.css";

function App() {
  return (
    <React.Fragment>
      <header>
        <NavBar />
      </header>
      <main>
        <SideBar />
        <div className="main-container">
          <SecondaryNavBar />
          <CardContainer></CardContainer>
        </div>
      </main>
    </React.Fragment>
  );
}

export default App;
