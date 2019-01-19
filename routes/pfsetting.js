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


      //API FOR ADD PF SETTING DETAILS
      app.post('/addpfsettingdetails', function (req, res) {
        sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();

            var data_added = true;

            request.input('Operation', 'INSERT');
            request.input('Effective_From', req.body.Effective_From);
            request.input('PFSett_Age', parseInt(req.body.PFSett_Age));
            request.input('Created_By', parseInt(req.body.Created_By));

            // request.input('Modified_By', parseInt(req.body.Modified_By));
            // request.input('Is_Deleted', req.body.Is_Deleted.toLowerCase() == 'true' ? true : false);
            // request.input('Modified_On',req.body.Modified_On);

            request.execute('Proc_PFsetting_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
                  sql.close();               }
               else {
                  res.json({ status: true, result: rec.recordsets[0] });
                  sql.close();
               }
            });
         });
      });


 //API FOR UPDATE PF SETTING DETAILS
 app.post('/updatepfsettingdetails', function (req, res) {
   //console.log(req);
   sql.close();
   sql.connect(config, function () {
      var request = new sql.Request();

      var data_added = true;

      request.input('Operation', 'UPDATE');
      request.input('Effective_From', req.body.Effective_From);
      request.input('PFSett_Age', parseInt(req.body.PFSett_Age));
      request.input('Created_By', parseInt(req.body.Created_By));
      request.input('PFSetting_Id', parseInt(req.body.id));// PFSetting_Id
      
      request.execute('Proc_PFsetting_MST', function (err, rec) {
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

      //API FOR VIEW ALL PF SETTING DETAILS

      app.post('/viewpfsettingdetails', function (req, res) {
         //console.log(req);
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();

            var data_added = true;
            request.input('Operation', 'SELECT');
            //request.input('ID', req.body.id);
            request.execute('Proc_PFsetting_MST', function (err, rec) {
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

 //API FOR VIEW ALL PF SETTING DETAILS

 app.post('/view_single_pfsettingdetails', function (req, res) {
   sql.close();
   sql.connect(config, function () {
      var request = new sql.Request();

      var data_added = true;
      request.input('Operation', 'SELECTBYID');
      request.input('PFSetting_Id', req.body.id);// PFSetting_Id
     
      request.execute('Proc_PFsetting_MST', function (err, rec) {
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

      //API FOR SEARCH PF SETTING DETAILS BY PF ID

      app.post('/search_pfsettingdetails', function (req, res) {
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();

            var data_added = true;
            request.input('Operation', 'SEARCH');
            //request.input('ID', req.body.id);
            request.input('OUT_CODE', parseInt(req.body.id));// PF SETTING ID
            request.execute('Proc_PFsetting_MST', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
                  sql.close();
               }
               else {
                  // var a= rec.recordsets[0][1].Effective_From;
                  // var b =a.toString()
                  res.json({ status: true, result:rec.recordsets[0] });
                  sql.close();
               }
            });
         });
      });


 //API FOR DELETE PF SETTING DETAILS

 app.post('/delete_pfsetting_details', function (req, res) {
   //console.log(req);
   sql.close();
   sql.connect(config, function () {
      var request = new sql.Request();
      var data_added = true;
      request.input('Operation','DELETE');
      request.input('PFSetting_Id',req.body.id);//PF SETTING ID

      request.execute('Proc_PFsetting_MST', function (err, rec) {
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