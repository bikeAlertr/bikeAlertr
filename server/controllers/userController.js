const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../models/stationModels');

const userController = {};

// ADD USER TO DATABASE
userController.signUp = async (req, res, next) => {
  // Using destructuring, create const Username and Password with the values from req.body
  const { firstname, password, email, address1, address2, zip_code, phone } = req.body;
  // Create a const named salt assigned the value of the bcrypt.genSaltSync with a salt of 10
  // const salt = bcrypt.genSaltSync(10);
  // const hash = bcrypt.hashSync(password, salt);
  console.log(req.body);
  
  
  // let addressQuery = `INSERT INTO "public"."address" (address1, address2, zip_code, phone) 
  // VALUES ('${address1}', '${address2}', '${zip_code}', '${phone}');`;
  // res.locals = await db.query(addressUpQuery);

  // let getAddressIdQuery = `SELECT address_id FROM "public"."address" WHERE phone='${phone}';`;
  // let address_id = await db.query(getAddressIdQuery);
  
  // let signUpQuery = `INSERT INTO "public"."users" (first_name, password, email, address_id) 
  // VALUES ('${firstname}', '${password}', '${email}', '${address_id}';`;
  // res.locals = await db.query(signUpQuery);
  
};




module.exports = userController;