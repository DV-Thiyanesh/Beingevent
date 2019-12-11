const news = require('../models/news.js');
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

    app.get("/blogdetails/:id", function(req, res){
        // console.log("hrrtrt", req.pARA)
        var id=req.params.id;
        news.findOne({_id: id}).exec(function (err, news) {
            if (err) {
                console.log(err);
            }
    //  console.log(news.newsDate);
var now = new Date(news.newsDate);
// console.log(now)
var date =dateFormat(now, "mmmm dd, yyyy");
// console.log(date);
news.newsDate=date;
// var newsdate = date;

            
               if(req.session.user != null)
{   
     if(req.session.user.address){
            var self =this;
            const smartContrat = self.web3.eth.contract(self.abi).at(contractAddress);
            const balance = smartContrat.balanceOf(req.session.user.address) / 1e18;
            // console.log(balance,"balance")
            // console.log("img",news)
            res.render('blogdetails', {
                  sess: req.session,
                news: news,
                imageurl,
                balance:balance,
                page_name:'blog',
               

            });
     }
     else{
          res.render('blogdetails', {
                  sess: req.session,
                news: news,
                imageurl,
                 page_name:'blog',
             
              
            });
     }
}
else{
    res.render('blogdetails', {
                  sess: req.session,
                news: news,
                imageurl,
                 page_name:'blog',
              

            });
}
           
  
        });
    });


    app.get("/newsdetails/:id", function(req, res){
        // console.log("hrrtrt", req.pARA)
        var id=req.params.id;
        news.findOne({_id: id}).exec(function (err, news) {
            if (err) {
                console.log(err);
            }
            var now = new Date(news.newsDate);
// console.log(now)
var date =dateFormat(now, "mmmm dd, yyyy");
// console.log(date);
news.newsDate=date;
// var newsdate = date;
              if(req.session.user != null)
{   
       if(req.session.user.address){
            var self =this;
            const smartContrat = self.web3.eth.contract(self.abi).at(contractAddress);
            const balance = smartContrat.balanceOf(req.session.user.address) / 1e18;
            // console.log(balance,"balance")
            // console.log("img",news)
            res.render('newsdetails', {
              
                  sess: req.session,
                news: news,
                imageurl,
                balance:balance,
                page_name:'news',
             

            });
       }else{
           res.render('newsdetails', {
               
                  sess: req.session,
                news: news,
                page_name:'news',
                imageurl,
                
                
       });
}
}
else{
     res.render('newsdetails', {
                  sess: req.session,
                news: news,
                page_name:'news',
                imageurl,
                  

            });
}
           
  
        });
    });

    

}