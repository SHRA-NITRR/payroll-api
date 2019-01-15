
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




      //API FOR ADD PT GROUP
      app.post('/addptgroup', function (req, res) {
         sql.close();
         //console.log(req);
         sql.connect(config, function () {
            var request = new sql.Request();

            var data_added = true;
            request.input('Operation', 'INSERT');

            // request.input('PTGroup_Id', parseInt(req.body.PTGroup_Id));
            request.input('State_Id', parseInt(req.body.State_Id));
            request.input('Certificate_No', req.body.Certificate_No);
            request.input('PTO_No', req.body.PTO_No);
            request.input('PTGroup_Name', req.body.PTGroup_Name);

            request.input('PT_Address', req.body.PT_Address);
            request.input('Return_Period', req.body.Return_Period);
            request.input('Created_By', parseInt(req.body.Created_By));
            // request.input('Modified_By', parseInt(req.body.Modified_By));
            // request.input('Is_Deleted', req.body.Is_Deleted.toLowerCase() == 'true' ? true : false);
            // request.input('Modified_On',req.body.Modified_On);

            request.execute('Proc_PTGROUP_MST', function (err, rec) {
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



      //API FOR UPDATE PT GROUP
      app.post('/updateptgroup', function (req, res) {
         //console.log(req);
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();

            var data_added = true;
            request.input('Operation', 'UPDATE');

            request.input('PTGroup_Id', parseInt(req.body.PTGroup_Id));
            request.input('State_Id', parseInt(req.body.State_Id));
            request.input('Certificate_No', req.body.Certificate_No);
            request.input('PTO_No', req.body.PTO_No);

            request.input('PT_Address', req.body.PT_Address);
            request.input('Return_Period', req.body.Return_Period);
            request.input('Created_By', parseInt(req.body.Created_By));
            request.input('PTGroup_Name', req.body.PTGroup_Name);
            // request.input('Is_Deleted', req.body.Is_Deleted.toLowerCase() == 'true' ? true : false);
            // request.input('Modified_On',req.body.Modified_On);

            request.execute('Proc_PTGROUP_MST', function (err, rec) {
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




      //API FOR VIEW PT GROUP

      app.post('/viewallptgroup', function (req, res) {
         //console.log(req);
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();

            var data_added = true;
            request.input('Operation', 'SELECT');
            //request.input('ID', req.body.id);
            //request.input('Company_Person_Name', req.body.Company_Person_Name)
            request.execute('Proc_PTGROUP_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false })
                  //data_added= false;
                  sql.close();
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


      //API FOR SEARCH PTGROUP DETAILS

      app.post('/search_pt_details', function (req, res) {
         //console.log(req);
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();

            var data_added = true;
            request.input('Operation', 'SEARCH');
            //request.input('ID', req.body.id);
            request.input('OUT_CODE', parseInt(req.body.ptgroupid));
            request.execute('Proc_PTGROUP_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false })
                  //data_added= false;
                  sql.close();
               }
               else {
                  //res.end(JSON.stringify(recordsets)); // Result in JSON format
                  res.json({ status: true, result: rec.recordsets[0] });
                  //res.send(rec.recordsets);
                  sql.close();
               }
            });
         });
      });



      //API FOR VIEW SINGLE  PT DETAILS

      app.post('/view_single_pt_details', function (req, res) {
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();
            var data_added = true;

            request.input('Operation', 'SELECTBYID');
            request.input('PTGroup_Id', req.body.id);// PT GROUP ID

            request.execute('Proc_PTGROUP_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });     
                  sql.close();
               }
               else {
                  //res.end(JSON.stringify(recordsets)); // Result in JSON format
                  res.json({ status: true, result: rec.recordset[0] });
                  sql.close();
               }
            });
         });
      });
      //API FOR DELETE PT DETAILS

      app.post('/delete_pt_details', function (req, res) {
         //console.log(req);
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();
            var data_added = true;
            
            request.input('Operation', 'DELETE');
            request.input('PTGroup_Id', req.body.id);//PT GROUP ID

            request.execute('Proc_PTGROUP_MST', function (err, rec) {
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