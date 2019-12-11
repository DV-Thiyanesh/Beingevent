const view = require('../models/product.js');

module.exports = function (app) {
var page_name;
    app.get("/merchantview/:id", function (req, res) {
           var id=req.params.id;
        view.findOne({_id:id}).exec(function (err, view) {
            if (err) {
                console.log(err);
            }
              if(req.session.user != null)
{
      if(req.session.user.address){
    //  console.log("group..",req.session.user.address);
// console.log("session")
var self =this;
const smartContrat = self.web3.eth.contract(self.abi).at(contractAddress);
const balance = smartContrat.balanceOf(req.session.user.address) / 1e18;
console.log(balance) 
              
            res.render('merchantiseview', {
                  sess: req.session,
                view: view,
                imageurl,
                balance:balance,
                page_name:'merchant',

            });
      }
      else{
           res.render('merchantiseview', {
                  sess: req.session,
                view: view,
                imageurl,
                page_name:'merchant',
            
      }); 
}
}
else{
 res.render('merchantiseview', {
                  sess: req.session,
                view: view,
                imageurl,
                page_name:'merchant',

            });

}
            // console.log("view.......", view);
            

        });
    });


}