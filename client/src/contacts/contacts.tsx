import React from "react";
import "./contacts.css";
import Contact from "./data";
import ContactRow from "./contact-row";
import ContactForm from "./contact-form";
import store from "../store/configureStore";
import AppState from "../store/state";

import { connect } from "react-redux";

interface ContactDisplayProps {
  contacts: [];
}

interface ContactDisplayState { }

class ContactDisplay extends React.Component<ContactDisplayProps, ContactDisplayState> {
  constructor(props: any) {
    super(props);
    this.reloadContacts = this.reloadContacts.bind(this);
  }
  componentDidMount() {
    this.reloadContacts();
  }

  private async reloadContacts() {
    try {
      const response = await fetch("/api/contacts")
      const contacts = await response.json()
      store.dispatch({ type: "CONTACTS_LOADED", data: contacts });
    } catch (error) {
      store.dispatch({ type: "CONTACTS_LOADING_FAILED", data: error });
    }
  }

  private renderRows() {
    return this.props.contacts.map((contact: Contact, index: number) => {
      return (
        <ContactRow
          key={"row_" + index}
          index={index}
          contact={contact}
          contactChanged={this.reloadContacts}
          contactDeleted={this.reloadContacts}
        />
      );
    });
  }

  render() {
    return (
      <div>
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
        <ContactForm contactAdded={this.reloadContacts} />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  contacts: state.contacts
});

export default connect(mapStateToProps)(ContactDisplay);
