class Contact {
	public id: number;
	firstName: string;
	lastName: string;
	email: string;

	constructor(fName: string, lName: string, emaill: string){
		this.id = -1;
		this.firstName = fName;
		this.lastName = lName;
		this.email = emaill;
	}


}

export default Contact;
