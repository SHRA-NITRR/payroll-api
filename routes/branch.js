
var sql = require('mssql');

module.exports = {
   configure: function (app, assert, config, connection) {
      //API FOR ADD COMPANY $ BRANCH DETAILS
      app.post('/add_branchdetails', function (req, res) {

         req.body.branch.forEach(function (doc, err) {
            
            var request2 = new sql.Request(connection);
            request2.input('Operation', 'INSERT');

            request2.input('Branch_Name', doc.Branch_Name);

            request2.input('Branch_Address', doc.Branch_Address);

            request2.input('Branch_Address2', doc.Branch_Address2);

            request2.input('Branch_PhoneNo', parseInt(doc.Branch_PhoneNo));

            request2.input('Branch_Person_Name', doc.Branch_Person_Name);

            request2.input('Branch_Email', doc.Branch_Email);

            request2.input('Branch_PF_Group', doc.Branch_PF_Group);

            request2.input('Branch_PT_Group', doc.Branch_PT_Group);

            request2.input('Branch_ESI_Group', doc.Branch_ESI_Group);

            request2.execute('PROC_COMPANY_BRANCH', function (errr, rec) {
               if (errr) {            
                  res.json({ status: false });
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0] });
               }
            })
         });
      });

      //API FOR VIEW ALL BRANCH DETAILS

      app.post('/viewbranchdetails', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'SELECT');
            //request.input('ID', req.body.id);
            //request.input('Company_Person_Name', req.body.Company_Person_Name)
            request.execute('PROC_COMPANY_BRANCH', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0] });
               }
            });
         });
      
       //API FOR VIEW SINGLE BRANCH DETAILS
       app.post('/viewsinglebranchdetails', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'SELECTBYID');
            request.input('Company_Id', req.body.id);// COMPANYID 
            request.input('Branch_Id', req.body.Branch_Id)// BRANCH ID
            request.execute('PROC_COMPANY_BRANCH', function (err, recc) {
               if (err) {
                  res.json({ status: false });
               }
               else {
                  res.json({ status: true, result: recc.recordsets[0] });
                 
               }
            });
         });
      
//API FOR DELETE BRANCH DETAILS
app.post('/delete_branch_details', function (req, res) {
   var request = new sql.Request(connection);
      request.input('Operation', 'DELETEBYID');
      request.input('Branch_Id', req.body.id);//BRANCH ID
      //request.input('Company_Person_Name', req.body.Company_Person_Name)
      request.execute('PROC_COMPANY_BRANCH', function (err, recordsets, returnValue, affected) {
         if (err) {
            res.json({ status: false });
         }
         else {
            res.json({ status: true });
         }
      });
   });

   }
}