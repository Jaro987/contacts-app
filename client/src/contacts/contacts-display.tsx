import React from "react";
import "./contacts-display.css";
import Contact from "./contact";
import ContactRow from "./contact-row";
import ContactForm from "./contacts-form"


//const contacts = require('./data.js');
interface ContactDisplayState {
  error: any;
  isLoaded: boolean;
  editing: boolean;
  contacts: Contact[];
}

interface ContactDisplayProps {}

export class ContactDisplay extends React.Component<ContactDisplayProps,ContactDisplayState> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      editing: false,
      contacts: []
    };
this.reloadContacts = this.reloadContacts.bind(this);

  }
  componentDidMount() {
    this.reloadContacts();
  }

  private reloadContacts (){
      fetch("/api/contacts")
      .then(response => response.json())
      .then(
        // handle the result
        result => {
          this.setState({
            isLoaded: true,
            contacts: result
          });
        },

        // Handle error
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

    private renderRows(){
          return this.state.contacts.map((contact,index) => {
           return <ContactRow key={"row_"+index} index={index} contact={contact} contactChanged = {this.reloadContacts} />
        });  
    }

render() {
    return (
      <div>
        <ContactForm contactAdded = {this.reloadContacts}/>
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
      </div>
    );
  }
}

export default ContactDisplay;
