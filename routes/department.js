var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');


module.exports = {
    configure: function (app, assert, config) {
sql.close();
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

//API FOR ADD DEPARTMENT DETAILS
        app.post('/adddepartmentdetails', function (req, res) {
            //console.log(req);
            sql.close();
            sql.connect(config, function () {
                var request = new sql.Request();
                var data_added = true;
                request.input('Operation', 'INSERT');
                
                request.input('Department_Name', req.body.Department_Name);
                request.input('Created_By', parseInt(req.body.Created_By));

                request.execute('Proc_DepartmentMaster', function (err, rec) {
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


        //API FOR UPDATE DEPARTMENT DETAILS
        app.post('/updatedepartmentdetails', function (req, res) {
            //console.log(req);
            sql.close();
            sql.connect(config, function () {
                var request = new sql.Request();
                var data_added = true;
                request.input('Operation', 'UPDATE');
                request.input('Department_Id', parseInt(req.body.id));//DEPARTMENT ID
                request.input('Department_Name', req.body.Department_Name);
                request.input('Created_By', parseInt(req.body.Created_By));
               

                request.execute('Proc_DepartmentMaster', function (err, rec) {
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

//API FOR VIEW ALL DEPARTMENT DETAILS

        app.post('/viewdepartmentdetails', function (req, res) {
        
            //console.log(req);
            sql.close();
            sql.connect(config, function () {
                var request = new sql.Request();
                var data_added = true;
                request.input('Operation', 'SELECT');
                //request.input('ID', req.body.id);
                
                request.execute('Proc_DepartmentMaster', function (err, rec) {
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

//API FOR VIEW SINGLE DEPARTMENT DETAILS

app.post('/view_single_departmentdetails', function (req, res) {
    //console.log(req);
    sql.close();
    sql.connect(config, function () {
        var request = new sql.Request();
        var data_added = true;
        request.input('Operation', 'SELECTBYID');
        request.input('Department_Id', req.body.id);//DEPARTMENT ID
        
        request.execute('Proc_DepartmentMaster', function (err, rec) {
            if (err) {
                console.log(err);
                res.json({ status: false });
                //data_added= false;
                sql.close();
            }
            else {
                res.json({ status: true, result: rec.recordsets[0] });
                sql.close();
            }
        });
    });
});

//API FOR SEARCH DEPARTMENT DETAILS BY ID

        app.post('/search_departmentdetails', function (req, res) {
            //console.log(req);
            sql.close();
            sql.connect(config, function () {
                var request = new sql.Request();
                var data_added = true;
                request.input('Operation', 'SEARCH');
                //request.input('ID', req.body.id);
                request.input('OUT_CODE', parseInt(req.body.id));
                request.execute('Proc_DepartmentMaster', function (err, rec) {
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

//API FOR DELETE DEPARTMENT DETAILS

app.post('/delete_department_details', function (req, res) {
    //console.log(req);
    sql.close();
    sql.connect(config, function () {
       var request = new sql.Request();
       var data_added = true;
       request.input('Operation', 'DELETE');
       request.input('Department_Id', req.body.id);//DEPARTMENT ID

       request.execute('Proc_DepartmentMaster', function (err, rec) {
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