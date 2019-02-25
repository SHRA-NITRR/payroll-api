
var sql = require('mssql');

module.exports = {
   configure: function (app, assert, config, connection) {

      //API FOR ADD EMPLOYEE SALARY STRUCTURE DETAILS
      app.post('/addempsalarystructure', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'INSERT');

         request.input('Effective_From', new Date(req.body.Effective_From));
         request.input('Payhead_Id', parseInt(req.body.Payhead_Id));
         request.input('Amount', parseFloat(req.body.Amount));
         request.input('Employee_Id', req.body.Employee_Id);
        
         request.input('Created_By', parseInt(req.body.Created_By));
        


         request.execute('Proc_Employee_Salary_Structure', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               res.json({ status: true });
            }
         });
      });



      //API FOR UPDATE EMPLOYEE SALARY STRUCTURE DETAILS
      app.post('/updateempsalarystructure', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'UPDATE');
         request.input('Effective_From', new Date(req.body.Effective_From));
         request.input('Payhead_Id', parseInt(req.body.Payhead_Id));
         request.input('Amount', parseFloat(req.body.Amount));
         request.input('Employee_Id', req.body.Employee_Id);
         request.input('Created_By', parseInt(req.body.Created_By));
         

         request.input('Emp_Sal_Str_Id', parseInt(req.body.id));//EMP SALARY STRUCTURE ID

         request.execute('Proc_Employee_Salary_Structure', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               res.json({ status: true });
            }
         });
      });

      //API FOR VIEW ALL EMPLOYEE SALARY STRUCTURE DETAILS

      app.post('/viewallempsalarystructure', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'SELECT');
         request.execute('Proc_Employee_Salary_Structure', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               res.json({ status: true, result: rec.recordsets[0] });
            }
         });
      });

      //API FOR SEARCH EMPLOYEE SALARY STRUCTURE DETAILS

      app.post('/search_empsalarystructure', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'SEARCH');
         //request.input('ID', req.body.id);
         request.input('OUT_CODE', parseInt(req.body.id));
         request.execute('Proc_Employee_Salary_Structure', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               res.json({ status: true, result: rec.recordsets[0] });
            }
         });
      });

      //API FOR VIEW SINGLE EMPLOYEE SALARY STRUCTURE DETAILS

      app.post('/view_single_empsalarystructure', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'SELECTBYID');
         request.input('Emp_Sal_Str_Id', parseInt(req.body.id));//EMP SALARY STRUCTURE ID

         request.execute('Proc_Employee_Salary_Structure', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               res.json({ status: true, result: rec.recordset[0] });
            }
         });
      });

      //API FOR DELETE EMPLOYEE SALARY STRUCTURE DETAILS
      app.post('/delete_empsalarystructure', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'DELETE');
         request.input('Emp_Sal_Str_Id', parseInt(req.body.id));//EMP SALARY STRUCTURE ID

         request.execute('Proc_Employee_Salary_Structure', function (err, rec) {
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
