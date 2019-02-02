var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');

module.exports = {
   configure: function (app, assert, config,connection) {

      //API FOR ADD LUMPSUM
      app.post('/addlumpsumdetails', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'INSERT');
            request.input('Created_By', parseInt(req.body.Created_By));
            request.input('Lumsum_Editor_Name',req.body.Lumsum_Editor_Name);
            request.input('Lumsum_Editor_Type',req.body.Lumsum_Editor_Type);
            request.input('Lumsum_Editor_Grade',parseInt(req.body.Lumsum_Editor_Grade));
            request.input('Lumsum_Editor_Amount',parseFloat(req.body.Lumsum_Editor_Amount));

            request.execute('Proc_Lumsum_Editor_Mst', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });   
               }
               else {
                  res.json({ status: true });   
               }
            });
         });
      
      //API FOR UPDATE LUMPSUM DETAILS
      app.post('/updatelumpsumdetails', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'UPDATE');
            request.input('Lumsum_Editor_Id', parseInt(req.body.id));//LUMPSUM ID
            request.input('Created_By', parseInt(req.body.Created_By));
            request.input('Lumsum_Editor_Name',req.body.Lumsum_Editor_Name);
            request.input('Lumsum_Editor_Type',req.body.Lumsum_Editor_Type);
            request.input('Lumsum_Editor_Grade',parseInt(req.body.Lumsum_Editor_Grade));
            request.input('Lumsum_Editor_Amount',parseFloat(req.body.Lumsum_Editor_Amount));

            request.execute('Proc_Lumsum_Editor_Mst', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });  
               }
               else {
                  res.json({ status: true }); 
               }
            });
         });

      //API FOR VIEW LUMPSUM DETAILS

      app.post('/viewlumpsumdetails', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation','SELECT');
            request.execute('Proc_Lumsum_Editor_Mst',function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });  
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0]}); 
               }
            });
         });

      //API FOR SEARCH LUMPSUM DETAILS

      app.post('/search_lumpsumdetails', function (req, res) {
         
         var request = new sql.Request(connection);
            request.input('Operation', 'SEARCH');
            //request.input('ID', req.body.id);
            request.input('OUT_CODE', parseInt(req.body.id));
            request.execute('Proc_Lumsum_Editor_Mst', function (err, rec) {
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
            request.input('Lumsum_Editor_Id', parseInt(req.body.id));//LUMPSUM ID

            request.execute('Proc_Lumsum_Editor_Mst', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });  
               }
               else {
                  res.json({ status: true, result: rec.recordset[0] });
               }
            });
         });
      
      //API FOR DELETE LUMPSUM DETAILS

      app.post('/delete_lumpsumdetails',function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation','DELETE');
            request.input('Lumsum_Editor_Id', parseInt(req.body.id));//LUMPSUM ID

            request.execute('Proc_Lumsum_Editor_Mst',function (err, rec) {
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