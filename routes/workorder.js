var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');


module.exports = {
    configure: function (app, assert, config) {

        var executeQuery = function (res, query) {
            sql.close();
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

        //API FOR ADD WORK DETAILS
        app.post('/addworkorderdetails', function (req, res) {
            //console.log(req);
            sql.close();
            sql.connect(config, function () {
                var request = new sql.Request();
                var data_added = true;
                request.input('Operation', 'INSERT');
                request.input('Work_Order_Name', req.body.Work_Order_Name);
                request.input('Created_By', parseInt(req.body.Created_By));

                request.execute('Proc_WorkOrder_Master', function (err, rec) {
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

 //API FOR UPDATE WORK DETAILS
 app.post('/updateworkorderdetails', function (req, res) {
    //console.log(req);
    sql.close();
    sql.connect(config, function () {
        var request = new sql.Request();
        var data_added = true;
        request.input('Operation', 'UPDATE');
        request.input('Work_Order_Name', req.body.Work_Order_Name);
        request.input('Created_By', parseInt(req.body.Created_By));
        request.input('Work_Order_Id', parseInt(req.body.id));// WORKORDER ID

        request.execute('Proc_WorkOrder_Master', function (err, rec) {
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

        //API FOR VIEW WORK DETAILS

        app.post('/viewworkorderdetails', function (req, res) {
            //console.log(req);
            sql.close();
            sql.connect(config, function () {
                var request = new sql.Request();
                var data_added = true;
                request.input('Operation', 'SELECT');

                request.execute('Proc_WorkOrder_Master', function (err, rec) {
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

  //API FOR VIEW SINGLE WORK DETAILS

  app.post('/viewsingleworkorderdetails', function (req, res) {
    //console.log(req);
    sql.close();
    sql.connect(config, function () {
        var request = new sql.Request();
        var data_added = true;
        request.input('Operation', 'SELECTBYID');
        request.input('Work_Order_Id', parseInt(req.body.id));// WORKORDER ID
        request.execute('Proc_WorkOrder_Master', function (err, rec) {
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

        //API FOR SEARCH WORK DETAILS BY ID

        app.post('/search_workorderdetails', function (req, res) {
            //console.log(req);
            sql.connect(config, function () {
                var request = new sql.Request();

                var data_added = true;
                request.input('Operation', 'SEARCH');
                request.input('OUT_CODE', parseInt(req.body.id));
                request.execute('Proc_WorkOrder_Master', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false })
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });
                        sql.close();
                    }
                });
            });
        });

 //API FOR DELETE SINGLE WORK DETAILS

 app.post('/deleteworkorderdetails', function (req, res) {
    //console.log(req);
    sql.close();
    sql.connect(config, function () {
        var request = new sql.Request();
        var data_added = true;

        request.input('Operation','DELETE');
        request.input('Work_Order_Id', parseInt(req.body.id));// WORKORDER ID
        request.execute('Proc_WorkOrder_Master', function (err, rec) {
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
    }
}