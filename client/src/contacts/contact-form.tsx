import React from "react";
import Contact from "./data";
import "./contact-form.css";

export interface ContactFormProps {
  contactAdded?: () => void;
}

export interface ContactFormState {
  mode: boolean;
  firstName: string;
  lastName: string;
  email: string;
}

class ContactForm extends React.Component<ContactFormProps, ContactFormState> {
  state: { mode: boolean; firstName: string; lastName: string; email: string };
  constructor(props: any) {
    super(props);
    this.state = {
      mode: true,
      firstName: "",
      lastName: "",
      email: ""
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMode = this.handleMode.bind(this);
  }

  handleFirstNameChange(event: any) {
    this.setState({ firstName: event.target.value });
  }

  handleLastNameChange(event: any) {
    this.setState({ lastName: event.target.value });
  }

  handleEmailChange(event: any) {
    this.setState({ email: event.target.value });
  }

  handleMode() {
    this.state.mode
      ? this.setState({ mode: false })
      : this.setState({ mode: true });
  }

  handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = new Contact(
      this.state.firstName,
      this.state.lastName,
      this.state.email
    );

    fetch("/api/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(
      result => {
        this.props.contactAdded && this.props.contactAdded();
        this.handleMode();
      },
      error => {
        console.error("Adding contact failed: ", error);
      }
    );

    this.setState({ firstName: "", lastName: "", email: "" });
  };

  render() {
    if (this.state.mode) {
      return <button onClick={this.handleMode}>Add contact</button>;
    } else {
      return (
        <div className="Popup">
          <div className="Popup_inner">
            <form onSubmit={this.handleSubmit}>
              <h1>Add new contact</h1>
              <table className="Table">
                <tbody>
                  <tr>
                    <td className="InputForm">First name:</td>
                    <td className="InputForm">
                      <input
                        type="text"
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.handleFirstNameChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="InputForm">Last name:</td>
                    <td className="InputForm">
                      <input
                        type="text"
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.handleLastNameChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="InputForm">Email:</td>
                    <td className="InputForm">
                      <input
                        type="text"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                      />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td className="InputForm" />
                    <td className="InputForm">
                      <input type="submit" value="Submit" />
                      <button onClick={this.handleMode}>Cancel</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p />
              <span />
            </form>
          </div>
        </div>
      );
    }
  }
}

export default ContactForm;
