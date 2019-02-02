var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');


module.exports = {
    configure: function (app, assert, config, connection) {

        //API FOR ADD DEPARTMENT DETAILS
        app.post('/adddepartmentdetails', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'INSERT');
            request.input('Department_Name', req.body.Department_Name);
            request.input('Created_By', parseInt(req.body.Created_By));
            request.execute('Proc_DepartmentMaster', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR UPDATE DEPARTMENT DETAILS
        app.post('/updatedepartmentdetails', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'UPDATE');
                request.input('Department_Id', parseInt(req.body.id));//DEPARTMENT ID
                request.input('Department_Name', req.body.Department_Name);
                request.input('Created_By', parseInt(req.body.Created_By));
                request.execute('Proc_DepartmentMaster', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });
                    }
                });
            });

        //API FOR VIEW ALL DEPARTMENT DETAILS

        app.post('/viewdepartmentdetails', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'SELECT');
                request.execute('Proc_DepartmentMaster', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });
                    }
                });
            });

        //API FOR VIEW SINGLE DEPARTMENT DETAILS

        app.post('/view_single_departmentdetails', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'SELECTBYID');
                request.input('Department_Id', req.body.id);//DEPARTMENT ID
                request.execute('Proc_DepartmentMaster', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });
                    }
                });
            });

        //API FOR SEARCH DEPARTMENT DETAILS BY ID

        app.post('/search_departmentdetails', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'SEARCH');
                request.input('OUT_CODE', parseInt(req.body.id));
                request.execute('Proc_DepartmentMaster', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });
                    }
                });
            });

        //API FOR DELETE DEPARTMENT DETAILS
        app.post('/delete_department_details', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'DELETE');
                request.input('Department_Id', req.body.id);//DEPARTMENT ID
                request.execute('Proc_DepartmentMaster', function (err, rec) {
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