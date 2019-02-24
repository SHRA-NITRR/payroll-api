
var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');


module.exports = {
   configure: function (app, assert, config, connection) {

      //API FOR ADD PT GROUP
      app.post('/addptgroup', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'INSERT');
         request.input('State_Id', parseInt(req.body.State_Id));
         request.input('Certificate_No', req.body.Certificate_No);
         request.input('PTO_No', req.body.PTO_No);
         request.input('PTGroup_Name', req.body.PTGroup_Name);
         request.input('PT_Address', req.body.PT_Address);
         request.input('Return_Period', req.body.Return_Period);
         request.input('Created_By', parseInt(req.body.Created_By));

         request.execute('Proc_PTGROUP_MST', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               res.json({ status: true, result: rec.recordsets[0] });
            }
         });
      });

      //API FOR UPDATE PT GROUP
      app.post('/updateptgroup', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'UPDATE');
         request.input('PTGroup_Id', parseInt(req.body.PTGroup_Id));
         request.input('State_Id', parseInt(req.body.State_Id));
         request.input('Certificate_No', req.body.Certificate_No);
         request.input('PTO_No', req.body.PTO_No);
         request.input('PT_Address', req.body.PT_Address);
         request.input('Return_Period', req.body.Return_Period);
         request.input('Created_By', parseInt(req.body.Created_By));
         request.input('PTGroup_Name', req.body.PTGroup_Name);

         request.execute('Proc_PTGROUP_MST', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               res.json({ status: true, result: rec.recordsets[0] });
            }
         });
      });

      //API FOR VIEW PT GROUP

      app.post('/viewallptgroup', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'SELECT');
            request.execute('Proc_PTGROUP_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0] });
               }
            });
         });

      //API FOR SEARCH PTGROUP DETAILS

      app.post('/search_pt_details', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'SEARCH');
            request.input('OUT_CODE', parseInt(req.body.ptgroupid));
            request.execute('Proc_PTGROUP_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0] });
               }
            });
         });
      
      //API FOR VIEW SINGLE  PT DETAILS

      app.post('/view_single_pt_details', function (req, res) {
         var request = new sql.Request(connection);

            request.input('Operation', 'SELECTBYID');
            request.input('PTGroup_Id', req.body.id);// PT GROUP ID
            request.execute('Proc_PTGROUP_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
               }
               else {
                  //res.end(JSON.stringify(recordsets)); // Result in JSON format
                  res.json({ status: true, result: rec.recordset[0] });
               }
            });
         });
      
      //API FOR DELETE PT DETAILS

      app.post('/delete_pt_details', function (req, res) {
         var request = new sql.Request(connection);

            request.input('Operation', 'DELETE');
            request.input('PTGroup_Id', req.body.id);//PT GROUP ID
            request.execute('Proc_PTGROUP_MST', function (err, rec) {
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