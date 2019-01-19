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

        //API FOR ADD SITE DETAILS
        app.post('/addsitedetails', function (req, res) {
            //console.log(req);
            sql.close();
            sql.connect(config, function () {
                var request = new sql.Request();

                var data_added = true;

                request.input('Operation', 'INSERT');
                request.input('Site_Name', req.body.Site_Name);

                request.input('Created_By', parseInt(req.body.Created_By));


                // request.input('Modified_By', parseInt(req.body.Modified_By));
                // request.input('Is_Deleted', req.body.Is_Deleted.toLowerCase() == 'true' ? true : false);
                // request.input('Modified_On',req.body.Modified_On);

                request.execute('Proc_SITE_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                        sql.close();
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


        //API FOR UPDATE SITE DETAILS
        app.post('/updatesitedetails', function (req, res) {
            //console.log(req);
            sql.close();
            sql.connect(config, function () {
                var request = new sql.Request();
                var data_added = true;
                request.input('Operation', 'UPDATE');
                request.input('Site_Name', req.body.Site_Name);
                request.input('Site_Id', parseInt(req.body.id));//SITE ID
                request.input('Created_By', parseInt(req.body.Created_By));

                request.execute('Proc_SITE_MST', function (err, rec) {
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

        //API FOR VIEW SITE DETAILS

        app.post('/viewsitedetails', function (req, res) {
            //console.log(req);
            sql.close();
            sql.connect(config, function () {
                var request = new sql.Request();

                var data_added = true;
                request.input('Operation', 'SELECT');
                //request.input('ID', req.body.id);
                request.execute('Proc_SITE_MST', function (err, rec) {
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

        //API FOR VIEW SINGLE SITE DETAILS

        app.post('/viewsinglesitedetails', function (req, res) {
            //console.log(req);
            sql.close();
            sql.connect(config, function () {
                var request = new sql.Request();
                var data_added = true;
                request.input('Operation', 'SELECTBYID');
                request.input('Site_Id', parseInt(req.body.id));//SITE ID
                //request.input('Company_Person_Name', req.body.Company_Person_Name)
                request.execute('Proc_SITE_MST', function (err, rec) {
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
        //API FOR SEARCH SITE DETAILS BY ID

        app.post('/search_sitedetails', function (req, res) {
            //console.log(req);
            sql.close();
            sql.connect(config, function () {
                var request = new sql.Request();
                var data_added = true;
                request.input('Operation', 'SEARCH');
                //request.input('ID', req.body.id);
                request.input('OUT_CODE', parseInt(req.body.id));
                request.execute('Proc_SITE_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                        sql.close();
                        //data_added= false;
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });
                        sql.close();
                    }
                });
            });
        });
        //API FOR DELETE SINGLE SITE DETAILS

        app.post('/deletesinglesitedetails', function (req, res) {
            //console.log(req);
            sql.close();
            sql.connect(config, function () {
                var request = new sql.Request();
                var data_added = true;
                request.input('Operation', 'DELETE');
                request.input('Site_Id', parseInt(req.body.id));//SITE ID
                //request.input('Company_Person_Name', req.body.Company_Person_Name)
                request.execute('Proc_SITE_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                        sql.close();
                    }
                    else {
                        res.json({ status: true });
                        sql.close();
                    }
                });
            });
        });
    }
}