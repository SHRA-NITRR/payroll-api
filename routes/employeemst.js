var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');
var moment = require('moment');

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
               request.input('DateOfBirth', new Date(req.body.DateOfBirth));////////////
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
               request.input('Marriage_Date', new Date(req.body.Marriage_Date));///////////
               request.input('Department_Id', parseInt(req.body.Department_Id));
               request.input('Desig_Id', parseInt(req.body.Desig_Id));
               request.input('Emp_Cate_Id', parseInt(req.body.Emp_Cate_Id));

              // request.input('Employee_Image', req.file.originalname);////////////
               request.input('Date_of_Join',new Date(req.body.Date_of_Join));
               request.input('Salary_Calc_From', new Date(req.body.Salary_Calc_From));
               request.input('Is_Leaving','true');
               request.input('Date_of_Leave', new Date(req.body.Date_of_Leave));
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

console.log(err);              res.json({ status: false });
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

      // app.post('/search_employee', function (req, res) {
      //    var request = new sql.Request(connection);
      //    request.input('Operation', 'SELECTBYID');
      //    //request.input('ID', req.body.id);
      //    request.input('OUT_CODE', parseInt(req.body.id));
      //    request.execute('Proc_Employee_Details', function (err, rec) {
      //       if (err) {
      //          res.json({ status: false });
      //       }
      //       else {
      //          res.json({ status: true, result: rec.recordsets[0] });
      //       }
      //    });
      // });

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
         const transaction = new sql.Transaction();
         transaction.begin((err) => {
            if (err) {
               res.json({ status: false });
            } else {
               var request = new sql.Request(transaction);
               request.input('Operation', 'DELETE');
               request.input('EmployeeId', parseInt(req.body.id));//EMPLOYEE ID

               request.execute('Proc_Employee_Details', function (err, rec) {
                  if (err) {
                     res.json({ status: false });
                  }
                  else {
                     res.json({ status: true });
                  }
               })
            }
         });
      });


      //API FOR DELETE EMPLOYEE DETAILS

      //  app.post('/delete_employee', function (req, res) {
      //    const transaction = new sql.Transaction();
      //    transaction.begin((err)=>{
      //       if(err){
      //          res.json({ status: false });
      //       }else{
      //          var request = new sql.Request(transaction);
      //          request.input('Operation', 'DELETE');
      //          request.input('EmployeeId', parseInt(req.body.id));//EMPLOYEE ID

      //          request.execute('Proc_Employee_Details', function (err, rec) {
      //             if (err) {
      //                res.json({ status: false });
      //             }
      //             else {
      //                transaction.commit((err)=>{
      //                   if (err) {
      //                      res.json({ status: false });
      //                   }else{
      //                      res.json({ status: true });
      //                   }
      //                })
      //             }
      //          });
      //       }
      //    })

      // });







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


      //API FOR ADD EMPLOYEE & HR  DETAILS/////////////////////////////////////////

      app.post('/addemphrdetails', upload.single('Employee_Image'), function (req, res) {
         var result = true;
         const transaction = new sql.Transaction();
         transaction.begin((err) => {
            if (err) {
               res.json({ status: false });
            } else {
               var request = new sql.Request(transaction);
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
               request.input('DateOfBirth', new Date(req.body.DateOfBirth));////////////
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
               request.input('Marriage_Date', new Date(req.body.Marriage_Date));///////////
               request.input('Department_Id', parseInt(req.body.Department_Id));
               request.input('Desig_Id', parseInt(req.body.Desig_Id));
               request.input('Emp_Cate_Id', parseInt(req.body.Emp_Cate_Id));
             request.input('Employee_Image', req.file.originalname);//////////////
               request.input('Date_of_Join',new Date(req.body.Date_of_Join));
               request.input('Salary_Calc_From', new Date(req.body.Salary_Calc_From));
               request.input('Is_Leaving','true');
               request.input('Date_of_Leave', new Date(req.body.Date_of_Leave));
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
               
               request.input('Salary_Structure_id', req.body.Salary_Structure_id);


               request.execute('Proc_Employee_Details', function (err, rec) {
                  if (err) {
                     console.log(err);
                     //res.json({ status: false, message: "ok5" });
                     result = false;
                  }
                  else {
                     //API FOR ADD EMPLOYEE FAMILY DETAILS DETAILS
                   request = new sql.Request(transaction);

                     request.input('Operation', 'INSERT');
                     request.input('Relative_Name', req.body.Relative_Name1);
                     request.input('Gender', req.body.Gender1);
                     request.input('Relation', req.body.Relation1);
                     request.input('Remarks', req.body.Remarks1);
                     //request2.input('Date_Of_Birth',req.body.Date_of_Birth);// FORMAT (M-D-Y)
                     request.input('Date_Of_Birth', new Date(req.body.Date_Of_Birth1));// FORMAT (M-D-Y)
                     request.input('Created_By', parseInt(req.body.Created_By));
                     //console.log(req.body.Date_of_Birth);
                     request.execute('Proc_Employee_Family_Details', function (err2, rec) {
                        if (err2) {
                           console.log(err2);
                           result = false;
                        }
                        else {
                           //EDUCATION DETAILS
                            request = new sql.Request(transaction);

                           request.input('Operation', 'INSERT');
                           request.input('Qualfication', req.body.Qualfication2);
                           request.input('University', req.body.University2);
                           request.input('Year_Passed', req.body.Year_Passed2);
                           request.input('Percentage', parseFloat(req.body.Percentage));
                           request.input('Remarks', req.body.Remarks2);
                           request.input('Created_By', parseInt(req.body.Created_By));

                           request.execute('Proc_Employee_Education_DTL', function (err3, rec) {
                              if (err3) {
                                 console.log(err3);
                                 result = false;
                              }
                              else {
                                  request = new sql.Request(transaction);

                                 request.input('Operation', 'INSERT');
                                 request.input('Training_Name', req.body.Training_Name3);
                                 request.input('From_Date', new Date(req.body.From_Date3));
                                 console.log(req.body.From_Date3);
                                 request.input('To_Date',new Date(req.body.To_Date3));
                                 request.input('Comments', req.body.Comments3);
                                 request.input('Remarks', req.body.Remarks3);
                                 request.input('Created_By', parseInt(req.body.Created_By));

                                 request.execute('Proc_Employee_Training_DTL', function (err4, rec) {
                                    if (err4) {
                                       console.log(err4);
                                       result = false;
                                    }
                                    else {
                                       //EMPLOYEE DISCIPLINARY
                                       request = new sql.Request(transaction);

                                       request.input('Operation', 'INSERT');
                                       request.input('Memo', req.body.Memo);
                                       request.input('Issue_By', req.body.Issue_By);
                                       request.input('Issue_Date',new Date(req.body.Issue_Date2));//M-D-Y
                                       console.log(req.body.Issue_Date2)
                                       //request5.input('Issue_Date',moment(req.body.Issue_Date).format("DD-MM-YYYY"));
                                       request.input('Comments', req.body.Comments4);
                                       request.input('Remarks', req.body.Remarks4);
                                       request.input('Created_By', parseInt(req.body.Created_By));

                                       request.execute('Proc_Employee_Disciplinary_DTL', function (err5, rec) {
                                          if (err5) {
                                             console.log(err5);
                                             result = false;
                                          }
                                          else {
                                             //EXTRA CURRICULAR DETAILS
                                             request = new sql.Request(transaction);

                                             request.input('Operation', 'INSERT');
                                             request.input('Activity_Name', req.body.Activity_Name);
                                             request.input('Event_Name', req.body.Event_Name);
                                             request.input('From_Date',new Date(req.body.From_Date5));//M-D-Y
                                             request.input('To_Date',new Date(req.body.To_Date5));
                                             console.log(req.body.From_Date5);
                                             request.input('Award', req.body.Award);
                                             request.input('Remarks', req.body.Remarks5);
                                             request.input('Created_By', parseInt(req.body.Created_By));

                                             request.execute('Proc_Employee_EXTRA_CURRICULAR_DTL', function (err6, rec) {
                                                if (err6) {
                                                   console.log(err6);
                                                   result = false;
                                                }
                                                else {
                                                   



                                                   var salary = JSON.parse(req.body.salary);
                     
                                                   console.log(req.body);
                              
                                                   var count = 0;
                                                   salary.forEach(function (doc, err) {
                                                      //assert.equal(null, err);
                                                      request = new sql.Request(transaction);
                                                      request.input('Operation', 'INSERT');
                                                      request.input('Effective_From', new Date(doc.Effective_From));
                                                      request.input('Payhead_Id', parseInt(doc.Payhead_Id));
                                                      request.input('Amount', parseFloat(doc.Amount));
                                                      //request.input('Employee_Id',doc.Employee_Id);
                                                      request.input('Created_By', parseInt(doc.Created_By));
                                             
                                                      request.execute('Proc_Employee_Salary_Structure', function (err, rec) {
                                                         if (err) {
                                                            console.log(err);
                                                            //res.json({ status: false });
                                                            result = false;
                                                         }
                                                         else {
                                                            //res.json({ status: true });
                                                         }
                                                      });
                                                   })
                           
                                                   //res.json({ status: true, result: rec.recordsets[0] });
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
                     console.log(result);
                     setTimeout(function () {
                        if (result) {
                           transaction.commit((err) => {
                              console.log(err);
                              if (err) {
                                 transaction.rollback((err) => {
                                    if (err) {
                                       res.json({ status: false });
                                    } else {
                                       res.json({ status: false });
                                    }
                                 });
                              } else {
                                 res.json({ status: true });
                              }
                           });
                        } else {
                           transaction.rollback((err) => {
                              if (err) {
                                 res.json({ status: false });
                              } else {
                                 res.json({ status: false });
                              }
                           });
                        }
                        //image = [];
                     }, 500);
                  }
               });
            }
         });
      });


      //API FOR UPDATE EMPLOYEE & HR  DETAILS/////////////////////////////////////////

      app.post('/updateemphrdetails', upload.single('Employee_Image'), function (req, res) {
         var result = true;
         const transaction = new sql.Transaction();
         transaction.begin((err) => {
            if (err) {
               res.json({ status: false });
            } else {
               var request = new sql.Request(transaction);
               request.input('Operation', 'UPDATE');
            
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
               request.input('DateOfBirth', new Date(req.body.DateOfBirth));////////////
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
               //request.input('Employee_Image', req.file.originalname);////////////
               request.input('Date_of_Join', req.body.Date_of_Join);

console.log(req.body.Date_of_Join);

               request.input('Salary_Calc_From', new Date(req.body.Salary_Calc_From));
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
               request.input('EmployeeId', parseInt(req.body.EmployeeId));//EMPLOYEE ID
               request.input('Salary_Structure_id', req.body.Salary_Structure_id);

               request.execute('Proc_Employee_Details', function (err, rec) {
                  if (err) {
                     console.log(err);
                     result = false;
                  }
                  else {
                     //API FOR UPDATE EMPLOYEE FAMILY DETAILS DETAILS
                     request = new sql.Request(transaction);

                     request.input('Operation', 'UPDATE');
                     request.input('Relative_Name', req.body.Relative_Name1);
                     request.input('Gender', req.body.Gender1);
                     request.input('Relation', req.body.Relation1);
                     request.input('Remarks', req.body.Remarks1);
                     request.input('Date_Of_Birth', req.body.Date_Of_Birth1);// FORMAT (M-D-Y)
                     request.input('Created_By', parseInt(req.body.Created_By));
                     request.input('EmployeeId', parseInt(req.body.EmployeeId));//EMPLOYEE ID
                     //console.log(req.body.Date_of_Birth);
                     request.execute('Proc_Employee_Family_Details', function (err2, rec) {
                        if (err2) {
                           console.log(err2);
                           result = false;
                        }
                        else {
                           //UPDATE EDUCATION DETAILS
                            request = new sql.Request(transaction);
                           request.input('Operation', 'UPDATE');
                           request.input('Qualfication', req.body.Qualfication2);
                           request.input('University', req.body.University2);
                           request.input('Year_Passed', req.body.Year_Passed2);
                           request.input('Percentage', parseFloat(req.body.Percentage));
                           request.input('Remarks', req.body.Remarks2);
                           request.input('Created_By', parseInt(req.body.Created_By));
                           request.input('EmployeeId', parseInt(req.body.EmployeeId));//EMPLOYEE ID

                           request.execute('Proc_Employee_Education_DTL', function (err3, rec) {
                              if (err3) {
                                 console.log(err3);
                                 result = false;
                              }
                              else {
                                  request = new sql.Request(transaction);

                                 request.input('Operation', 'UPDATE');
                                 request.input('Training_Name', req.body.Training_Name3);
                                 request.input('From_Date', req.body.From_Date3);
                                 request.input('To_Date', req.body.To_Date3);
                                 request.input('Comments', req.body.Comments3);
                                 request.input('Remarks', req.body.Remarks3);
                                 request.input('Created_By', parseInt(req.body.Created_By));
                                 request.input('EmployeeId', parseInt(req.body.EmployeeId));//EMPLOYEE ID

                                 request.execute('Proc_Employee_Training_DTL', function (err4, rec) {
                                    if (err4) {
                                       console.log(err4);
                                       result = false;
                                    }
                                    else {
                                       //UPDATE EMPLOYEE DISCIPLINARY
                                        request = new sql.Request(transaction);

                                       request.input('Operation', 'UPDATE');
                                       request.input('Memo', req.body.Memo);
                                       request.input('Issue_By', req.body.Issue_By);
                                       request.input('Issue_Date', req.body.Issue_Date2);//M-D-Y
                                       //console.log(req.body.Issue_Date2)
                                       request.input('Comments', req.body.Comments4);
                                       request.input('Remarks', req.body.Remarks4);
                                       request.input('Created_By', parseInt(req.body.Created_By));
                                       request.input('EmployeeId', parseInt(req.body.EmployeeId));//EMPLOYEE ID

                                       request.execute('Proc_Employee_Disciplinary_DTL', function (err5, rec) {
                                          if (err5) {
                                             console.log(err5);
                                             result = false;
                                          }
                                          else {
                                             //UPDATE EXTRA CURRICULAR DETAILS
                                              request = new sql.Request(transaction);

                                             request.input('Operation', 'UPDATE');
                                             request.input('Activity_Name', req.body.Activity_Name);
                                             request.input('Event_Name', req.body.Event_Name);
                                             request.input('From_Date', req.body.From_Date5);//M-D-Y
                                             request.input('To_Date', req.body.To_Date5);
                                             //console.log(req.body.From_Date5);
                                             request.input('Award', req.body.Award);
                                             request.input('Remarks', req.body.Remarks5);
                                             request.input('Created_By', parseInt(req.body.Created_By));
                                             request.input('EmployeeId', parseInt(req.body.EmployeeId));//EMPLOYEE ID

                                             request.execute('Proc_Employee_EXTRA_CURRICULAR_DTL', function (err6, rec) {
                                                if (err6) {
                                                   console.log(err6);
                                                   result = false;
                                                }
                                                else {
                                                   //res.json({ status: true, result: rec.recordsets[0] });
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
                     console.log(result);
                     setTimeout(function () {
                        if (result) {
                           transaction.commit((err) => {
                              console.log(err);
                              if (err) {
                                 transaction.rollback((err) => {
                                    if (err) {
                                       res.json({ status: false });
                                    } else {
                                       res.json({ status: false });
                                    }
                                 });
                              } else {
                                 res.json({ status: true });
                              }
                           });
                        } else {
                           transaction.rollback((err) => {
                              if (err) {
                                 res.json({ status: false });
                              } else {
                                 res.json({ status: false });
                              }
                           });
                        }
                        //image = [];
                     }, 500);
                  }
               });
            }
         });
      });

      /////////////////////////VIEW ALL EMPLOYEE & HR
      app.post('/viewallemployeehr', function (req, res) {
         var data = [];
         var request = new sql.Request(connection);
         request.input('Operation', 'SELECT');
         request.execute('Proc_Employee_Details', function (err, rec) {
            if (err) {
               res.json({ status: false });
            }
            else {
               request.input('Operation', 'SELECT');
               request.execute('Proc_Employee_Training_DTL', function (err, rec2) {
                  if (err) {
                     console.log(err);
                     res.json({ status: false });
                  }
                  else {
                     request.input('Operation', 'SELECT');
                     request.execute('Proc_Employee_Education_DTL', function (err, rec3) {
                        if (err) {
                           console.log(err);
                           res.json({ status: false });
                        }
                        else {
                           request.input('Operation', 'SELECT');
                           request.execute('Proc_Employee_EXTRA_CURRICULAR_DTL', function (err, rec4) {
                              if (err) {
                                 console.log(err);
                                 res.json({ status: false });
                              }
                              else {
                                 request.input('Operation', 'SELECT');
                                 request.execute('Proc_Employee_Disciplinary_DTL', function (err, rec5) {
                                    if (err) {
                                       console.log(err);
                                       res.json({ status: false });
                                    }
                                    else {
                                       request.input('Operation', 'SELECT');
                                       request.execute('Proc_Employee_Family_Details', function (err, rec6) {
                                          if (err) {
                                             console.log(err);
                                             res.json({ status: false });
                                          }
                                          else {
                                             res.json({ status: true, Employee_Details: rec.recordsets[0], Employee_Disciplinary_DTL: rec5.recordsets[0], Employee_Education_DTL: rec3.recordsets[0], Employee_Family_Details: rec6.recordsets[0], Employee_Training_DTL: rec2.recordsets[0], Employee_EXTRA_CURRICULAR_DTL: rec4.recordsets[0] });
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
            }
         });
      });

      /////////////////////////VIEW SINGLE EMPLOYEE & HR

      app.post('/viewsingleemployeehr', function (req, res) {

         var request = new sql.Request(connection);
         request.input('Operation', 'SELECTBYID');
         request.input('EmployeeId', parseInt(req.body.id));//EMPLOYEE ID
         request.execute('Proc_Employee_Details', function (err, rec) {
            if (err) {
               res.json({ status: false });
            }
            else {
               request.input('Operation', 'SELECTBYID');
               request.input('EmployeeId', parseInt(req.body.id));//EMPLOYEE ID
               request.execute('Proc_Employee_Training_DTL', function (err, rec2) {
                  if (err) {
                     console.log(err);
                     res.json({ status: false });
                  }
                  else {

                     request.input('Operation', 'SELECTBYID');
                     request.input('EmployeeId', parseInt(req.body.id));//EMPLOYEE ID
                     request.execute('Proc_Employee_Education_DTL', function (err, rec3) {
                        if (err) {
                           console.log(err);
                           res.json({ status: false });
                        }
                        else {
                           request.input('Operation', 'SELECTBYID');
                           request.input('EmployeeId', parseInt(req.body.id));//EMPLOYEE ID
                           request.execute('Proc_Employee_EXTRA_CURRICULAR_DTL', function (err, rec4) {
                              if (err) {
                                 console.log(err);
                                 res.json({ status: false });
                              }
                              else {
                                 request.input('Operation', 'SELECTBYID');
                                 request.input('EmployeeId', parseInt(req.body.id));//EMPLOYEE ID
                                 request.execute('Proc_Employee_Disciplinary_DTL', function (err, rec5) {
                                    if (err) {
                                       console.log(err);
                                       res.json({ status: false });
                                    }
                                    else {
                                       request.input('Operation', 'SELECTBYID');
                                       request.input('EmployeeId', parseInt(req.body.id));//EMPLOYEE ID
                                       request.execute('Proc_Employee_Family_Details', function (err, rec6) {
                                          if (err) {
                                             console.log(err);
                                             res.json({ status: false });
                                          }
                                          else {
                                             res.json({ status: true, Employee_Details: rec.recordsets[0], Employee_Disciplinary_DTL: rec5.recordsets[0], Employee_Education_DTL: rec3.recordsets[0], Employee_Family_Details: rec6.recordsets[0], Employee_Training_DTL: rec2.recordsets[0], Employee_EXTRA_CURRICULAR_DTL: rec4.recordsets[0] });
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
            }
         });
      });
      /////////////////////////DELETE EMPLOYEE & HR
      app.post('/deleteemployeehr', function (req, res) {
         console.log("sbvusdvb");
         var request = new sql.Request(connection);
         request.input('Operation', 'DELETE');
         request.input('EmployeeId', req.body.EmployeeId);//EMPLOYEE ID
         console.log(req.body.EmployeeId);
         request.execute('Proc_Employee_Details', function (err, rec) {
            if (err) {
               res.json({ status: false });
            }
            else {
               var request2 = new sql.Request(connection);
               request2.input('Operation', 'DELETE');
               request2.input('EmployeeId', req.body.EmployeeId);//EMPLOYEE ID
               console.log(req.body.EmployeeId);
               request2.execute('Proc_Employee_Training_DTL', function (err, rec2) {
                  if (err) {
                     console.log(err);
                     res.json({ status: false });
                  }
                  else {
                     var request3 = new sql.Request(connection);
                     request3.input('Operation', 'DELETE');
                     request3.input('EmployeeId', req.body.EmployeeId);//EMPLOYEE ID
                     console.log(req.body.EmployeeId);
                     request3.execute('Proc_Employee_Education_DTL', function (err, rec3) {
                        if (err) {
                           console.log(err);
                           res.json({ status: false });
                        }
                        else {
                           var request4 = new sql.Request(connection);
                           request4.input('Operation', 'DELETE');
                           request4.input('EmployeeId', req.body.EmployeeId);//EMPLOYEE ID
                           console.log(req.body.EmployeeId);
                           request4.execute('Proc_Employee_EXTRA_CURRICULAR_DTL', function (err, rec4) {
                              if (err) {
                                 console.log(err);
                                 res.json({ status: false });
                              }
                              else {
                                 var request5 = new sql.Request(connection);
                                 request5.input('Operation', 'DELETE');
                                 request5.input('EmployeeId', req.body.EmployeeId);//EMPLOYEE ID
                                 console.log(req.body.EmployeeId);
                                 request5.execute('Proc_Employee_Disciplinary_DTL', function (err, rec5) {
                                    if (err) {
                                       console.log(err);
                                       res.json({ status: false });
                                    }
                                    else {
                                       var request6 = new sql.Request(connection);
                                       request6.input('Operation', 'DELETE');
                                       request6.input('EmployeeId', req.body.EmployeeId);//EMPLOYEE ID
                                       console.log(req.body.EmployeeId);
                                       request6.execute('Proc_Employee_Family_Details', function (err, rec6) {
                                          if (err) {
                                             console.log(err);
                                             res.json({ status: false });
                                          }
                                          else {
                                             res.json({ status: true, Employee_Details: rec.recordsets[0], Employee_Disciplinary_DTL: rec5.recordsets[0], Employee_Education_DTL: rec3.recordsets[0], Employee_Family_Details: rec6.recordsets[0], Employee_Training_DTL: rec2.recordsets[0], Employee_EXTRA_CURRICULAR_DTL: rec4.recordsets[0] });
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
            }
         });
      });

     





















































































      //  //API FOR ADD EMPLOYEE & HR  DETAILS/////////////////////////////////////////

      //  app.post('/addemphrdetails', upload.single('Employee_Image'), function (req, res) {
      //    var result = true;
      //    const transaction = new sql.Transaction();
      //    transaction.begin((err) => {
      //       if (err) {
      //          res.json({ status: false });
      //       } else {
      //          var request = new sql.Request(transaction);
      //          request.input('Operation', 'INSERT');
      //          request.input('Created_By', parseInt(req.body.Created_By));
      //          request.input('Employee_Title', req.body.Employee_Title);
      //          request.input('Employee_Name', req.body.Employee_Name);
      //          request.input('FathersName', req.body.FathersName);
      //          request.input('MothersName', req.body.MothersName);
      //          request.input('NomineeName', req.body.NomineeName);
      //          request.input('Gender', req.body.Gender);
      //          request.input('Occupation', req.body.Occupation);
      //          request.input('Division', req.body.Division);
      //          request.input('Grade', req.body.Grade);
      //          request.input('Emp_Attendance', req.body.Emp_Attendance);
      //          request.input('BloodGroup', req.body.BloodGroup);
      //          request.input('DateOfBirth', new Date(req.body.DateOfBirth));////////////
      //          request.input('Present_Res_No', req.body.Present_Res_No);
      //          request.input('Present_Res_Name', req.body.Present_Res_Name);
      //          request.input('Present_Road', req.body.Present_Road);
      //          request.input('Present_Area', req.body.Present_Area);
      //          request.input('Present_City', req.body.Present_City);
      //          request.input('Present_State', req.body.Present_State);
      //          request.input('Present_Pincode', req.body.Present_Pincode);
      //          request.input('Marital_Status', req.body.Marital_Status);
      //          request.input('Ward_Circle', req.body.Ward_Circle);
      //          request.input('BankAcNo', req.body.BankAcNo);
      //          request.input('Bank_Name', req.body.Bank_Name);
      //          request.input('Branch_Name', req.body.Branch_Name);
      //          request.input('Email_ID', req.body.Email_ID);
      //          request.input('Is_Default_EmailId', req.body.Is_Default_EmailId.toLowerCase() == 'true' ? true : false);
      //          request.input('Alt_Email_ID', req.body.Alt_Email_ID);
      //          //request.input('Is_Default_Alt_EmailId',req.body.Is_Default_Alt_EmailId);
      //          request.input('Is_Default_Alt_EmailId', req.body.Is_Default_Alt_EmailId.toLowerCase() == 'true' ? true : false);
      //          request.input('CC_Email_ID', req.body.CC_Email_ID);
      //          request.input('STD_Code', req.body.STD_Code);
      //          request.input('PhoneNo', req.body.PhoneNo);
      //          request.input('Mobile', req.body.Mobile);
      //          request.input('PANno', req.body.PANno);
      //          request.input('AAdhar_No', req.body.AAdhar_No);
      //          request.input('VoterId', req.body.VoterId);
      //          request.input('PassportNo', req.body.PassportNo);
      //          request.input('Marriage_Date', req.body.Marriage_Date);///////////
      //          request.input('Department_Id', parseInt(req.body.Department_Id));
      //          request.input('Desig_Id', parseInt(req.body.Desig_Id));
      //          request.input('Emp_Cate_Id', parseInt(req.body.Emp_Cate_Id));

      //          request.input('Employee_Image', req.file.originalname);////////////
      //          request.input('Date_of_Join', new Date(req.body.Date_of_Join));
      //          request.input('Salary_Calc_From', req.body.Salary_Calc_From);
      //          request.input('Is_Leaving', req.body.Is_Leaving.toLowerCase() == 'true' ? true : false);
      //          request.input('Date_of_Leave', req.body.Date_of_Leave);
      //          request.input('Reason_Of_Leave', req.body.Reason_Of_Leave);
      //          request.input('Past_Service_inDay', parseInt(req.body.Past_Service_inDay));
      //          request.input('IsESI', req.body.IsESI.toLowerCase() == 'true' ? true : false);
      //          request.input('ESI_No', req.body.ESI_No);
      //          request.input('ESI_Dispensary', req.body.ESI_Dispensary);
      //          request.input('IsPF', req.body.IsPF.toLowerCase() == 'true' ? true : false);
      //          request.input('PF_No', req.body.PF_No);
      //          request.input('PF_Dept_File', req.body.PF_Dept_File);
      //          request.input('Is_Restrict_PF', req.body.Is_Restrict_PF.toLowerCase() == 'true' ? true : false);
      //          request.input('Is_Zero_Pension', req.body.Is_Zero_Pension.toLowerCase() == 'true' ? true : false);
      //          request.input('Is_Zero_PT', req.body.Is_Zero_PT.toLowerCase() == 'true' ? true : false);
      //          request.input('IsGRI', req.body.IsGRI.toLowerCase() == 'true' ? true : false);
      //          request.input('GRI_No', req.body.GRI_No);
      //          request.input('IsInsurance', req.body.IsInsurance.toLowerCase() == 'true' ? true : false);
      //          request.input('Insurance_No', req.body.Insurance_No);
      //          request.input('IsDisabled', req.body.IsDisabled);
      //          request.input('IsInternationalworker', req.body.IsInternationalworker);
      //          request.input('IsHigherEPF', req.body.IsHigherEPF);
      //          request.input('IsHigherEPS', req.body.IsHigherEPS);
      //          request.input('Permanent_Res_No', req.body.Permanent_Res_No);
      //          request.input('Permanent_Res_Name', req.body.Permanent_Res_Name);
      //          request.input('Permanent_Road', req.body.Permanent_Road);
      //          request.input('Permanent_Area', req.body.Permanent_Area);
      //          request.input('Permanent_City', req.body.Permanent_City);
      //          request.input('Permanent_State', req.body.Permanent_State);
      //          request.input('Permanent_Pincode', req.body.Permanent_Pincode);

      //          request.execute('Proc_Employee_Details', function (err, rec) {
      //             if (err) {
      //                console.log(err);
      //                //res.json({ status: false, message: "ok5" });
      //                result = false;
      //             }
      //             else {
      //                //API FOR ADD EMPLOYEE FAMILY DETAILS DETAILS
      //                var request2 = new sql.Request(transaction);

      //                request2.input('Operation', 'INSERT');
      //                request2.input('Relative_Name', req.body.Relative_Name1);
      //                request2.input('Gender', req.body.Gender1);
      //                request2.input('Relation', req.body.Relation1);
      //                request2.input('Remarks', req.body.Remarks1);
      //                //request2.input('Date_Of_Birth',req.body.Date_of_Birth);// FORMAT (M-D-Y)
      //                request2.input('Date_Of_Birth', req.body.Date_Of_Birth1);// FORMAT (M-D-Y)
      //                request2.input('Created_By', parseInt(req.body.Created_By));
      //                //console.log(req.body.Date_of_Birth);
      //                request2.execute('Proc_Employee_Family_Details', function (err2, rec) {
      //                   if (err2) {
      //                      console.log(err2);
      //                      result = false;
      //                   }
      //                   else {
      //                      //EDUCATION DETAILS
      //                      var request3 = new sql.Request(transaction);

      //                      request3.input('Operation', 'INSERT');
      //                      request3.input('Qualfication', req.body.Qualfication2);
      //                      request3.input('University', req.body.University2);
      //                      request3.input('Year_Passed', req.body.Year_Passed2);
      //                      request3.input('Percentage', parseFloat(req.body.Percentage));
      //                      request3.input('Remarks', req.body.Remarks2);
      //                      request3.input('Created_By', parseInt(req.body.Created_By));

      //                      request3.execute('Proc_Employee_Education_DTL', function (err3, rec) {
      //                         if (err3) {
      //                            console.log(err3);
      //                            result = false;
      //                         }
      //                         else {
      //                            var request4 = new sql.Request(transaction);

      //                            request4.input('Operation', 'INSERT');
      //                            request4.input('Training_Name', req.body.Training_Name3);
      //                            request4.input('From_Date', req.body.From_Date3);
      //                            request4.input('To_Date', req.body.To_Date3);
      //                            request4.input('Comments', req.body.Comments3);
      //                            request4.input('Remarks', req.body.Remarks3);
      //                            request4.input('Created_By', parseInt(req.body.Created_By));

      //                            request4.execute('Proc_Employee_Training_DTL', function (err4, rec) {
      //                               if (err4) {
      //                                  console.log(err4);
      //                                  result = false;
      //                               }
      //                               else {
      //                                  //EMPLOYEE DISCIPLINARY
      //                                  var request5 = new sql.Request(transaction);

      //                                  request5.input('Operation', 'INSERT');
      //                                  request5.input('Memo', req.body.Memo);
      //                                  request5.input('Issue_By', req.body.Issue_By);
      //                                  request5.input('Issue_Date', req.body.Issue_Date2);//M-D-Y
      //                                  console.log(req.body.Issue_Date2)
      //                                  //request5.input('Issue_Date',moment(req.body.Issue_Date).format("DD-MM-YYYY"));
      //                                  request5.input('Comments', req.body.Comments4);
      //                                  request5.input('Remarks', req.body.Remarks4);
      //                                  request5.input('Created_By', parseInt(req.body.Created_By));

      //                                  request5.execute('Proc_Employee_Disciplinary_DTL', function (err5, rec) {
      //                                     if (err5) {
      //                                        console.log(err5);
      //                                        result = false;
      //                                     }
      //                                     else {
      //                                        //EXTRA CURRICULAR DETAILS
      //                                        var request6 = new sql.Request(transaction);

      //                                        request6.input('Operation', 'INSERT');
      //                                        request6.input('Activity_Name', req.body.Activity_Name);
      //                                        request6.input('Event_Name', req.body.Event_Name);
      //                                        request6.input('From_Date', req.body.From_Date5);//M-D-Y
      //                                        request6.input('To_Date', req.body.To_Date5);
      //                                        console.log(req.body.From_Date5);
      //                                        request6.input('Award', req.body.Award);
      //                                        request6.input('Remarks', req.body.Remarks5);
      //                                        request6.input('Created_By', parseInt(req.body.Created_By));

      //                                        request6.execute('Proc_Employee_EXTRA_CURRICULAR_DTL', function (err6, rec) {
      //                                           if (err6) {
      //                                              console.log(err6);
      //                                              result = false;
      //                                           }
      //                                           else {
      //                                              //res.json({ status: true, result: rec.recordsets[0] });
      //                                           }
      //                                        });

      //                                     }
      //                                  });
      //                               }
      //                            });
      //                         }
      //                      });
      //                   }
      //                });
      //                // res.json({ status: true,message:"ok"});
      //                console.log(result);
      //                setTimeout(function () {
      //                   if (result) {
      //                      transaction.commit((err) => {
      //                         console.log(err);
      //                         if (err) {
      //                            transaction.rollback((err) => {
      //                               if (err) {
      //                                  res.json({ status: false });
      //                               } else {
      //                                  res.json({ status: false });
      //                               }
      //                            });
      //                         } else {
      //                            res.json({ status: true });
      //                         }
      //                      });
      //                   } else {
      //                      transaction.rollback((err) => {
      //                         if (err) {
      //                            res.json({ status: false });
      //                         } else {
      //                            res.json({ status: false });
      //                         }
      //                      });
      //                   }
      //                   //image = [];
      //                }, 500);
      //             }
      //          });
      //       }
      //    });
      // });


      // //API FOR UPDATE EMPLOYEE & HR  DETAILS/////////////////////////////////////////

      // app.post('/updateemphrdetails', upload.single('Employee_Image'), function (req, res) {
      //    var result = true;
      //    const transaction = new sql.Transaction();
      //    transaction.begin((err) => {
      //       if (err) {
      //          res.json({ status: false });
      //       } else {
      //          var request = new sql.Request(transaction);
      //          request.input('Operation', 'UPDATE');
      //          request.input('Created_By', parseInt(req.body.Created_By));
      //          request.input('Employee_Title', req.body.Employee_Title);
      //          request.input('Employee_Name', req.body.Employee_Name);
      //          request.input('FathersName', req.body.FathersName);
      //          request.input('MothersName', req.body.MothersName);
      //          request.input('NomineeName', req.body.NomineeName);
      //          request.input('Gender', req.body.Gender);
      //          request.input('Occupation', req.body.Occupation);
      //          request.input('Division', req.body.Division);
      //          request.input('Grade', req.body.Grade);
      //          request.input('Emp_Attendance', req.body.Emp_Attendance);
      //          request.input('BloodGroup', req.body.BloodGroup);
      //          request.input('DateOfBirth', new Date(req.body.DateOfBirth));////////////
      //          request.input('Present_Res_No', req.body.Present_Res_No);
      //          request.input('Present_Res_Name', req.body.Present_Res_Name);
      //          request.input('Present_Road', req.body.Present_Road);
      //          request.input('Present_Area', req.body.Present_Area);
      //          request.input('Present_City', req.body.Present_City);
      //          request.input('Present_State', req.body.Present_State);
      //          request.input('Present_Pincode', req.body.Present_Pincode);
      //          request.input('Marital_Status', req.body.Marital_Status);
      //          request.input('Ward_Circle', req.body.Ward_Circle);
      //          request.input('BankAcNo', req.body.BankAcNo);
      //          request.input('Bank_Name', req.body.Bank_Name);
      //          request.input('Branch_Name', req.body.Branch_Name);
      //          request.input('Email_ID', req.body.Email_ID);
      //          request.input('Is_Default_EmailId', req.body.Is_Default_EmailId.toLowerCase() == 'true' ? true : false);
      //          request.input('Alt_Email_ID', req.body.Alt_Email_ID);
      //          //request.input('Is_Default_Alt_EmailId',req.body.Is_Default_Alt_EmailId);
      //          request.input('Is_Default_Alt_EmailId', req.body.Is_Default_Alt_EmailId.toLowerCase() == 'true' ? true : false);
      //          request.input('CC_Email_ID', req.body.CC_Email_ID);
      //          request.input('STD_Code', req.body.STD_Code);
      //          request.input('PhoneNo', req.body.PhoneNo);
      //          request.input('Mobile', req.body.Mobile);
      //          request.input('PANno', req.body.PANno);
      //          request.input('AAdhar_No', req.body.AAdhar_No);
      //          request.input('VoterId', req.body.VoterId);
      //          request.input('PassportNo', req.body.PassportNo);
      //          request.input('Marriage_Date', req.body.Marriage_Date);///////////
      //          request.input('Department_Id', parseInt(req.body.Department_Id));
      //          request.input('Desig_Id', parseInt(req.body.Desig_Id));
      //          request.input('Emp_Cate_Id', parseInt(req.body.Emp_Cate_Id));

      //          request.input('Employee_Image', req.file.originalname);////////////
      //          request.input('Date_of_Join', new Date(req.body.Date_of_Join));
      //          request.input('Salary_Calc_From', req.body.Salary_Calc_From);
      //          request.input('Is_Leaving', req.body.Is_Leaving.toLowerCase() == 'true' ? true : false);
      //          request.input('Date_of_Leave', req.body.Date_of_Leave);
      //          request.input('Reason_Of_Leave', req.body.Reason_Of_Leave);
      //          request.input('Past_Service_inDay', parseInt(req.body.Past_Service_inDay));
      //          request.input('IsESI', req.body.IsESI.toLowerCase() == 'true' ? true : false);
      //          request.input('ESI_No', req.body.ESI_No);
      //          request.input('ESI_Dispensary', req.body.ESI_Dispensary);
      //          request.input('IsPF', req.body.IsPF.toLowerCase() == 'true' ? true : false);
      //          request.input('PF_No', req.body.PF_No);
      //          request.input('PF_Dept_File', req.body.PF_Dept_File);
      //          request.input('Is_Restrict_PF', req.body.Is_Restrict_PF.toLowerCase() == 'true' ? true : false);
      //          request.input('Is_Zero_Pension', req.body.Is_Zero_Pension.toLowerCase() == 'true' ? true : false);
      //          request.input('Is_Zero_PT', req.body.Is_Zero_PT.toLowerCase() == 'true' ? true : false);
      //          request.input('IsGRI', req.body.IsGRI.toLowerCase() == 'true' ? true : false);
      //          request.input('GRI_No', req.body.GRI_No);
      //          request.input('IsInsurance', req.body.IsInsurance.toLowerCase() == 'true' ? true : false);
      //          request.input('Insurance_No', req.body.Insurance_No);
      //          request.input('IsDisabled', req.body.IsDisabled);
      //          request.input('IsInternationalworker', req.body.IsInternationalworker);
      //          request.input('IsHigherEPF', req.body.IsHigherEPF);
      //          request.input('IsHigherEPS', req.body.IsHigherEPS);
      //          request.input('Permanent_Res_No', req.body.Permanent_Res_No);
      //          request.input('Permanent_Res_Name', req.body.Permanent_Res_Name);
      //          request.input('Permanent_Road', req.body.Permanent_Road);
      //          request.input('Permanent_Area', req.body.Permanent_Area);
      //          request.input('Permanent_City', req.body.Permanent_City);
      //          request.input('Permanent_State', req.body.Permanent_State);
      //          request.input('Permanent_Pincode', req.body.Permanent_Pincode);
      //          request.input('EmployeeId', parseInt(req.body.EmployeeId));//EMPLOYEE ID

      //          request.execute('Proc_Employee_Details', function (err, rec) {
      //             if (err) {
      //                console.log(err);
      //                result = false;
      //             }
      //             else {
      //                //API FOR UPDATE EMPLOYEE FAMILY DETAILS DETAILS
      //                var request2 = new sql.Request(transaction);

      //                request2.input('Operation', 'UPDATE');
      //                request2.input('Relative_Name', req.body.Relative_Name1);
      //                request2.input('Gender', req.body.Gender1);
      //                request2.input('Relation', req.body.Relation1);
      //                request2.input('Remarks', req.body.Remarks1);
      //                request2.input('Date_Of_Birth', req.body.Date_Of_Birth1);// FORMAT (M-D-Y)
      //                request2.input('Created_By', parseInt(req.body.Created_By));
      //                request2.input('EmployeeId', parseInt(req.body.EmployeeId2));//EMPLOYEE ID
      //                //console.log(req.body.Date_of_Birth);
      //                request2.execute('Proc_Employee_Family_Details', function (err2, rec) {
      //                   if (err2) {
      //                      console.log(err2);
      //                      result = false;
      //                   }
      //                   else {
      //                      //UPDATE EDUCATION DETAILS
      //                      var request3 = new sql.Request(transaction);
      //                      request3.input('Operation', 'UPDATE');
      //                      request3.input('Qualfication', req.body.Qualfication2);
      //                      request3.input('University', req.body.University2);
      //                      request3.input('Year_Passed', req.body.Year_Passed2);
      //                      request3.input('Percentage', parseFloat(req.body.Percentage));
      //                      request3.input('Remarks', req.body.Remarks2);
      //                      request3.input('Created_By', parseInt(req.body.Created_By));
      //                      request3.input('EmployeeId', parseInt(req.body.EmployeeId));//EMPLOYEE ID

      //                      request3.execute('Proc_Employee_Education_DTL', function (err3, rec) {
      //                         if (err3) {
      //                            console.log(err3);
      //                            result = false;
      //                         }
      //                         else {
      //                            var request4 = new sql.Request(transaction);

      //                            request4.input('Operation', 'UPDATE');
      //                            request4.input('Training_Name', req.body.Training_Name3);
      //                            request4.input('From_Date', req.body.From_Date3);
      //                            request4.input('To_Date', req.body.To_Date3);
      //                            request4.input('Comments', req.body.Comments3);
      //                            request4.input('Remarks', req.body.Remarks3);
      //                            request4.input('Created_By', parseInt(req.body.Created_By));
      //                            request4.input('EmployeeId', parseInt(req.body.EmployeeId));//EMPLOYEE ID

      //                            request4.execute('Proc_Employee_Training_DTL', function (err4, rec) {
      //                               if (err4) {
      //                                  console.log(err4);
      //                                  result = false;
      //                               }
      //                               else {
      //                                  //UPDATE EMPLOYEE DISCIPLINARY
      //                                  var request5 = new sql.Request(transaction);

      //                                  request5.input('Operation', 'UPDATE');
      //                                  request5.input('Memo', req.body.Memo);
      //                                  request5.input('Issue_By', req.body.Issue_By);
      //                                  request5.input('Issue_Date', req.body.Issue_Date2);//M-D-Y
      //                                  //console.log(req.body.Issue_Date2)
      //                                  request5.input('Comments', req.body.Comments4);
      //                                  request5.input('Remarks', req.body.Remarks4);
      //                                  request5.input('Created_By', parseInt(req.body.Created_By));
      //                                  request5.input('EmployeeId', parseInt(req.body.EmployeeId));//EMPLOYEE ID

      //                                  request5.execute('Proc_Employee_Disciplinary_DTL', function (err5, rec) {
      //                                     if (err5) {
      //                                        console.log(err5);
      //                                        result = false;
      //                                     }
      //                                     else {
      //                                        //UPDATE EXTRA CURRICULAR DETAILS
      //                                        var request6 = new sql.Request(transaction);

      //                                        request6.input('Operation', 'UPDATE');
      //                                        request6.input('Activity_Name', req.body.Activity_Name);
      //                                        request6.input('Event_Name', req.body.Event_Name);
      //                                        request6.input('From_Date', req.body.From_Date5);//M-D-Y
      //                                        request6.input('To_Date', req.body.To_Date5);
      //                                        //console.log(req.body.From_Date5);
      //                                        request6.input('Award', req.body.Award);
      //                                        request6.input('Remarks', req.body.Remarks5);
      //                                        request6.input('Created_By', parseInt(req.body.Created_By));
      //                                        request6.input('EmployeeId', parseInt(req.body.EmployeeId));//EMPLOYEE ID

      //                                        request6.execute('Proc_Employee_EXTRA_CURRICULAR_DTL', function (err6, rec) {
      //                                           if (err6) {
      //                                              console.log(err6);
      //                                              result = false;
      //                                           }
      //                                           else {
      //                                              //res.json({ status: true, result: rec.recordsets[0] });
      //                                           }
      //                                        });
      //                                     }
      //                                  });
      //                               }
      //                            });
      //                         }
      //                      });
      //                   }
      //                });
      //                console.log(result);
      //                setTimeout(function () {
      //                   if (result) {
      //                      transaction.commit((err) => {
      //                         console.log(err);
      //                         if (err) {
      //                            transaction.rollback((err) => {
      //                               if (err) {
      //                                  res.json({ status: false });
      //                               } else {
      //                                  res.json({ status: false });
      //                               }
      //                            });
      //                         } else {
      //                            res.json({ status: true });
      //                         }
      //                      });
      //                   } else {
      //                      transaction.rollback((err) => {
      //                         if (err) {
      //                            res.json({ status: false });
      //                         } else {
      //                            res.json({ status: false });
      //                         }
      //                      });
      //                   }
      //                   //image = [];
      //                }, 500);
      //             }
      //          });
      //       }
      //    });
      // });


 //API FOR SEARCH LEAVE DETAILS BY ID

 app.post('/search_employeedetails', function (req, res) {
   var request = new sql.Request(connection);
       request.input('Operation', 'SEARCH');
       //request.input('ID', req.body.id);
       request.input('OUT_CODE', parseInt(req.body.id));
       request.execute('Proc_Employee_Details', function (err, rec) {
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