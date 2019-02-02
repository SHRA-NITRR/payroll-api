
var sql = require('mssql');

module.exports = {
    configure: function (app, assert, config, connection) {

        //API FOR ADD DIVISION DETAILS
        app.post('/add_division_details', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'INSERT');
            request.input('division_Name', req.body.division_Name);
            request.input('Division_Short_Name', req.body.Division_Short_Name);

            request.input('Created_By', parseInt(req.body.Created_By));
            request.execute('Proc_Division_MST', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR UPDATE DIVISION  DETAILS
        app.post('/update_division_details', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'UPDATE');
            request.input('division_Name', req.body.division_Name);
            request.input('Division_Short_Name', req.body.Division_Short_Name);
            request.input('Created_By', parseInt(req.body.Created_By));
            request.input('division_Id', parseInt(req.body.id));//DIVISION  ID

            request.execute('Proc_Division_MST', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR VIEW DIVISION  DETAILS

        app.post('/view_division_details', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'SELECT');

            request.execute('Proc_Division_MST', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR VIEW SINGLE DIVISION  DETAILS
        app.post('/view_single_division_details', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'SELECTBYID');
            request.input('division_Id', parseInt(req.body.id));//DIVISION  ID
            request.execute('Proc_Division_MST', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR SEARCHDIVISION  DETAILS

        app.post('/search_division_details', function (req, res) {
            var request = new sql.Request(connection);
            request.input('Operation', 'SEARCH');
            request.input('OUT_CODE', parseInt(req.body.id));
            request.execute('Proc_Division_MST', function (err, rec) {
                if (err) {
                    console.log(err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true, result: rec.recordsets[0] });
                }
            });
        });

        //API FOR DELETE SINGLEDIVISION  DETAILS

        app.post('/delete_division_details', function (req, res) {

            var request = new sql.Request(connection);
            request.input('Operation', 'DELETE');
            request.input('division_Id', parseInt(req.body.id));//DIVISION  ID
            request.execute('Proc_Division_MST', function (err, rec) {
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