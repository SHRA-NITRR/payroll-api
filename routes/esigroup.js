
var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');


module.exports = {
   configure: function (app, assert, config,connection) {
      //API FOR ADD ESI
      app.post('/addesigroup', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'INSERT');
            request.input('ESIGroup_Id', parseInt(req.body.ESIGroup_Id));
            request.input('ESI_No', req.body.ESI_No);
           
            request.input('ESI_Local_Office', req.body.ESI_Local_Office);
            request.input('Address', req.body.Address);
            request.input('Is_Limit_ESI_Gross', req.body.Is_Limit_ESI_Gross.toLowerCase() == 'true' ? true : false);
            request.input('Is_Individual_Calc', req.body.Is_Individual_Calc.toLowerCase() == 'true' ? true : false);
            request.input('Created_By', parseInt(req.body.Created_By));
            request.input('ESIGroup_Name', req.body.ESIGroup_Name);

            request.execute('Proc_ESIGROUP_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0] });
               }
            });
         });

      //API FOR UPDATE ESI DETAILS
      app.post('/updateesigroup', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'UPDATE');
            request.input('ESIGroup_Id', parseInt(req.body.ESIGroup_Id));
            request.input('ESI_No', req.body.ESI_No);
            request.input('ESI_Local_Office', req.body.ESI_Local_Office);
            request.input('Address', req.body.Address);
            request.input('Is_Limit_ESI_Gross', req.body.Is_Limit_ESI_Gross.toLowerCase() == 'true' ? true : false);
            request.input('Is_Individual_Calc', req.body.Is_Individual_Calc.toLowerCase() == 'true' ? true : false);
            request.input('Created_By', parseInt(req.body.Created_By));
            request.input('ESIGroup_Name', req.body.ESIGroup_Name);

            request.execute('Proc_ESIGROUP_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false })
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0] });
               }
            });
         });

      //API FOR VIEW ESI GROUP
      app.post('/viewallesigroup', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'SELECT');
            request.execute('Proc_ESIGROUP_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false })
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0] });
               }
            });
         });
      
      //API FOR SEARCH ESIGROUP DETAILS
      app.post('/search_esi_details', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'SEARCH');
            request.input('OUT_CODE', parseInt(req.body.esigroupid));
            request.execute('Proc_ESIGROUP_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0] });
               }
            });
         });

      //API FOR VIEW SINGLE  ESI DETAILS
      app.post('/view_single_esi_details', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'SELECTBYID');
            request.input('ESIGroup_Id', req.body.id);// ESI GROUP ID

            request.execute('Proc_ESIGROUP_MST', function (err, rec) {
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

      //API FOR DELETE ESI DETAILS
      app.post('/delete_esi_details', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'DELETE');
            request.input('ESIGroup_Id', req.body.id);//ESI GROUP ID

            request.execute('Proc_ESIGROUP_MST', function (err, rec) {
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