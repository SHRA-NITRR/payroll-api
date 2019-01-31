
var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');

module.exports = {
   configure: function (app, assert, config) {

      var executeQuery = function (res, query) {
         sql.close();
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


      //API FOR ADD PT RATE EDITOR
      app.post('/addptrateeditor', function (req, res) {
         sql.close();
         //console.log(req);
         sql.connect(config, function () {
            var request = new sql.Request();
            var data_added = true;
            request.input('Operation', 'INSERT');
            request.input('PTGroup_Id', parseInt(req.body.PTGroup_Id));
            request.input('Effective_From', req.body.Effective_From);
            request.input('Minimum_Amount', parseFloat(req.body.Minimum_Amount));
            request.input('Maximum_Amount', parseFloat(req.body.Maximum_Amount));
            request.input('PT_Rate', parseFloat(req.body.PT_Rate));
            request.input('Created_By', parseInt(req.body.Created_By));
            request.execute('Proc_PTRATE_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false })
                  sql.close();
               }
               else {       
                  res.json({ status: true, result: rec.recordsets[0] });
                  sql.close();
               }
            });
         });
      });

      //API FOR UPDATE PTRATE EDITOR 
      app.post('/updateptrateeditor', function (req, res) {
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();
            var data_added = true;
            request.input('Operation', 'UPDATE');

            request.input('PTRate_Id', parseInt(req.body.id));//PT RATE ID
            request.input('PTGroup_Id', parseInt(req.body.PTGroup_Id));
            request.input('Effective_From', req.body.Effective_From);
            request.input('Minimum_Amount', parseFloat(req.body.Minimum_Amount));
            request.input('Maximum_Amount', parseFloat(req.body.Maximum_Amount));
            request.input('PT_Rate', parseFloat(req.body.PT_Rate));
            request.input('Created_By', parseInt(req.body.Created_By));
            request.execute('Proc_PTRATE_MST', function (err, rec) {
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

      //API FOR VIEW PT RATE EDITOR

      app.post('/viewallptrateeditor', function (req, res) {
         //console.log(req);
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();
            var data_added = true;
            request.input('Operation', 'SELECT');
            request.execute('Proc_PTRATE_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false })
                  sql.close();
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0] });
                  sql.close();
               }
            });
         });
      });


      //API FOR SEARCH PTRATE DETAILS

      app.post('/search_ptrate_details', function (req, res) {
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();
            var data_added = true;
            request.input('Operation', 'SEARCH');
            //request.input('ID', req.body.id);
            request.input('OUT_CODE', parseInt(req.body.id));//PT RATE ID
            request.execute('Proc_PTRATE_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false })
                  sql.close();
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0] });
                  sql.close();
               }
            });
         });
      });

      //API FOR VIEW SINGLE  PTRATE DETAILS

      app.post('/view_single_ptrate_details', function (req, res) {
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();
            var data_added = true;

            request.input('Operation', 'SELECTBYID');
            request.input('PTRate_Id', req.body.id);// PT GROUP ID

            request.execute('Proc_PTRATE_MST', function (err, rec) {
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
      //API FOR DELETE PT RATE DETAILS

      app.post('/delete_ptrate_details', function (req, res) {
         //console.log(req);
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();
            var data_added = true;
            
            request.input('Operation', 'DELETE');
            request.input('PTRate_Id', req.body.id);//PT RATE ID

            request.execute('Proc_PTRATE_MST', function (err, rec) {
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