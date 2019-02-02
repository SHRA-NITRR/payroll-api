var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');

module.exports = {
   configure: function (app, assert, config,connection) {

      //API FOR ADD QUALIFICATION
      app.post('/addqualification', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'INSERT');
            request.input('Created_By', parseInt(req.body.Created_By));
            request.input('Qualification_Name',req.body.Qualification_Name);

            request.execute('Proc_Qualfication_Master', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false }); 
               }
               else {
                  res.json({ status: true });
               }
            });
         });

      //API FOR UPDATE QUALIFICATION
      app.post('/updatequalification', function (req, res) {
          var request = new sql.Request(connection);
            request.input('Operation', 'UPDATE');
            request.input('Qualification_Id', parseInt(req.body.id));
            request.input('Qualification_Name',req.body.Qualification_Name);

            request.execute('Proc_Qualfication_Master', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });   
               }
               else {
                  res.json({ status: true });  
               }
            });
         });

      //API FOR VIEW QUALIFICATION

      app.post('/viewqualification', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation','SELECT');
            request.execute('Proc_Qualfication_Master',function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false }); 
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0]}); 
               }
            });
         });

      //API FOR SEARCH QUALIFICATION DETAILS

      app.post('/search_qualification', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'SEARCH');
            //request.input('ID', req.body.id);
            request.input('OUT_CODE', parseInt(req.body.id));
            request.execute('Proc_Qualfication_Master', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
                  
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0] });
                  
               }
            });
         });

      //API FOR VIEW SINGLE QUALIFICATION DETAILS

      app.post('/view_single_qualification', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'SELECTBYID');
            request.input('Qualification_Id', req.body.id);// QUALIFICATION ID

            request.execute('Proc_Qualfication_Master', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false }); 
               }
               else {
                  res.json({ status: true, result: rec.recordset[0] });  
               }
            });
         });
      
      //API FOR DELETE QUALIFICATION DETAILS

      app.post('/delete_qualification',function (req, res) {

         var request = new sql.Request(connection);
            request.input('Operation','DELETE');
            request.input('Qualification_Id',req.body.id);//QUALIFICATION ID
            request.execute('Proc_Qualfication_Master',function (err, rec) {
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