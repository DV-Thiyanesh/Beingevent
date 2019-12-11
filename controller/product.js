const product = require('../models/product.js');


module.exports = function (app) {






    app.get("/merchant", function (req, res) {
        product.find().exec(function (err, product) {
            if (err) {
                console.log(err);
            }
            var page_name;
                if(req.session.user != null)
{
      if(req.session.user.address){
            var self =this;
            const smartContrat = self.web3.eth.contract(self.abi).at(contractAddress);
            const balance = smartContrat.balanceOf(req.session.user.address) / 1e18;
            // console.log(balance,"balance")
              
            res.render('merchantise', {
                  sess: req.session,
                product: product,
                imageurl,
                balance:balance,
                page_name:'merchant',

            });
            }
            else{
 res.render('merchantise', {
                  sess: req.session,
                product: product,
                imageurl,
                  page_name:'merchant',
                
            });

            }
}
else{
       
            res.render('merchantise', {
                  sess: req.session,
                product: product,
                imageurl,
                  page_name:'merchant',
        

            });
}

            // console.log("product...", product);
            

        });
    });


}