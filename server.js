const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const contacts = require('./data.js');


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// API calls
app.get('/api/contacts', (req, res) => {
    if (!contacts) {
        res.status(404).json({
            message: 'No contacts found!'
        });
    }
    res.json(contacts);
});



app.post('/api/contacts', (req, res) => {
    console.log(req.body);
    const contact = {
        id: contacts.length + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    }

    contacts.push(contact);

    res.json(contact);
});


app.put('/api/contacts/:id', (req, res) => {

    const id = parseInt(req.params.id);
    console.log(req.params.id);
    let contactFound;
    let contactIndex;
    contacts.map((contact, index) => {
        if (contact.id === id) {
            contactFound = contact;
            contactIndex = index;
        }
    });

    if (!contactFound) {
        return res.status(400);
    }

    const updatedContact = {
        id: contactFound.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };

    contacts.splice(contactIndex, 1, updatedContact);
    res.json(updatedContact);
    return res.status(201);
});

app.delete('/api/contacts/:id', (req, res) => {
    const id = parseInt(req.params.id);

    contacts.map((contact, index) => {
        if (contact.id === id) {
            contacts.splice(index, 1);
            return res.status(200).send({
                success: 'true',
                message: 'Contact deleted successfuly',
            });
        }
    });


    return res.status(404).send({
        success: 'false',
        message: 'Contact not found',
    });


});


app.listen(port, () => console.log(`Listening on port ${port}`));