const product = require('../models/product.js');

module.exports = function (app) {

app.post('/merchantcheckout', function (req, res) {
  sess = req.session;

  var page_name;

var datalist= JSON.parse(req.body.itemslist);

var subtotal=0;
for(var i=0;i<datalist.length;i++)
{

  datalist[i]['_total']=(datalist[i]['_data'].quantity * datalist[i]['_data'].amount);
 subtotal= subtotal + datalist[i]['_total'];
//  console.log(subtotal);
}


// console.log("total",datalist);
// console.log("sub",subtotal)

 if(req.session.user != null)
{
       if(req.session.user.address){

var self =this;
const smartContrat = self.web3.eth.contract(self.abi).at(contractAddress);
const balance = smartContrat.balanceOf(req.session.user.address) / 1e18;
console.log(balance) 


  res.render('merchantcheckout', {
sess:sess,
cartlist:datalist,
subtotal:subtotal,
balance:balance,
  page_name:'merchant',
  });

}
else{
res.render('merchantcheckout', {
sess:sess,
cartlist:datalist,
subtotal:subtotal,
  page_name:'merchant',

})
}
}
else{
  res.render('merchantcheckout', {
sess:sess,
cartlist:datalist,
subtotal:subtotal,
  page_name:'merchant',

})
}

})



}