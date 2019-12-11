const referral = require('../models/User.js');


module.exports = function (app) {

    app.get("/referral", function (req, res) {
        // sess=req.session;
        // console.log("refer", sess.user.id);
        // var id=req.params.id;
        referral.find({ referral:  req.session.user["_id"] }).exec(function (err, referral) {
            if (err) {
                console.log(err);
            }
            var page_name;
            // console.log("img", sess.user.id);
             if(req.session.user != null)
{
      if(req.session.user.address){
            var self =this;
            const smartContrat = self.web3.eth.contract(self.abi).at(contractAddress);
            const balance = smartContrat.balanceOf(req.session.user.address) / 1e18;
            // console.log(balance,"balance")
            res.render('referral', {
              firstname:req.session.user.firstname,
              lastname:req.session.user.lastname,
              email:req.session.user.email,
              referralid: req.session.user["_id"], 
             referral: referral,
             balance:balance,
               page_name:'home',
            
            });
      }
      else{
           res.render('referral', {
              firstname:req.session.user.firstname,
              lastname:req.session.user.lastname,
              email:req.session.user.email,
              referralid: req.session.user["_id"], 
             referral: referral,
               page_name:'home',
            
      });
}
}

else{
     res.render('referral', {
              firstname:req.session.user.firstname,
              lastname:req.session.user.lastname,
              email:req.session.user.email,
              referralid: req.session.user["_id"], 
             referral: referral,
              page_name:'home',
            
            });
}
//  console.log("referral sess2",sess)
        });
    });



}