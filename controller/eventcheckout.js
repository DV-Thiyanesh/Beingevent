const details = require('../models/event.js');
module.exports = function (app) {
    var page_name;
app.post("/tickets",function (req, res){
      	// console.log("Body...", req.body);
          var id=req.body.eventid;
        details.findOne({_id: id}).exec(function (err, details) {
            if (err) {
                console.log(err);
            }
          var totalticket=req.body.quantity;
          var price=req.body.price;
          var balance=req.body.balance;
          var userid=req.body.userid;
            var total=totalticket*price;
        //    console.log("sessionnnsaasd",req.session);

           res.render('eventcheckout', {
                sess: req.session,
                userid: userid,
                details:details,
                totalticket:totalticket,
                price:price,
                total:total,
                balance:balance,
                page_name:'events',
             
                
                
                


            });
          
            // console.log("tickets...",userid);
            //  console.log("tickets...",total);
        })      
    })
}