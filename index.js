var express = require('express');
var app = express();
//var mongo = require('mongodb');
var assert = require('assert');
var bodyParser = require('body-parser');
var cors = require('cors');
//var ObjectID = require('mongodb').ObjectID;
var nodemailer = require('nodemailer');

app.set('port', (process.env.PORT || 8008));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//LOCAL
//var url = "mongodb://localhost:27017/gst_app";

//WELCOME API
app.get('/', function (req, res) {
   res.send("WELCOME TO PAYROLL APP API'S");
});

app.listen(app.get('port'), function () {
   console.log('Node app is running on port', app.get('port'));
});

var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');


var config = {
   user: 'sa', // update me
   password: '12345', // update me
   server: 'localhost',
   database: 'VYPAK'
}



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




app.post('/add_companydetails', function (req, res) {
   sql.connect(config, function () {
      var request = new sql.Request();
      var request2 = new sql.Request();
      request.input('Operation', 'INSERT');
      request.input('Company_Name', req.body.Company_Name);
      request.input('Company_Person_Name', req.body.Company_Person_Name)
      request.input('Company_Address', req.body.Company_Address);
      request.input('Company_Address2', req.body.Company_Address2);
      request.input('Company_PhoneNo', parseInt(req.body.Company_PhoneNo));
      request.input('Company_Website', req.body.Company_Website);
      request.input('Company_Email', req.body.Company_Email);
      request.input('Company_CINNo', req.body.Company_CINNo);
      request.input('Company_GSTNo', req.body.Company_GSTNo);
      request.input('Comapny_IsPF', req.body.Comapny_IsPF.toLowerCase() == 'true' ? true : false);
      request.input('Company_PFNo', req.body.Company_PFNo);

      request.input('Company_DBAFile_Code', req.body.Company_DBAFile_Code);

      request.input('Company_PF_Extn', req.body.Company_PF_Extn);

      request.input('Comapny_IsPFVol', req.body.Comapny_IsPFVol.toLowerCase() == 'true' ? true : false);

      request.input('Comapny_IsPFMultigrp', req.body.Comapny_IsPFMultigrp.toLowerCase() == 'true' ? true : false);

      request.input('Comapny_IsESI', req.body.Comapny_IsESI.toLowerCase() == 'true' ? true : false);

      request.input('Company_ESI_No', req.body.Company_ESI_No);

      request.input('Company_ESI_LocalOfc', req.body.Company_ESI_LocalOfc);

      request.input('Indv_Calculate_Emp_ESI', req.body.Indv_Calculate_Emp_ESI.toLowerCase() == 'true' ? true : false);

      request.input('Limit_ESI_Gross', req.body.Limit_ESI_Gross.toLowerCase() == 'true' ? true : false);

      request.input('Is_ESI_Multiple_Group', req.body.Is_ESI_Multiple_Group.toLowerCase() == 'true' ? true : false);

      request.input('Comapny_IsTDS', req.body.Comapny_IsTDS.toLowerCase() == 'true' ? true : false);

      request.input('Comapny_TanNo', req.body.Comapny_TanNo);

      request.input('Company_Type', req.body.Company_Type);

      request.input('Comapny_IsBonus', req.body.Comapny_IsBonus.toLowerCase() == 'true' ? true : false);

      request.input('Comapny_IsITR', req.body.Comapny_IsITR.toLowerCase() == 'true' ? true : false);

      request.input('Comapny_IsPT', req.body.Comapny_IsPT.toLowerCase() == 'true' ? true : false);

      request.input('Comapny_IsSupSalary', req.body.Comapny_IsSupSalary.toLowerCase() == 'true' ? true : false);

      request.input('Comapny_IsGratuity', req.body.Comapny_IsGratuity.toLowerCase() == 'true' ? true : false);

      request.input('Created_By', parseInt(req.body.Created_By));

     
      request.execute('PROC_COMPANY_DETAILS', function (err, recordsets, returnValue, affected) {
         if (err) {
            console.log(err);
            res.json({ status: false })
         }
         else {
            //res.end(JSON.stringify(recordsets)); // Result in JSON format
            res.json({ status: true });
            sql.close();
         }
      });



      //FOR BRANCH DATA INSERT
      // console.log(req.body.branch[0]);
      // req.body.branch = JSON.parse(req.body.branch);
      var branch2 = JSON.parse(req.body.branch);
      

      branch2.forEach(function (doc, err) {
         //assert.equal(null, err);
         userExists = true;
         var request2 = new sql.Request();
         request2.input('Operation', 'INSERT');

         request2.input('Branch_Name', doc.Branch_Name);

         request2.input('Branch_Address', doc.Branch_Address);

         request2.input('Branch_Address2', doc.Branch_Address2);

         request2.input('Branch_PhoneNo', parseInt(doc.Branch_PhoneNo));

         request2.input('Branch_Person_Name', doc.Branch_Person_Name);

         request2.input('Branch_Email', doc.Branch_Email);

      
         
         request2.execute('PROC_COMPANY_BRANCH', function (errr, recordsets, returnValue, affected) {
            if (errr) {
               console.log(errr);
               res.json({ status: false })
            }
            else {
               //res.end(JSON.stringify(recordsets)); // Result in JSON format
               //res.json({status:true});
               //sql.close();

            }
         })
        
      },function(){

      });

         

      });
})


// API FOR VIEW COMPANY DETAILS 
app.post('/view_company_details', function (req, res) {
   sql.connect(config, function () {
      var request = new sql.Request();
      request.input('Operation', 'SELECT');
      request.execute('PROC_COMPANY_DETAILS', function (err, result) {
         if (err) console.log(err);
         res.end(JSON.stringify(result)); // Result in JSON format
         //res.json({status:true,data:recordsets});
         sql.close();
      });

   });
})