var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');


module.exports = {
    configure: function (app, assert, config,connection) {

        //API FOR ADD SITE DETAILS
        app.post('/addsitedetails', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'INSERT');
                request.input('Site_Name', req.body.Site_Name);

                request.input('Created_By', parseInt(req.body.Created_By));
                request.execute('Proc_SITE_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });  
                    }
                });
            });

        //API FOR UPDATE SITE DETAILS
        app.post('/updatesitedetails', function (req, res) {
          
                request.input('Operation', 'UPDATE');
                request.input('Site_Name', req.body.Site_Name);
                request.input('Site_Id', parseInt(req.body.id));//SITE ID
                request.input('Created_By', parseInt(req.body.Created_By));

                request.execute('Proc_SITE_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });   
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });   
                    }
                });
            });

        //API FOR VIEW SITE DETAILS

        app.post('/viewsitedetails', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'SELECT');
                request.execute('Proc_SITE_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });   
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });   
                    }
                });
            });

        //API FOR VIEW SINGLE SITE DETAILS

        app.post('/viewsinglesitedetails', function (req, res) {
            var request = new sql.Request(connection);
                request.input('Operation', 'SELECTBYID');
                request.input('Site_Id', parseInt(req.body.id));//SITE ID
                //request.input('Company_Person_Name', req.body.Company_Person_Name)
                request.execute('Proc_SITE_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                        
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });
                        
                    }
                });
            });

        //API FOR SEARCH SITE DETAILS BY ID

        app.post('/search_sitedetails', function (req, res) {
              var request = new sql.Request(connection);
                request.input('Operation', 'SEARCH');
                //request.input('ID', req.body.id);
                request.input('OUT_CODE', parseInt(req.body.id));
                request.execute('Proc_SITE_MST', function (err, rec) {
                    if (err) {
                        console.log(err);
                        res.json({ status: false });
                    }
                    else {
                        res.json({ status: true, result: rec.recordsets[0] });     
                    }
                });
            });
        
        //API FOR DELETE SINGLE SITE DETAILS

        app.post('/deletesinglesitedetails', function (req, res) {
           
                request.input('Operation', 'DELETE');
                request.input('Site_Id', parseInt(req.body.id));//SITE ID
                request.execute('Proc_SITE_MST', function (err, rec) {
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