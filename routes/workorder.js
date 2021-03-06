var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');


module.exports = {
    configure: function (app, assert, config,connection) {

        //API FOR ADD WORK DETAILS
        app.post('/addworkorderdetails', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'INSERT');
                request.input('Work_Order_Name', req.body.Work_Order_Name);
                request.input('Created_By', parseInt(req.body.Created_By));

                request.execute('Proc_WorkOrder_Master', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });   
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });   
                    }
                });
            });

 //API FOR UPDATE WORK DETAILS
 app.post('/updateworkorderdetails', function (req, res) {
    var request = new sql.Request(connection);
        request.input('Operation', 'UPDATE');
        request.input('Work_Order_Name', req.body.Work_Order_Name);
        request.input('Created_By', parseInt(req.body.Created_By));
        request.input('Work_Order_Id', parseInt(req.body.id));// WORKORDER ID

        request.execute('Proc_WorkOrder_Master', function (err, rec) {
            if (err) {
                console.log(err);
                res.json({ status: false }); 
            }
            else {
                res.json({ status: true, result: rec.recordsets[0] });
            }
        });
    });

        //API FOR VIEW WORK DETAILS

        app.post('/viewworkorderdetails', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'SELECT');

                request.execute('Proc_WorkOrder_Master', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false }); 
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });  
                    }
                });
            });

  //API FOR VIEW SINGLE WORK DETAILS

  app.post('/viewsingleworkorderdetails', function (req, res) {
    var request = new sql.Request(connection);
        request.input('Operation', 'SELECTBYID');
        request.input('Work_Order_Id', parseInt(req.body.id));// WORKORDER ID
        request.execute('Proc_WorkOrder_Master', function (err, rec) {
            if (err) {
                console.log(err);
                res.json({ status: false });
            }
            else {
                res.json({ status: true, result: rec.recordsets[0] });
            }
        });
    });


        //API FOR SEARCH WORK DETAILS BY ID

        app.post('/search_workorderdetails', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'SEARCH');
                request.input('OUT_CODE', parseInt(req.body.id));
                request.execute('Proc_WorkOrder_Master', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });
                    }
                });
            });

 //API FOR DELETE SINGLE WORK DETAILS

 app.post('/deleteworkorderdetails', function (req, res) {
   
    var request = new sql.Request(connection);
        request.input('Operation','DELETE');
        request.input('Work_Order_Id', parseInt(req.body.id));// WORKORDER ID
        request.execute('Proc_WorkOrder_Master', function (err, rec) {
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