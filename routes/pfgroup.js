var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');


module.exports = {
   configure: function (app, assert, config,connection) {

      //API FOR ADD PF GROUP
      app.post('/addpfgroup', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'INSERT');
            request.input('PF_No', req.body.PF_No);
            request.input('DBA_File_Code', req.body.DBA_File_Code);
            request.input('File_Extension', req.body.File_Extension);
            request.input('Address', req.body.Address);
            request.input('Created_By', parseInt(req.body.Created_By));
            request.input('PFGroup_Name',req.body.PFGroup_Name);

            request.execute('Proc_PFGROUP_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
               }
               else {
                  res.json({ status: true });        
               }
            });
         });

      //API FOR UPDATE PF GROUP
      app.post('/updatepfgroup', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'UPDATE');
            request.input('PFGroup_Id', parseInt(req.body.PFGroup_Id));
            request.input('PF_No', req.body.PF_No);
            request.input('DBA_File_Code', req.body.DBA_File_Code);
            request.input('File_Extension', req.body.File_Extension);
            request.input('Address', req.body.Address);
            request.input('Created_By', parseInt(req.body.Created_By));
            request.input('PFGroup_Name',req.body.PFGroup_Name);

            request.execute('Proc_PFGROUP_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
               }
               else {
                  res.json({ status: true });
               }
            });
         });

      //API FOR VIEW ESI GROUP
      app.post('/viewpfgroup', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'SELECT');
            request.execute('Proc_PFGROUP_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0] }); 
               }
            });
         });

      //API FOR SEARCH PFGROUP DETAILS
      app.post('/search_pf_details', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'SEARCH');
            request.input('OUT_CODE', parseInt(req.body.pfgroupid));
            request.execute('Proc_PFGROUP_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0] });
               }
            });
         });

      //API FOR VIEW SINGLE PF DETAILS
      app.post('/view_single_pf_details', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'SELECTBYID');
            request.input('PFGroup_Id', req.body.id);// PF GROUP ID
            request.execute('Proc_PFGROUP_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });  
               }
               else {
                  res.json({ status: true, result: rec.recordset[0] }); 
               }
            });
         });

      //API FOR DELETE PF DETAILS

      app.post('/delete_pf_details', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'DELETE');
            request.input('PFGroup_Id', req.body.id);//PFGROUP GROUP ID

            request.execute('Proc_PFGROUP_MST', function (err, rec) {
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