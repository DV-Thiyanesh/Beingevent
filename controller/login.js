
const User = require('../models/User.js');
var funcs = require('../functions');
const wallet = require('../utils/wallet');
const encrypt = require('../utils/crypto');
const decrypt =require('../utils/crypto')
const contactus = require('../models/contactus.js');
var config = require('config');



module.exports = function (app) {
  app.get('/profile', function (req, res) {

      sess = req.session;
     var page_name;
            
      if(funcs.isEmpty(sess.user)) {
            res.redirect('/signin');
       } else {
         message =  sess.message;

         curr_url = (typeof req.query!='undefined' && typeof req.query['flag']!='undefined')?req.query['flag']:0;
         
         var referral = 0;
         if(typeof sess.user.referral!='undefined' && sess.user.referral!=''){
            referral = sess.user.referral;
         }

         User.findById(req.session.user["_id"], (err, user) => {

          User.findOne({_id:referral}, (err, referred_data) => {

            var userID = req.session.user["_id"];

              var user_lastname = '';
              if(typeof req.session.user.lastname!='undefined' && req.session.user.lastname!=''){
                  user_lastname= " " +req.session.user.lastname
              }
              if(sess.user.address){
              var self =this;
              const smartContrat = self.web3.eth.contract(self.abi).at(contractAddress);
              const balance = smartContrat.balanceOf(req.session.user.address) / 1e18;
              // console.log(balance,"balance")
              res.render('profile', {
                 layout: false,
                   sidebar : true,
                   user: user,
                   referral:referral,
                   name: req.session.user.firstname +user_lastname,
                   firstname: req.session.user.firstname,
                   lastname: user_lastname,
                   email: req.session.user.email,
                   useraddress: req.session.user.useraddress,
                   city: req.session.user.city,
                   country: req.session.user.country,
                   phone:req.session.user.mobileNo,
                   state:req.session.user.state,
                   zip:req.session.user.zip,
                   current_url:curr_url,
                   balance:balance,
                   page_name:'home',
                 
              });
              // console.log("atfer profile:",referral);
            }else{
               res.render('profile', {
                 layout: false,
                   sidebar : true,
                   user: user,
                   referral:referral,
                   name: req.session.user.firstname +user_lastname,
                   firstname: req.session.user.firstname,
                   lastname: user_lastname,
                   email: req.session.user.email,
                   useraddress: req.session.user.useraddress,
                   city: req.session.user.city,
                   country: req.session.user.country,
                   phone:req.session.user.mobileNo,
                   state:req.session.user.state,
                   zip:req.session.user.zip,
                   current_url:curr_url,
                   page_name:'home',
                 
                 
              });
            }
        
        })
         })
    }
  });

app.post('/profile', function (req, res) {
  sess = req.session;
  if(funcs.isEmpty(sess.user)) {
      res.redirect('/signin');
  } else {
    var referred_code = 0;
		if(typeof req.body.referred_by!='undefined' && req.body.referred_by!=''){
			referred_code = req.body.referred_by.trim();
		}
		


    var firstname   = req.body.firstname.trim();
    var lastname    = req.body.lastname.trim();
    var useraddress    = req.body.address.trim();
   
    var city        = req.body.city.trim();
    var state       = req.body.state.trim();
    var zip         = req.body.zip.trim();
    var country     = req.body.country.trim();
    var phone_no    = req.body.phone.trim();


		//Start :: validation
		if(typeof req.body.firstname=='undefined' || firstname==''){
			req.flash('error', 'Firstname is required');
			 return res.redirect('/profile');
		}

    if(firstname.length>40){
        req.flash('error', 'Firstname allow maximum 40 characters.');
        return res.redirect('/profile');
    }

    if(!funcs.inputSanitize(firstname)) {
      req.flash('error', 'Firstname allow alpha-numeric characters.');
       return res.redirect('/profile');
    }

    if(typeof req.body.lastname=='undefined' || lastname==''){
      req.flash('error', 'Lastname is required');
       return res.redirect('/profile');
    }

    if(lastname.length>40){
        req.flash('error', 'Lastname allow maximum 40 characters.');
        return res.redirect('/profile');
    }

    if(!funcs.inputSanitize(lastname)) {
      req.flash('error', 'Lastname allow alpha-numeric characters.');
       return res.redirect('/profile');
    }

		if(typeof req.body.address=='undefined' || useraddress==''){
			req.flash('error', 'Address is required');
			 return res.redirect('/profile');
		}

    if(!funcs.addressSanitize(useraddress)) {
      req.flash('error', 'address allow only alpha-numeric and pre-defined special characters. (_./:;,#&-)');
       return res.redirect('/profile');
    }

    if(phone_no!=''){
      if(phone_no.length>17){
          req.flash('error', 'Please enter correct phone number (maximum length 17 & allowed characters +.- 0-9 integers)');
          return res.redirect('/profile');
      }
      
      var isValid = false;
      var regex = /^[0-9+.-]*$/;
      isValid = regex.test(phone_no);
      if(!isValid){
          req.flash('error', 'Please enter correct phone number (maximum length 17 & allowed characters +.- 0-9 integers)');
          return res.redirect('/profile');
      }
    }
    

		if(typeof req.body.city=='undefined' || city==''){
			req.flash('error', 'City is required');
			 return res.redirect('/profile');
		}
		if(typeof req.body.state=='undefined' ||state==''){
			req.flash('error', 'State is required');
			 return res.redirect('/profile');
		}
		if(typeof req.body.zip=='undefined' || zip==''){
			req.flash('error', 'Zipcode is required');
			 return res.redirect('/profile');
		}
		if(typeof req.body.country=='undefined' || req.body.country.trim()==''){
			req.flash('error', 'Country is required');
			 return res.redirect('/profile');
		}
		
	
	
	User.findOne({referral: referred_code }, (err, referred_data) => {
      var referral='';
     
      if((typeof referred_data=='undefined' || err || referred_data==null) && referred_code!=0){
          req.flash('error', 'Invalid referral code!');
          return res.redirect('/profile');
      }
	  else if(referred_data!=null && referred_data.id==sess.user["_id"] && referred_code!=0){
		req.flash('error', 'Sorry, You can not use your own referral code.');
		return res.redirect('/profile');
	  }else {
        if(typeof referred_data != 'undefined' && referred_data!=null){
          if(typeof referred_data.id!='undefined' && referred_data.id!=''){
            referral      = referred_data.id;

         

          }
        }
		  

      var firstname   = req.body.firstname.trim();
      var lastname    = req.body.lastname.trim();
      var useraddress    = req.body.address.trim();
      var city        = req.body.city.trim();
      var state       = req.body.state.trim();
      var zip         = req.body.zip.trim();
      var country     = req.body.country.trim();

         
          User.findById(req.session.user["_id"], (err, user) => {
                user["firstname"]   = firstname;
                user["lastname"]    = lastname;
                user["useraddress"]    = useraddress;
             
                user["city"]        = city;
                user["state"]       = state;

                //for kyc update flag
               var check_identity=0;
               var is_second_identity=0;
               var is_both_identity=0;
               var verify_email=0;
      			   var verify_address=0;
      			   var verify_kyc_upload=0;

               if(typeof user!='undefined'){
                  if(typeof user.email!='undefined' && user.email!=''){
                    if(typeof user.is_verify_email!='undefined' && user.is_verify_email==1){
                      verify_email=1;
                    }
                  }

                 


                  if(typeof user!='undefined' && typeof user.useraddress!='undefined' && user.useraddress.trim()!=''){
					           verify_address=1;
                  }else if(typeof req.body.address!='undefined' && req.body.address.trim()==''){
					           verify_address=1;
				          }

                
				  
                
				        }

                if(referral!=''){
                  user["referral"] =  referral;
                }
              

                user["country"] = country;
                user["zip"] = zip;
                user["mobileNo"] = req.body.phone;
                user['updated_at']=Date.now();

              
                                                  
                sess.user = user;
              
              user.save((err, usr) => {
                if (err) { console.log(err); throw err.message;}

                req.flash('success', 'Data Saved successfully');
                return res.redirect('/profile');
                });
            });
          }
      });
   }
})

app.post('/change-password', function(req, res, next) {
  var password = (typeof req.body!='undefined' && typeof req.body.password!='undefined' && req.body.password.trim()!='')?req.body.password.trim():'';
  var cur_password = (typeof req.body!='undefined' && typeof req.body.current_password!='undefined' && req.body.current_password.trim()!='')?req.body.current_password.trim():'';
  
  if(cur_password==''){
    req.flash('error', 'Current Password is require');
   
  }

  if(password==''){
      req.flash('error', 'Password is require');
    //  return res.json({
    //       status:'Error',
    //       msg:'Password is require'
    //   });
  }

  sess = req.session;
  var uid = sess.user["_id"];
  var mongoose = require('mongoose');
  var user_id = new mongoose.Types.ObjectId(uid);

  User.findOne({_id:user_id}, (errUser, userFound) => {
    if(errUser){
      console.log("change error")
      req.flash('error', 'Something went wrong,Please try again');
     
    }
    if(userFound){
      // console.log("change success1")
      userFound.comparePassword(cur_password, (passwordErr, isMatch) => {
              if (passwordErr) { throw passwordErr; }
              if (!isMatch) {
                 req.flash('error', 'Incorrect current password, please try again..');
                  // return res.json({
                  //   status:'Error',
                  //   msg:'Incorrect current password, please try again..'
                  // });
                  
               
              } else {
                userFound.password = password;
                userFound.save((err) => {
                  
                if (err) { console.log(err); throw err.message;}


                	//send change password mail
	              
	             
	             

	                  // console.log("change success1 success")
                      req.flash('success', 'Password change successfully');
                      return res.redirect('/signin');
                  //  return res.json({
                     
                  //     status:'OK',
                  //     msg:'Password change successfully'
                  // });
              }); 
            }
      });
    }else{
       req.flash('error', 'Sorry, User not found');
     
    }
  });
});

app.get('/signin', function (req, res) {
// console.log("signin");
      res.render('signin', {
               pageTitle: 'Welcome - ' ,
                  layout: false             
           });
   
  });

app.get('/signup', function (req, res) {

    res.render('signup', {
      pageTitle: 'Welcome - ',
      layout: false
    });
  });

app.get('/referralsignup', function (req, res) {

      res.render('referralsignup', {
               pageTitle: 'Welcome - ' ,
                  layout: false ,
                  referral: req.query.referral         
           });
  
  });

app.post("/signin", function (req, res) {
    sess = req.session;
    var email = req.body.email;
    var password = req.body.password;

    const userData = {
      email: email.trim(),
      password: password.trim()
    };

      if(!req.body.email ) {
              req.flash('error', 'Enter a Valid Email address');
              return res.redirect('/signin');
            }
            if(!req.body.password) {
              req.flash('error', 'Password should not be Empty.')
              return res.redirect('/signin');
            }

    // find a user by email address
    User.findOne({ email: userData.email }, (err, user) => {
      // console.log ("user...", user);

      if (err) { throw err; }

      if (!user) {
              req.flash('error', 'User details is not found for this email, please register....');
              return res.redirect('/signin');

      }

      // check if a hashed user's password is equal to a value saved in the database
       user.comparePassword(userData.password, (passwordErr, isMatch) => {
         if (err) { throw err; }
      if(user.status == 'Suspended') {
                            req.flash('error', 'Your Account is Suspended. please contact the admin');
                            return res.redirect('/signin');
                          }
              
             
      if(user.status != 'Active') {
                            req.flash('error', 'Your Account is Not Verified. please Verify');
                            return res.redirect('/signin');
                          }



        if (!isMatch) {

              req.flash('error', 'Incorrect email or password, please try again..');
              return res.redirect('/signin');

        } else {


          sess.user = user;
          // console.log("after signin session",sess.user);
          req.flash('success', 'Login successful');
          res.redirect("/eventica");
        } 
      });
    });
  });

app.post("/signup",  function (req, res) {
  var async = require('async');
  var crypto = require('crypto');

  async.waterfall([
    function(done) {
      // console.log(done,"done")
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token,done){
      sess = req.session;
      var crypto = require('crypto');
      var email     = req.body.email;
      var password     = req.body.password;
      var repeatpassword   = req.body.repeatpassword;
      var firstname     = req.body.firstname;
      var lastname     = req.body.lastname;
      var country =req.body.country;
    

      const userData = req.body;
      
 
          userData['activationToken'] = token;
      
          // console.log(userData);
          const newUser = new User(userData);

               if (password != repeatpassword){
                     req.flash('error', 'Password and Confirm password are not same....');
                     return res.redirect('/signup'); 
               }
               var isValid = false;
      var regex = /^[a-zA-Z]+$/;
      isValid = regex.test(firstname);
      if(!isValid){
          req.flash('error', 'Please Enter valid firstname');
          return res.redirect('/signup');
      }
         var regex = /^[a-zA-Z]+$/;
      isValid = regex.test(lastname);
      if(!isValid){
          req.flash('error', 'Please Enter valid last name');
          return res.redirect('/signup');
      }
               
           User.findOne({ email: req.body.email }, (errUser, userFound) => {
               if (errUser){
                     req.flash('error', 'Sign up...error, please try again...');
                     return res.redirect('/signup'); 
               }
               if (userFound) {
                         req.flash('error', 'User account exists for this email address, reset password if you forgot the password');
                          return res.redirect('/signup');
                }
                else{
                  let account = wallet.createWallet();
                
                  let seed = encrypt.encrypt(req.body.password, account.seed);
                  // console.log(seed,"seed")
                  newUser.address = account.address;
                  newUser.seed = seed;
                  newUser.save((err) => {
                  if (err) { console.log(err); throw err.message;}
                  // console.log("sign up")
                      sess.user = newUser;
                      done(err,token)
                    
            }); // save
        } // if user found
      }); //findUser
    },
    function(token,done){
             const sgMail = require('@sendgrid/mail');
              
              sgMail.setApiKey("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");
              var activationlink = 'https://'+req.headers.host + '/activateEmail/' + token
         
              var msg = {
                to: req.body.email,
                from: "contact@beingevent.com",
                subject: 'Activation Email',
                html: `<div>
                <b style="font-weight:normal" >
                   <p  ">Dear ${req.body.firstname} ${req.body.lastname}</span></p>
                   <p  ><span ">You have just registered an account on </span><span "><a href="https://beingevent.com/">Beingevent.com</a></span><span "><br ></span><span >Your account will get activated and you will be able to login once you confirm your email id by visiting the link below:</span></p>
                   <br>
                   <p  ><span ><a href="${activationlink}">Click here to verify your email address.</a></span></p>
                   <br>
                   <p ><span >For enquiries or to request support with your account, please send an email to: </span><span ><a href="mailto:contact@beingevent.com" target="_blank">contact@beingevent.com</a></span><span > </span></p>
                   <br>
                   <p  ><span >Thanks,</span></p>
                   <p ><span >Being Event</span></p>
                </b>
                <br>    
                <br>
             </div>`
              };

              sgMail.send(msg);
              
              var message = 'Activation e-mail has been sent to ' + req.body.email + ' with further instructions.';
              req.flash('info', message);
             return res.redirect('/signin');
    }
  ],function(err){
    if(err) return next (err);
    res.redirect('/signin')
  })
}); // signup 

  
app.post("/referralsignup",  function (req, res) {
  var async = require('async');
  var crypto = require('crypto');

  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token,done){
      sess = req.session;
      var crypto = require('crypto');
      var email     = req.body.email;
      var password     = req.body.password;
      var repeatpassword   = req.body.repeatpassword;
      var firstname     = req.body.firstname;
      var lastname     = req.body.lastname;
      var referral = req.body.referral;

      const userData = req.body;
      
 
          userData['activationToken'] = token;
      
          // console.log(userData);
          const newUser = new User(userData);

               if (password != repeatpassword){
                     req.flash('error', 'Password and Confirm password are not same....');
                     return res.redirect('/referralsignup'); 
               }

                 var isValid = false;
      var regex = /^[a-zA-Z]+$/;
      isValid = regex.test(firstname);
      if(!isValid){
          req.flash('error', 'Please Enter valid first name');
          return res.redirect('/signup');
      }
         var regex = /^[a-zA-Z]+$/;
      isValid = regex.test(lastname);
      if(!isValid){
          req.flash('error', 'Please Enter valid last name');
          return res.redirect('/signup');
      }
           User.findOne({ email: req.body.email }, (errUser, userFound) => {
               if (errUser){
                     req.flash('error', 'Sign up...error, please try again...');
                     return res.redirect('/referralsignup'); 
               }
               if (userFound) {
                         req.flash('error', 'User account exists for this email address, reset password if you forgot the password');
                          return res.redirect('/referralsignup');
                }
                else{
 let account = wallet.createWallet();
                  // console.log("account",account)
                  let seed = encrypt.encrypt(req.body.password, account.seed);
                
                  newUser.address = account.address;
                  newUser.seed = seed;
                
                  newUser.save((err) => {
                  if (err) { console.log(err); throw err.message;}
                  // console.log("sign up")
                      sess.user = newUser;
                      done(err,token)
                    
            }); // save
        } d
      });
    },
    function(token,done){
             const sgMail = require('@sendgrid/mail');
              
              sgMail.setApiKey("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");
              var activationlink = req.headers.host + '/activateEmail/' + token
              
              var msg = {
                to: req.body.email,
                from: "contact@beingevent.com",
                subject: 'Activation Email',
                html: `<div>
                <b style="font-weight:normal" >
                   <p  ">Dear ${req.body.firstname} ${req.body.lastname}</span></p>
                   <p  ><span ">You have just registered an account on </span><span "><a href="https://beingevent.com/">Beingevent.com</a></span><span "><br ></span><span >Your account will get activated and you will be able to login once you confirm your email id by visiting the link below:</span></p>
                   <br>
                   <p  ><span ><a href="${activationlink}">Click here to verify your email address.</a></span></p>
                   <br>
                   <p ><span >For enquiries or to request support with your account, please send an email to: </span><span ><a href="mailto:contact@beingevent.com" target="_blank">contact@beingevent.com</a></span><span > </span></p>
                   <br>
                   <p  ><span >Thanks,</span></p>
                   <p ><span >Being Event</span></p>
                </b>
                <br>    
                <br>
             </div>`
              };

              sgMail.send(msg);
              // console.log("Email sent...",msg)
              var message = 'Activation e-mail has been sent to ' + req.body.email + ' with further instructions.';
              req.flash('info', message);
             return res.redirect('/signin');
    }
  ],function(err){
    if(err) return next (err);
    res.redirect('/signin')
  })
}); // signup 


app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
  });

app.get('/forgot', function (req, res, next) {

    res.render('forgot', {
      user: req.session.user,
      name: "",
      layout: false
    });

  });




app.post('/forgot', function (req, res, next) {
    // console.log(req.body);

    var async = require('async');
    var crypto = require('crypto');

    async.waterfall([
      function (done) {
        crypto.randomBytes(20, function (err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function (token, done) {
        User.findOne({ email: req.body.email }, function (err, user) {
          if (!user) {
            req.flash('error', 'No account with that email address exists.');
            return res.redirect('/forgot');
          }

          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

          user.save(function (err) {
           
            done(err, token, user);
          });
        });
      },
      function (token, user, done) {
      
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey("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");
        const msg = {
          to: req.body.email,
          from: 'contact@beingevent.com',
          subject: 'Request for password reset',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'https://' + req.headers.host + '/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n',
        };

        sgMail.send(msg);
    
        message = 'An e-mail has been sent to ' + req.body.email + ' with further instructions.';
        req.flash('info', message);
      
        return res.redirect('/forgot');
      }
    ], function (err) {
      if (err) return next(err);
      res.redirect('/forgot');
    });
  });



  app.get('/reset', function (req, res) {
    res.render('reset', {
      user: req.user,
      name: "",
      layout: false
    });
  });


app.get('/reset/:token', function(req, res) {
  var async = require('async');
  var crypto = require('crypto');

      

 User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {

    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    res.render('reset', {
      user: req.user,
      name: "",
      layout: false,
      token: req.params.token
    });
  });
});

 app.post('/reset/:token', function (req, res) {
  
    var async = require('async');
    var crypto = require('crypto');
    var token = req.params.token;

    
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
          
         
          if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/forgot');
          
          }

          user.password = req.body.password;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;

          user.save(function (err, user) {
            if (!user) {
               req.flash('error', 'Password reset token is invalid or has expired.');
          

            } else {
              
              req.flash('success', 'Password changed successfully, login using new password...');
             
              

              
            }

          });
      
    
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey("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");

        var msg = {
          to: user.email,
          from: 'contact@beingevent.com',
          subject: 'Password Changed',
          text: 'Hello\t'+user.firstname+user.lastname+',\n\n' +
            'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
        };
      
        sgMail.send(msg);
      
        req.flash('success', 'Success! Your password has been changed., login using new password...');
        return res.redirect('/signin');
   

   
  });

  });








app.get('/activateEmail/:token', function(req, res) {
  var async = require('async');
  var crypto = require('crypto');

      // console.log("Token...", req.params.token);

 User.findOne({ activationToken: req.params.token }, function(err, user) {
 
    if (!user) {
      req.flash('error', 'activation token is invalid or has expired.');
      return res.redirect('/signin');
    }else{
      user.activationToken ="";
       user.status="Active";
     
      user.save(function(err,user){
       
        req.flash('success','Your Email is Verified Successfully.')
        return res.redirect('/signin');

      })
      
    }
   
  });
});

app.post('/contactus',function(req, res){
// console.log("contact",req.body);
 if(typeof req.body.email==undefined || req.body.from_email==''){
		 req.flash('error', 'email is required');
			 return res.redirect('/');
	  }
	  if(typeof req.body.name==undefined || req.body.name==''){
	req.flash('error', 'name is required');
			 return res.redirect('/');
	  }
	  if(typeof req.body.message==undefined || req.body.message==''){
		req.flash('error', 'message is required');
			 return res.redirect('/');
	  }
 contactus.findOne({ email: req.body.email}, function(err,email_data) {
		if(err){
		 console.log(error);
		}else if(!email_data){
			var userData    = {};
			userData.email  = req.body.email;
			userData.name  = req.body.name;
      userData.message  = req.body.message;
      userData.mobile = req.body.number;
			userData.status = 1;
			const newUser   = new contactus(userData);
			newUser.save((err) => {
				if (err) {
				 console.log(error);
				}
      
			 
			});
     
		}else{
			email_data.status = 1;
			email_data.name  = req.body.name;
			email_data.message  = req.body.message;
			email_data.save((err) => {
			if (err) { console.log(err); throw err.message;}
		
    
			
			});

		}
	});
const sgMail = require('@sendgrid/mail');
              
              sgMail.setApiKey("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");
           
              var msg = {
                to: req.body.email,
                from: "contact@beingevent.com",
                subject: 'Thank you for getting in touch!',
                html: `<div>
                <b style="font-weight:normal" >
                   <p  ">Dear ${req.body.name}</span></p>
                     <b>Thank you for getting in touch!</b></p>
                  
                   <br>
                   <p  ><span >We appreciate you contacting us about
                                                                        beingevent. One of our team member will get back
                                                                        to you.</span></p>
                   <br>
                   <p ><span >For enquiries or to request support with your account, please send an email to: </span><span ><a href="mailto:contact@beingevent.com" target="_blank">contact@beingevent.com</a></span><span > </span></p>
                   <br>
                   <p  ><span >Best Wishes,</span></p>
                   <p ><span >Beingevent Team</span></p>
                </b>
                <br>    
                <br>
             </div>`
              };

              sgMail.send(msg);

              const sgMail1 = require('@sendgrid/mail');
              
              sgMail1.setApiKey("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");
           
              var msg1 = {
                to: "contact@beingevent.com",
                from: req.body.email,
                subject: 'Contactus Query',
                html: `<div>
                <b style="font-weight:normal" >
                   <p  ">Dear Beingevent Team</span></p>
                   
              
                   <p  ><span >You have received the Query from ${req.body.name}</span></p>
                   
                   <p ><span >${req.body.message} </span></p>
                   <br>
                
                          </div>`
              };

              sgMail1.send(msg1);






              // console.log("Email sent...",msg)
              var message = 'Message has been sent. Thank you for getting in touch! We appreciate you contacting us about beingevent. One of our team member will get back to you.';
              req.flash('success', message);
             return res.redirect('/contactus');

   
    })




}







