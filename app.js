const express = require("express");
const UserRoute=require('./routes/UserRoute');
const app = express();
const path = require('path');
const router = express.Router();
//use his to get theCurrent URL o the Route
app.use(express.urlencoded({ extended: true }));
//Use this to get the JSon data as a POST request For Various Operation
app.use(express.json({ extended: true }));



// app.set('view engine','pug')
// app.set('views',path.join(__dirname,'views'))

//User route Will handle All The User related Request!
app.use('/users',UserRoute)

module.exports = app;
