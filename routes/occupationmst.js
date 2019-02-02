var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');


module.exports = {
    configure: function (app, assert, config,connection) {

        //API FOR ADD OCCUPATION DETAILS
        app.post('/addoccupationdetails', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'INSERT');
                request.input('Occupation_Name', req.body.Occupation_Name);
                request.input('Occupation_Short_Name', req.body.Occupation_Short_Name);
                request.input('Created_By', parseInt(req.body.Created_By));

                request.execute('Proc_Occupation_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });   
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });   
                    }
                });
            });

 //API FOR UPDATE OCCUPATION DETAILS
 app.post('/updateoccupationdetails', function (req, res) {
    var request = new sql.Request(connection);
        request.input('Operation', 'UPDATE');
        request.input('Occupation_Name', req.body.Occupation_Name);
        request.input('Occupation_Short_Name', req.body.Occupation_Short_Name);
        request.input('Created_By', parseInt(req.body.Created_By));
        request.input('Occupation_Id', parseInt(req.body.id));// OCCUPATION ID

        request.execute('Proc_Occupation_MST', function (err, rec) {
            if (err) {
                console.log(err);
                res.json({ status: false }); 
            }
            else {
                res.json({ status: true, result: rec.recordsets[0] });
            }
        });
    });

        //API FOR VIEW OCCUPATION DETAILS

        app.post('/viewoccupationdetails', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'SELECT');

                request.execute('Proc_Occupation_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false }); 
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });  
                    }
                });
            });

  //API FOR VIEW SINGLE OCCUPATION DETAILS

  app.post('/viewsingleoccupationdetails', function (req, res) {
    var request = new sql.Request(connection);
        request.input('Operation', 'SELECTBYID');
        request.input('Occupation_Id', parseInt(req.body.id));// OCCUPATION ID
        request.execute('Proc_Occupation_MST', function (err, rec) {
            if (err) {
                console.log(err);
                res.json({ status: false });
            }
            else {
                res.json({ status: true, result: rec.recordsets[0] });
            }
        });
    });


        //API FOR SEARCH OCCUPATION DETAILS

        app.post('/search_occupation_details', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'SEARCH');
                request.input('OUT_CODE', parseInt(req.body.id));
                request.execute('Proc_Occupation_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });
                    }
                });
            });

 //API FOR DELETE SINGLE OCCUPATION DETAILS

 app.post('/delete_occupation_details', function (req, res) {
   
    var request = new sql.Request(connection);
        request.input('Operation','DELETE');
        request.input('Occupation_Id', parseInt(req.body.id));// OCCUPATION ID
        request.execute('Proc_Occupation_MST', function (err, rec) {
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