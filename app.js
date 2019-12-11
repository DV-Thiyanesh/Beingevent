var express = require('express'),

  app = module.exports = express();
var session = require('express-session');
app.use(session({
  secret: 'ssshhhhh', resave: true,
  saveUninitialized: true
}));

const lightwallet = require("eth-lightwallet");

const bcrypt = require('bcryptjs');
const walletUtils = require('./utils/wallet');

function encryptSeed(seed, password) {
  const encrypt = require('./utils/crypto');
  return encrypt.encrypt('aes256', password, seed.toString());
}

function decryptSeed(seed, password) {
  const encrypt = require('./utils/crypto');
  return encrypt.decrypt('aes256', password, seed)
}


app.engine('.html', require('ejs').__express);
app.use(express.static(__dirname + '/public'));

bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var flash = require('express-flash');
app.use(flash());

app.set('view engine', 'html');
app.set('views', __dirname + '/views');
const path = require('path');
// app.set('/views', express.static(path.resolve(__dirname, 'views')));
// app.use('./public', express.static(path.resolve(__dirname, 'public')));
const events = require('./models/event.js');
const subscriber = require('./models/subscriber.js')
const contact = require('./models/contact.js')
const youtube =require('./models/youtube.js')
var dateFormat = require('dateformat');
const news = require('./models/news.js');


const type= "service_account";
  const project_id= "apt-impact-258013";
  const private_key_id= "b6057300e99e09ae47b01e1dff6f513ba38fe948";
  const private_key= "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDx6JTfG0zXqo0B\nIGe2hY40HTsXV34joz19hgeW4h9rgYrjQDMZBGL6jmXT7xTcV10rN7h48Oi5ofAI\nW75+WKmIaUCpWMU+jAD3A7a1yiB3IBF2IblSw9GlI/UfLfG6fewLAKEk3KhsMPx9\n4RWuiLkhk9qFBpBiojEXfTEOMhonTekxnLJb8SbpIc6BWAtzHC5NDp4QO/agUOBn\nONrqO1j7aeUtlCgiwiZA9kTJp4yE2A7PBgMNzSiishj1gf4iC78JOMPY2oY7EY0m\n0l8t+raIlptN+RskQ/FqnGaXGXzckzMM8AFiJQgJk4pAnylhCNOzEfrfEOjnGqw0\nSX2y9LJ7AgMBAAECggEAR0MGp/q41kdtpklPhBsv2vZJdATYKdNqx9F15uLR8q+E\npJFC/DmolrrgEGC7unUaAyM0+putUxH7TdsI8NtZhc/Ltpdp85T2q82yQzc5/R27\nRxuEJnd9CLLhAMBeF1wE7vDOh7dg/g4oM0TdSD8KmnOdydY3LnctEwhULSRhQ/ZC\n/1drYPPqhbrpmbfg7OL4dCKbcUxNCfPkywvqqZHRE/JiFrv1nR4biNpMUCMwzsra\n6+xFVCV5lznAqtpsUrpIhXskh+jHgXpqscZxz0531BAvRauxveWOPhGjnBHdRz20\nFtANajitYPZBS6PibZvBD2k8KbYTJnIeZhBlxukTwQKBgQD5t6+ZwqhS5yGYxM0v\njdTmovRUcYlWr+MK2s1aqejoVTwJAmL9AJukNlu3XMCqbIt4WXda3/3kg9CSopgi\nE7IvCXvNQ3P2I3jfh/AqjJujyOwTK66UKkQXHtEIf6DCz3WnuwOdXf1AAG1VFjGv\nyXSanx1C71uffW7BWV6ez/qCcQKBgQD3/pn42V3kZur53zYXefqXlPO0yh1kDZbF\nhI9+Kbhtp83UaPUEFNB+gGHjxQI9UybuybCxPktpL8h26Fc2qRZliw2w0kYVU5YT\nsc3RJ/wIFJw/BP/8kqH+5iTTGle+hLw5STkOxslLhybeBYW2rMrzr35I4i3+24GU\ncyIWgj8hqwKBgEfFd37l56MMMyfJSH/mb85p/3dVundjzgmMoYDxXLOJ69tbCEBX\nMGSeCvZEfkt9LwjEDf3cawiGqie6+6avqoLCYwa34FhaEZ+NXoWcLA+C6/cGkwKa\nsz9B6CpdJENZhSNUKNHN9b+zX7kYy+cOK6lVGf/m85p/XpnLqdpTRFjBAoGAO0T3\nKZlRrlfGiueE9wFpGbc4s5mmgpYY1aYD4WQ5NsPnFn/rJwmOdt1aB+S6z0tDP8im\nWQYJYd9QqtKGnYK13pjoMb1fkJNEh/pztSw4OPosCYe5YnTtEI2SeX2PQPJaRdqx\nL03lKA7qBCAPwAP2EV188hBUa9esVX1axURlsDcCgYBk2pM3cYIxtpSa7jGq7cnB\n2ne1AbubJLmROzDWnlpF67vS/KrUxeC99Kq6DuQxtelpgVy4or8ZxCuPi+g/eZ4n\nlj0vhWnuaDjmM71lZYMiaIfEaQ6SOh8Epu3+iOvDlWF0yLyZgfNtVVuVvZA51aAT\nS6+p88zPEUYuzZfJ6N1uHg==\n-----END PRIVATE KEY-----\n"
  const client_email= "my-project@apt-impact-258013.iam.gserviceaccount.com"
  const client_id= "104973633712153217141"
  const auth_uri= "https://accounts.google.com/o/oauth2/auth"
  const token_uri= "https://oauth2.googleapis.com/token"
  const auth_provider_x509_cert_url= "https://www.googleapis.com/oauth2/v1/certs"
  const client_x509_cert_url= "https://www.googleapis.com/robot/v1/metadata/x509/my-project%40apt-impact-258013.iam.gserviceaccount.com"





Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://rpc.beingevent.com:8545"));
global.abi = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "addressLaw", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "tokensKoreaTeam", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "INITIAL_SUPPLY", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "addressFXReserve", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "tokensICOSale", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_subtractedValue", "type": "uint256" }], "name": "decreaseApproval", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "addressThailand", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "tokensAdvisors", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "addressIndiaTeam", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "tokensFXReserve", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "addressICOManager", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "halted", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "tokensThailand", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_addedValue", "type": "uint256" }], "name": "increaseApproval", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "addressAdvisors", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "tokensIndiaTeam", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "addressKoreaTeam", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "tokensPMTBankReserve", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "addressPMTBankReserve", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "tokensLaw", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "constant": false, "inputs": [], "name": "halt", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "unhalt", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }];
global.contractAddress = "0x729537a0536f3f6def87f84023b483adc765af01";

global.imageurl = "https://beingevent.s3.ap-south-1.amazonaws.com/"

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

var Transaction = require('./models/transaction.js');
require('./controller/login')(app);
require('./controller/event')(app);
require('./controller/product')(app);
require('./controller/details')(app);
require('./controller/merchantview')(app);
require('./controller/eventhistory')(app);
require('./controller/news')(app);
require('./controller/historydetails')(app);
require('./controller/referral')(app);
require('./controller/newsdetails')(app);
require('./controller/eventcheckout')(app);
require('./controller/balance')(app)
require('./controller/eventpayment')(app);
require('./controller/merchantpayment')(app);
require('./controller/merchantcheckout')(app);
require('./controller/eventcategories')(app);
require('./controller/newscategories')(app);
require('./controller/eventcategoriesdetails')(app);



global.ethToUSD = 0;
global.btcToUSD = 0;
global.eth = 0;
global.btc = 0;
global.finalbtc = 0;
global.btcinr=0;
global.finalbtc1 = 0;
global. finaleth1=0;
global.eurinr=0;
currency1 = "USD";
 currency2 = "INR";
global.usdinr=0;
var sess = null;


var sess = null;
var request = require("request");
var url1 = "https://min-api.cryptocompare.com/data/price?fsym=" + currency1 + "&tsyms=" + "ETH,BTC,XRP,LTC,BCH,EOS,BNB,BSV,XLM,TRX";

var url3= "https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCINR";
var url4= "https://apiv2.bitcoinaverage.com/indices/global/ticker/ETHINR";



var url2 = "https://free.currconv.com/api/v7/convert?q=USD_INR&compact=ultra&apiKey=cd18f7758cb4b3feb5e9";


 var url5 = "https://free.currconv.com/api/v7/convert?q=EUR_INR&compact=ultra&apiKey=cd18f7758cb4b3feb5e9";


function thousands_separators(num)
{
  var num_parts = num.toString().split(".");
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num_parts.join(".");
}

function formatNumber(num) {
          var n1, n2;
          num = num + '' || '';
        
          n1 = num.split('.');
          n2 = n1[1] || null;
          n1 = n1[0].replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
          num = n2 ? n1 + '.' + n2 : n1;

       return num;
      }

// request(url2, function(error, response, body){
// body = JSON.parse(body);
// usdinr=body["USD_INR"].toFixed(2);
// // console.log("us",usdinr);

// });





request(url1, function (error, response, body) {

  body = JSON.parse(body);
  btcToUSD = 1 / body["BTC"];
  btc = btcToUSD.toFixed(2);
  finalbtc = thousands_separators(btc);
  ethToUSD = 1 / body["ETH"];
  eth = ethToUSD.toFixed(2);
  XRPTOUSD = 1 / body["XRP"];
  xrp = XRPTOUSD.toFixed(4);
  LTCTOUSD = 1 / body["LTC"];
  ltc = LTCTOUSD.toFixed(2);
  BTCCTOUSD = 1 / body["BCH"];
  btcc = BTCCTOUSD.toFixed(2);
  EOSTOUSD = 1 / body["EOS"];
  eos = EOSTOUSD.toFixed(3);
  BNBTOUSD = 1 / body["BNB"];
  bnb = BNBTOUSD.toFixed(2);
  BTCSTOUSD = 1 / body["BSV"];
  btcs = BTCSTOUSD.toFixed(2);
  SLRTOUSD = 1 / body["XLM"];
  slr = SLRTOUSD.toFixed(4);
  TNTOUSD = 1 / body["TRX"];
  tn = TNTOUSD.toFixed(5);

});
// request(url3, function(error, response, body) {
    
//   body = JSON.parse(body);  
//  btcinr = body["last"].toFixed(2);



// finalbtc1=formatNumber(btcinr);

// // console.log(btcinr);

// // console.log( finalbtc1);


// });
// request(url4, function(error, response, body) {    
//   body = JSON.parse(body);  
//  ethinr = body["last"].toFixed(2);

// finaleth1=formatNumber(ethinr);

// // console.log(ethinr);

// // console.log(finaleth1);

// });

const User = require('./models/User.js');
const mongoose = require('mongoose')

const port = 443
const fs = require('fs')
const https = require('https')

//old database mlab mongoose.connect('mongodb://admin:admin123@ds343887.mlab.com:43887/eventica', {
mongoose.connect(' mongodb://beventdb:zygkin-1suzsY-marwys@beingevent-shard-00-00-7u5ec.mongodb.net:27017,beingevent-shard-00-01-7u5ec.mongodb.net:27017,beingevent-shard-00-02-7u5ec.mongodb.net:27017/beingevent?ssl=true&replicaSet=beingevent-shard-0&authSource=admin&retryWrites=true&w=majority', {
// new database old connection string with one server mongoose.connect('mongodb+srv://beventdb:zygkin-1suzsY-marwys@beingevent-7u5ec.mongodb.net/beingevent', {
  useNewUrlParser: true
}, (err, client) => {
  if (err) throw err;

  else {

    console.log("mongodb connected")
  }
})

var qr = require('qr-image');


// app.use(function(req, res, next){
// res.setHeader("Content-Security-Policy", "script-src 'self' https://apis.google.com");
// return next();

// });

app.get('/qr/:text', function (req, res) {
  var code = qr.image(req.params.text, { type: 'png', ec_level: 'H', size: 10, margin: 0 });
  res.setHeader('Content-type', 'image/png');
  code.pipe(res);
})

if (!module.parent) {



  server = app.listen(8081)
  console.log('Running in port 8081');

  //  serverhttps = https.createServer({
  //    key: fs.readFileSync('/etc/letsencrypt/live/beingevent.com/privkey.pem', 'utf8'),
  //    cert: fs.readFileSync('/etc/letsencrypt/live/beingevent.com/fullchain.pem', 'utf8')
  //  }, app).listen(port, () => {
  //    console.log('Listening... 443')

  //   })
  //   var http = require('http');
  //  server= http.createServer(function(req, res) {
  //       res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  //       res.end();
  //   }).listen(80, () => {
  //       console.log('port listening : 80')
  //   });

}


app.get("/analytics",function(req, res){

const { google } = require('googleapis')
const scopes = 'https://www.googleapis.com/auth/analytics.readonly'
const jwt = new google.auth.JWT(client_email, null, private_key, scopes)

const view_id = '204241133'

async function getData() {
  const response = await jwt.authorize()
  const result = await google.analytics('v3').data.ga.get({
    'auth': jwt,
    'ids': 'ga:' + 204241133,
    'start-date': '2019-11-01',
    'end-date': 'today',
    'metrics': 'ga:7dayUsers',
    'dimensions':'ga:date'
  })

  // console.log(result.data.rows);


  const result1 = await google.analytics('v3').data.ga.get({
    'auth': jwt,
    'ids': 'ga:' + 204241133,
    'start-date': '2019-11-01',
    'end-date': 'today',
    'metrics': 'ga:uniquePageviews',
   
  })

  // console.log(result1.data.rows);
}

getData()


})




app.get('/', async function (req, res) {
  // console.log("rediredt here")
  sess = req.session;

  var url1 = "https://min-api.cryptocompare.com/data/price?fsym=" + currency1 + "&tsyms=" + "ETH,BTC,XRP,LTC,BCH,EOS,BNB,BSV,XLM,TRX";
  var url2 = "https://min-api.cryptocompare.com/data/price?fsym="+currency2+"&tsyms="+"ETH,BTC";

  request(url1, function (error, response, body) {

    body = JSON.parse(body);
    btcToUSD = 1 / body["BTC"];
    btc = btcToUSD.toFixed(2);
    finalbtc = thousands_separators(btc);
    ethToUSD = 1 / body["ETH"];
    eth = ethToUSD.toFixed(2);
    XRPTOUSD = 1 / body["XRP"];
    xrp = XRPTOUSD.toFixed(4);
    LTCTOUSD = 1 / body["LTC"];
    ltc = LTCTOUSD.toFixed(2);
    BTCCTOUSD = 1 / body["BCH"];
    btcc = BTCCTOUSD.toFixed(2);
    EOSTOUSD = 1 / body["EOS"];
    eos = EOSTOUSD.toFixed(3);
    BNBTOUSD = 1 / body["BNB"];
    bnb = BNBTOUSD.toFixed(2);
    BTCSTOUSD = 1 / body["BSV"];
    btcs = BTCSTOUSD.toFixed(2);
    SLRTOUSD = 1 / body["XLM"];
    slr = SLRTOUSD.toFixed(4);
    TNTOUSD = 1 / body["TRX"];
    tn = TNTOUSD.toFixed(5);

  });
//   request(url3, function(error, response, body) {
    
//     body = JSON.parse(body);  
//    btcinr = body["last"].toFixed(2);



// finalbtc1=formatNumber(btcinr);

// // console.log(btcinr);

// // console.log( finalbtc1);


// });
// request(url4, function(error, response, body) {

//     body = JSON.parse(body);  
//    ethinr = body["last"].toFixed(2);




// finaleth1=formatNumber(ethinr);

// // console.log(ethinr);

// // console.log(finaleth1);

// });


  if (req.session.user) {


    try {
      var firstQueryResult = await news.find().sort({ newsDate: -1 }).exec()

      var thirdQueryResult =await youtube.find().sort({date : 1}).exec()

 
      var secondQueryResult = await events.find({ checkbox: "true" }).exec(function (err, events) {
        if (err) {
          console.log(err);
        }
        for (var i = 0; i < events.length; i++) {
          var now = new Date(events[i].eventStartDate);
          var date = dateFormat(now, "mmmm dd, yyyy");
          events[i].eventStartDate = date;

        }
      //         for(var i=0; i< thirdQueryResult.length;i++){
      //  var url= thirdQueryResult[i].link; 
     
      //   var num = url.search("=");
     
      //  var linkid= url.substr(num+1, url.length)
       
      //  thirdQueryResult[i].link = linkid;
      //  }
        // console.log("thirdQueryResult",thirdQueryResult)
        if (sess.user.address) {
          var page_name;
          var self = this;
          const smartContrat = self.web3.eth.contract(self.abi).at(contractAddress);
          const balance = smartContrat.balanceOf(req.session.user.address) / 1e18;
          //  console.log(balance,"balance")
          res.render('eventica', {
            sess: sess,
            events: events,
            news: firstQueryResult,
            imageurl,
            balance: balance,
            page_name: 'home',
            link:thirdQueryResult,

          });



        }
        else {

          res.render('eventica', {
            sess: sess,
            news: firstQueryResult,
            events: events,
            imageurl,
            page_name: 'home',
            link:thirdQueryResult,

          });

        }
      });

    } catch (err) {
      console.log(err)
      throw err
    }

  }
  else {
    sess = req.session;
    try {
      var firstQueryResult = await news.find().sort({ newsDate: -1 }).exec()
    var thirdQueryResult =await youtube.find().sort({date : 1}).exec()
      var secondQueryResult = await events.find({ checkbox: "true" }).exec(function (err, events) {
        if (err) {
          console.log(err);
        }
        for (var i = 0; i < events.length; i++) {
          var now = new Date(events[i].eventStartDate);
          var date = dateFormat(now, "mmmm dd, yyyy");
          events[i].eventStartDate = date;

        }
       
    //     for(var i=0; i< thirdQueryResult.length;i++){
    //    var url= thirdQueryResult[i].link; 
    // //  console.log("url",url);
    //     var num = url.search("=");
    //   // console.log("num",num);
    //    var linkid= url.substr(num+1, url.length)
    //       // console.log("num",linkid);
    //    thirdQueryResult[i].link = linkid;
    //    }
//  console.log("thirdQueryResult",thirdQueryResult)
        // console.log("news",firstQueryResult[0].description);
        res.render('firsteventica', {
          sess: sess,
          events: events,
          news: firstQueryResult,
          imageurl,
          page_name: 'home',
            link:thirdQueryResult,
        });
 
      });
      // console.log("events",events);
    } catch (err) {
      console.log(err)
      throw err
    }
  
    // console.log("news",news);
    




  }

});
app.get('/google284f45324a9d86dc.html',function(req, res){
  res.render('google284f45324a9d86dc', {

});

});
app.get('/api',function(req, res){



  const rp = require('request-promise');
const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    'start': '1',
    'limit': '5000',
    'convert': 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': '98f68be2-5468-42f4-abc8-c173a6e1155b'
  },
  json: true,
  gzip: true
};

rp(requestOptions).then(response => {
  // console.log('API call response:', response);
}).catch((err) => {
  console.log('API call error:', err.message);
});
})

app.get('/eventica', async function (req, res) {
  sess = req.session;
  if (req.session.user) {
    try {
      var firstQueryResult = await news.find().sort({ newsDate: -1 }).exec()

 var thirdQueryResult =await youtube.find().sort({date : 1}).exec()
      var secondQueryResult = await events.find({ checkbox: "true" }).exec(function (err, events) {
        if (err) {
          console.log(err);
        }
        for (var i = 0; i < events.length; i++) {
          var now = new Date(events[i].eventStartDate);
          var date = dateFormat(now, "mmmm dd, yyyy");
          events[i].eventStartDate = date;

        }
      //         for(var i=0; i< thirdQueryResult.length;i++){
      //  var url= thirdQueryResult[i].link; 
     
      //   var num = url.search("=");
     
      //  var linkid= url.substr(num+1, url.length)
       
      //  thirdQueryResult[i].link = linkid;
      //  }

        if (sess.user.address) {
          var self = this;
          const smartContrat = self.web3.eth.contract(self.abi).at(contractAddress);
          const balance = smartContrat.balanceOf(req.session.user.address) / 1e18;
          //  console.log(balance,"balance")
          res.render('eventica', {
            sess: sess,
            events: events,
            news: firstQueryResult,
            imageurl,
            balance: balance,
            page_name: 'home',
              link:thirdQueryResult,

          });



        }
        else {

          res.render('eventica', {
            sess: sess,
            news: firstQueryResult,
            events: events,
            imageurl,
            page_name: 'home',
              link:thirdQueryResult,

          });

        }

      });

    } catch (err) {
      console.log(err)
      throw err
    }
  }
  else {
    sess = req.session;

    try {
      var firstQueryResult = await news.find().sort({ newsDate: -1 }).exec()

     var thirdQueryResult = await youtube.find().sort({date : 1}).exec()
      var secondQueryResult = await events.find({ checkbox: "true" }).exec(function (err, events) {
        if (err) {
          console.log(err);
        }
        for (var i = 0; i < events.length; i++) {
          var now = new Date(events[i].eventStartDate);
          var date = dateFormat(now, "mmmm dd, yyyy");
          events[i].eventStartDate = date;

        }
      // for(var i=0; i< thirdQueryResult.length;i++){
      //  var url= thirdQueryResult[i].link; 
     
      //   var num = url.search("=");
     
      //  var linkid= url.substr(num+1, url.length)
       
      //  thirdQueryResult[i].link = linkid;
      //  }

        res.render('firsteventica', {
          sess: sess,
          events: secondQueryResult,
          news: firstQueryResult,
          imageurl,
          page_name: 'home',
            link:thirdQueryResult,
            
        });
        // console.log(" events",events);
      });
    } catch (err) {
      console.log(err)
      throw err
    }




  }

});
app.get('/sitemap.xml', function(req, res){
    res.contentType('application/xml');
    res.sendFile(path.join(__dirname , 'sitemap.xml'));
});
app.get('/robots.txt', function(req, res){
    res.contentType('text/javascript');
    res.sendFile(path.join(__dirname , 'robots.txt'));
});

app.get('/firsteventica', function (req, res) {

  sess = req.session;
  res.render('firsteventica', {
    sess: sess,
    page_name: 'home',
  });
});

app.get('/merchant', function (req, res) {
  sess = req.session;
  var page_name;
  if (req.session.user) {

    res.render('merchantise', {
      sess: sess,
      page_name: 'merchant',
    });
  }
  else {
    res.render('signin', {
    });
  }

});

app.get('/merchantview', function (req, res) {
  var page_name;
  if (req.session.user) {
    res.render('merchantiseview', {
      page_name: 'merchant',

    });
  }
  else {
    res.render('signin', {
    });
  }

});

app.get('/transfer', function (req, res) {
  // console.log("transfer")
  sess = req.session;
  // console.log(contractAddress,"adfresd")
  if (sess.user.address) {
    sess = req.session;
    // console.log('balance')
    Transaction.find({ from: req.session.user.address }).exec(function (err, carddatas) {


      if (!err) {
        console.log(err)
        var self = this;
        const smartContrat = self.web3.eth.contract(self.abi).at(contractAddress);
        const balance = smartContrat.balanceOf(req.session.user.address) / 1e18;
        // console.log(balance) 
        var cardvalue = []


        carddatas.forEach(function (carddata) {

          // console.log(carddata,"crd")
          var elem = new Object();



          elem["to"] = carddata.to.substr(0, 10) + '...'

          elem["hash"] = carddata.hash.substr(0, 10) + '...';;
          elem["value"] = carddata.value


          cardvalue.push(elem);
          // console.log(elem,"ememe")
        });
        var page_name;
        res.render('transfer', {
          transactions: cardvalue,
          sess: sess,
          balance: balance,
          page_name: 'home',
        })
      }

    })

  } else {
    var balance = 0;
    res.render('transfer', {

      sess: sess,
      balance: balance,
      page_name: 'home',
    })
  }
})

app.get('/details', function (req, res) {
  var page_name;
  if (req.session.user) {
    res.render('details', {
      page_name: 'events',
    });
  }
  else {
    res.render('signin', {
    });
  }

});

app.get('/eventcheckout', function (req, res) {
  var page_name;
  sess = req.session;
  res.render('eventcheckout', {
    sess: sess,
    page_name: 'events',
  });
});

app.get('/newsdetails', function (req, res) {
  var page_name
  if (req.session.user) {
    res.render('newsdetails', {
      page_name: 'news',
    });
  }
  else {
    res.render('signin', {
    });
  }

});

app.get('/historydetails', function (req, res) {
  var page_name;
  if (req.session.user) {
    res.render('historydetails', {
      page_name: 'events',
    });
  }
  else {
    res.render('signin', {
    });
  }

});

app.get('/forgot', function (req, res) {
  res.render('forgot', {
  });
});

app.get('/reset', function (req, res) {
  res.render('reset', {
  });
});

app.get('/exchange', function (req, res) {
  var balance = 0;
  sess = req.session;
  if (req.session.user) {
    res.render('exchange', {
      balance: balance,
      sess: sess


    });
  }
  else {
    res.render('signin', {

    });
  }


});

app.get('/cryptonews/:page', function (req, res) {

  var page_name;
  if (req.session.user) {
    res.render('cryptonews', {
      page_name: 'news',
    });
  }
  else {
    res.render('signin', {
    });
  }

});

app.post('/subscribe', function (req, res) {
// console.log(req.body);
  if (req.body.email == '') {

    req.flash('error', 'email is required');
      return res.redirect('/#subscribe');
  }

  else {
    subscriber.findOne({ email: req.body.email }, function (err, email_data) {
      if (err) {
        console.log(error);
      }
      else if(email_data){

        var message = 'Already You Have subscribed'
        req.flash('info', message);
        return res.redirect('/#subscribe')
      }
      
      
       else if (!email_data) {

        var userData = {};
        userData.email = req.body.email;
      
        const newUser = new subscriber(userData);
        newUser.save((err) => {
          if (err) {
            console.log(error);
          }
 var message = 'Thank You For Subscribe';
      req.flash('success', message);
      return res.redirect('/#subscribe');
         
        });
      }
    })
  }
});

app.post('/blogsubscribe', function (req, res) {
// console.log(req.body);

var id=req.body.id;
  if (req.body.email == '') {

    req.flash('error', 'email is required');
      return res.redirect('/blogdetails/'+id+'#subscribe');
  }

  else {
    subscriber.findOne({ email: req.body.email }, function (err, email_data) {
      if (err) {
        console.log(error);
      }
      else if(email_data){

        var message = 'Already You Have subscribed'
        req.flash('info', message);
        return res.redirect('/blogdetails/'+id+'#subscribe');
      }
      
      
       else if (!email_data) {

        var userData = {};
        userData.email = req.body.email;
      
        const newUser = new subscriber(userData);
        newUser.save((err) => {
          if (err) {
            console.log(error);
          }
 var message = 'Thank You For Subscribe';
      req.flash('success', message);
    return res.redirect('/blogdetails/'+id+'#subscribe');
         
        });
      }
    })
  }
});
app.post('/newssubscribe', function (req, res) {
// console.log(req.body);
var id=req.body.id;
// console.log(id);
  if (req.body.email == '') {

    req.flash('error', 'email is required');
     return res.redirect('/newsdetails/'+id+'#subscribe');
  }

  else {
    subscriber.findOne({ email: req.body.email }, function (err, email_data) {
      if (err) {
        console.log(error);
      }
      else if(email_data){

        var message = 'Already You Have subscribed'
        req.flash('info', message);
      return res.redirect('/newsdetails/'+id+'#subscribe');
      }
      
      
       else if (!email_data) {

        var userData = {};
        userData.email = req.body.email;
      
        const newUser = new subscriber(userData);
        newUser.save((err) => {
          if (err) {
            console.log(error);
          }
 var message = 'Thank You For Subscribe';
      req.flash('success', message);
    return res.redirect('/newsdetails/'+id+'#subscribe');
         
        });
      }
    })
  }
});
// app.post('/subscribe',function(req, res){
// console.log("req.body",req.body);

// })


app.get('/walletaddress', function (req, res) {
// console.log("walletaddress");

  if (req.session.user) {

    const seed = lightwallet.keystore.generateRandomSeed();
    const wallet = walletUtils.getWallet(seed);
    const data = {
      address: walletUtils.getWalletAddress(wallet),
      pubkey: walletUtils.getWalletPublicKey(wallet),
      seed
    };
    const email = req.session.user.email
    // console.log(data,"data")
    password = (req.session.user.password)
    // console.log(password,"password")
    const seedHash = encryptSeed(data.seed, password);
    // console.log(seedHash)
    User.findOneAndUpdate({ email }, { 'address': data.address, 'seed': seedHash }, function (err, doc) {
      if (err) {
        console.log(err);

      }
      // console.log("inside");

      res.send(seedHash);

    });
  }
})

app.get('/chat', function (req, res) {

  if (req.session.user) {


    first = req.session.user.firstname;
    last = req.session.user.lastname;
    username = first + last;
    if (req.session.user.address) {
      var self = this;
      const smartContrat = self.web3.eth.contract(self.abi).at(contractAddress);
      const balance = smartContrat.balanceOf(req.session.user.address) / 1e18;
      //  console.log(balance,"balance")

      username = first + last;
      var page_name;
      res.render('chat', {
        balance: balance,
        page_name: 'home',
      });

    }
    else {
      var balance = 0;
      res.setHeader('set-cookie', [
   'cross-site-cookie=name; SameSite=None; Secure'
]);
      res.render('chat', {
        balance: balance,
        page_name: 'home',
      });
    }
  }
  else {

    res.render('signin', {
    });
  }

});

app.get('/privacy', function (req, res) {

  sess = req.session;
  res.render('privacy', {
    sess
  })
})

app.get('/aboutus', function (req, res) {
  var page_name;
  sess = req.session;
  if (sess.user != null) {
    if (req.session.user.address) {
      var self = this;
      const smartContrat = self.web3.eth.contract(self.abi).at(contractAddress);
      const balance = smartContrat.balanceOf(req.session.user.address) / 1e18;
      // console.log(balance,"balance")

      res.render('aboutus', {
        sess: sess,
        balance: balance,
        page_name: 'about',
      });
    }
    else {
      var balance = 0;
      res.render('aboutus', {
        sess: sess,
        balance: balance,
        page_name: 'about',
      });
    }
  }
  else {
    res.render('aboutus', {
      sess: sess,
      page_name: 'about',

    });
  }
});

app.post('/contact', function (req, res) {
  // console.log("req",req.body);
  contact.findOne({ email: req.body.email }, function (err, email_data) {
    if (err) {
      console.log(error);
    } else if (!email_data) {

      var userData = {};
      userData.job = req.body.job;
      userData.email = req.body.email;
      userData.first_name = req.body.first_name;
      userData.last_name = req.body.last_name;
      userData.company = req.body.company;
      userData.mobile = req.body.mobile;

      userData.city = req.body.city;
      userData.country = req.body.country;
      userData.industry = req.body.industry;
      userData.business_profession = req.body.business_profession;
      userData.interested_in = req.body.interested;
      userData.hear = req.body.hear;
      userData.checkbox = req.body.checkbox;

      const newUser = new contact(userData);
      newUser.save((err) => {
        if (err) {
          console.log(error);
        }
      });
      var message = 'Message has been sent. Thank you for getting in touch! We appreciate you contacting us about beingevent. One of our team member will get back to you.';
      req.flash('success', message);
      return res.redirect('/#contact');
    }
  })



});
app.get('/videos', function (req, res) {
  sess = req.session;
  if (sess.user != null) {
    if (req.session.user.address) {
      var self = this;
      const smartContrat = self.web3.eth.contract(self.abi).at(contractAddress);
      const balance = smartContrat.balanceOf(req.session.user.address) / 1e18;
      // console.log(balance,"balance")

      var page_name;
      res.render('videos', {
        sess: sess,
        balance: balance,
        page_name: 'videos',
      });
    }
    else {
      var balance = 0;
      res.render('videos', {
        sess: sess,
        balance: balance,
        page_name: 'videos',
      });
    }
  }
  else {
    res.render('videos', {
      sess: sess,
      page_name: 'videos',
    });

  }


});

app.get('/contactus', function (req, res) {
  sess = req.session;
  if (sess.user != null) {
    if (req.session.user.address) {
      var self = this;
      const smartContrat = self.web3.eth.contract(self.abi).at(contractAddress);
      const balance = smartContrat.balanceOf(req.session.user.address) / 1e18;
      // console.log(balance,"balance")

      var page_name;
      res.render('contactus', {
        sess: sess,
        balance: balance,
        page_name: 'contact',
      });
    }
    else {
      var balance = 0;
      res.render('contactus', {
        sess: sess,
        balance: balance,
        page_name: 'contact',
      });
    }
  }
  else {
    res.render('contactus', {
      sess: sess,
      page_name: 'contact',
    });

  }


});


app.get('/email', function (req, res) {

  sess = req.session;


  if (funcs.isEmpty(sess.user)) {
    res.redirect('/signin');
  } else {
    res.render('editor_ckeditor_for_email', {
      layout: false,
      name: req.session.user.firstname + " " + req.session.user.lastname
    });
  }
});


var io = require('socket.io').listen(server);
// var io = require('socket.io').listen(serverhttps);
var usernames = {};

var rooms = ['BITCOIN', 'ETHEREUM', 'EVENTICA'];

io.sockets.on('connection', function (socket) {


  socket.on('adduser', function (username) {

    socket.username = username;

    socket.room = 'BITCOIN';


    usernames[username] = username;

    socket.join('BITCOIN');



    socket.emit('updatechat', 'SERVER', 'you have connected to BITCOIN');

    socket.broadcast.to('BITCOIN').emit('updatechat', 'SERVER', username + ' has connected to this room');
    socket.emit('updaterooms', rooms, 'BITCOIN');
  });


  socket.on('sendchat', function (data) {

    io.sockets.in(socket.room).emit('updatechat', socket.username, data);
  });

  socket.on('switchRoom', function (newroom) {
    socket.leave(socket.room);
    socket.join(newroom);
    socket.emit('updatechat', 'SERVER', 'you have connected to ' + newroom);

    socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username + ' has left this room');

    socket.room = newroom;
    socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username + ' has joined this room');
    socket.emit('updaterooms', rooms, newroom);
  });



  socket.on('disconnect', function () {
console.log("disconnect")
    delete usernames[socket.username];

    io.sockets.emit('updateusers', usernames);

    socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
    socket.leave(socket.room);
  });
});


