"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const contactRoutes = require("./services/rest/components/contact/routes");
const app = express();
const port = 5000;
const cr = new contactRoutes.ContactRoutes();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/contacts', cr.router);
app.use(bodyParser.urlencoded({
    extended: true
}));
mongoose.connect('mongodb://127.0.0.1:27017/contacts', {
    useNewUrlParser: true
});
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
});
app.listen(port, () => console.log(`Listening on port ${port}`));
