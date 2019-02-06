
var sql = require('mssql');

module.exports = {
    configure: function (app, assert, config, connection) {
        //API FOR ADD EMPLOYEE EDUCATION DETAILS DETAILS
        app.post('/addemployeeedudetails', function (req, res) {
            var request = new sql.Request(connection);

            request.input('Operation', 'INSERT');
            request.input('Qualfication', req.body.Qualfication);
            request.input('University', req.body.University);
            request.input('Year_Passed', req.body.Year_Passed);
            request.input('Remarks', req.body.Remarks);
            request.input('Created_By', parseInt(req.body.Created_By));

            request.execute('Proc_Employee_Education_DTL', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR UPDATE EMPLOYEE EDUCATION DETAILS  DETAILS
        app.post('/updateemployeeedudetails', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'UPDATE');
            request.input('Qualfication', req.body.Qualfication);
            request.input('University', req.body.University);
            request.input('Year_Passed', req.body.Year_Passed);
            request.input('Remarks', req.body.Remarks);
            request.input('Created_By', parseInt(req.body.Created_By));
            request.input('EmployeeId', parseInt(req.body.EmployeeId));


            request.execute('Proc_Employee_Education_DTL', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR VIEW ALL EMPLOYEE EDUCATION DETAILS  DETAILS

        app.post('/viewempedudetails', function (req, res) {
            var request = new sql.Request(connection);
            var data_added = true;
            request.input('Operation', 'SELECT');
            request.execute('Proc_Employee_Education_DTL', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR VIEW SINGLE EMPLOYEE EDUCATION DETAILS  DETAILS

        app.post('/view_single_empedudetails', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'SELECTBYID');
            request.input('EmployeeId', req.body.EmployeeId);
            request.execute('Proc_Employee_Education_DTL', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR SEARCH EMPLOYEE EDUCATION DETAILS DETAILS BY ID

        app.post('/search_empedudetails', function (req, res) {
            var request = new sql.Request(connection);
            var data_added = true;
            request.input('Operation', 'SEARCH');
            //request.input('ID', req.body.id);
            request.input('OUT_CODE', parseInt(req.body.id));
            request.execute('Proc_Employee_Education_DTL', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR DELETE EMPLOYEE EDUCATION DETAILS DETAILS
        app.post('/delete_empedu_details', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'DELETE');
            request.input('EmployeeId', req.body.EmployeeId);
            request.execute('Proc_Employee_Education_DTL', function (err, rec) {
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