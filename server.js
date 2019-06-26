const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const contacts = require('./data.js');


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get('/api/contacts', (req, res) =>{
	if(!contacts){
		res.status(404).json({message: 'No contacts found!'});
	}
	res.json(contacts);
});



app.post('/api/contacts', (req, res) => {

	const contact = {
		id: contacts.length + 1,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email
	}

	contacts.push(contact);

	res.json(contact);
});


app.listen(port, () => console.log(`Listening on port ${port}`));