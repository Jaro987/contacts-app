import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store/configureStore";

import ContactDisplay from "./contacts/contacts";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1> Contact - app </h1>{" "}
        </div>
        <Provider store={store}>
          <ContactDisplay />{" "}
        </Provider>
      </div>
    );
  }
}

export default App;
