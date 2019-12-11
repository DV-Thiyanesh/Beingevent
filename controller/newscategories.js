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

// module.exports = function (app) {
// app.get("/newscategories/:type", function (req, res) {
//   const type= req.params.type;
//         news.find({ "newsType": type}).sort({newsDate: -1}).exec(function (err, news) {
//             if (err) {
//                 console.log(err);
//             }
//           // console.log(news)
//             var page_name;
//              for(var i=0; i< news.length;i++ ){
// var now = new Date(news[i].newsDate);
// var date =dateFormat(now, "mmmm dd, yyyy");
// news[i].newsDate = date;
// }
//             if(req.session.user != null)
// {
//       if(req.session.user.address){
//             var self =this;
//             const smartContrat = self.web3.eth.contract(self.abi).at(contractAddress);
//             const balance = smartContrat.balanceOf(req.session.user.address) / 1e18;
//             // console.log(balance,"balance")
//             res.render('newscategories', {
//                sess: req.session,
//                 news: news,
//                 imageurl,
//                 balance:balance,
//                 page_name:'news',
//                   type: type,

//             });
//       }
//       else{
//            res.render('newscategories', {
//                sess: req.session,
//                 news: news,
//                 imageurl,
//                page_name:'news',
//                  type: type,

//             });
//       }

// }
// else{
//        res.render('newscategories', {
//                sess: req.session,
//                 news: news,
//                 imageurl,
//                  page_name:'news',
//                    type: type,
        

//             });

// } 

//         });
//     });

// }



module.exports = function (app) {
app.get('/newscategories/:type/:page', async function (req, res) {
  // console.log(news.length);
  const type= req.params.type
  const page = req.params.page
//   console.log("page",page)
//     console.log("type",type)
  const perpage = 10
  var page_name
 
var length;
  try {
    var firstQueryResult = await news.find({"newsType": type}).sort({ newsDate: -1 }).exec()
      length=news.length;
    // console.log('length2', length)
  
    var secondQueryResult = await news.find({"newsType": type})
      .sort({ newsDate: -1 })
      .skip((perpage * page) - perpage)
      .limit(perpage).exec()
  } catch (err) {
    console.log(err)
    throw err
  }
  // console.log("news",secondQueryResult)
 for(var i=0; i< secondQueryResult.length;i++ ){
var now = new Date(secondQueryResult[i].newsDate);
var date =dateFormat(now, "mmmm dd, yyyy");
// console.log(date);
//  var newsdate =[];
//  newsdate[i]=date;
secondQueryResult[i].newsDate = date;
// console.log(secondQueryResult[i].newsDate);
// console.log(newsdate[i])
}
// console.log("length",secondQueryResult.length)
// console.log("news",secondQueryResult);
  const numOfProducts = firstQueryResult.length

  if (req.session.user != null) {
    if (req.session.user.address) {
      var self = this
      const smartContrat = self.web3.eth.contract(self.abi).at(contractAddress)
      const balance = smartContrat.balanceOf(req.session.user.address) / 1e18
      // console.log(balance,"balance")

      res.render('newscategories', {
        sess: req.session,
        news: secondQueryResult,
        imageurl,
        balance: balance,
            type: type,
        currentPage: page,
        pages: Math.ceil(numOfProducts / perpage),
        numOfResults: numOfProducts,
        page_name: 'news',
        

      })
      // console.log(date)
        // console.log("news length",pages);
    } else {
      res.render('newscategories', {
        sess: req.session,
        news: secondQueryResult,
        imageurl,
            type: type,
        currentPage: page,
        pages: Math.ceil(numOfProducts / perpage),
        numOfResults: numOfProducts,
        page_name: 'news',
       
      })
     
      // console.log("news", news);
      //  console.log("news",news);
      // // console.log("news length",pages);
      // console.log("currentpage:", currentPage)
    }
  } else {
    //  console.log("news length",Math.ceil(numOfProducts / perpage));
    res.render('newscategories', {
      sess: req.session,
      news: secondQueryResult,
      imageurl,
          type: type,
      currentPage: page,
      pages: Math.ceil(numOfProducts / perpage),
      numOfResults: numOfProducts,
      page_name: 'news',
    
    })

     
  }



})
}