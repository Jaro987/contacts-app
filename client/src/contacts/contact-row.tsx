import React from "react";
import Contact from "./data";
import DataController from "./data-controller";

export interface ContactRowProps {
  contact: Contact;
  index: number;
  contactChanged?: () => void;
  contactAdded?: () => void;
  contactDeleted?: () => void;
}

export interface ContactRowState {
  editing: boolean;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

class ContactRow extends React.Component<ContactRowProps, ContactRowState> {
  constructor(props: any) {
    super(props);
    this.state = {
      editing: false,
      id: props.contact._id,
      firstName: props.contact.firstName,
      lastName: props.contact.lastName,
      email: props.contact.email
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private readonly controller: DataController = new DataController();

  handleFirstNameChange(event: any) {
    this.setState({ firstName: event.target.value });
  }

  handleLastNameChange(event: any) {
    this.setState({ lastName: event.target.value });
  }

  handleEmailChange(event: any) {
    this.setState({ email: event.target.value });
  }

  handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = new Contact(
      this.state.firstName,
      this.state.lastName,
      this.state.email
    );

    let editedContact = Object.assign({}, data, { id: this.state.id });

    try {
      await this.controller.saveContact(editedContact);
      this.props.contactChanged && this.props.contactChanged();
      this.setState({ editing: false });
    } catch (error) {
      console.error("Edit contact failed: ", error);
    }
  };

  handleDelete = async (event: any) => {
    event.preventDefault();

    try {
      await this.controller.deleteContact(this.state.id);
      this.props.contactDeleted && this.props.contactDeleted();
    } catch (error) {
      console.error("Deleting contact failed: ", error);
    }
  };

  handleCancel = (event: any) => {
    this.setState({
      firstName: this.props.contact.firstName,
      lastName: this.props.contact.lastName,
      email: this.props.contact.email,
      editing: false
    });
  };

  render() {
    if (this.state.editing) {
      return (
        <tr key={"tr_" + this.props.index}>
          <td>{this.props.index + 1}</td>
          <td>
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleFirstNameChange}
            />
          </td>
          <td>
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleLastNameChange}
            />
          </td>
          <td>
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
          </td>
          <td>
            <button onClick={this.handleSubmit}>Save</button>
            <button onClick={this.handleCancel}>Cancel</button>
          </td>
        </tr>
      );
    } else {
      return (
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
            <button onClick={this.handleDelete}>Delete</button>
          </td>
        </tr>
      );
    }
  }
}

export default ContactRow;
