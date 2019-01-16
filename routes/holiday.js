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

        //API FOR ADD HOLIDAY DETAILS
        app.post('/addholidaydetails', function (req, res) {
            //console.log(req);
            sql.close();
            sql.connect(config, function () {
                var request = new sql.Request();
                var data_added = true;

                request.input('Operation', 'INSERT');
                request.input('Name', req.body.Name);
                request.input('Description', req.body.Description);
                request.input('Is_National_Holiday', req.body.Is_National_Holiday);
                request.input('Is_Branch_Wise', req.body.Is_Branch_Wise);
                request.input('Created_By', parseInt(req.body.Created_By));

                request.execute('Proc_HOLIDAY_MST', function (err, rec) {
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

 //API FOR UPDATE HOLIDAY DETAILS
 app.post('/updateholidaydetails', function (req, res) {
    //console.log(req);
    sql.close();
    sql.connect(config, function () {
        var request = new sql.Request();
        var data_added = true;

        request.input('Operation', 'UPDATE');
        request.input('Name', req.body.Name);
        request.input('Description', req.body.Description);
        request.input('Is_National_Holiday', req.body.Is_National_Holiday);
        request.input('Is_Branch_Wise', req.body.Is_Branch_Wise);
        request.input('Created_By', parseInt(req.body.Created_By));
        request.input('Holiday_Id', parseInt(req.body.id));// HOLIDAY ID

        request.execute('Proc_HOLIDAY_MST', function (err, rec) {
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



        //API FOR VIEW ALL RETIREMENT SETTING DETAILS

        app.post('/viewholidaydetails', function (req, res) {
            //console.log(req);
            sql.close();
            sql.connect(config, function () {
                var request = new sql.Request();

                var data_added = true;
                request.input('Operation', 'SELECT');
                //request.input('ID', req.body.id);
                //request.input('Company_Person_Name', req.body.Company_Person_Name)
                request.execute('Proc_HOLIDAY_MST', function (err, rec) {
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

 //API FOR VIEW SINGLE HOLIDAY DETAILS

 app.post('/viewsingleholidaydetails', function (req, res) {
    //console.log(req);
    sql.close();
    sql.connect(config, function () {
        var request = new sql.Request();

        var data_added = true;
        request.input('Operation', 'SELECTBYID');
        request.input('Holiday_Id', parseInt(req.body.id));//HOLIDAY ID
        //request.input('ID', req.body.id);
        request.execute('Proc_HOLIDAY_MST', function (err, rec) {
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

        //API FOR SEARCH RETIREMENT SETTING DETAILS BY PF ID

        app.post('/search_holidaydetails', function (req, res) {
            //console.log(req);
            sql.close();
            sql.connect(config, function () {
                var request = new sql.Request();

                var data_added = true;
                request.input('Operation', 'SEARCH');
                //request.input('ID', req.body.id);
                request.input('OUT_CODE', parseInt(req.body.id));
                request.execute('Proc_HOLIDAY_MST', function (err, rec) {
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



//API FOR DELETE HOLIDAY DETAILS

app.post('/delete_holiday_details', function (req, res) {
    //console.log(req);
    sql.close();
    sql.connect(config, function () {
       var request = new sql.Request();

       var data_added = true;
       request.input('Operation', 'DELETE');
       request.input('Holiday_Id', parseInt(req.body.id));//HOLIDAY ID

       request.execute('Proc_GRADE_MST', function (err, rec) {
          if (err) {
             console.log(err);
             res.json({ status: false });
             sql.close();
             //data_added= false;
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