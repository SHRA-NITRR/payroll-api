var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');

module.exports = {
   configure: function (app, assert, config,connection) {

      //API FOR ADD PAYHEAD DETAILS
      app.post('/addpayheaddetails', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'INSERT');
            request.input('PayHead_Name',req.body.PayHead_Name);
            request.input('PayHead_Type',req.body.PayHead_Type);
            request.input('PayHead_Category',req.body.PayHead_Category);
            request.input('Use_For_Gratuity',req.body.Use_For_Gratuity);
            request.input('Use_For_NetPay',req.body.Use_For_NetPay);
            request.input('Contribute_by',req.body.Contribute_by);
            request.input('Created_By', parseInt(req.body.Created_By));
            request.input('payhead_inslip',req.body.payhead_inslip);

            request.execute('Proc_PayHead_Mst', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });  
               }
               else {
                  res.json({ status: true });    
               }
            });
         });
   
      //API FOR UPDATE PAYHEAD DETAILS
      app.post('/updatepayheaddetails', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'UPDATE');
            request.input('PayHead_Name',req.body.PayHead_Name);
            request.input('PayHead_Type',req.body.PayHead_Type);
            request.input('PayHead_Category',req.body.PayHead_Category);
            request.input('Use_For_Gratuity',req.body.Use_For_Gratuity);
            request.input('Use_For_NetPay',req.body.Use_For_NetPay);
            request.input('Contribute_by',req.body.Contribute_by);
            request.input('Created_By', parseInt(req.body.Created_By));
            request.input('PayHead_Id', parseInt(req.body.id));//PAYHEAD ID
            request.input('payhead_inslip',req.body.payhead_inslip);

            request.execute('Proc_PayHead_Mst', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
               }
               else {
                  res.json({ status: true });
               }
            });
         });

      //API FOR VIEW ALL PAYHEAD DETAILS

      app.post('/viewallpayhead', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation','SELECT');
            request.execute('Proc_PayHead_Mst',function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0]});  
               }
            });
         });

      //API FOR SEARCH PAYHEAD DETAILS

      app.post('/search_payheaddetails', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'SEARCH');
            //request.input('ID', req.body.id);
            request.input('OUT_CODE', parseInt(req.body.id));
            request.execute('Proc_PayHead_Mst', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });  
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0] });  
               }
            });
         });

      //API FOR VIEW SINGLE PAYHEAD DETAILS

      app.post('/view_single_payhead', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'SELECTBYID');
            request.input('PayHead_Id', parseInt(req.body.id));//PAYHEAD ID

            request.execute('Proc_PayHead_Mst', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
               }
               else {
                  res.json({ status: true, result: rec.recordset[0] }); 
               }
            });
         });
      
      //API FOR DELETE PAYHEAD DETAILS
      app.post('/delete_payhead',function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation','DELETE');
            request.input('PayHead_Id', parseInt(req.body.id));//PAYHEAD ID

            request.execute('Proc_PayHead_Mst',function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });   
               }
               else {
                  res.json({ status: true });   
               }
            });
         });
   }
}
