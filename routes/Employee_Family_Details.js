
var sql = require('mssql');

module.exports = {
    configure: function (app, assert, config, connection) {
        //API FOR ADD EMPLOYEE FAMILY DETAILS DETAILS
        app.post('/addemployeefamdetails', function (req, res) {
            var request = new sql.Request(connection);

            request.input('Operation', 'INSERT');
            request.input('Relative_Name', req.body.Relative_Name);
            request.input('Gender', req.body.Gender);
            request.input('Relation', req.body.Relation);
            request.input('Remarks', req.body.Remarks);
            request.input('Date_Of_Birth', new Date(req.body.Date_Of_Birth));// FORMAT (M-D-Y)
            request.input('Created_By', parseInt(req.body.Created_By));

            request.execute('Proc_Employee_Family_Details', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR UPDATE EMPLOYEE FAMILY DETAILS  DETAILS
        app.post('/updateemployeefamdetails', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'UPDATE');
            request.input('Relative_Name', req.body.Relative_Name);
            request.input('Gender', req.body.Gender);
            request.input('Relation', req.body.Relation);
            request.input('Remarks', req.body.Remarks);
            request.input('Date_Of_Birth', new Date(req.body.Date_Of_Birth));// FORMAT (M-D-Y)
            request.input('Created_By', parseInt(req.body.Created_By));
            request.input('EmployeeId', parseInt(req.body.EmployeeId));


            request.execute('Proc_Employee_Family_Details', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR VIEW ALL EMPLOYEE FAMILY DETAILS  DETAILS

        app.post('/viewempfamdetails', function (req, res) {
            var request = new sql.Request(connection);
            var data_added = true;
            request.input('Operation', 'SELECT');
            request.execute('Proc_Employee_Family_Details', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR VIEW SINGLE EMPLOYEE FAMILY DETAILS  DETAILS

        app.post('/view_single_empfamdetails', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'SELECTBYID');
            request.input('EmployeeId', req.body.EmployeeId);
            request.execute('Proc_Employee_Family_Details', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR SEARCH EMPLOYEE FAMILY DETAILS DETAILS BY ID

        app.post('/search_designationdetails', function (req, res) {
            var request = new sql.Request(connection);
            var data_added = true;
            request.input('Operation', 'SEARCH');
            //request.input('ID', req.body.id);
            request.input('OUT_CODE', parseInt(req.body.id));
            request.execute('Proc_Employee_Family_Details', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR DELETE EMPLOYEE FAMILY DETAILS DETAILS
        app.post('/delete_empfam_details', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'DELETE');
            request.input('EmployeeId', req.body.EmployeeId);
            request.execute('Proc_Employee_Family_Details', function (err, rec) {
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