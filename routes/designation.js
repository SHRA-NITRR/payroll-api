var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');


module.exports = {
    configure: function (app, assert, config, connection) {
        //API FOR ADD DESIGNATION DETAILS
        app.post('/adddesignationdetails', function (req, res) {
            var request = new sql.Request(connection);
            var data_added = true;
            request.input('Operation', 'INSERT');
            request.input('Desig_Name', req.body.Desig_Name);
            request.input('Desig_Sht_Name', req.body.Desig_Sht_Name);
            request.input('Created_By', parseInt(req.body.Created_By));

            request.execute('PROC_DesignationMaster', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR UPDATE DESIGNATION DETAILS
        app.post('/updatedesignationdetails', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'UPDATE');
            request.input('Desig_Id', parseInt(req.body.id));//DESIGNATION ID
            request.input('Desig_Name', req.body.Desig_Name);
            request.input('Desig_Sht_Name', req.body.Desig_Sht_Name);
            request.input('Created_By', parseInt(req.body.Created_By));

            request.execute('PROC_DesignationMaster', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR VIEW ALL DESIGNATION DETAILS

        app.post('/viewdesignationdetails', function (req, res) {
            var request = new sql.Request(connection);
            var data_added = true;
            request.input('Operation', 'SELECT');
            request.execute('PROC_DesignationMaster', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR VIEW SINGLE DESIGNATION DETAILS

        app.post('/view_single_designationdetails', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'SELECTBYID');
            request.input('Desig_Id', req.body.id);//DESIGNATION ID
            request.execute('PROC_DesignationMaster', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

//API FOR SEARCH DESIGNATION DETAILS BY ID
        app.post('/search_designationdetails', function (req, res) {
            var request = new sql.Request(connection);
            var data_added = true;
            request.input('Operation', 'SEARCH');
            //request.input('ID', req.body.id);
            request.input('OUT_CODE', parseInt(req.body.id));
            request.execute('PROC_DesignationMaster', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR DELETE DESIGNATION DETAILS
        app.post('/delete_designation_details', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'DELETE');
            request.input('Desig_Id', req.body.id);//DESIGNATION ID
            request.execute('PROC_DesignationMaster', function (err, rec) {
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