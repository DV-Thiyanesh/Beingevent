const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({

    proimg: String,
    eventName: String,
    eventType: String,
    eventPlace: String,
    eventStartDate: String,
    eventEndDate: String,
    eventTime: String,
    eventdescription: String,
    city: String,
    eventlink: String,
    state: String,
    checkbox :String,
    speakers: {
    type: Object
  },
  photoGallary: {
    type: Object
  },
  tickets:{
    type: Object
  },
    organizerdetails: {
        type: Object
    },
    eventinfo: {
        type: Object
    },
    speakerName: String,
    company: String,
    position: String,
    email: String,
    description: String,
    filename: String

})
module.exports = mongoose.model('Event', EventSchema);

