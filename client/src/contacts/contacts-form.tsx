import React from 'react';
import Contact from './contact';
import './popup.css';


export interface ContactFormProps {
  contactAdded?: ()=>void;
}

export interface ContactFormState {
  mode: boolean;
  firstName: string;
  lastName: string;
  email:string;
}



class ContactForm extends React.Component <ContactFormProps, ContactFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      mode: true,
      firstName: '',
      lastName: '',
      email:''
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMode = this.handleMode.bind(this);
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

  handleMode(){
    (this.state.mode)?  this.setState({mode: false}): this.setState({mode: true});
    ;
  }

  handleSubmit = async (event: any) => {
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
          
          this.props.contactAdded && this.props.contactAdded();
          this.handleMode();
        },

        // Handle error
        error => {
          console.error('Adding contact failed: ', error);
        }
      );
  }

  render() {
    if(this.state.mode){
      return(
        <button onClick={this.handleMode} >Add contact</button>
      );
    }else{

      return (
        <div className = "Popup">
          <div className = "Popup_inner">
            <form onSubmit={this.handleSubmit}>
              <table className = "Table" >
                <tr>
                  <td>First name:</td>
                  <td>
                    <input type="text" name ="firstName" value={this.state.firstName} onChange={this.handleFirstNameChange} />
                  </td>
                </tr>
                <tr>
                  <td>Last name:</td>
                  <td>
                    <input type="text" name ="lastName" value={this.state.lastName} onChange={this.handleLastNameChange} />
                  </td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>
                    <input type="text" name = "email" value={this.state.email} onChange={this.handleEmailChange} /><br/>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td><input type="submit" value="Submit" />
                  <button onClick={this.handleMode} >Cancel</button></td>
                </tr>
              </table>
              <p></p>
              <span></span>
            </form>
          </div>
        </div>

        
      );
    }

    
  }
}

export default ContactForm;