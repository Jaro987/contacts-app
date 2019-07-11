"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
const mongoose = require("mongoose");
const Contact = mongoose.model('Contact', model_1.ContactSchema);
class ContactController {
    handleError(error) {
        console.error;
    }
    readContacts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contacts = yield Contact.find();
                return res.status(200).json(contacts);
            }
            catch (error) {
                this.handleError;
            }
        });
    }
    readContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const contact = yield Contact.findById({ "_id": id });
                if (!contact) {
                    return res.status(404).send("Contact not found");
                }
                return res.status(200).json(contact);
            }
            catch (error) {
                this.handleError;
            }
        });
    }
    addContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = new Contact(req.body);
                contact.save();
                return res.status(200).send("Contact saved!");
            }
            catch (error) {
                this.handleError;
            }
        });
    }
    updateContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (!id || !req.body) {
                    return res.status(400).send("Update not possible");
                }
                const contact = yield Contact.findById(id);
                if (!contact) {
                    return res.status(404).send("Contact not found");
                }
                else {
                    contact.firstName = req.body.firstName;
                    contact.lastName = req.body.lastName;
                    contact.email = req.body.email;
                    contact.save();
                    return res.status(200).send("Contact updated!");
                }
            }
            catch (error) {
                this.handleError;
            }
        });
    }
    removeContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("iz deleteContact: ", req.params.id);
            try {
                const id = req.params.id;
                if (!id) {
                    return res.status(404).send("Contact not found");
                }
                let contact = yield Contact.findOneAndDelete({ "_id": id });
                if (!contact) {
                    return res.status(404).send("Contact not deleted");
                }
                return res.status(200).send("Contact deleted!");
            }
            catch (error) {
                this.handleError;
            }
        });
    }
}
exports.ContactController = ContactController;
