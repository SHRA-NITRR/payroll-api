
var sql = require('mssql');

module.exports = {
    configure: function (app, assert, config, connection) {
        //API FOR ADD EMPLOYEE CURRICULAM DETAILS DETAILS
        app.post('/addemployeecurriculamdetails', function (req, res) {
            var request = new sql.Request(connection);

            request.input('Operation', 'INSERT');
            request.input('Activity_Name', req.body.Activity_Name);
            request.input('Event_Name', req.body.Event_Name);
            request.input('From_Date', new Date(req.body.From_Date));//M-D-Y
            request.input('To_Date', new Date(req.body.To_Date));//M-D-Y
            request.input('Award', req.body.Award);
            request.input('Remarks', req.body.Remarks);
            request.input('Created_By', parseInt(req.body.Created_By));

            request.execute('Proc_Employee_EXTRA_CURRICULAR_DTL', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR UPDATE EMPLOYEE CURRICULAM DETAILS  DETAILS
        app.post('/updateemployeecurriculamdetails', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'UPDATE');
            request.input('Activity_Name', req.body.Activity_Name);
            request.input('Event_Name', req.body.Event_Name);
            request.input('From_Date', new Date(req.body.From_Date));//M-D-Y
            request.input('To_Date', new Date(req.body.To_Date));//M-D-Y
            request.input('Award', req.body.Award);
            request.input('Remarks', req.body.Remarks);
            request.input('Created_By', parseInt(req.body.Created_By));
            request.input('EmployeeId', parseInt(req.body.EmployeeId));

            request.execute('Proc_Employee_EXTRA_CURRICULAR_DTL', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR VIEW ALL EMPLOYEE CURRICULAM DETAILS  DETAILS

        app.post('/viewempcurriculamdetails', function (req, res) {
            var request = new sql.Request(connection);
            var data_added = true;
            request.input('Operation', 'SELECT');
            request.execute('Proc_Employee_EXTRA_CURRICULAR_DTL', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR VIEW SINGLE EMPLOYEE CURRICULAM DETAILS  DETAILS

        app.post('/view_single_empcurriculamdetails', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'SELECTBYID');
            request.input('EmployeeId', req.body.EmployeeId);
            request.execute('Proc_Employee_EXTRA_CURRICULAR_DTL', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR SEARCH EMPLOYEE CURRICULAM DETAILS DETAILS BY ID

        app.post('/search_empcurriculamdetails', function (req, res) {
            var request = new sql.Request(connection);
            var data_added = true;
            request.input('Operation', 'SEARCH');
            //request.input('ID', req.body.id);
            request.input('OUT_CODE', parseInt(req.body.id));
            request.execute('Proc_Employee_EXTRA_CURRICULAR_DTL', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR DELETE EMPLOYEE CURRICULAM DETAILS DETAILS
        app.post('/delete_empcurriculam_details', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'DELETE');
            request.input('EmployeeId', req.body.EmployeeId);
            request.execute('Proc_Employee_EXTRA_CURRICULAR_DTL', function (err, rec) {
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