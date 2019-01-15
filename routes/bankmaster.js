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

      //API FOR ADD BANK DETAILS
      app.post('/addbankdetails', function (req, res) {
         //console.log(req);4
         sql.connect(config, function () {
            var request = new sql.Request();

            var data_added = true;

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

            // request.input('Modified_By', parseInt(req.body.Modified_By));
            // request.input('Is_Deleted', req.body.Is_Deleted.toLowerCase() == 'true' ? true : false);
            // request.input('Modified_On',req.body.Modified_On);

            request.execute('Proc_BANK_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false })
                  //data_added= false;
               }
               else {
                  //res.end(JSON.stringify(recordsets)); // Result in JSON format
                  //res.json({ status: true });
                  res.json({ status: true, result: rec.recordsets[0] });
                  sql.close();
               }
            });
         });
      });

 //API FOR UPDATE BANK DETAILS
 app.post('/updatebankdetails', function (req, res) {
   //console.log(req);4
   sql.connect(config, function () {
      var request = new sql.Request();

      var data_added = true;

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

      // request.input('Modified_By', parseInt(req.body.Modified_By));
      // request.input('Is_Deleted', req.body.Is_Deleted.toLowerCase() == 'true' ? true : false);
      // request.input('Modified_On',req.body.Modified_On);

      request.execute('Proc_BANK_MST', function (err, rec) {
         if (err) {
            console.log(err);
            res.json({ status: false });          
         }
         else {
            res.json({ status: true, result: rec.recordsets[0] });
            sql.close();
         }
      });
   });
});

      //API FOR VIEW ALL BANKS DETAILS

      app.post('/viewallbankdetails', function (req, res) {
         //console.log(req);
         sql.connect(config, function () {
            var request = new sql.Request();

            var data_added = true;
            request.input('Operation', 'SELECT');
            //request.input('ID', req.body.id);
            //request.input('Company_Person_Name', req.body.Company_Person_Name)
            request.execute('Proc_BANK_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false })
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0] });
                  sql.close();
               }
            });
         });
      });

 //API FOR VIEW SINGLE BANK DETAILS

 app.post('/view_single_bank_details', function (req, res) {

   sql.connect(config, function () {
      var request = new sql.Request();
      var data_added = true;

      request.input('Operation', 'SELECTBYID');
      request.input('Bank_Id', req.body.id);// BANK ID

      request.execute('Proc_BANK_MST', function (err, rec) {
         if (err) {
            console.log(err);
            res.json({ status: false })
         }
         else {
            res.json({ status: true, result: rec.recordset[0] });
            sql.close();
         }
      });
   });
});

      //API FOR SEARCH BANK DETAILS BY BANK ID

      app.post('/search_bank_details', function (req, res) {
         //console.log(req);
         sql.connect(config, function () {
            var request = new sql.Request();

            var data_added = true;
            request.input('Operation', 'SEARCH');
            //request.input('ID', req.body.id);
            request.input('OUT_CODE', parseInt(req.body.bankid));
            request.execute('Proc_BANK_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false })
                  //data_added= false;
               }
               else {
                  
                  res.json({ status: true, result: rec.recordsets[0] });
                  
                  sql.close();
               }
            });
         });
      });
 //API FOR DELETE BANK DETAILS

 app.post('/delete_bank_details', function (req, res) {
   //console.log(req);
   sql.connect(config, function () {
      var request = new sql.Request();

      var data_added = true;
      request.input('Operation', 'DELETE');
      request.input('Bank_Id', req.body.id);//BANK ID

      request.execute('Proc_BANK_MST', function (err, rec) {
         if (err) {
            console.log(err);
            res.json({ status: false })
            //data_added= false;
         }
         else {
            //res.end(JSON.stringify(recordsets)); // Result in JSON format
            res.json({ status: true });
            //res.send(recordsets);
            sql.close();
         }
      });
   });
});
   }
}