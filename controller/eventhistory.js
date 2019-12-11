const events = require('../models/event.js');
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


 app.get("/eventhistory/:page", async function (req, res) {

    const page = req.params.page
    const perpage = 6
    var page_name
   
  var length;


 let currentDate= new Date()
          .toJSON().slice(0, 10)
         .replace(/-/g, "-");
        //  events.find({eventStartDate:{$lt:currentDate}}).sort({eventStartDate: 1}).exec(function (err, events) {

            try {
                var firstQueryResult = await events.find({eventStartDate:{$lt:currentDate}}).sort({eventStartDate: 1}).exec()
                  length=events.length;
                   
                    var secondQueryResult = await events.find({eventStartDate:{$lt:currentDate}}).sort({eventStartDate: 1}) .skip((perpage * page) - perpage)
                  .limit(perpage).exec() } catch (err) {
                console.log(err)
                throw err
              }

   var page_name;
       
        // events.find().exec(function (err, events) {
           
  
            const numOfProducts = firstQueryResult.length        
            var  page_name; 
            for(var i=0; i< secondQueryResult.length;i++ ){
           var now = new Date(secondQueryResult[i].eventStartDate);
           var date =dateFormat(now, "mmmm dd, yyyy");
           
           secondQueryResult[i].eventStartDate = date;
           
           }
// console.log("group..",group);
if(req.session.user != null)
{
      if(req.session.user.address){
//      console.log("group..",req.session.user.address);
// console.log("session")
var self =this;
const smartContrat = self.web3.eth.contract(self.abi).at(contractAddress);
const balance = smartContrat.balanceOf(req.session.user.address) / 1e18;
// console.log(balance) 

            res.render('eventhistory', {
               sess: req.session,
             
               events: secondQueryResult,
               currentPage: page,
      pages: Math.ceil(numOfProducts / perpage),
      numOfResults: numOfProducts,
         
                imageurl,
                balance:balance,
page_name:'events',
            });}
            else{
                res.render('eventhistory', {
               sess: req.session,
               events: secondQueryResult,
                 currentPage: page,
        pages: Math.ceil(numOfProducts / perpage),
        numOfResults: numOfProducts,
           
                imageurl,
                page_name:'events',
             

            }); 
            }
}
            else{

                res.render('eventhistory', {
               sess: req.session,
               events: secondQueryResult,
               currentPage: page,
      pages: Math.ceil(numOfProducts / perpage),
      numOfResults: numOfProducts,
             
                imageurl,
                page_name:'events',

            });
            }

            
            // console.log("eventhistory...",events);

    
    });

 

}