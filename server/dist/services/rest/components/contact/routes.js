"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
class ContactRoutes {
    constructor() {
        this._router = express_1.Router();
        this.controller = new controller_1.ContactController();
        this.initRoutes();
    }
    get router() {
        return this._router;
    }
    initRoutes() {
        this._router.get('/', this.controller.readContacts);
        this._router.get('/:id', this.controller.readContact);
        this._router.post('/', this.controller.addContact);
        this._router.post('/:id', this.controller.updateContact);
        this._router.delete('/:id', this.controller.removeContact);
    }
}
exports.ContactRoutes = ContactRoutes;
