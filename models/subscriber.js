const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const SubscriberSchema = new Schema({
    email: String,

    date: {
        type: Date,
        default: Date.now
    },
	
});

module.exports = mongoose.model('Subscriber', SubscriberSchema);