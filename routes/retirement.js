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

        //API FOR ADD RETIREMENT SETTING DETAILS
        app.post('/addretiresettingdetails', function (req, res) {
            //console.log(req);
            sql.connect(config, function () {
                var request = new sql.Request();

                var data_added = true;

                request.input('Operation', 'INSERT');
                request.input('Effective_From', req.body.Effective_From);
                request.input('RetSett_Age', parseInt(req.body.RetSett_Age));
                request.input('Created_By', parseInt(req.body.Created_By));

                // request.input('Modified_By', parseInt(req.body.Modified_By));
                // request.input('Is_Deleted', req.body.Is_Deleted.toLowerCase() == 'true' ? true : false);
                // request.input('Modified_On',req.body.Modified_On);

                request.execute('Proc_RETIREMRNT_MST', function (err, rec) {
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


  //API FOR UPDATE RETIREMENT SETTING DETAILS
  app.post('/updateretiresettingdetails', function (req, res) {
    //console.log(req);
    sql.connect(config, function () {
        var request = new sql.Request();

        var data_added = true;

        request.input('Operation', 'UPDATE');
        request.input('Effective_From', req.body.Effective_From);
        request.input('RetSett_Age', parseInt(req.body.RetSett_Age));
        request.input('Created_By', parseInt(req.body.Created_By));
        request.input('RetSett_Id', parseInt(req.body.id));//RETIREMENT SETTING ID

        // request.input('Modified_By', parseInt(req.body.Modified_By));
        // request.input('Is_Deleted', req.body.Is_Deleted.toLowerCase() == 'true' ? true : false);
        // request.input('Modified_On',req.body.Modified_On);

        request.execute('Proc_RETIREMRNT_MST', function (err, rec) {
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

        //API FOR VIEW ALL RETIREMENT SETTING DETAILS

        app.post('/viewretirementsettingdetails', function (req, res) {
            //console.log(req);
            sql.connect(config, function () {
                var request = new sql.Request();

                var data_added = true;
                request.input('Operation', 'SELECT');
                //request.input('ID', req.body.id);
                //request.input('Company_Person_Name', req.body.Company_Person_Name)
                request.execute('Proc_RETIREMRNT_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
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
 //API FOR VIEW SINGLE RETIREMENT SETTING DETAILS

 app.post('/viewsingleretirsettdetails', function (req, res) {
    //console.log(req);
    sql.connect(config, function () {
        var request = new sql.Request();

        var data_added = true;
        request.input('Operation', 'SELECTBYID');
        request.input('RetSett_Id', req.body.id);
        request.execute('Proc_RETIREMRNT_MST', function (err, rec) {
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


        //API FOR SEARCH RETIREMENT SETTING DETAILS BY PF ID

        app.post('/search_retiresettingdetails', function (req, res) {
            //console.log(req);
            sql.close();
            sql.connect(config, function () {
                var request = new sql.Request();

                var data_added = true;
                request.input('Operation', 'SEARCH');
                //request.input('ID', req.body.id);
                request.input('OUT_CODE',req.body.id);
                request.execute('Proc_RETIREMRNT_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                        sql.close();
                        //data_added= false;
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0]});
                        sql.close();
                    }
                });
            });
        });



//API FOR DELETE RETIREMENT SETTING DETAILS

app.post('/delete_retiresett_details', function (req, res) {
    //console.log(req);
    sql.connect(config, function () {
       var request = new sql.Request();

       var data_added = true;
       request.input('Operation', 'DELETE');
       request.input('RetSett_Id', req.body.id);//RETIREMENT SETTING ID GROUP ID

       request.execute('Proc_RETIREMRNT_MST', function (err, rec) {
          if (err) {
             console.log(err);
             res.json({ status: false })
             //data_added= false;
          }
          else {
             //res.end(JSON.stringify(recordsets)); // Result in JSON format
             res.json({ status: true });
             //res.send(recordsets);
             sql.close();
          }
       });
    });
 });









    }
}