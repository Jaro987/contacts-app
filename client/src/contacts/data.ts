class Contact {
  private _id: string | undefined;
  firstName: string;
  lastName: string;
  email: string;

  constructor(fName: string, lName: string, emaill: string) {
    this.firstName = fName;
    this.lastName = lName;
    this.email = emaill;
  }

  get id(): string {
    if (this._id) {
      return this._id;
    }
    return "";
  }
}

export default Contact;
