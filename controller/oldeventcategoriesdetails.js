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

    app.get("/eventcategoriesdetails/:id", async function(req, res){
        // console.log("hrrtrt", req.pARA)
        var id=req.params.id;
        let currentDate= new Date()
          .toJSON().slice(0, 10)
         .replace(/-/g, "-");
  var flag="flase";
    try {
                var firstQueryResult = await details.find({eventStartDate:{$gte:currentDate}}).exec()
             
                   
                    var secondQueryResult = await details.findOne({"_id": id}).exec()
                  } catch (err) {
                console.log(err)
                throw err
              }
            
            for(var i=0;i<firstQueryResult.length;i++){
             
               if( secondQueryResult.eventStartDate >=firstQueryResult[i].eventStartDate){
                   flag="true";
               }
            }
       
        // console.log("event",req.body);
    
    //  console.log(details.eventStartDate) 

var now = new Date(secondQueryResult.eventStartDate);
var date =dateFormat(now, "mmmm dd, yyyy");
// console.log(date);
secondQueryResult.eventStartDate = date;
// console.log(details.eventStartDate)


            function ustoinr(num){
             var us=usdinr;
           
             var sum = (us*num).toFixed(0); 
        

             return sum;
            }
          
           var twocurr=secondQueryResult.eventinfo.offerTwoCurrency;
           var onecurr=secondQueryResult.eventinfo.offerOneCurrency;
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

            res.render('eventcategoriesdetails', {
                  sess: req.session,
                details: secondQueryResult,
                imageurl,
                oneinr:oneinr,
                twoinr:twoinr,
                balance:balance,
                page_name:'events',
                ticketflag:flag

                

            });
              // console.log("details",details);
       }
       else{
           res.render('eventcategoriesdetails', {
                  sess: req.session,
                details: secondQueryResult,
                imageurl,
                oneinr:oneinr,
                twoinr:twoinr,
                page_name:'events',
                ticketflag:flag
              

                

            }); 
              // console.log("details",details);
       }
}else{
     res.render('eventcategoriesdetails', {
                  sess: req.session,
                details: secondQueryResult,
                imageurl,
                oneinr:oneinr,
                twoinr:twoinr,
                page_name:'events',
                ticketflag:flag
                
                

            });
}
           
      // console.log("details",details);
        // });
    });



}