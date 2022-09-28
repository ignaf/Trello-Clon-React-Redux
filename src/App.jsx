import React from "react";
import CardContainer from "./components/cardContainer";
import NavBar from "./components/navBar";
import SecondaryNavBar from "./components/secondaryNavBar";
import SideBar from "./components/sideBar";
import { Provider } from "react-redux";
import configureStore from "./store/cardStore";
import "./Styles.css";

const store = configureStore();

function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
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
      </Provider>
    </React.Fragment>
  );
}

export default App;
