const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const ContactSchema = new Schema({
      email: String,
	first_name: String,
    last_name:String,
       date: {
        type: Date,
        default: Date.now
    },
    city:String,
    country:String,
company:String,
mobile:String,
industry:String,
business_profession:  [String],
interested_in: [String],
hear:String,

job: String,
});
module.exports = mongoose.model('Contact', ContactSchema);