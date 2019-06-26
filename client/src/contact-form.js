import React from 'react';
import Contact from './contact.ts';

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

 
  
  handleChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit= async event => {
    event.preventDefault();
    const data = new Contact(this.state.firstName, this.state.lastName, this.state.email);
    console.log(data);
    const jsondata = JSON.stringify(data);
    console.log(jsondata);
    
    fetch('/api/contacts', {
      method: 'POST',
      body: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>First name:</label>
        <input type="text" name ="firstName" value={this.state.firstName} onChange={this.handleChange} /><br/>
        <label>Last name:</label>
        <input type="text" name ="lastName" value={this.state.lastName} onChange={this.handleChange} /><br/>
        <label>Email:</label>
        <input type="text" name = "email" value={this.state.email} onChange={this.handleChange} /><br/>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default ContactForm;