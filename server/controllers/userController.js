const axios = require('axios');
const bcrypt = require('bcryptjs');
const { isConditionalExpression } = require('typescript');

const db = require('../models/bikersdbModels');

const userController = {};

// // ADD USER TO DATABASE
userController.signUp = async (req, res, next) => {
  try {
    console.log(req.body)
    // Using destructuring, create const Username and Password with the values from req.body
    const { firstname, password, email, address1, address2, zip_code, phone, city } = req.body;
    // Create a const named salt assigned the value of the bcrypt.genSaltSync with a salt of 10
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    console.log('this is zip_code', typeof(zip_code), zip_code)
    // create query to check if input email exists
    let emailQuery = `SELECT email FROM "public"."users" WHERE email='${email}'`;
    const emailCheck = await db.query(emailQuery);

    if (emailCheck.rowCount === 0) {
      // create query to insert address information inputed by user into address table
      console.log(typeof(zip_code));
      let addressQuery = `INSERT INTO "public"."address" (address1, address2, zip_code, phone, city) 
      VALUES ('${address1}', '${address2}', '${zip_code}', '${phone}', '${city}');`;
      // store query into res.locals
      res.locals = await db.query(addressQuery);
      console.log('this is res.locals', res.locals);
      // create query to find primary-key: address_id from addresss table to store as foreign-key in users table
      let getAddressIdQuery = `SELECT address_id FROM "public"."address" WHERE phone='${phone}';`;
      let address_id_query = await db.query(getAddressIdQuery);
      // store actual address_id value from previous query
      const address_id = await address_id_query.rows[0].address_id
      // console.log('address_id:',address_id);

      // create query to store user information into user tablel with address_id as foregin key
      let signUpQuery = `INSERT INTO "public"."users" (first_name, password, email, address_id) 
      VALUES ('${firstname}', '${hash}', '${email}', '${address_id}');`;
      res.locals = await db.query(signUpQuery);
      
      // create a query to find the userId and store userid into res.locals.userid
      let userIDQuery = `SELECT user_id FROM "public"."users" WHERE email='${email}'`;
      const queryUser = await db.query(userIDQuery);
      res.locals.user_id = queryUser.rows[0].user_id
      console.log('the res.locals.user is: ', res.locals.user_id);

      next()
    } else {
      console.log('invalid email')
      res.locals = "Invalid email";
      next();
    }
  }
  catch{
    console.log('error here')
    next()
  }
};

// VERIFY USER INFORMATION IN DB
userController.login = async (req, res, next) => {
  // deconstruct inputed email and password from request body
  const { email, password } = req.body;
  // create query to check if email exists
  let emailQuery = `SELECT * FROM "public"."users" WHERE email='${email}'`
  // run query and store into variable
  const verifyEmail = await db.query(emailQuery)
  console.log(verifyEmail.rowCount)

  try{
  // check if there exists a row with the given email
  if(verifyEmail.rowCount > 0){
    console.log('verified')
    // create querty to to find password that belongs to inputed email
    let passwordQuery = `SELECT password FROM "public"."users" WHERE email='${email}'`
    // call query and store into variable
    const userPasswordQuery = await db.query(passwordQuery)
    console.log(userPasswordQuery.rows[0].password)
    // extract password value from previous query into a variable
    const userPassword = userPasswordQuery.rows[0].password
    // bcrypt inputed password and compare to bcrypt password in the database
    const verified = bcrypt.compareSync(password, userPassword);
    console.log(verified)
    console.log('body pass:', password)
    // check if the bcrypted passwords match
    if (verified){ 
      // store email data from user table in response object at property email 
      res.locals.email = verifyEmail;

      // store foreign_id : address_id from user table and store it in a variable
      let address_id = verifyEmail.rows[0].address_id
      console.log('id:',address_id)
      // create querty to find row with primary-Key: address_id from user table foreign key
      let addressQuery = `SELECT * FROM "public"."address" WHERE address_id='${address_id}'`
      const addressResponse = await db.query(addressQuery)
      // store addrss data from address table in response object at property: address
      res.locals.address = addressResponse

      // create a query to find the userId and store userid into res.locals.userid
      let userIDQuery = `SELECT user_id FROM "public"."users" WHERE email='${email}'`;
      const queryUser = await db.query(userIDQuery);
      res.locals.user_id = queryUser.rows[0].user_id
      console.log('the res.locals.user is: ', res.locals.user_id);

      console.log("you have been loged in! :")
  }else{
    console.log('wrong email and password combination!')
  }
}else{
    console.log('not valid')
  }
next()
  }
  catch{
    next(err)
  }
}

// CHECK IF USER IS ALREADY LOGED-IN
userController.isLoggedIn = async (req, res, next) => {
  
  if (!req.cookies.ssid) {
    res.locals.username = null;
    return next();
  } else {
    // console.log('we are here')
    try {
      // create query to find if req.cookies.ssid === to the userid
      let cookieQuery = `SELECT * FROM "public"."users" WHERE user_id='${req.cookies.ssid}'`;
      const clientCookie = await db.query(cookieQuery);
      if (clientCookie.rowCount === 1){
        res.locals.email = clientCookie.rows[0].email;
        // console.log(res.locals.email);
        return next();
      }
    } catch {
      console.log('error finding cookie ssid')
      next();
    }
  }
}

// setSSIDCookie - middleware to store the user id in a cookie ----------------------------
userController.setSSIDCookie = (req, res, next) => {
  // console.log('The res.locals in userController is: ', res.locals);
  res.cookie('ssid', res.locals.user_id, { httpOnly: true });
  res.locals.ssid = res.locals.user_id
  console.log("this is our locals ssid: ", res.locals.ssid)
  return next();
}



module.exports = userController;