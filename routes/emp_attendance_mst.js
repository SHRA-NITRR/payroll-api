var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');
var Promise = require('promise');

module.exports = {
    configure: function (app, assert, config, connection) {
        //document.write(diffDays+'<br>');

        // var day = new Date(date1);
        // console.log(day); // Apr 30 2000
        // //document.write(day+'<br>');

        // var nextDay = new Date(day);
        // nextDay.setDate(day.getDate()+1);
        // console.log(nextDay); // May 01 2000  
        // //wdocument.write(nextDay); 

        // Apr 30 2000
        //console.log(date1);

       
        //API FOR ADD ATTENDANCE DETAILS
        app.post('/add_emp_attendance_details', function (req, res) {

            var date1 = new Date(req.body.fdate);
            var date2 = new Date(req.body.tdate);
            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            //console.log(diffDays);
            var diff = diffDays + 1;
            var index = 0;
            var emp_ids = JSON.parse(req.body.Employee_Id);

            // var detail=JSON.parse(req.body.details)
            console.log(emp_ids[index]);
            var insertAttendance = function (date, eid) {
                console.log(date);
                if (date <= date2) {
                    var request = new sql.Request(connection);
                    request.input('Operation', 'INSERT');
                    request.input('Employee_Id', eid);
                    request.input('Attendance_Date', date1);
                    request.input('Attendance_Intime', req.body.Attendance_Intime);
                    request.input('Attendance_Outtime', req.body.Attendance_Outtime);
                    request.input('Attendance_Type', req.body.Attendance_Type);
                    request.input('Status', req.body.Status);
                    request.input('Remarks',req.body.remarks);
                    request.input('Created_By', parseInt(req.body.Created_By));
                    request.execute('Proc_Employee_Attendance_Mst', function (err, rec) {
                        if (err) {
                            console.log(err);
                            //res.json({ status: false });   
                        }
                        else {
                            index++;
                            if(index<emp_ids.length){
                                insertAttendance(date1, emp_ids[index]);
                            }else{
                                date1.setDate(date1.getDate() + 1);
                                index = 0;
                                insertAttendance(date1, emp_ids[index]);
                            } 
                        }

                    });

                } else {
                    res.json({ status: true });
                }
            }
            insertAttendance(date1, emp_ids[index]);

        });
        //document.write(day+'<br>');

        // var nextDay = new Date(day);
        // nextDay.setDate(day.getDate()+1);
        // console.log(nextDay); // May 01 2000  

        //API FOR UPDATE  ATTENDANCE DETAILS
        app.post('/update_emp_attendance_details', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'UPDATE');
            request.input('Employee_Id', req.body.Employee_Id);
            request.input('Attendance_Date', new Date(req.body.Attendance_Date));
            request.input('Attendance_Intime', req.body.Attendance_Intime);
            request.input('Attendance_Outtime', req.body.Attendance_Outtime);
            request.input('Attendance_Type', req.body.Attendance_Type);
            request.input('Status', req.body.Status);
            request.input('Remarks', req.body.Remarks);
            request.input('Created_By', parseInt(req.body.Created_By));
            request.input('Attendance_Id', parseInt(req.body.id));// ATTENDANCE ID

            request.execute('Proc_Employee_Attendance_Mst', function (err, rec) {
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

        app.post('/view_emp_attendance_details', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'SELECT');

            request.execute('Proc_Employee_Attendance_Mst', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });




        //API FOR VIEW  ATTENDANCE DETAILS FROM DATE TODATE WITH NAME

        app.post('/search_emp_attendance_details2', function (req, res) {


            if (req.body.Employee_Id == "" && req.body.fdate !== "" && req.body.tdate !== "") {
                console.log(req.body.fdate);
                console.log(req.body.tdate);
                var date1 = new Date(req.body.fdate);
                var date2 = new Date(req.body.tdate);

                var request = new sql.Request(connection);
                request.input('Operation', 'SELECT1');

                request.input('fromdate', date1);
                request.input('todate', date2);


                request.execute('Proc_Employee_Attendance_Mst', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });
                    }
                });
            }
            else if (req.body.Employee_Id !== "" && req.body.fdate !== "" && req.body.tdate !== "") {

                var date1 = new Date(req.body.fdate);
                var date2 = new Date(req.body.tdate);

                var request = new sql.Request(connection);
                request.input('Operation', 'SELECT2');

                request.input('fromdate', date1);
                request.input('todate', date2);
                request.input('Employee_Id', req.body.Employee_Id);

                request.execute('Proc_Employee_Attendance_Mst', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: "false" });
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });
                    }
                });

            }
            else {

                var request = new sql.Request(connection);
                request.input('Operation', 'SELECT');

                request.execute('Proc_Employee_Attendance_Mst', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });
                    }
                });


            }




        });




        //API FOR VIEW SINGLE ATTENDANCE DETAILS
        app.post('/view_single_emp_attendance_details', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'SELECTBYID');
            request.input('Attendance_Id', parseInt(req.body.id));// ATTENDANCE ID
            request.execute('Proc_Employee_Attendance_Mst', function (err, rec) {
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

        app.post('/search_emp_attendance_details', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'SEARCH');
            request.input('OUT_CODE', parseInt(req.body.id));
            request.execute('Proc_Employee_Attendance_Mst', function (err, rec) {
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

        app.post('/delete_emp_attendance_details', function (req, res) {

            var request = new sql.Request(connection);
            request.input('Operation', 'DELETE');
            request.input('Attendance_Id', parseInt(req.body.id));// ATTENDANCE ID
            request.execute('Proc_Employee_Attendance_Mst', function (err, rec) {
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