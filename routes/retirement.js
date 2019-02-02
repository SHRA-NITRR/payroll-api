var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');


module.exports = {
    configure: function (app, assert, config,connection) {

        //API FOR ADD RETIREMENT SETTING DETAILS
        app.post('/addretiresettingdetails', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'INSERT');
                request.input('Effective_From', req.body.Effective_From);
                request.input('RetSett_Age', parseInt(req.body.RetSett_Age));
                request.input('Created_By', parseInt(req.body.Created_By));

                request.execute('Proc_RETIREMRNT_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });
                    }
                });
            });

  //API FOR UPDATE RETIREMENT SETTING DETAILS
  app.post('/updateretiresettingdetails', function (req, res) {
    var request = new sql.Request(connection);
        request.input('Operation', 'UPDATE');
        request.input('Effective_From', req.body.Effective_From);
        request.input('RetSett_Age', parseInt(req.body.RetSett_Age));
        request.input('Created_By', parseInt(req.body.Created_By));
        request.input('RetSett_Id', parseInt(req.body.id));//RETIREMENT SETTING ID

        request.execute('Proc_RETIREMRNT_MST', function (err, rec) {
            if (err) {
                console.log(err);
                res.json({ status: false });
            }
            else {
                res.json({ status: true, result: rec.recordsets[0] }); 
            }
        });
    });

        //API FOR VIEW ALL RETIREMENT SETTING DETAILS

        app.post('/viewretirementsettingdetails', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'SELECT');
                request.execute('Proc_RETIREMRNT_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });
                    }
                });
            });

 //API FOR VIEW SINGLE RETIREMENT SETTING DETAILS

 app.post('/viewsingleretirsettdetails', function (req, res) {
    var request = new sql.Request(connection);
        request.input('Operation', 'SELECTBYID');
        request.input('RetSett_Id', req.body.id);
        request.execute('Proc_RETIREMRNT_MST', function (err, rec) {
            if (err) {
                console.log(err);
                res.json({ status: false });
            }
            else {
                res.json({ status: true, result: rec.recordsets[0] });   
            }
        });
    });


        //API FOR SEARCH RETIREMENT SETTING DETAILS BY PF ID

        app.post('/search_retiresettingdetails', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'SEARCH');
                request.input('OUT_CODE',req.body.id);
                request.execute('Proc_RETIREMRNT_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0]}); 
                    }
                });
            });

//API FOR DELETE RETIREMENT SETTING DETAILS

app.post('/delete_retiresett_details', function (req, res) {
    var request = new sql.Request(connection);
       request.input('Operation', 'DELETE');
       request.input('RetSett_Id', req.body.id);//RETIREMENT SETTING ID GROUP ID

       request.execute('Proc_RETIREMRNT_MST', function (err, rec) {
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