
var sql = require('mssql');

module.exports = {
    configure: function (app, assert, config, connection) {
        //API FOR ADD EMPLOYEE DISCIPLINARY DETAILS DETAILS
        app.post('/addemployeedisciplinarydetails', function (req, res) {
            var request = new sql.Request(connection);

            request.input('Operation', 'INSERT');
            request.input('Memo', req.body.Memo);
            request.input('Issue_By', req.body.Issue_By);
            request.input('Issue_Date', new Date(req.body.Issue_Date));//M-D-Y
            request.input('Comments', req.body.Comments);
            request.input('Remarks', req.body.Remarks);
            request.input('Created_By', parseInt(req.body.Created_By));

            request.execute('Proc_Employee_Disciplinary_DTL', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR UPDATE EMPLOYEE DISCIPLINARY DETAILS  DETAILS
        app.post('/updateemployeedisciplinarydetails', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'UPDATE');
            request.input('Memo', req.body.Memo);
            request.input('Issue_By', req.body.Issue_By);
            request.input('Issue_Date', new Date(req.body.Issue_Date));
            request.input('Comments', req.body.Comments);
            request.input('Remarks', req.body.Remarks);
            request.input('Created_By', parseInt(req.body.Created_By));
            request.input('EmployeeId', parseInt(req.body.EmployeeId));

            request.execute('Proc_Employee_Disciplinary_DTL', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR VIEW ALL EMPLOYEE DISCIPLINARY DETAILS  DETAILS

        app.post('/viewempdisciplinarydetails', function (req, res) {
            var request = new sql.Request(connection);
            var data_added = true;
            request.input('Operation', 'SELECT');
            request.execute('Proc_Employee_Disciplinary_DTL', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR VIEW SINGLE EMPLOYEE DISCIPLINARY DETAILS  DETAILS

        app.post('/view_single_empdisciplinarydetails', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'SELECTBYID');
            request.input('EmployeeId', req.body.EmployeeId);
            request.execute('Proc_Employee_Disciplinary_DTL', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR SEARCH EMPLOYEE DISCIPLINARY DETAILS DETAILS BY ID

        app.post('/search_empdisciplinarydetails', function (req, res) {
            var request = new sql.Request(connection);
            var data_added = true;
            request.input('Operation', 'SEARCH');
            //request.input('ID', req.body.id);
            request.input('OUT_CODE', parseInt(req.body.id));
            request.execute('Proc_Employee_Disciplinary_DTL', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR DELETE EMPLOYEE DISCIPLINARY DETAILS DETAILS
        app.post('/delete_empdisciplinary_details', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'DELETE');
            request.input('EmployeeId', req.body.EmployeeId);
            request.execute('Proc_Employee_Disciplinary_DTL', function (err, rec) {
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