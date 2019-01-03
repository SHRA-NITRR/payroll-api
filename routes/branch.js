var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');



module.exports = {
   configure: function (app, assert, dbb) {

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

      //API FOR ADD COMPANY $ BRANCH DETAILS

      app.post('/add_branchdetails', function (req, res) {


         //FOR BRANCH DATA INSERT
         //    console.log(req.body.branch[0]);
         //    req.body.branch = JSON.parse(req.body.branch);
         //    var branch2 = JSON.parse(req.body.branch);

         req.body.branch.forEach(function (doc, err) {
            //assert.equal(null, err);
            userExists = true;
            var request2 = new sql.Request();
            request2.input('Operation', 'INSERT');

            request2.input('Branch_Name', doc.Branch_Name);

            request2.input('Branch_Address', doc.Branch_Address);

            request2.input('Branch_Address2', doc.Branch_Address2);

            request2.input('Branch_PhoneNo', parseInt(doc.Branch_PhoneNo));

            request2.input('Branch_Person_Name', doc.Branch_Person_Name);

            request2.input('Branch_Email', doc.Branch_Email);

            request2.input('Branch_PF_Group', doc.Branch_PF_Group);

            request2.input('Branch_PT_Group', doc.Branch_PT_Group);

            request2.input('Branch_ESI_Group', doc.Branch_ESI_Group);

            request2.execute('PROC_COMPANY_BRANCH', function (errr, recordsets, returnValue, affected) {
               if (errr) {
                  console.log(errr);
                  //res.json({ status: false });
                  data_added = false;
               }
               else {
                  //res.end(JSON.stringify(recordsets)); // Result in JSON format
                  res.json({ status: true });
                  sql.close();
               }
            })
         });

         //    if(data_added){
         //       res.json({status: true});
         //    }else{
         //       res.json({status: false});
         //    }


      });

   }
}