
var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');


module.exports = {
   configure: function (app, assert, config) {


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




      //API FOR ADD PT GROUP
      app.post('/addptgroup', function (req, res) {
         //console.log(req);
         sql.connect(config, function () {
            var request = new sql.Request();

            var data_added = true;
            request.input('Operation', 'INSERT');

            request.input('PTGroup_Id', parseInt(req.body.PTGroup_Id));
            request.input('State_Id', parseInt(req.body.State_Id));
            request.input('Certificate_No', req.body.Certificate_No);
            request.input('PTO_No', req.body.PTO_No);

            request.input('PT_Address', req.body.PT_Address);
            request.input('Return_Period', req.body.Return_Period);
            request.input('Created_By', parseInt(req.body.Created_By));
            // request.input('Modified_By', parseInt(req.body.Modified_By));
            // request.input('Is_Deleted', req.body.Is_Deleted.toLowerCase() == 'true' ? true : false);
            // request.input('Modified_On',req.body.Modified_On);

            request.execute('Proc_PTGROUP_MST', function (err, recordsets, returnValue, affected) {
               if (err) {
                  console.log(err);
                  res.json({ status: false })
                  //data_added= false;
               }
               else {
                  //res.end(JSON.stringify(recordsets)); // Result in JSON format
                  //res.json({ status: true });
                  res.json({ status: true, result: recordsets });
                  sql.close();
               }
            });
         });
      });

      //API FOR VIEW PT GROUP

      app.post('/viewallptgroup', function (req, res) {
         //console.log(req);
         sql.connect(config, function () {
            var request = new sql.Request();

            var data_added = true;
            request.input('Operation', 'SELECT');
            //request.input('ID', req.body.id);
            //request.input('Company_Person_Name', req.body.Company_Person_Name)
            request.execute('Proc_PTGROUP_MST', function (err, recordsets, returnValue, affected) {
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
   }
}