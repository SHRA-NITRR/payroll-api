var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');


module.exports = {
    configure: function (app, assert, config) {


        var executeQuery = function (res, query) {
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





        //API FOR ADD LEAVE DETAILS
        app.post('/addleavedetails', function (req, res) {
            //console.log(req);
            sql.connect(config, function () {
                var request = new sql.Request();

                var data_added = true;

                request.input('Operation', 'INSERT');
                request.input('Leave_Name', req.body.Leave_Name);
                request.input('Leave_Short_Name', req.body.Leave_Short_Name);
                request.input('Is_Affect_salary', req.body.Is_Affect_salary.toLowerCase() == 'true' ? true : false);
                request.input('Is_Alloted', req.body.Is_Alloted.toLowerCase() == 'true' ? true : false);
                request.input('Created_By', parseInt(req.body.Created_By));


                // request.input('Modified_By', parseInt(req.body.Modified_By));
                // request.input('Is_Deleted', req.body.Is_Deleted.toLowerCase() == 'true' ? true : false);
                // request.input('Modified_On',req.body.Modified_On);

                request.execute('Proc_LEAVE_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false })
                        //data_added= false;
                    }
                    else {
                        //res.end(JSON.stringify(recordsets)); // Result in JSON format
                        //res.json({ status: true });

                        res.json({ status: true, result: rec.recordsets[0] });
                        sql.close();
                    }
                });
            });
        });

        //API FOR VIEW LEAVE DETAILS

        app.post('/viewleavedetails', function (req, res) {
            //console.log(req);
            sql.connect(config, function () {
                var request = new sql.Request();

                var data_added = true;
                request.input('Operation', 'SELECT');
                //request.input('ID', req.body.id);
                //request.input('Company_Person_Name', req.body.Company_Person_Name)
                request.execute('Proc_LEAVE_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false })
                        //data_added= false;
                    }
                    else {
                        //res.end(JSON.stringify(recordsets)); // Result in JSON format
                        //res.json({ status: true });
                        res.json({ status: true, result: rec.recordsets[0] });
                        sql.close();
                    }
                });
            });
        });


        //API FOR SEARCH LEAVE DETAILS BY ID

        app.post('/search_leavedetails', function (req, res) {
            //console.log(req);
            sql.connect(config, function () {
                var request = new sql.Request();

                var data_added = true;
                request.input('Operation', 'SEARCH');
                //request.input('ID', req.body.id);
                request.input('OUT_CODE', parseInt(req.body.id));
                request.execute('Proc_LEAVE_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false })
                        //data_added= false;
                    }
                    else {
                        //res.end(JSON.stringify(recordsets)); // Result in JSON format
                        res.json({ status: true, result: rec.recordsets[0] });
                        //res.send(rec.recordsets);
                        sql.close();
                    }
                });
            });
        });

    }
}