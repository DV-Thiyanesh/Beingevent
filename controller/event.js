const events = require('../models/event.js');
var dateFormat = require('dateformat');

var groupBy = require('group-by');
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

   
// app.get('/cryptonews/:page', async function (req, res) {
    app.get("/events/:page", async function (req, res) {
          const page = req.params.page
  const perpage = 6
  var page_name
 
var length;
     
let currentDate= new Date()
          .toJSON().slice(0, 10)
         .replace(/-/g, "-");

          try {
    var firstQueryResult = await events.find({eventStartDate:{$gte:currentDate}}).sort({eventStartDate: 1}).exec()
      length=events.length;
       
        var secondQueryResult = await events.find({eventStartDate:{$gte:currentDate}}).sort({eventStartDate: 1}) .skip((perpage * page) - perpage)
      .limit(perpage).exec() } catch (err) {
    console.log(err)
    throw err
  }
      
  

   const numOfProducts = firstQueryResult.length        
 var  page_name; 
 for(var i=0; i< secondQueryResult.length;i++ ){
var now = new Date(secondQueryResult[i].eventStartDate);
var date =dateFormat(now, "mmmm dd, yyyy");

secondQueryResult[i].eventStartDate = date;

}


if(req.session.user != null)
{
    if(req.session.user.address){

var self =this;
const smartContrat = self.web3.eth.contract(self.abi).at(contractAddress);
const balance = smartContrat.balanceOf(req.session.user.address) / 1e18;


            res.render('events', {
                sess: req.session,
              
                // group:group,
                imageurl,
                balance:balance,
                page_name:'events',
                  events: secondQueryResult,
                 currentPage: page,
        pages: Math.ceil(numOfProducts / perpage),
        numOfResults: numOfProducts,

});
}
else{
      res.render('events', {
                sess: req.session,
              
            
              
                imageurl,
                page_name:'events',
                    events: secondQueryResult,
                 currentPage: page,
        pages: Math.ceil(numOfProducts / perpage),
        numOfResults: numOfProducts,
             
});


}

}
else{


            res.render('events', {
                sess: req.session,
               
                // group:group,
            
                imageurl,
                page_name:'events',
                    events: secondQueryResult,
                 currentPage: page,
        pages: Math.ceil(numOfProducts / perpage),
        numOfResults: numOfProducts,
            
});



}
            
            
            
          

        });
  

    

}