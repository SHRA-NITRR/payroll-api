
var sql = require('mssql');

module.exports = {
   configure: function (app, assert, config, connection) {

      //API FOR ADD PAYHEAD MAP SLAB DETAILS
      app.post('/addpayheadmapslab', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'INSERT');
         request.input('Salary_Str_Id', parseInt(req.body.Salary_Str_Id));
         request.input('Payhead_Id', parseInt(req.body.Payhead_Id));
         request.input('Paymap_Min_Amount', parseFloat(req.body.Paymap_Min_Amount));
         request.input('Paymap_Max_Amount', req.body.Paymap_Max_Amount);
         request.input('Paymap_Type', req.body.Paymap_Type);
         request.input('Created_By', parseInt(req.body.Created_By));
         request.input('Paymap_Amount', parseFloat(req.body.Paymap_Amount));


         request.execute('Proc_Payhead_Map_Slab', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               res.json({ status: true });
            }
         });
      });



      //API FOR UPDATE PAYHEAD MAP SLAB DETAILS
      app.post('/updatepayheadmapslab', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'UPDATE');
         request.input('Salary_Str_Id', parseInt(req.body.Salary_Str_Id));
         request.input('Payhead_Id', parseInt(req.body.Payhead_Id));
         request.input('Paymap_Min_Amount', parseFloat(req.body.Paymap_Min_Amount));
         request.input('Paymap_Max_Amount', req.body.Paymap_Max_Amount);
         request.input('Paymap_Type', req.body.Paymap_Type);
         request.input('Created_By', parseInt(req.body.Created_By));
         request.input('Paymap_Amount', parseFloat(req.body.Paymap_Amount));

         request.input('Payhead_Map_Slab_Id', parseInt(req.body.id));//PAYHEADMAP SLAB ID

         request.execute('Proc_Payhead_Map_Slab', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               res.json({ status: true });
            }
         });
      });

      //API FOR VIEW ALL PAYHEAD MAP SLAB DETAILS

      app.post('/viewallpayheadmapslab', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'SELECT');
         request.execute('Proc_Payhead_Map_Slab', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               res.json({ status: true, result: rec.recordsets[0] });
            }
         });
      });

      //API FOR SEARCH PAYHEAD MAP SLAB DETAILS

      app.post('/search_payheadmapslab', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'SEARCH');
         //request.input('ID', req.body.id);
         request.input('OUT_CODE', parseInt(req.body.id));
         request.execute('Proc_Payhead_Map_Slab', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               res.json({ status: true, result: rec.recordsets[0] });
            }
         });
      });

      //API FOR VIEW SINGLE PAYHEAD MAP SLAB  DETAILS

      app.post('/view_single_payheadmapslab', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'SELECTBYID');
         request.input('Payhead_Map_Slab_Id', parseInt(req.body.id));//PAYHEADMAP SLAB ID

         request.execute('Proc_Payhead_Map_Slab', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               res.json({ status: true, result: rec.recordset[0] });
            }
         });
      });

      //API FOR DELETE PAYHEADMAP SLAB DETAILS
      app.post('/delete_payheadmapslab', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'DELETE');
         request.input('Payhead_Map_Slab_Id', parseInt(req.body.id));//PAYHEADMAP SLAB ID

         request.execute('Proc_Payhead_Map_Slab', function (err, rec) {
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
