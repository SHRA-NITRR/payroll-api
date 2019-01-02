var express = require('express');
var app = express();
var assert = require('assert');
var bodyParser = require('body-parser');
var cors = require('cors');
var nodemailer = require('nodemailer');
var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');

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
var esigrouproute = require('./routes/esigroup.js');
var pfgroupoute = require('./routes/pfgroup.js');
var ptgroupoute = require('./routes/ptgroup.js');

companyroute.configure(app,assert,config);
branchroute.configure(app, assert,config);
esigrouproute.configure(app,assert,config);
pfgroupoute.configure(app, assert,config);
ptgroupoute.configure(app, assert,config);

//LOCAL
//var url = "mongodb://localhost:27017/gst_app";

//WELCOME API
app.get('/', function (req, res) {
   res.send("WELCOME TO PAYROLL APP API'S");
});


app.listen(app.get('port'), function () {
   console.log('Node app is running on port', app.get('port'));
});



var executeQuery = function (res, query) {
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
      //request.input('Company_Name', req.body.Company_Name);

           //request.input('Company_Person_Name', req.body.Company_Person_Name)
      request.execute('Proc_COUNTRY', function (err, recordsets, returnValue, affected) {
         if (err) {
            console.log(err);
            res.json({ status: false })
            //data_added= false;
         }
         else {
            //res.end(JSON.stringify(recordsets)); // Result in JSON format
            //res.json({ status: true });
            res.send(recordsets);
            sql.close();        
   }
   });

      //FOR BRANCH DATA INSERT
      //console.log(req.body.branch[0]);
      //req.body.branch = JSON.parse(req.body.branch);
   });
});



//API FOR VIEW ALL STATE

app.post('/viewallstate', function (req, res) {
   //console.log(req);
      sql.connect(config, function () {
         var request = new sql.Request();
        
         var data_added = true;
         request.input('Operation', 'SELECTBYID');
         request.input('ID', req.body.id);
   
              //request.input('Company_Person_Name', req.body.Company_Person_Name)
         request.execute('Proc_State', function (err, recordsets, returnValue, affected) {
            if (err) {
               console.log(err);
               res.json({ status: false })
               //data_added= false;
            }
            else {
               //res.end(JSON.stringify(recordsets)); // Result in JSON format
               //res.json({ status: true });
               res.send(recordsets);
               sql.close();        
      }
      });   
      });
   });



   //API FOR VIEW ALL STATE

app.post('/viewallcity', function (req, res) {
   //console.log(req);
      sql.connect(config, function () {
         var request = new sql.Request();
        
         var data_added = true;
         request.input('Operation', 'SELECTBYID');
         request.input('ID', req.body.id);
              //request.input('Company_Person_Name', req.body.Company_Person_Name)
         request.execute('Proc_City', function (err, recordsets, returnValue, affected) {
            if (err) {
               console.log(err);
               res.json({ status: false })
               //data_added= false;
            }
            else {
               //res.end(JSON.stringify(recordsets)); // Result in JSON format
               //res.json({ status: true });
               res.send(recordsets);
               sql.close();         
      }
      });
      });
   });


   












   