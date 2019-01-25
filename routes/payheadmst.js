var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');

module.exports = {
   configure: function (app, assert, config) {

      sql.close();
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

      //API FOR ADD PAYHEAD DETAILS
      app.post('/addpayheaddetails', function (req, res) {
         //console.log(req);
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();
            var request2 = new sql.Request();
            var data_added = true;
            request.input('Operation', 'INSERT');
            request.input('PayHead_Name',req.body.PayHead_Name);
            request.input('PayHead_Type',req.body.PayHead_Type);
            request.input('PayHead_Category',req.body.PayHead_Category);
            request.input('Use_For_Gratuity',req.body.Use_For_Gratuity);
            request.input('Use_For_NetPay',req.body.Use_For_NetPay);
            request.input('Contribute_by',req.body.Contribute_by);
            request.input('Created_By', parseInt(req.body.Created_By));
            
            request.execute('Proc_PayHead_Mst', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
                  sql.close();
               }
               else {
                  res.json({ status: true });
                  //res.json({ status: true, result:rec.recordsets[0]});
                  sql.close();
               }
            });
         });
      });

      //API FOR UPDATE PAYHEAD DETAILS
      app.post('/updatepayheaddetails', function (req, res) {
         //console.log(req);
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();
            var request2 = new sql.Request();
            var data_added = true;
            request.input('Operation', 'UPDATE');
            request.input('PayHead_Name',req.body.PayHead_Name);
            request.input('PayHead_Type',req.body.PayHead_Type);
            request.input('PayHead_Category',req.body.PayHead_Category);
            request.input('Use_For_Gratuity',req.body.Use_For_Gratuity);
            request.input('Use_For_NetPay',req.body.Use_For_NetPay);
            request.input('Contribute_by',req.body.Contribute_by);
            request.input('Created_By', parseInt(req.body.Created_By));
            request.input('PayHead_Id', parseInt(req.body.id));//PAYHEAD ID

            request.execute('Proc_PayHead_Mst', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
                  sql.close();
               }
               else {
                  res.json({ status: true });
                  sql.close();
               }
            });
         });
      });

      //API FOR VIEW ALL PAYHEAD DETAILS

      app.post('/viewallpayhead', function (req, res) {
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();
            var data_added = true;
            request.input('Operation','SELECT');
            request.execute('Proc_PayHead_Mst',function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
                  sql.close();
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0]});
                  sql.close();
               }
            });
         });
      });

      //API FOR SEARCH PAYHEAD DETAILS

      app.post('/search_payheaddetails', function (req, res) {
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();
            var data_added = true;
            request.input('Operation', 'SEARCH');
            //request.input('ID', req.body.id);
            request.input('OUT_CODE', parseInt(req.body.id));
            request.execute('Proc_PayHead_Mst', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
                  sql.close();
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0] });
                  sql.close();
               }
            });
         });
      });

      //API FOR VIEW SINGLE PAYHEAD DETAILS

      app.post('/view_single_payhead', function (req, res) {
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();
            var data_added = true;
            request.input('Operation', 'SELECTBYID');
            request.input('PayHead_Id', parseInt(req.body.id));//PAYHEAD ID

            request.execute('Proc_PayHead_Mst', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
                  sql.close();
               }
               else {
                  res.json({ status: true, result: rec.recordset[0] });
                  sql.close();
               }
            });
         });
      });
      
      //API FOR DELETE PAYHEAD DETAILS

      app.post('/delete_payhead',function (req, res) {
         //console.log(req);
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();
            var data_added = true;
            request.input('Operation','DELETE');
            request.input('PayHead_Id', parseInt(req.body.id));//PAYHEAD ID

            request.execute('Proc_PayHead_Mst',function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
                  sql.close();
               }
               else {
                  res.json({ status: true });
                  sql.close();
               }
            });
         });
      });
   }
}