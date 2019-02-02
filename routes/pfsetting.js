var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');


module.exports = {
   configure: function (app, assert, config,connection) {

      //API FOR ADD PF SETTING DETAILS
      app.post('/addpfsettingdetails', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'INSERT');
            request.input('Effective_From', req.body.Effective_From);
            request.input('PFSett_Age', parseInt(req.body.PFSett_Age));
            request.input('Created_By', parseInt(req.body.Created_By));

            request.execute('Proc_PFsetting_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
                  }
               else {
                  res.json({ status: true, result: rec.recordsets[0] });  
               }
            });
         });

 //API FOR UPDATE PF SETTING DETAILS
 app.post('/updatepfsettingdetails', function (req, res) {
   var request = new sql.Request(connection);
      request.input('Operation', 'UPDATE');
      request.input('Effective_From', req.body.Effective_From);
      request.input('PFSett_Age', parseInt(req.body.PFSett_Age));
      request.input('Created_By', parseInt(req.body.Created_By));
      request.input('PFSetting_Id', parseInt(req.body.id));// PFSetting_Id
      
      request.execute('Proc_PFsetting_MST', function (err, rec) {
         if (err) {
            console.log(err);
            res.json({ status: false }); 
         }
         else {
            res.json({ status: true, result: rec.recordsets[0] });  
         }
      });
   });

      //API FOR VIEW ALL PF SETTING DETAILS
      app.post('/viewpfsettingdetails', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'SELECT');
            request.execute('Proc_PFsetting_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });  
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0] });  
               }
            });
         });

 //API FOR VIEW ALL PF SETTING DETAILS

 app.post('/view_single_pfsettingdetails', function (req, res) {
   var request = new sql.Request(connection);
      request.input('Operation', 'SELECTBYID');
      request.input('PFSetting_Id', req.body.id);// PFSetting_Id
     
      request.execute('Proc_PFsetting_MST', function (err, rec) {
         if (err) {
            console.log(err);
            res.json({ status: false });  
         }
         else {
            res.json({ status: true, result: rec.recordsets[0] }); 
         }
      });
   });

      //API FOR SEARCH PF SETTING DETAILS BY PF ID

      app.post('/search_pfsettingdetails', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'SEARCH');
            request.input('OUT_CODE', parseInt(req.body.id));// PF SETTING ID
            request.execute('Proc_PFsetting_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
               }
               else {
                  // var a= rec.recordsets[0][1].Effective_From;
                  // var b =a.toString()
                  res.json({ status: true, result:rec.recordsets[0] }); 
               }
            });
         });

 //API FOR DELETE PF SETTING DETAILS

 app.post('/delete_pfsetting_details', function (req, res) {
   var request = new sql.Request(connection);
      request.input('Operation','DELETE');
      request.input('PFSetting_Id',req.body.id);//PF SETTING ID

      request.execute('Proc_PFsetting_MST', function (err, rec) {
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