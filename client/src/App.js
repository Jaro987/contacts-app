import React, { Component } from 'react';

import ContactDisplay from './contacts/contacts-display.tsx'
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
              <ContactDisplay />
            </div>
        );
    }
}

export default App;