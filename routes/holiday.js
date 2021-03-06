var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');

module.exports = {
    configure: function (app, assert, config,connection) {

        //API FOR ADD HOLIDAY DETAILS
        app.post('/addholidaydetails', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'INSERT');
                request.input('Name', req.body.Name);
                request.input('Description', req.body.Description);
                request.input('Is_National_Holiday', req.body.Is_National_Holiday);
                request.input('Is_Branch_Wise', req.body.Is_Branch_Wise);
                request.input('Created_By', parseInt(req.body.Created_By));
                request.input('Date', req.body.date);

                request.execute('Proc_HOLIDAY_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });  
                    }
                });
            });

 //API FOR UPDATE HOLIDAY DETAILS
 app.post('/updateholidaydetails', function (req, res) {
    var request = new sql.Request(connection);
       
        request.input('Operation', 'UPDATE');
        request.input('Name', req.body.Name);
        request.input('Description', req.body.Description);
        request.input('Is_National_Holiday', req.body.Is_National_Holiday);
        request.input('Is_Branch_Wise', req.body.Is_Branch_Wise);
        request.input('Created_By', parseInt(req.body.Created_By));
        request.input('Holiday_Id', parseInt(req.body.id));// HOLIDAY ID
        request.input('Date', req.body.date);

        request.execute('Proc_HOLIDAY_MST', function (err, rec) {
            if (err) {
                console.log(err);
                res.json({ status: false });
            }
            else {
                res.json({ status: true, result: rec.recordsets[0] });
            }
        });
    });


        //API FOR VIEW ALL HOLIDAY DETAILS
        app.post('/viewholidaydetails', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'SELECT');
                //request.input('ID', req.body.id);
                request.execute('Proc_HOLIDAY_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });  
                    }
                });
            });

 //API FOR VIEW SINGLE HOLIDAY DETAILS
 app.post('/viewsingleholidaydetails', function (req, res) {
    var request = new sql.Request(connection);
        request.input('Operation', 'SELECTBYID');
        request.input('Holiday_Id', parseInt(req.body.id));//HOLIDAY ID
        //request.input('ID', req.body.id);
        request.execute('Proc_HOLIDAY_MST', function (err, rec) {
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
        app.post('/search_holidaydetails', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'SEARCH');
                //request.input('ID', req.body.id);
                request.input('OUT_CODE', parseInt(req.body.id));// id
                request.execute('Proc_HOLIDAY_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });  
                    }
                });
            });

//API FOR DELETE HOLIDAY DETAILS

app.post('/delete_holiday_details', function (req, res) {
    var request = new sql.Request(connection);
       request.input('Operation', 'DELETE');
       request.input('Holiday_Id', parseInt(req.body.id));//HOLIDAY ID

       request.execute('Proc_HOLIDAY_MST', function (err, rec) {
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