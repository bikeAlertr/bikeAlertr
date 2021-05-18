import { NextFunction } from "express-serve-static-core";
import {Request, Response} from 'express';

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const axios = require('axios');

const app = express();
const path = require('path');

// -----------------------------------------------------
// Parse cookies & save to req.cookies
app.use(cookieParser());
// Parse urlencoded body content & save to req.body
app.use(bodyParser.urlencoded({ extended: true }));
// ------------------------------------------------------

// ------------------------ STATIC FILES ----------------------------
// Handle Requests for static files
app.use('/assets', express.static(path.join(__dirname,'../src/assets')))
// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));
// -------------------------------------------------------------------

// --------------------- OAUTH ROUTE HANDLING ------------------------
// -------------------------------------------------------------------

// ------------------------ PUBLIC ROUTES --------------------------
// *** LOGIN PAGE HANDLING ***************

// ***************************************
// *** SIGNUP PAGE HANDLING **************

// ****************************************
// -------------------------------------------------------------------

// ---------------------- AUTHORIZED ROUTES --------------------------
// serve dashboard.html on the route '/'
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../src/index.html'))
});
// -------------------------------------------------------------------

// -------------- Route Handling for requests to /api ---------------
// app.use('/api', apiRouter);
// -------------------------------------------------------------------


// ---------------------- 404 HANDLING --------------------------
 app.use('*', (req: Request, res: Response) => {
  res.status(404).send('Not Found');
});
// -------------- GLOBAL ERROR HANDLING --------------------------
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});
// -------------------------------------------------------------------


// listening on port 3000 -> http://localhost:3000/
app.listen(3000, () => console.log('Server Running'));

module.exports = app;