
var sql = require('mssql');

module.exports = {
    configure: function (app, assert, config, connection) {
        //API FOR ADD EMPLOYEE TRAINING DETAILS DETAILS
        app.post('/addemployeetrainingdetails', function (req, res) {
            var request = new sql.Request(connection);

            request.input('Operation', 'INSERT');
            request.input('Training_Name', req.body.Training_Name);
            request.input('From_Date', new Date(req.body.From_Date));
            request.input('To_Date', new Date(req.body.To_Date));
            request.input('Comments', req.body.Comments);
            request.input('Remarks', req.body.Remarks);
            request.input('Created_By', parseInt(req.body.Created_By));

            request.execute('Proc_Employee_Training_DTL', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR UPDATE EMPLOYEE TRAINING DETAILS  DETAILS
        app.post('/updateemployeetrainingdetails', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'UPDATE');
            request.input('Training_Name', req.body.Training_Name);
            request.input('From_Date', new Date(req.body.From_Date));//M-D-Y
            request.input('To_Date', new Date(req.body.To_Date));//M-D-Y
            request.input('Comments', req.body.Comments);
            request.input('Remarks', req.body.Remarks);
            request.input('Created_By', parseInt(req.body.Created_By));
            request.input('EmployeeId', parseInt(req.body.EmployeeId));


            request.execute('Proc_Employee_Training_DTL', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR VIEW ALL EMPLOYEE TRAINING DETAILS  DETAILS

        app.post('/viewemptrainingdetails', function (req, res) {
            var request = new sql.Request(connection);
            
            request.input('Operation', 'SELECT');
            request.execute('Proc_Employee_Training_DTL', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR VIEW SINGLE EMPLOYEE TRAINING DETAILS  DETAILS

        app.post('/view_single_emptrainingdetails', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'SELECTBYID');
            request.input('EmployeeId', req.body.EmployeeId);
            request.execute('Proc_Employee_Training_DTL', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR SEARCH EMPLOYEE TRAINING DETAILS DETAILS BY ID

        app.post('/search_emptrainingdetails', function (req, res) {
            var request = new sql.Request(connection);
            var data_added = true;
            request.input('Operation', 'SEARCH');
            //request.input('ID', req.body.id);
            request.input('OUT_CODE', parseInt(req.body.id));
            request.execute('Proc_Employee_Training_DTL', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR DELETE EMPLOYEE TRAINING DETAILS DETAILS
        app.post('/delete_emptraining_details', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'DELETE');
            request.input('EmployeeId', req.body.EmployeeId);
            request.execute('Proc_Employee_Training_DTL', function (err, rec) {
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