const details = require('../models/event.js');
var dateFormat = require('dateformat');

dateFormat.i18n = {
    dayNames: [
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ],
    monthNames: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
    ],
    timeNames: [
        'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
    ]
};

module.exports = function (app) {
    
global.oneinr=0;
global.twoinr=0;



     
    var page_name;

    app.get("/details/:id", function(req, res){
        // console.log("hrrtrt", req.pARA)
        var id=req.params.id;
        // console.log("event",req.body);
        details.findOne({_id: id}).exec(function (err, details) {
            //  console.log("event",usdinr);
            if (err) {
                console.log(err);
            }
    //  console.log(details.eventStartDate)        
var now = new Date(details.eventStartDate);
var date =dateFormat(now, "mmmm dd, yyyy");
// console.log(date);
details.eventStartDate = date;
if(details.tickets){
for(var i=0;i<details.tickets.length;i++){
var nowticket= new Date(details.tickets[i].validdate)
var dates =dateFormat(nowticket, "mmmm dd, yyyy");
details.tickets[i].validdate=dates
}
}
// console.log(details.eventStartDate)


            function ustoinr(num){
             var us=usdinr;
           
             var sum = (us*num).toFixed(0); 
        

             return sum;
            }
          
           var twocurr=details.eventinfo.offerTwoCurrency;
           var onecurr=details.eventinfo.offerOneCurrency;
            oneinr=ustoinr(onecurr);
            twoinr=ustoinr(twocurr);
         if(req.session.user != null)
{
       if(req.session.user.address){
//            console.log("group..",req.session.user.address);
// console.log("session")
var self =this;
const smartContrat = self.web3.eth.contract(self.abi).at(contractAddress);
const balance = smartContrat.balanceOf(req.session.user.address) / 1e18;
// console.log(balance)

            res.render('details', {
                  sess: req.session,
                details: details,
                imageurl,
                oneinr:oneinr,
                twoinr:twoinr,
                balance:balance,
                page_name:'events',

                

            });
              // console.log("details",details);
       }
       else{
           res.render('details', {
                  sess: req.session,
                details: details,
                imageurl,
                oneinr:oneinr,
                twoinr:twoinr,
                page_name:'events',
              

                

            }); 
              // console.log("details",details);
       }
}else{
     res.render('details', {
                  sess: req.session,
                details: details,
                imageurl,
                oneinr:oneinr,
                twoinr:twoinr,
                page_name:'events',
                
                

            });
}
           
      // console.log("details",details);
        });
    });



}