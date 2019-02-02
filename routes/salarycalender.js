var sql = require('mssql');

module.exports = {
    configure: function (app, assert, config, connection) {

        //API FOR ADD SALARY CALENDER DETAILS
        app.post('/add_salarycalender_details', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'INSERT');
            request.input('Name', req.body.Name);
            request.input('Short_Name', req.body.Short_Name);

            request.input('Created_By', parseInt(req.body.Created_By));
            request.execute('Proc_Salarycalender_MST', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR UPDATE SALARY CALENDER  DETAILS
        app.post('/update_salarycalender_details', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'UPDATE');
            request.input('Name', req.body.Name);
            request.input('Short_Name', req.body.Short_Name);
            request.input('Created_By', parseInt(req.body.Created_By));
            request.input('Salary_Calendar_Id', parseInt(req.body.id));//SALARY CALENDER  ID

            request.execute('Proc_Salarycalender_MST', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR VIEW SALARY CALENDER  DETAILS

        app.post('/view_salarycalender_details', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'SELECT');

            request.execute('Proc_salarycalender_MST', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR VIEW SINGLE SALARY CALENDER  DETAILS
        app.post('/view_single_salarycalender_details', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'SELECTBYID');
            request.input('Salary_Calendar_Id', parseInt(req.body.id));//SALARY CALENDER  ID
            request.execute('Proc_Salarycalender_MST', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR SEARCHSALARY CALENDER  DETAILS

        app.post('/search_salarycalender_details', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'SEARCH');
            request.input('OUT_CODE', parseInt(req.body.id));
            request.execute('Proc_Salarycalender_MST', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR DELETE SINGLESALARY CALENDER  DETAILS

        app.post('/delete_salarycalender_details', function (req, res) {

            var request = new sql.Request(connection);
            request.input('Operation', 'DELETE');
            request.input('Salary_Calendar_Id', parseInt(req.body.id));//SALARY CALENDER  ID
            request.execute('Proc_Salarycalender_MST', function (err, rec) {
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