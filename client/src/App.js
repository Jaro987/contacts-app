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
                <div className="App-header">
                    <h1>Contact-app</h1>
                </div>
                <ContactDisplay />
            </div>
        );
    }
}

export default App;