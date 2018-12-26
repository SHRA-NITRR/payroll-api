var express = require('express');
var app = express();
var assert = require('assert');
var bodyParser = require('body-parser');
var cors = require('cors');
var nodemailer = require('nodemailer');

app.set('port', (process.env.PORT || 8008));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var config = {
   user: 'sa', // update me
   password: '12345', // update me
   server: 'localhost',
   database: 'VYPAK'
}

var companyroute = require('./routes/company.js');
var branchroute = require('./routes/branch.js');

companyroute.configure(app,assert,config);
branchroute.configure(app, assert,config);

//LOCAL
//var url = "mongodb://localhost:27017/gst_app";

//WELCOME API
app.get('/', function (req, res) {
   res.send("WELCOME TO PAYROLL APP API'S");
});


app.listen(app.get('port'), function () {
   console.log('Node app is running on port', app.get('port'));
});