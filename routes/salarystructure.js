var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');


module.exports = {
    configure: function (app, assert, config,connection) {

        //API FOR ADD SALARY STRUCTURE DETAILS
        app.post('/addsalarystructure', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'INSERT');
                request.input('Salary_Str_Name', req.body.Salary_Str_Name);
                request.input('Salary_Str_Reamrk', req.body.Salary_Str_Reamrk);
                request.input('Is_On_Gross', req.body.Is_On_Gross.toLowerCase() == 'true' ? true : false);
                request.input('Created_By', parseInt(req.body.Created_By));

                request.execute('Proc_SALARYSTRUCTURE_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });
                    }
                });
            });

//API FOR UPDATE SALARY STRUCTURE DETAILS
app.post('/updatesalarystructure', function (req, res) {
    var request = new sql.Request(connection);
        request.input('Operation', 'UPDATE');
        request.input('Salary_Str_Id', parseInt(req.body.id));//SALARY STRUCTURE ID
        request.input('Salary_Str_Name', req.body.Salary_Str_Name);
        request.input('Salary_Str_Reamrk', req.body.Salary_Str_Reamrk);
        request.input('Is_On_Gross', req.body.Is_On_Gross.toLowerCase() == 'true' ? true : false);
        request.input('Created_By', parseInt(req.body.Created_By));

        request.execute('Proc_SALARYSTRUCTURE_MST', function (err, rec) {
            if (err) {
                console.log(err);
                res.json({ status: false });
            }
            else {
                res.json({ status: true, result: rec.recordsets[0] }); 
            }
        });
    });

        //API FOR VIEW ALL SALARY STRUCTURE DETAILS

        app.post('/viewsalarystructuredetails', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'SELECT');
                request.execute('Proc_SALARYSTRUCTURE_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });  
                    }
                });
            });

  //API FOR VIEW SINGLE SALARY STRUCTURE DETAILS

  app.post('/view_single_salary_structure_details', function (req, res) {
    var request = new sql.Request(connection);
        request.input('Operation', 'SELECTBYID');
        request.input('Salary_Str_Id',req.body.id);//SALARY STRUCTURE ID

        request.execute('Proc_SALARYSTRUCTURE_MST', function (err, rec) {
            if (err) {
                console.log(err);
                res.json({ status: false });
            }
            else {
                res.json({ status: true, result: rec.recordsets[0] });
            }
        });
    });

        //API FOR SEARCH SALARY STRUCTURE DETAILS BY PF ID

        app.post('/search_salarystructuredetails', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'SEARCH');
                request.input('OUT_CODE', parseInt(req.body.id));
                request.execute('Proc_SALARYSTRUCTURE_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });   
                    }
                });
            });

//API FOR DELETE SALARY STRUCTURE DETAILS
app.post('/delete_salarystructure_details', function (req, res) {
    var request = new sql.Request(connection);
       request.input('Operation', 'DELETE');
       request.input('Salary_Str_Id', req.body.id);//SALARY STRUCTURE ID
       request.execute('Proc_SALARYSTRUCTURE_MST', function (err, rec) {
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