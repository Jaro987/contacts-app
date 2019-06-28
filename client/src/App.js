import React, { Component } from 'react';
import ContactForm from './contacts/contacts-form.js'
import ContactDisplay from './contacts/contacts-display.js'
import './App.css';


class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };

render() {
    return (
      <div className="App">
        <ContactForm />
        <ContactDisplay />
      </div>
    );
  }
}

export default App;