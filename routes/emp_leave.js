var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');

module.exports = {
    configure: function (app, assert, config, connection) {
       

        //API FOR ADD LEAVE DETAILS
        app.post('/add_emp_leave_details', function (req, res) {

            var request = new sql.Request(connection);
                request.input('Operation', 'INSERT');
                request.input('Employee_Id', req.body.Employee_Id);
                request.input('Leave_Apply_Date', new Date(req.body.Leave_Apply_Date));
                request.input('Leave_From_Date', new Date(req.body.Leave_From_Date));
                request.input('Leave_To_Date', new Date(req.body.Leave_To_Date));
                request.input('Created_By', parseInt(req.body.Created_By));
                request.input('Leave_Type', req.body.Leave_Type);
                request.input('Leave_Reason', req.body.Leave_Reason);
                request.input('Leave_Status', req.body.Leave_Status);
              

                request.execute('Proc_Employee_Leave_Mst', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });  
                    }
                });
        });

        //document.write(day+'<br>');

        // var nextDay = new Date(day);
        // nextDay.setDate(day.getDate()+1);
        // console.log(nextDay); // May 01 2000  

        //API FOR UPDATE LEAVE DETAILS
        app.post('/update_emp_leave_details', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'UPDATE');
            request.input('Employee_Id', req.body.Employee_Id);
            request.input('Leave_Apply_Date', new Date(req.body.Leave_Apply_Date));
            request.input('Leave_From_Date', new Date(req.body.Leave_From_Date));
            request.input('Leave_To_Date', new Date(req.body.Leave_To_Date));
            request.input('Created_By', parseInt(req.body.Created_By));
            request.input('Leave_Type', req.body.Leave_Type);
            request.input('Leave_Reason', req.body.Leave_Reason);
            request.input('Leave_Status', req.body.Leave_Status);
          
            request.input('Leave_Id', parseInt(req.body.id));// ATTENDANCE ID

            request.execute('Proc_Employee_Leave_Mst', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR VIEW LEAVE DETAILS

        app.post('/view_emp_leave_details', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'SELECT');

            request.execute('Proc_Employee_Leave_Mst', function (err, rec) {
              
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR VIEW SINGLE LEAVE DETAILS
        app.post('/view_single_emp_leave_details', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'SELECTBYID');
            request.input('Leave_Id', parseInt(req.body.id));// ATTENDANCE ID
            request.execute('Proc_Employee_Leave_Mst', function (err, rec) {
               
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR SEARCH LEAVE DETAILS

        app.post('/search_emp_leave_details', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'SEARCH');
            request.input('OUT_CODE', parseInt(req.body.id));
            request.execute('Proc_Employee_Leave_Mst', function (err, rec) {
          
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR DELETE SINGLE LEAVE DETAILS

        app.post('/delete_emp_leave_details', function (req, res) {

            var request = new sql.Request(connection);
            request.input('Operation', 'DELETE');
            request.input('Leave_Id', parseInt(req.body.id));// ATTENDANCE ID
            request.execute('Proc_Employee_Leave_Mst', function (err, rec) {
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