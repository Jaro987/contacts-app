import React from "react";
import Contact from "./contact";

export interface ContactRowProps {
  contact: Contact;
  index: number;
  contactChanged?: ()=>void;
  contactAdded?: ()=>void;
}
export interface ContactRowState {
    editing: boolean;
    firstName: string;
    lastName: string;
    email: string;
}
class ContactRow extends React.Component<ContactRowProps, ContactRowState> {
  constructor(props: any) {
    super(props);
    console.log(this.props.contact);
    this.state ={
        editing: false,
        firstName: props.contact.firstName,
        lastName: props.contact.lastName,
        email: props.contact.email,
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*handleChange(event: any){
    this.setState({[event.target.name] : event.target.value});
  }*/

  handleFirstNameChange(event: any){
    this.setState({firstName : event.target.value});
  }

  handleLastNameChange(event: any){
      
    this.setState({lastName : event.target.value});
  }

  handleEmailChange(event: any){
    this.setState({email : event.target.value});
  }

  handleSubmit= async (event:any) => {
    event.preventDefault();
    const data = new Contact(this.state.firstName, this.state.lastName, this.state.email);
    
    fetch('/api/contacts/'+ this.props.contact.id, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(
        // handle the result
        result => {
            this.setState({ editing: false });
            this.props.contactChanged && this.props.contactChanged();
        },

        // Handle error
        error => {
          console.error('Edit contact failed: ', error);
        }
      );

  }

  render() {
    if(this.state.editing){
        return (
            
                <tr key={"tr_"+this.props.index}>
                    <td>{this.props.index + 1}</td>
                    <td><input type="text" name = "firstName" value= {this.state.firstName} onChange={this.handleFirstNameChange}/></td>
                    <td><input type="text" name = "lastName" value= {this.state.lastName} onChange={this.handleLastNameChange}/></td>
                    <td><input type="text" name = "email" value= {this.state.email} onChange={this.handleEmailChange}/></td>
                    <td>
                      <button onClick={this.handleSubmit}>Save</button>
                      <button>Delete</button>
                    </td>
                </tr>
            
        )
    }else{
        return(
            <tr key={this.props.index}>
                <td>{this.props.index + 1}</td>
                <td>{this.props.contact.firstName}</td>
                <td>{this.props.contact.lastName}</td>
                <td>{this.props.contact.email}</td>
                <td>
                  <button
                    onClick={() => {
                      this.setState({ editing: true });
                    }}
                  >
                    Edit
                  </button>
                  <button>Delete</button>
                </td>
              </tr>
        
        )
    }
  }
}

export default ContactRow;

