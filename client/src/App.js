import React, { Component } from 'react';
import ContactForm from './contacts-form.js'
import ContactDisplay from './contacts-display.js'
import './App.css';


class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };
  
  /*componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/api/contacts');
    const body = await response.json();
   if (response.status !== 200) throw Error(body.message);
    
    return body;
  };*/
  
  
  
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