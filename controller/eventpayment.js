const details = require('../models/event.js');


module.exports = function (app) {
    
app.post("/eventpayment",function(req, res){
    sess=req.session;
// console.log("paymentbody..", req.body);
var eventname=req.body.eventname;
var tickets=req.body.No_of_Tickets;
var total=req.body.total;
var eventid=req.body.eventid;
var page_name;
// console.log("sessionnnsaasd",req.session);
 if (req.session.user) {
      if(req.session.user.address){
var balance=req.body.balance;
    res.render('eventpayment', {
         sess: sess,
        eventname:eventname,
        tickets:tickets,
        total:total,
        eventid:eventid,
        balance:balance,
        page_name:'events',
    });
 }
 else{
var balance=0;
    res.render('eventpayment', {
         sess: sess,
        eventname:eventname,
        tickets:tickets,
        total:total,
        eventid:eventid,
        balance:balance,
         page_name:'events',
    });

 }
 }
 else
 {
       res.render('signin', {

    });
 }
    // console.log("eventname..........",eventname);
})

app.post("/makeeventpayment",function(req, res){

// console.log("payment",req.body);

})
}