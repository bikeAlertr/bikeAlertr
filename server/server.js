const express = require('express');
const cookieParser = require('cookie-parser');
// const axios = require('axios');

const app = express();
const path = require('path');

const apiRouter = require('./routes/api');

// ------------------------------------------------------------------
// Parse cookies & save to req.cookies
app.use(cookieParser());
// Parse urlencoded body content & save to req.body
app.use(express.urlencoded({ extended: true }));
// ------------------------------------------------------------------

// ------------------------ STATIC FILES ----------------------------
// Handle Requests for static files
app.use('/assets', express.static(path.join(__dirname,'../src/assets')));
// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));
// -------------------------------------------------------------------

// --------------------- OAUTH ROUTE HANDLING ------------------------
// -------------------------------------------------------------------

// ------------------------ PUBLIC ROUTES ----------------------------
// *** LOGIN PAGE HANDLING ***************
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../src/index.html'));
});
// ***************************************
// *** SIGNUP PAGE HANDLING **************
app.get('/signup', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../src/index.html'));
});
// ****************************************
// -------------------------------------------------------------------

// ---------------------- AUTHORIZED ROUTES --------------------------
// serve dashboard.html on the route '/'
app.get('/dashboard', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../src/index.html'));
});
// -------------------------------------------------------------------

// -------------- Route Handling for requests to /api ----------------
app.use('/api', apiRouter);
// -------------------------------------------------------------------

// ---------------------- 404 HANDLING -------------------------------
 app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});
// -------------- GLOBAL ERROR HANDLING ------------------------------
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});
// -------------------------------------------------------------------


// listening on port 3000 -> http://localhost:3000/
app.listen(3000, () => console.log('Server Running'));

module.exports = app;