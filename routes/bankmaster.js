var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');


module.exports = {
   configure: function (app, assert, config, connection) {

      //API FOR ADD BANK DETAILS
      app.post('/addbankdetails', function (req, res) {
         //console.log(req);4
         var request = new sql.Request(connection);
         request.input('Operation', 'INSERT');
         request.input('Bank_Name', req.body.Bank_Name);
         request.input('Bank_Sht_Name', req.body.Bank_Sht_Name);
         request.input('BankAccNo', req.body.BankAccNo);
         request.input('Address', req.body.Address);
         request.input('Branch_Name', req.body.Branch_Name);
         request.input('IFSC_Code', req.body.IFSC_Code);
         request.input('Pin_No', parseInt(req.body.Pin_No));
         request.input('Phone_No', req.body.Phone_No);
         request.input('Created_By', parseInt(req.body.Created_By));
         request.execute('Proc_BANK_MST', function (err, rec) {
            if (err) {
               res.json({ status: false })
            }
            else {
               res.json({ status: true, result: rec.recordsets[0] });
            }
         });
      });

      //API FOR UPDATE BANK DETAILS
      app.post('/updatebankdetails', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'UPDATE');
         request.input('Bank_Name', req.body.Bank_Name);
         request.input('Bank_Sht_Name', req.body.Bank_Sht_Name);
         request.input('BankAccNo', req.body.BankAccNo);
         request.input('Address', req.body.Address);
         request.input('Branch_Name', req.body.Branch_Name);
         request.input('IFSC_Code', req.body.IFSC_Code);
         request.input('Pin_No', parseInt(req.body.Pin_No));
         request.input('Phone_No', req.body.Phone_No);
         request.input('Created_By', parseInt(req.body.Created_By));
         request.input('Bank_Id', parseInt(req.body.id));//BANK ID

         request.execute('Proc_BANK_MST', function (err, rec) {
            if (err) {
               res.json({ status: false });
            }
            else {
               res.json({ status: true, result: rec.recordsets[0] });
            }
         });
      });

      //API FOR VIEW ALL BANKS DETAILS
      app.post('/viewallbankdetails', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'SELECT');
            request.execute('Proc_BANK_MST', function (err, rec) {
               if (err) {
                  res.json({ status: false })
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0] });
               }
            });
         });
      

      //API FOR VIEW SINGLE BANK DETAILS

      app.post('/view_single_bank_details', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'SELECTBYID');
            request.input('Bank_Id', req.body.id);// BANK ID

            request.execute('Proc_BANK_MST', function (err, rec) {
               if (err) {
                  res.json({ status: false })
               }
               else {
                  res.json({ status: true, result: rec.recordset[0] });
               }
            });
         });

      //API FOR SEARCH BANK DETAILS BY BANK ID

      app.post('/search_bank_details', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'SEARCH');
            //request.input('ID', req.body.id);
            request.input('OUT_CODE', parseInt(req.body.id));
            request.execute('Proc_BANK_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0] });
               }
            });
         });

      //API FOR DELETE BANK DETAILS
      app.post('/delete_bank_details', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'DELETE');
            request.input('Bank_Id', req.body.id);//BANK ID

            request.execute('Proc_BANK_MST', function (err, rec) {
               if (err) {
                  res.json({ status: false });
               }
               else {
                  res.json({ status: true });
               }
            });
         });
      
   }
}