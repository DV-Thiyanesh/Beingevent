const details = require('../models/event.js');
var page_name;

module.exports = function (app) {

    app.get("/historydetails/:id", function(req, res){
        // console.log("hrrtrt", req.pARA)
        var id=req.params.id;
        details.findOne({_id: id}).exec(function (err, details) {
            if (err) {
                console.log(err);
            }
            // console.log("img",details)
            if(req.session.user != null)
{
     if(req.session.user.address){
    //  console.log("group..",req.session.user.address);
// console.log("session")
var self =this;
const smartContrat = self.web3.eth.contract(self.abi).at(contractAddress);
const balance = smartContrat.balanceOf(req.session.user.address) / 1e18;
// console.log(balance) 
            res.render('historydetails', {
                sess:req.session,
                details: details,
                imageurl,
                balance:balance,
                page_name:'events',

            });
     }
     else{
         res.render('historydetails', {
                sess:req.session,
                details: details,
                imageurl,
                page_name:'events',
              
     });
}
}
else{
 res.render('historydetails', {
                sess:req.session,
                details: details,
                imageurl,
                page_name:'events',

            });

}
           
  
        });
    });

    

}