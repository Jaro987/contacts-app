const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const contactRoutes = express.Router();
const ObjectId = require('mongodb');
//const contacts = require('./data.js');

let Contact = require('./contact.model');


const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/contacts', contactRoutes);
app.use(bodyParser.urlencoded({
    extended: true
}));


// Connect to db
mongoose.connect('mongodb://127.0.0.1:27017/contacts', {
    useNewUrlParser: true
});
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});


// GET
contactRoutes.route('/').get(function(req, res) {
    Contact.find(function(err, contact) {
        if (err) {
            console.log(err);
        } else {
            res.json(contact);
        }
    });
});

// GET:id
contactRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Contact.findById(id, function(err, contact) {
        res.json(contacts);
    });
});

// POST
contactRoutes.route('').post(function(req, res) {
    let contact = new Contact(req.body);
    contact.save()
        .then(contact => {
            res.status(200).json({
                'contact': 'contact added successfully'
            });
        })
        .catch(err => {
            console.error(err);
            res.status(400).send('adding new contact failed');
        });
});

// POST update
contactRoutes.route('/:id').post(function(req, res) {
    Contact.findById(req.params.id, function(err, contact) {
        if (!contact)
            res.status(404).send("data is not found");
        else
            contact.id = req.body.id;
        contact.firstName = req.body.firstName;
        contact.lastName = req.body.lastName;
        contact.email = req.body.email;
        contact.save().then(contact => {
            res.json('Contact updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

//DELETE
contactRoutes.route('/:id').delete(function(req, res) {
    console.log(req.params.id);
    Contact.deleteOne({
        "_id": req.params.id,
    }, function(err) {
        if (err) {
            console.log("iz servera: ", req.params._id);
            console.log("delete_failed: ", err);
            res.status(400).send("delete not possible");
        } else {
            res.status(200).send("success");
        }

    })
});








/*// API calls
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
*/

app.listen(port, () => console.log(`Listening on port ${port}`));