"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.ContactSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    }
}, {
    versionKey: false,
    toJSON: {
        transform: function (ret) {
            // Rename fields
            ret.id = ret._id;
            delete ret._id;
        }
    }
});
