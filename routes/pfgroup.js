var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');


module.exports = {
   configure: function (app, assert, config) {


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


      //API FOR ADD PF GROUP
      app.post('/addpfgroup', function (req, res) {
         //console.log(req);
         sql.connect(config, function () {
            var request = new sql.Request();
            var request2 = new sql.Request();

            var data_added = true;
            request.input('Operation', 'INSERT');

            //@PFGroup_Id,@PF_No,@DBA_File_Code,@File_Extension,@Address,@Created_By

            //request.input('PFGroup_Id', parseInt(req.body.PFGroup_Id));
            request.input('PF_No', req.body.PF_No);
            request.input('DBA_File_Code', req.body.DBA_File_Code);
            request.input('File_Extension', req.body.File_Extension);
            request.input('Address', req.body.Address);
            request.input('Created_By', parseInt(req.body.Created_By));

            // request.input('Modified_By', parseInt(req.body.Modified_By));
            // request.input('Is_Deleted', req.body.Is_Deleted.toLowerCase() == 'true' ? true : false);
            // request.input('Modified_On',req.body.Modified_On);

            request.execute('Proc_PFGROUP_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false })
                  //data_added= false;

               }
               else {
                  //res.end(JSON.stringify(recordsets)); // Result in JSON format
                  //res.json({ status: true });
                  //res.send(recordsets);
                  sql.close();
                  sql.connect(config, function () {
                     var request2 = new sql.Request();
                     request2.input('ok', 'false');

                     request2.execute('Proc_PFGROUP_MST', function (err, rec) {
                        if (err) {
                           console.log(err);
                           res.json({ status: "jfbfddi" })
                           //data_added= false;

                        }
                     });
                  })
                  //res.json({ status: true, result:rec.recordsets[0]});
                  sql.close();
               }
            });
         });
      });

      //API FOR VIEW ESI GROUP

      app.post('/viewpfgroup', function (req, res) {
         //console.log(req);
         sql.connect(config, function () {
            var request = new sql.Request();

            var data_added = true;
            request.input('Operation', 'SELECT');
            //request.input('ID', req.body.id);
            //request.input('Company_Person_Name', req.body.Company_Person_Name)
            request.execute('Proc_PFGROUP_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false })
                  //data_added= false;
               }
               else {
                  //res.end(JSON.stringify(recordsets)); // Result in JSON format

                  res.json({ status: true, result: rec.recordsets[0] });
                  sql.close();
               }
            });
         });
      });


      //API FOR SEARCH PFGROUP DETAILS

      app.post('/search_pf_details', function (req, res) {
         //console.log(req);
         sql.connect(config, function () {
            var request = new sql.Request();

            var data_added = true;
            request.input('Operation', 'SEARCH');
            //request.input('ID', req.body.id);
            request.input('OUT_CODE', parseInt(req.body.pfgroupid));
            request.execute('Proc_PFGROUP_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false })
                  //data_added= false;
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

   }
}