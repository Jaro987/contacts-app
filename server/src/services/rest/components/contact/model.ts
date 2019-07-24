import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
export var ContactSchema = new Schema({
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
    }
);