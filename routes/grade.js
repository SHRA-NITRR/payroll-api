var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');


module.exports = {
    configure: function (app, assert, config, connection) {

        //API FOR ADD GRADE DETAILS
        app.post('/addgradedetails', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'INSERT');
            request.input('Grade_Name', req.body.Grade_Name);
            request.input('Created_By', parseInt(req.body.Created_By));
            request.execute('Proc_GRADE_MST', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR UPDATE GRADE DETAILS
        app.post('/updategradedetails', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'UPDATE');
            request.input('Grade_Id', parseInt(req.body.id));//GRADE ID
            request.input('Grade_Name', req.body.Grade_Name);
            request.input('Created_By', parseInt(req.body.Created_By));

            request.execute('Proc_GRADE_MST', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR VIEW ALL GRADE DETAILS

        app.post('/viewgradedetails', function (req, res) {

            var request = new sql.Request(connection);
            request.input('Operation', 'SELECT');
            request.execute('Proc_GRADE_MST', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR VIEW SINGLE GRADE DETAILS

        app.post('/view_single_gradedetails', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'SELECTBYID');
            request.input('Grade_Id', req.body.id);//GRADE ID
            request.execute('Proc_GRADE_MST', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR SEARCH GRADE DETAILS BY ID

        app.post('/search_gradedetails', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'SEARCH');
                request.input('OUT_CODE', parseInt(req.body.id));
                request.execute('Proc_GRADE_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });
                    }
                });
            });

        //API FOR DELETE GRADE DETAILS

        app.post('/delete_grade_details', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'DELETE');
                request.input('Grade_Id', req.body.id);//GRADE ID
                request.execute('Proc_GRADE_MST', function (err, rec) {
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