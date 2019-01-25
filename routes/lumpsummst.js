var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');

module.exports = {
   configure: function (app, assert, config) {

      sql.close();
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


      //API FOR ADD LUMPSUM
      app.post('/addlumpsumdetails', function (req, res) {
         //console.log(req);
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();
            var request2 = new sql.Request();
            var data_added = true;
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
                  sql.close();
               }
               else {
                  res.json({ status: true });
                  //res.json({ status: true, result:rec.recordsets[0]});
                  sql.close();
               }
            });
         });
      });


      //API FOR UPDATE LUMPSUM DETAILS
      app.post('/updatelumpsumdetails', function (req, res) {
         //console.log(req);
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();
            var request2 = new sql.Request();
            var data_added = true;
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
                  sql.close();
               }
               else {
                  res.json({ status: true });
                  sql.close();
               }
            });
         });
      });

      //API FOR VIEW LUMPSUM DETAILS

      app.post('/viewlumpsumdetails', function (req, res) {
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();
            var data_added = true;
            request.input('Operation','SELECT');
            request.execute('Proc_Lumsum_Editor_Mst',function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
                  sql.close();
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0]});
                  sql.close();
               }
            });
         });
      });


      //API FOR SEARCH LUMPSUM DETAILS

      app.post('/search_lumpsumdetails', function (req, res) {
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();
            var data_added = true;
            request.input('Operation', 'SEARCH');
            //request.input('ID', req.body.id);
            request.input('OUT_CODE', parseInt(req.body.id));
            request.execute('Proc_Lumsum_Editor_Mst', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
                  sql.close();
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0] });
                  sql.close();
               }
            });
         });
      });

      //API FOR VIEW SINGLE QUALIFICATION DETAILS

      app.post('/view_single_qualification', function (req, res) {
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();
            var data_added = true;
            request.input('Operation', 'SELECTBYID');
            request.input('Lumsum_Editor_Id', parseInt(req.body.id));//LUMPSUM ID

            request.execute('Proc_Lumsum_Editor_Mst', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
                  sql.close();
               }
               else {
                  res.json({ status: true, result: rec.recordset[0] });
                  sql.close();
               }
            });
         });
      });
      
      //API FOR DELETE LUMPSUM DETAILS

      app.post('/delete_lumpsumdetails',function (req, res) {
         //console.log(req);
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();
            var data_added = true;
            request.input('Operation','DELETE');
            request.input('Lumsum_Editor_Id', parseInt(req.body.id));//LUMPSUM ID

            request.execute('Proc_Lumsum_Editor_Mst',function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
                  sql.close();
               }
               else {
                  res.json({ status: true });
                  sql.close();
               }
            });
         });
      });
   }
}