
var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');

module.exports = {
   configure: function (app, assert, config,connection) {

      //API FOR ADD PT RATE EDITOR
      app.post('/addptrateeditor', function (req, res) { 
         var request = new sql.Request(connection);
            request.input('Operation', 'INSERT');
            request.input('PTGroup_Id', parseInt(req.body.PTGroup_Id));
            request.input('Effective_From', new Date(req.body.Effective_From));
            request.input('Minimum_Amount', parseFloat(req.body.Minimum_Amount));
            request.input('Maximum_Amount', parseFloat(req.body.Maximum_Amount));
            request.input('PT_Rate', parseFloat(req.body.PT_Rate));
            request.input('Created_By', parseInt(req.body.Created_By));
            request.execute('Proc_PTRATE_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });  
               }
               else {       
                  res.json({ status: true, result: rec.recordsets[0] });  
               }
            });
         });

      //API FOR UPDATE PTRATE EDITOR 
      app.post('/updateptrateeditor', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'UPDATE');
            request.input('PTRate_Id', parseInt(req.body.id));//PT RATE ID
            request.input('PTGroup_Id', parseInt(req.body.PTGroup_Id));
            request.input('Effective_From', new Date(req.body.Effective_From));
            request.input('Minimum_Amount', parseFloat(req.body.Minimum_Amount));
            request.input('Maximum_Amount', parseFloat(req.body.Maximum_Amount));
            request.input('PT_Rate', parseFloat(req.body.PT_Rate));
            request.input('Created_By', parseInt(req.body.Created_By));
            request.execute('Proc_PTRATE_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false }); 
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0] }); 
               }
            });
         });

      //API FOR VIEW PT RATE EDITOR

      app.post('/viewallptrateeditor', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'SELECT');
            request.execute('Proc_PTRATE_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false }); 
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0] });
               }
            });
         });

      //API FOR SEARCH PTRATE DETAILS

      app.post('/search_ptrate_details', function (req, res) {
          var request = new sql.Request(connection);
            request.input('Operation', 'SEARCH');
            request.input('OUT_CODE', parseInt(req.body.id));//PT RATE ID
            request.execute('Proc_PTRATE_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });  
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0] });  
               }
            });
         });

      //API FOR VIEW SINGLE  PTRATE DETAILS

      app.post('/view_single_ptrate_details', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'SELECTBYID');
            request.input('PTRate_Id', req.body.id);// PT GROUP ID

            request.execute('Proc_PTRATE_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });      
               }
               else {
                  res.json({ status: true, result: rec.recordset[0] });
               }
            });
         });
      
      //API FOR DELETE PT RATE DETAILS

      app.post('/delete_ptrate_details', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'DELETE');
            request.input('PTRate_Id', req.body.id);//PT RATE ID
            request.execute('Proc_PTRATE_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });   
               }
               else {
                  res.json({ status: true })  
               }
            });
         });
   }
}