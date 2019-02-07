var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');

module.exports = {
   configure: function (app, assert, config, connection) {

      var multer = require('multer');

      var Storage = multer.diskStorage({
         destination: function (req, file, callback) {
            callback(null, "./Employee_Images");
         },
         filename: function (req, file, callback) {
            //  callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
            callback(null, file.originalname);
         }
      });

      var upload = multer({ storage: Storage });

      //API FOR ADD EMPLOYEE DETAILS
      app.post('/addemployeedetails', upload.single('Employee_Image'), function (req, res) {
        
            var request = new sql.Request(connection);
            request.input('Operation', 'INSERT');
            request.input('Created_By', parseInt(req.body.Created_By));
            request.input('Employee_Title', req.body.Employee_Title);
            request.input('Employee_Name', req.body.Employee_Name);
            request.input('FathersName', req.body.FathersName);
            request.input('MothersName', req.body.MothersName);
            request.input('NomineeName', req.body.NomineeName);
            request.input('Gender', req.body.Gender);
            request.input('Occupation', req.body.Occupation);
            request.input('Division', req.body.Division);
            request.input('Grade', req.body.Grade);
            request.input('Emp_Attendance', req.body.Emp_Attendance);
            request.input('BloodGroup', req.body.BloodGroup);
            request.input('DateOfBirth', req.body.DateOfBirth);////////////
            request.input('Present_Res_No', req.body.Present_Res_No);
            request.input('Present_Res_Name', req.body.Present_Res_Name);
            request.input('Present_Road', req.body.Present_Road);
            request.input('Present_Area', req.body.Present_Area);
            request.input('Present_City', req.body.Present_City);
            request.input('Present_State', req.body.Present_State);
            request.input('Present_Pincode', req.body.Present_Pincode);
            request.input('Marital_Status', req.body.Marital_Status);
            request.input('Ward_Circle', req.body.Ward_Circle);
            request.input('BankAcNo', req.body.BankAcNo);
            request.input('Bank_Name', req.body.Bank_Name);
            request.input('Branch_Name', req.body.Branch_Name);
            request.input('Email_ID', req.body.Email_ID);
            request.input('Is_Default_EmailId', req.body.Is_Default_EmailId.toLowerCase() == 'true' ? true : false);
            request.input('Alt_Email_ID', req.body.Alt_Email_ID);
            //request.input('Is_Default_Alt_EmailId',req.body.Is_Default_Alt_EmailId);
            request.input('Is_Default_Alt_EmailId', req.body.Is_Default_Alt_EmailId.toLowerCase() == 'true' ? true : false);
            request.input('CC_Email_ID', req.body.CC_Email_ID);
            request.input('STD_Code', req.body.STD_Code);
            request.input('PhoneNo', req.body.PhoneNo);
            request.input('Mobile', req.body.Mobile);
            request.input('PANno', req.body.PANno);
            request.input('AAdhar_No', req.body.AAdhar_No);
            request.input('VoterId', req.body.VoterId);
            request.input('PassportNo', req.body.PassportNo);
            request.input('Marriage_Date', req.body.Marriage_Date);///////////
            request.input('Department_Id', parseInt(req.body.Department_Id));
            request.input('Desig_Id', parseInt(req.body.Desig_Id));
            request.input('Emp_Cate_Id', parseInt(req.body.Emp_Cate_Id));
            request.input('Employee_Image', req.file.originalname);////////////
            request.input('Date_of_Join', req.body.Date_of_Join);
            request.input('Salary_Calc_From', req.body.Salary_Calc_From);
            request.input('Is_Leaving', req.body.Is_Leaving.toLowerCase() == 'true' ? true : false);
            request.input('Date_of_Leave', req.body.Date_of_Leave);
            request.input('Reason_Of_Leave', req.body.Reason_Of_Leave);
            request.input('Past_Service_inDay', parseInt(req.body.Past_Service_inDay));
            request.input('IsESI', req.body.IsESI.toLowerCase() == 'true' ? true : false);
            request.input('ESI_No', req.body.ESI_No);
            request.input('ESI_Dispensary', req.body.ESI_Dispensary);
            request.input('IsPF', req.body.IsPF.toLowerCase() == 'true' ? true : false);
            request.input('PF_No', req.body.PF_No);
            request.input('PF_Dept_File', req.body.PF_Dept_File);
            request.input('Is_Restrict_PF', req.body.Is_Restrict_PF.toLowerCase() == 'true' ? true : false);
            request.input('Is_Zero_Pension', req.body.Is_Zero_Pension.toLowerCase() == 'true' ? true : false);
            request.input('Is_Zero_PT', req.body.Is_Zero_PT.toLowerCase() == 'true' ? true : false);
            request.input('IsGRI', req.body.IsGRI.toLowerCase() == 'true' ? true : false);
            request.input('GRI_No', req.body.GRI_No);
            request.input('IsInsurance', req.body.IsInsurance.toLowerCase() == 'true' ? true : false);
            request.input('Insurance_No', req.body.Insurance_No);
            request.input('IsDisabled', req.body.IsDisabled);
            request.input('IsInternationalworker', req.body.IsInternationalworker);
            request.input('IsHigherEPF', req.body.IsHigherEPF);
            request.input('IsHigherEPS', req.body.IsHigherEPS);
            request.input('Permanent_Res_No', req.body.Permanent_Res_No);
            request.input('Permanent_Res_Name', req.body.Permanent_Res_Name);
            request.input('Permanent_Road', req.body.Permanent_Road);
            request.input('Permanent_Area', req.body.Permanent_Area);
            request.input('Permanent_City', req.body.Permanent_City);
            request.input('Permanent_State', req.body.Permanent_State);
            request.input('Permanent_Pincode', req.body.Permanent_Pincode);

            request.execute('Proc_Employee_Details', function (err, rec) {
               if (err) {
                  res.json({ status: false });
               }
               else {
                  res.json({ status: true });
               }
            });
         });

      //API FOR UPDATE EMPLOYEEDETAILS
      app.post('/updateemployeedetails', upload.single('Employee_Image'), function (req, res) {
         var request = new sql.Request(connection);
         var data_added = true;
         request.input('Operation', 'UPDATE');
         request.input('EmployeeId', parseInt(req.body.id));//EMPLOYEE ID
         request.input('Employee_Title', req.body.Employee_Title);
         request.input('Employee_Name', req.body.Employee_Name);
         request.input('FathersName', req.body.FathersName);
         request.input('MothersName', req.body.MothersName);
         request.input('NomineeName', req.body.NomineeName);
         request.input('Gender', req.body.Gender);
         request.input('Occupation', req.body.Occupation);
         request.input('Division', req.body.Division);
         request.input('Grade', req.body.Grade);
         request.input('Emp_Attendance', req.body.Emp_Attendance);
         request.input('BloodGroup', req.body.BloodGroup);
         request.input('DateOfBirth', req.body.DateOfBirth);////////////
         request.input('Present_Res_No', req.body.Present_Res_No);
         request.input('Present_Res_Name', req.body.Present_Res_Name);
         request.input('Present_Road', req.body.Present_Road);
         request.input('Present_Area', req.body.Present_Area);
         request.input('Present_City', req.body.Present_City);
         request.input('Present_State', req.body.Present_State);
         request.input('Present_Pincode', req.body.Present_Pincode);
         request.input('Marital_Status', req.body.Marital_Status);
         request.input('Ward_Circle', req.body.Ward_Circle);
         request.input('BankAcNo', req.body.BankAcNo);
         request.input('Bank_Name', req.body.Bank_Name);
         request.input('Branch_Name', req.body.Branch_Name);
         request.input('Email_ID', req.body.Email_ID);
         request.input('Is_Default_EmailId', req.body.Is_Default_EmailId.toLowerCase() == 'true' ? true : false);
         request.input('Alt_Email_ID', req.body.Alt_Email_ID);
         //request.input('Is_Default_Alt_EmailId',req.body.Is_Default_Alt_EmailId);
         request.input('Is_Default_Alt_EmailId', req.body.Is_Default_Alt_EmailId.toLowerCase() == 'true' ? true : false);
         request.input('CC_Email_ID', req.body.CC_Email_ID);
         request.input('STD_Code', req.body.STD_Code);
         request.input('PhoneNo', req.body.PhoneNo);
         request.input('Mobile', req.body.Mobile);
         request.input('PANno', req.body.PANno);
         request.input('AAdhar_No', req.body.AAdhar_No);
         request.input('VoterId', req.body.VoterId);
         request.input('PassportNo', req.body.PassportNo);
         request.input('Marriage_Date', req.body.Marriage_Date);///////////
         request.input('Department_Id', parseInt(req.body.Department_Id));
         request.input('Desig_Id', parseInt(req.body.Department_Id));
         request.input('Emp_Cate_Id', parseInt(req.body.Emp_Cate_Id));
         request.input('Employee_Image', req.file.originalname);
         request.input('Date_of_Join', req.body.Date_of_Join);
         request.input('Salary_Calc_From', req.body.Salary_Calc_From);
         request.input('Is_Leaving', req.body.Is_Leaving.toLowerCase() == 'true' ? true : false);
         request.input('Date_of_Leave', req.body.Date_of_Leave);
         request.input('Reason_Of_Leave', req.body.Reason_Of_Leave);
         request.input('Past_Service_inDay', parseInt(req.body.Past_Service_inDay));
         request.input('IsESI', req.body.IsESI.toLowerCase() == 'true' ? true : false);
         request.input('ESI_No', req.body.ESI_No);
         request.input('ESI_Dispensary', req.body.ESI_Dispensary);
         request.input('IsPF', req.body.IsPF.toLowerCase() == 'true' ? true : false);
         request.input('PF_No', req.body.PF_No);
         request.input('PF_Dept_File', req.body.PF_Dept_File);
         request.input('Is_Restrict_PF', req.body.Is_Restrict_PF.toLowerCase() == 'true' ? true : false);
         request.input('Is_Zero_Pension', req.body.Is_Zero_Pension.toLowerCase() == 'true' ? true : false);
         request.input('Is_Zero_PT', req.body.Is_Zero_PT.toLowerCase() == 'true' ? true : false);
         request.input('IsGRI', req.body.IsGRI.toLowerCase() == 'true' ? true : false);
         request.input('GRI_No', req.body.GRI_No);
         request.input('IsInsurance', req.body.IsInsurance.toLowerCase() == 'true' ? true : false);
         request.input('Insurance_No', req.body.Insurance_No);
         request.input('IsDisabled', req.body.IsDisabled);
         request.input('IsInternationalworker', req.body.IsInternationalworker);
         request.input('IsHigherEPF', req.body.IsHigherEPF);
         request.input('IsHigherEPS', req.body.IsHigherEPS);
         request.input('Permanent_Res_No', req.body.Permanent_Res_No);
         request.input('Permanent_Res_Name', req.body.Permanent_Res_Name);
         request.input('Permanent_Road', req.body.Permanent_Road);
         request.input('Permanent_Area', req.body.Permanent_Area);
         request.input('Permanent_City', req.body.Permanent_City);
         request.input('Permanent_State', req.body.Permanent_State);
         request.input('Permanent_Pincode', req.body.Permanent_Pincode);
         request.input('Created_By', parseInt(req.body.Created_By));

            request.execute('Proc_Employee_Details', function (err, rec) {
               if (err) {
                  // console.log(err);
                  res.json({ status: false, message: err });       
               }
               else {
                  res.json({ status: true });          
               }
            });
      });

      //API FOR VIEW ALL EMPLOYEE DETAILS

      app.post('/viewallemployee', function (req, res) {
        
            var request = new sql.Request(connection);
            request.input('Operation', 'SELECT');
            request.execute('Proc_Employee_Details', function (err, rec) {
               if (err) {
                  res.json({ status: false });
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0] });
               }
            });
         });
     
      //API FOR SEARCH EMPLOYEE DETAILS

      app.post('/search_employee', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'SELECT');
            //request.input('ID', req.body.id);
            request.input('OUT_CODE', parseInt(req.body.id));
            request.execute('Proc_Employee_Details', function (err, rec) {
               if (err) {
                  res.json({ status: false });
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0] });
               }
            });
         });

      //API FOR VIEW SINGLE EMPLOYEE DETAILS

      app.post('/view_single_employee', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'SELECTBYID');
            request.input('EmployeeId', parseInt(req.body.id));//EMPLOYEE ID

            request.execute('Proc_Employee_Details', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
               }
               else {
                  res.json({ status: true, result: rec.recordset[0] }); 
               }
            });
         });
   

      //API FOR DELETE EMPLOYEE DETAILS

      app.post('/delete_employee', function (req, res) {
         var request = new sql.Request(connection);
            request.input('Operation', 'DELETE');
            request.input('EmployeeId', parseInt(req.body.id));//EMPLOYEE ID

            request.execute('Proc_Employee_Details', function (err, rec) {
               if (err) {
                  res.json({ status: false });
               }
               else {
                  res.json({ status: true });
               }
            });
         });
     





 //API FOR ADD EMPLOYEE & HR  DETAILS/////////////////////////////////////////

 app.post('/emphrdetails', upload.single('Employee_Image'), function (req, res)
  {     
   var request = new sql.Request(connection);
   request.input('Operation', 'INSERT');
   request.input('Created_By', parseInt(req.body.Created_By));
   request.input('Employee_Title', req.body.Employee_Title);
   request.input('Employee_Name', req.body.Employee_Name);
   request.input('FathersName', req.body.FathersName);
   request.input('MothersName', req.body.MothersName);
   request.input('NomineeName', req.body.NomineeName);
   request.input('Gender', req.body.Gender);
   request.input('Occupation', req.body.Occupation);
   request.input('Division', req.body.Division);
   request.input('Grade', req.body.Grade);
   request.input('Emp_Attendance', req.body.Emp_Attendance);
   request.input('BloodGroup', req.body.BloodGroup);
   request.input('DateOfBirth', req.body.DateOfBirth);////////////
   request.input('Present_Res_No', req.body.Present_Res_No);
   request.input('Present_Res_Name', req.body.Present_Res_Name);
   request.input('Present_Road', req.body.Present_Road);
   request.input('Present_Area', req.body.Present_Area);
   request.input('Present_City', req.body.Present_City);
   request.input('Present_State', req.body.Present_State);
   request.input('Present_Pincode', req.body.Present_Pincode);
   request.input('Marital_Status', req.body.Marital_Status);
   request.input('Ward_Circle', req.body.Ward_Circle);
   request.input('BankAcNo', req.body.BankAcNo);
   request.input('Bank_Name', req.body.Bank_Name);
   request.input('Branch_Name', req.body.Branch_Name);
   request.input('Email_ID', req.body.Email_ID);
   request.input('Is_Default_EmailId', req.body.Is_Default_EmailId.toLowerCase() == 'true' ? true : false);
   request.input('Alt_Email_ID', req.body.Alt_Email_ID);
   //request.input('Is_Default_Alt_EmailId',req.body.Is_Default_Alt_EmailId);
   request.input('Is_Default_Alt_EmailId', req.body.Is_Default_Alt_EmailId.toLowerCase() == 'true' ? true : false);
   request.input('CC_Email_ID', req.body.CC_Email_ID);
   request.input('STD_Code', req.body.STD_Code);
   request.input('PhoneNo', req.body.PhoneNo);
   request.input('Mobile', req.body.Mobile);
   request.input('PANno', req.body.PANno);
   request.input('AAdhar_No', req.body.AAdhar_No);
   request.input('VoterId', req.body.VoterId);
   request.input('PassportNo', req.body.PassportNo);
   request.input('Marriage_Date', req.body.Marriage_Date);///////////
   request.input('Department_Id', parseInt(req.body.Department_Id));
   request.input('Desig_Id', parseInt(req.body.Desig_Id));
   request.input('Emp_Cate_Id', parseInt(req.body.Emp_Cate_Id));
   request.input('Employee_Image', req.file.originalname);////////////
   request.input('Date_of_Join', new Date(req.body.Date_of_Join));
   request.input('Salary_Calc_From', req.body.Salary_Calc_From);
   request.input('Is_Leaving', req.body.Is_Leaving.toLowerCase() == 'true' ? true : false);
   request.input('Date_of_Leave', req.body.Date_of_Leave);
   request.input('Reason_Of_Leave', req.body.Reason_Of_Leave);
   request.input('Past_Service_inDay',parseInt(req.body.Past_Service_inDay));
   request.input('IsESI', req.body.IsESI.toLowerCase() == 'true' ? true : false);
   request.input('ESI_No', req.body.ESI_No);
   request.input('ESI_Dispensary', req.body.ESI_Dispensary);
   request.input('IsPF', req.body.IsPF.toLowerCase() == 'true' ? true : false);
   request.input('PF_No', req.body.PF_No);
   request.input('PF_Dept_File', req.body.PF_Dept_File);
   request.input('Is_Restrict_PF', req.body.Is_Restrict_PF.toLowerCase() == 'true' ? true : false);
   request.input('Is_Zero_Pension', req.body.Is_Zero_Pension.toLowerCase() == 'true' ? true : false);
   request.input('Is_Zero_PT', req.body.Is_Zero_PT.toLowerCase() == 'true' ? true : false);
   request.input('IsGRI', req.body.IsGRI.toLowerCase() == 'true' ? true : false);
   request.input('GRI_No', req.body.GRI_No);
   request.input('IsInsurance', req.body.IsInsurance.toLowerCase() == 'true' ? true : false);
   request.input('Insurance_No', req.body.Insurance_No);
   request.input('IsDisabled', req.body.IsDisabled);
   request.input('IsInternationalworker', req.body.IsInternationalworker);
   request.input('IsHigherEPF', req.body.IsHigherEPF);
   request.input('IsHigherEPS', req.body.IsHigherEPS);
   request.input('Permanent_Res_No', req.body.Permanent_Res_No);
   request.input('Permanent_Res_Name', req.body.Permanent_Res_Name);
   request.input('Permanent_Road', req.body.Permanent_Road);
   request.input('Permanent_Area', req.body.Permanent_Area);
   request.input('Permanent_City', req.body.Permanent_City);
   request.input('Permanent_State', req.body.Permanent_State);
   request.input('Permanent_Pincode', req.body.Permanent_Pincode);

   request.execute('Proc_Employee_Details', function (err, rec) {
      if (err) {
         //console.log(err);
         res.json({ status: false,message:"ok5" });
      }
      else {
         //res.json({ status: true });
         var one="one";

 //API FOR ADD EMPLOYEE FAMILY DETAILS DETAILS
 
   var request2 = new sql.Request(connection);

   request2.input('Operation', 'INSERT');
   request2.input('Relative_Name', req.body.Relative_Name);
   request2.input('Gender', req.body.Gender);
   request2.input('Relation', req.body.Relation);
   request2.input('Remarks', req.body.Remarks);
   request2.input('Date_Of_Birth','11-11-2019');// FORMAT (M-D-Y)
   request2.input('Created_By', parseInt(req.body.Created_By));

   request2.execute('Proc_Employee_Family_Details', function (errr, rec) {
       if (errr) {
           console.log(errr);
           res.json({ status: false ,message:"ok2"});
       }
       else {
          var two='two';
      //res.json({ status: true,message:"ok3"});

//EDUCATION DETAILS

          var request3 = new sql.Request(connection);

          request3.input('Operation', 'INSERT');
          request3.input('Qualfication', req.body.Qualfication);
          request3.input('University', req.body.University);
          request3.input('Year_Passed', req.body.Year_Passed);
          request3.input('Remarks', req.body.Remarks);
          request3.input('Created_By', parseInt(req.body.Created_By));

          request3.execute('Proc_Employee_Education_DTL', function (err, rec) {
              if (err) {
                  console.log(err);
                  res.json({ status: false });
              }
              else {
                // res.json({ status: true, result: rec.recordsets[0] });

                  var request4 = new sql.Request(connection);

                  request4.input('Operation', 'INSERT');
                  request4.input('Training_Name', req.body.Training_Name);
                  request4.input('From_Date', new Date(req.body.From_Date));
                  request4.input('To_Date', new Date(req.body.To_Date));
                  request4.input('Comments', req.body.Comments);  
                  request4.input('Remarks', req.body.Remarks);
                  request4.input('Created_By', parseInt(req.body.Created_By));
      
                  request4.execute('Proc_Employee_Training_DTL', function (err, rec) {
                      if (err) {
                          console.log(err);
                          res.json({ status: false });
                      }
                      else {
                          //res.json({ status: true, result: rec.recordsets[0] });


//EMPLOYEE DISCIPLINARY

                          var request5 = new sql.Request(connection);

                          request5.input('Operation', 'INSERT');
                          request5.input('Memo', req.body.Memo);
                          request5.input('Issue_By', req.body.Issue_By);
                          request5.input('Issue_Date', new Date(req.body.Issue_Date));//M-D-Y
                          request5.input('Comments', req.body.Comments);
                          request5.input('Remarks', req.body.Remarks);
                          request5.input('Created_By', parseInt(req.body.Created_By));
              
                          request5.execute('Proc_Employee_Disciplinary_DTL', function (err, rec) {
                              if (err) {
                                  console.log(err);
                                  res.json({ status: false });
                              }
                              else {
                                 // res.json({ status: true, result: rec.recordsets[0] });


//EXTRA CURRICULAR DETAILS

                                 var request6 = new sql.Request(connection);

                                 request6.input('Operation', 'INSERT');
                                 request6.input('Activity_Name', req.body.Activity_Name);
                                 request6.input('Event_Name', req.body.Event_Name);
                                 request6.input('From_Date', new Date(req.body.From_Date));//M-D-Y
                                 request6.input('To_Date', new Date(req.body.To_Date));//M-D-Y
                                 request6.input('Award', req.body.Award);
                                 request6.input('Remarks', req.body.Remarks);
                                 request6.input('Created_By', parseInt(req.body.Created_By));
                     
                                 request6.execute('Proc_Employee_EXTRA_CURRICULAR_DTL', function (err, rec) {
                                     if (err) {
                                         console.log(err);
                                         res.json({ status: false });
                                     }
                                     else {
                                         res.json({ status: true, result: rec.recordsets[0] });
                                     }
                                 });





                              }
                          });












                      }
                  });

              }
          });

















      }
   });
  // res.json({ status: true,message:"ok"});
}
});
});
   

   }
}