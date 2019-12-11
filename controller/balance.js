const encrypt = require('../utils/crypto');
const walletUtils = require('../utils/wallet');
Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://rpc.beingevent.com:8545"));  
global.abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"addressLaw","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"tokensKoreaTeam","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"INITIAL_SUPPLY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"addressFXReserve","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensICOSale","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"addressThailand","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensAdvisors","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"addressIndiaTeam","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensFXReserve","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"addressICOManager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"halted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensThailand","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"addressAdvisors","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensIndiaTeam","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"addressKoreaTeam","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensPMTBankReserve","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"addressPMTBankReserve","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensLaw","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":false,"inputs":[],"name":"halt","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unhalt","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
const transaction = require('../models/transaction.js');
contractAddress="0x729537a0536f3f6def87f84023b483adc765af01";
function decryptSeed(seed, password) {
  return encrypt.decrypt('aes256', password, seed)
}
function checkhex(word) {
//   console.log('before add', word)
  if (word.length % 2 != 0) {
      let w1 = word.substring(0, 2);
      let w2 = word.substring(2, word.length);
      return w1 + '0' + w2;
  } else {
      return word;
  }
}
const Tx = require('ethereumjs-tx');
module.exports = function (app) {
    
  app.post("/transfer", function (req, res) {

    const {
      address,
      seed,
      
  } = req.session.user;

//   console.log(req.body,"req.body")
  var to=req.body.address;
  var amount=req.body.amount;
  var phrase=req.body.phrase;
//   console.log(req.body,"reqbody")
//   console.log(req.session.user,"user")
    const seedw = decryptSeed(phrase,seed);
    const wallet = walletUtils.getWallet(seedw);
    const skey = walletUtils.getWalletPrivateKey(wallet)    
  
    amount = amount * 1e18;
    // console.log(amount,"amount")
   const secret = new Buffer(skey, 'hex');
   let inContract = web3.eth.contract(abi).at(contractAddress)
   const rawTransaction = {
       "nonce": checkhex(web3.toHex(web3.eth.getTransactionCount(address))),
       "gasPrice": 0,
       "gasLimit": "0x0153df",
       "to": contractAddress,
       "value": '0x00',
       data: inContract.transfer.getData(to, amount, {
           from: address
       })
   }
   const tx = new Tx(rawTransaction);
   tx.sign(secret);
   const serializedTx = tx.serialize();
   let sendString = serializedTx.toString('hex');
   web3.eth.sendRawTransaction(`0x${sendString}`,
       function (err, result) {
           if (!err) {
               let txhash = result;
               let newTransaction = new transaction({
                   hash: result,
                   from: address,
                   token: contractAddress,
                   nonce: web3.eth.getTransactionCount(address),
                   to: req.body.address,
                   value: req.body.amount,
                   timestamp: Date.now(),
                   order_id: req.body.order_id
               })
               newTransaction.save((err, result) => {
                //    console.log(result,"reslut")
                   res.json({
                       status: 200,
                       type: 'Success',
                       recepit: txhash
                   })
               })
           } else {
               console.log("err", err)
               res.json({
                   status:400,
                   type: 'Failure',
                   recepit: null
               })
           }
       }
   )
  })


 
}