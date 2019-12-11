const product = require('../models/product.js');



const details = require('../models/event.js');


module.exports = function (app) {
    
app.post("/merchantpayment",function(req, res){
    sess=req.session;
console.log("paymentbody..", req.body);

var itemname=req.body.item_name;
var subtotal=req.body.subtotal;
console.log("length",req.body.quantity);
var len=req.body.quantity.length;
console.log("length",len);

 if (req.session.user) {
       if(req.session.user.address){
var page_name;
var self =this;
const smartContrat = self.web3.eth.contract(self.abi).at(contractAddress);
const balance = smartContrat.balanceOf(req.session.user.address) / 1e18;
console.log(balance) 
    res.render('merchantpayment', {
         sess: sess,
           itemname:itemname,
         subtotal:subtotal,
balance:balance,
length:len,
  page_name:'merchant',

    });
    console.log("itemname",itemname)
 }
 else{
    var balance=0;
      res.render('merchantpayment', {
         sess: sess,
         itemname:itemname,
         subtotal:subtotal,
         length:len,
         balance:balance,
          page_name:'merchant',
     
    });
    console.log("itemname",itemname)
 }
 }
 else
 {
       res.render('signin', {

    });
 }
    // console.log("eventname..........",eventname);
})

app.post("/makemerchantpayment",function(req, res){

console.log("payment",req.body.itemname[0]);

})
}