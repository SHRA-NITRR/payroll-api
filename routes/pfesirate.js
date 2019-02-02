var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');

module.exports = {
   configure: function (app, assert, config, connection) {
     
      //API FOR ADD PFESI RATE 
      app.post('/addpfesirate', function (req, res) {
         var request = new sql.Request(connection);
          
            request.input('Operation', 'INSERT');
            request.input('Effective_From',new Date(req.body.Effective_Form));
            request.input('PF_Rate', parseFloat(req.body.PF_Rate));
            request.input('PF_Cut_Off', parseFloat(req.body.PF_Cut_Off));
            request.input('Is_Aply_Spec_CutOff', req.body.Is_Aply_Spec_CutOff.toLowerCase() == 'true' ? true : false);
            request.input('PF_Spec_Cut_Off', parseFloat(req.body.PF_Spec_Cut_Off));
            request.input('PF_Employer_Pension', parseFloat(req.body.PF_Employer_Pension));
            request.input('EMPR_PF_Rate', parseFloat(req.body.EMPR_PF_Rate));
            request.input('PF_Round_Off', req.body.PF_Round_Off);
            request.input('PF_Is_Rest_EMPR_Share', req.body.PF_Is_Rest_EMPR_Share.toLowerCase() == 'true' ? true : false);
            request.input('PF_Is_Rest_EMPL_TO_EMPR', req.body.PF_Is_Rest_EMPL_TO_EMPR.toLowerCase() == 'true' ? true : false);
            request.input('ESI_EMPL_Rate', parseFloat(req.body.ESI_EMPL_Rate));
            request.input('ESI_EMPR_Rate', parseFloat(req.body.ESI_EMPR_Rate));
            request.input('ESI_Cut_Off', parseFloat(req.body.ESI_Cut_Off));
            request.input('ESI_Min_Wage', parseFloat(req.body.ESI_Min_Wage));
            request.input('ESI_Round_Off', req.body.ESI_Round_Off);
            request.input('Acc_02', parseFloat(req.body.Acc_02));
            request.input('Acc_21', parseFloat(req.body.Acc_21));
            request.input('Acc_22', parseFloat(req.body.Acc_22));
            request.input('Created_By', parseInt(req.body.Created_By));

            request.execute('Proc_PF_ESI_Rate_Sett', function (err, rec) {
               if (err) {  
                  console.log(err);           
                  res.json({ status: false });           
               }
               else {
                  res.json({ status: true });
               }
            });
         });
    
      //API FOR UPDATE PFESI RATE
      app.post('/updatepfesirate', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'UPDATE');
            request.input('PF_ESI_Rate_Id', parseInt(req.body.id));//PF ESI SETTING ID
            var date = new Date(req.body.Effective_Form);
            request.input('Effective_From', date);
            request.input('PF_Rate', parseFloat(req.body.PF_Rate));
            request.input('PF_Cut_Off', parseFloat(req.body.PF_Cut_Off));
            request.input('Is_Aply_Spec_CutOff', req.body.Is_Aply_Spec_CutOff.toLowerCase() == 'true' ? true : false);
            request.input('PF_Spec_Cut_Off', parseFloat(req.body.PF_Spec_Cut_Off));
            request.input('PF_Employer_Pension', parseFloat(req.body.PF_Employer_Pension));
            request.input('EMPR_PF_Rate', parseFloat(req.body.EMPR_PF_Rate));
            request.input('PF_Round_Off', req.body.PF_Round_Off);
            request.input('PF_Is_Rest_EMPR_Share', req.body.PF_Is_Rest_EMPR_Share.toLowerCase() == 'true' ? true : false);
            request.input('PF_Is_Rest_EMPL_TO_EMPR', req.body.PF_Is_Rest_EMPL_TO_EMPR.toLowerCase() == 'true' ? true : false);
            request.input('ESI_EMPL_Rate', parseFloat(req.body.ESI_EMPL_Rate));
            request.input('ESI_EMPR_Rate', parseFloat(req.body.ESI_EMPR_Rate));
            request.input('ESI_Cut_Off', parseFloat(req.body.ESI_Cut_Off));
            request.input('ESI_Min_Wage', parseFloat(req.body.ESI_Min_Wage));
            request.input('ESI_Round_Off', req.body.ESI_Round_Off);
            request.input('Acc_02', parseFloat(req.body.Acc_02));
            request.input('Acc_21', parseFloat(req.body.Acc_21));
            request.input('Acc_22', parseFloat(req.body.Acc_22));
            request.input('Created_By', parseInt(req.body.Created_By));

            request.execute('Proc_PF_ESI_Rate_Sett', function (err, rec) {
               if (err) { 
                  console.log(err);     
                  res.json({ status: false });      
               }
               else {
                  res.json({ status: true });
               }
            });
         });
    
      //API FOR VIEW PFESI RATE
      app.post('/viewallpfesirate', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'SELECT');
            //request.input('ID', req.body.id);
            request.execute('Proc_PF_ESI_Rate_Sett', function (err, rec) {
               if (err) {
                console.log();
                  res.json({ status: false });
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0] });
               }
            });
         });

      //API FOR SEARCH PFESI RATE DETAILS
      app.post('/search_pfesirate_details', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'SEARCH');
            request.input('OUT_CODE', parseInt(req.body.id));
            request.execute('Proc_PF_ESI_Rate_Sett', function (err, rec) {
               if (err) {
                  console.log();
                  res.json({ status: false });
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0] });
               }
            });
         });
    
      //API FOR VIEW SINGLE PFESI RATE DETAILS
      app.post('/view_single_pfesirate_details', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'SELECTBYID');
            request.input('PF_ESI_Rate_Id', req.body.id);// PFESI RATE GROUP ID

            request.execute('Proc_PF_ESI_Rate_Sett', function (err, rec) {
               if (err) {
                  console.log();
                  res.json({ status: false });
               }
               else {
                  res.json({ status: true, result: rec.recordset[0] });
               }
            });
         });

      //API FOR DELETE PFESIRATE DETAILS
      app.post('/delete_pfesirate_details', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'DELETE');
            request.input('PF_ESI_Rate_Id', req.body.id);//PFESI RATE ID

            request.execute('Proc_PF_ESI_Rate_Sett', function (err, rec) {
               if (err) {
                  console.log();
                  res.json({ status: false });
               }
               else {
                  res.json({ status: true });
               }
            });
         });
   }
}