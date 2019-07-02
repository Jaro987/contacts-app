import React from 'react';
import Contact from './contact';

export interface ContactFormProps {
  contactAdded?: ()=>void;
}

export interface ContactFormState {
  firstName: string;
  lastName: string;
  email:string;
}

class ContactForm extends React.Component <ContactFormProps, ContactFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email:''
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);    this.handleSubmit = this.handleSubmit.bind(this);
  }

 
  
  handleFirstNameChange(event: any){
    this.setState({firstName : event.target.value});
  }

  handleLastNameChange(event: any){
      
    this.setState({lastName : event.target.value});
  }

  handleEmailChange(event: any){
    this.setState({email : event.target.value});
  }

  handleSubmit= async (event: any) => {
    event.preventDefault();
    const data = new Contact(this.state.firstName, this.state.lastName, this.state.email);
    
    fetch('/api/contacts', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(
        // handle the result
        result => {
          console.log("jdjgsg");
          this.props.contactAdded && this.props.contactAdded();
        },

        // Handle error
        error => {
          console.error('Adding contact failed: ', error);
        }
      );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>First name:</label>
        <input type="text" name ="firstName" value={this.state.firstName} onChange={this.handleFirstNameChange} /><br/>
        <label>Last name:</label>
        <input type="text" name ="lastName" value={this.state.lastName} onChange={this.handleLastNameChange} /><br/>
        <label>Email:</label>
        <input type="text" name = "email" value={this.state.email} onChange={this.handleEmailChange} /><br/>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default ContactForm;