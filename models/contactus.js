const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const ContactUsSchema = new Schema({
    email: String,
	name: String,
    message: String,
    mobile: String,
    status: { type:Number, default:1},
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('ContactUs', ContactUsSchema);