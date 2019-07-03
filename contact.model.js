const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Contact = new Schema({
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
    versionKey: false
});

Contact.method('toJSON', function() {
    var obj = this.toObject();

    //Rename fields
    obj.id = obj._id;
    delete obj._id;

    return obj;
});

module.exports = mongoose.model('Contact', Contact);