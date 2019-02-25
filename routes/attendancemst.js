var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');

module.exports = {
    configure: function (app, assert, config,connection) {

        //API FOR ADD ATTENDANCE DETAILS
        app.post('/add_attendance_details', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'INSERT');
                request.input('Attendance_Name', req.body.Attendance_Name);
                request.input('Attendance_Salary_Type', req.body.Attendance_Salary_Type);
                request.input('Attendance_OT_Type', req.body.Attendance_OT_Type);
                request.input('Salary_Calendar_Type', req.body.Salary_Calendar_Type);
                request.input('Attendance_Reg_Type', req.body.Attendance_Reg_Type);
                request.input('Is_Morethan_WorkDay', req.body.Is_Morethan_WorkDay);
                request.input('Remarks', req.body.Remarks);
                request.input('Created_By', parseInt(req.body.Created_By));
                request.execute('Proc_Attendance_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });   
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });   
                    }
                });
            });

 //API FOR UPDATE  ATTENDANCE DETAILS
 app.post('/update_attendance_details', function (req, res) {
    var request = new sql.Request(connection);
    request.input('Operation', 'UPDATE');
    request.input('Attendance_Name', req.body.Attendance_Name);
    request.input('Attendance_Salary_Type', req.body.Attendance_Salary_Type);
    request.input('Attendance_OT_Type', req.body.Attendance_OT_Type);
    request.input('Salary_Calendar_Type', req.body.Salary_Calendar_Type);
    request.input('Attendance_Reg_Type', req.body.Attendance_Reg_Type);
    request.input('Is_Morethan_WorkDay', req.body.Is_Morethan_WorkDay);
    request.input('Remarks', req.body.Remarks);
    request.input('Created_By', parseInt(req.body.Created_By));
    request.input('Attendance_Id', parseInt(req.body.id));// ATTENDANCE ID

        request.execute('Proc_Attendance_MST', function (err, rec) {
            if (err) {
                console.log(err);
                res.json({ status: false }); 
            }
            else {
                res.json({ status: true, result: rec.recordsets[0] });
            }
        });
    });

        //API FOR VIEW  ATTENDANCE DETAILS

        app.post('/view_attendance_details', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'SELECT');

                request.execute('Proc_Attendance_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false }); 
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });  
                    }
                });
            });

  //API FOR VIEW SINGLE ATTENDANCE DETAILS
  app.post('/view_single_attendance_details', function (req, res) {
    var request = new sql.Request(connection);
        request.input('Operation', 'SELECTBYID');
        request.input('Attendance_Id', parseInt(req.body.id));// ATTENDANCE ID
        request.execute('Proc_Attendance_MST', function (err, rec) {
            if (err) {
                console.log(err);
                res.json({ status: false });
            }
            else {
                res.json({ status: true, result: rec.recordsets[0] });
            }
        });
    });

        //API FOR SEARCH ATTENDANCE DETAILS

        app.post('/search_attendance_details', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'SEARCH');
                request.input('OUT_CODE', parseInt(req.body.id));
                request.execute('Proc_Attendance_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });
                    }
                });
            });

 //API FOR DELETE SINGLE ATTENDANCE DETAILS

 app.post('/delete_attendance_details', function (req, res) {
   
    var request = new sql.Request(connection);
        request.input('Operation','DELETE');
        request.input('Attendance_Id', parseInt(req.body.id));// ATTENDANCE ID
        request.execute('Proc_Attendance_MST', function (err, rec) {
            if (err) {
                console.log(err);
                res.json({ status: false });  
            }
            else {
                res.json({ status: true, result: rec.recordsets[0] });  
            }
        });
    });
    }
}