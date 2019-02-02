var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');


module.exports = {
    configure: function (app, assert, config,connection) {

        //API FOR ADD LEAVE DETAILS
        app.post('/addleavedetails', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'INSERT');
                request.input('Leave_Name', req.body.Leave_Name);
                request.input('Leave_Short_Name', req.body.Leave_Short_Name);
                request.input('Is_Affect_salary', req.body.Is_Affect_salary.toLowerCase() == 'true' ? true : false);
                request.input('Is_Alloted', req.body.Is_Alloted.toLowerCase() == 'true' ? true : false);
                request.input('Created_By', parseInt(req.body.Created_By));

                request.execute('Proc_LEAVE_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });  
                    }
                });
            });   

 //API FOR UPDATE LEAVE DETAILS
 app.post('/updateleavedetails', function (req, res) {
    var request = new sql.Request(connection);
        request.input('Operation', 'UPDATE');
        request.input('Leave_Name', req.body.Leave_Name);
        request.input('Leave_Short_Name', req.body.Leave_Short_Name);
        request.input('Is_Affect_salary', req.body.Is_Affect_salary.toLowerCase() == 'true' ? true : false);
        request.input('Is_Alloted', req.body.Is_Alloted.toLowerCase() == 'true' ? true : false);
        request.input('Created_By', parseInt(req.body.Created_By));
        request.input('Leave_Id', parseInt(req.body.id));//LEAVE ID

        request.execute('Proc_LEAVE_MST', function (err, rec) {
            if (err) {
                console.log(err);
                res.json({ status: false });
            }
            else {
                res.json({ status: true, result: rec.recordsets[0] });   
            }
        });
    });

        //API FOR VIEW LEAVE DETAILS
        app.post('/viewleavedetails', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'SELECT');

                request.execute('Proc_LEAVE_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] }); 
                    }
                });
            });

//API FOR VIEW SINGLE LEAVE DETAILS

app.post('/viewsingleleavedetails', function (req, res) {
    var request = new sql.Request(connection);
        request.input('Operation', 'SELECTBYID');
        request.input('Leave_Id', parseInt(req.body.id));//LEAVE ID
        //request.input('Company_Person_Name', req.body.Company_Person_Name)
        request.execute('Proc_LEAVE_MST', function (err, rec) {
            if (err) {
                console.log(err);
                res.json({ status: false });
            }
            else {
                res.json({ status: true, result: rec.recordsets[0] });  
            }
        });
    });

        //API FOR SEARCH LEAVE DETAILS BY ID

        app.post('/search_leavedetails', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'SEARCH');
                //request.input('ID', req.body.id);
                request.input('OUT_CODE', parseInt(req.body.id));
                request.execute('Proc_LEAVE_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] }); 
                    }
                });
            });
        
 //API FOR DELETE LEAVE DETAILS

 app.post('/delete_leave_details', function (req, res) {
    var request = new sql.Request(connection);
       request.input('Operation', 'DELETE');
       request.input('Leave_Id', parseInt(req.body.id));//LEAVE ID

       request.execute('Proc_LEAVE_MST', function (err, rec) {
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