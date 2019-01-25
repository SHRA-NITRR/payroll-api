var express = require('express');
var app = express();
var assert = require('assert');
var bodyParser = require('body-parser');
var cors = require('cors');
var nodemailer = require('nodemailer');
var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');
var multer = require('multer');


app.set('port', (process.env.PORT || 8008));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//DATABASE CONNECTION SET UP

var config = {
   user: 'sa',
   password: '12345',
   server: 'localhost',
   database: 'VYPAK'
}

var companyroute = require('./routes/company.js');
var branchroute = require('./routes/branch.js');
var esigrouproute = require('./routes/esigroup.js');
var pfgroupoute = require('./routes/pfgroup.js');
var ptgroupoute = require('./routes/ptgroup.js');
var bankroute = require('./routes/bankmaster.js');
var pfsettingroute = require('./routes/pfsetting.js');
var retirementroute = require('./routes/retirement.js');
var salarystructureroute = require('./routes/salarystructure.js');
var graderoute = require('./routes/grade.js');
var holidayroute = require('./routes/holiday.js');
var leaveroute = require('./routes/leave.js');
var siteroute = require('./routes/site.js');
var workroute = require('./routes/workorder.js');
var pfesirateroute = require('./routes/pfesirate.js');
var qualificationroute = require('./routes/qualification.js');
var payheadroute = require('./routes/payheadmst.js');
var lumpsumroute = require('./routes/lumpsummst.js');


companyroute.configure(app, assert, config);
branchroute.configure(app, assert, config);
esigrouproute.configure(app, assert, config);
pfgroupoute.configure(app, assert, config);
ptgroupoute.configure(app, assert, config);
bankroute.configure(app, assert, config);
pfsettingroute.configure(app, assert, config);
retirementroute.configure(app, assert, config);
salarystructureroute.configure(app, assert, config);
graderoute.configure(app, assert, config);
holidayroute.configure(app, assert, config);
leaveroute.configure(app, assert, config);
siteroute.configure(app, assert, config);
workroute.configure(app, assert, config);
pfesirateroute.configure(app, assert, config);
qualificationroute.configure(app, assert, config);
payheadroute.configure(app, assert, config);
lumpsumroute.configure(app, assert, config);


//WELCOME API
app.get('/', function (req, res) {
   res.send("WELCOME TO PAYROLL APP API'S");
});


app.listen(app.get('port'), function () {
   console.log('Node app is running on port', app.get('port'));
});



var executeQuery = function (res, query) {
   sql.close();
   sql.connect(config, function (err) {
      if (err) {
         console.log("Error while connecting database :- " + err);
         res.send(err);
      }
      else {
         // create Request object
         var request = new sql.Request();
         // query to the database
         request.query(query, function (err, res) {
            if (err) {
               console.log("Error while querying database :- " + err);
               //res.send(err);
            }
            else {
               //res.send(res);
               //res.json({status:true});
            }
         });
      }
   });
}



//API FOR VIEW ALL COUNTRY

app.post('/viewallcountry', function (req, res) {
   //console.log(req);
   sql.connect(config, function () {
      var request = new sql.Request();

      var data_added = true;
      request.input('Operation', 'SELECT');

      request.execute('Proc_COUNTRY', function (err, recordsets, returnValue, affected) {
         if (err) {
            console.log(err);
            res.json({ status: false });
            sql.close();
            //data_added= false;
         }
         else {

            res.send(recordsets);
            sql.close();
         }
      });

   });
});



//API FOR VIEW ALL STATE

app.get('/viewallstate', function (req, res) {
   sql.close();
   sql.connect(config, function () {
      var request = new sql.Request();

      var data_added = true;
      request.input('Operation', 'SELECTBYID');
      //request.input('ID', req.body.id);//COUNTRY ID
      request.input('ID',101);//COUNTRY ID
      request.execute('Proc_State', function (err, rec) {
         if (err) {
            //console.log(err);
            res.json({ status: false });
            //data_added= false;
            sql.close();
         }
         else {
            res.json({ status: true, result: rec.recordsets[0] });
            sql.close();
         }
      });
   });
});



//API FOR VIEW ALL CITY

app.post('/viewallcity', function (req, res) {
   //console.log(req);
   sql.connect(config, function () {
      var request = new sql.Request();

      var data_added = true;
      request.input('Operation', 'SELECTBYID');
      request.input('ID', req.body.id);//STATE ID
      //request.input('Company_Person_Name', req.body.Company_Person_Name)
      request.execute('Proc_City', function (err, rec) {
         if (err) {
            console.log(err);
            res.json({ status: false })
            //data_added= false;
            sql.close();
         }
         else {
            
            res.json({ status: true, result: rec.recordsets[0] });
           
            sql.close();
         }
      });
   });
});















