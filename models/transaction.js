const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const transactionSchema = new Schema({
    hash: {
        type: String,
        unique: true
    },
    from: String,
    to: String,
    token: String,
    value : String,
    timestamp : String,
    nonce: String,
    recepitStatus:String,
    paymentStatus:String,
    order_id: String
})

module.exports = mongoose.model('transaction', transactionSchema);