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



      //API FOR ADD EMPLOYEE & HR  DETAILS/////////////////////////////////////////

      app.post('/emphrdetails', upload.single('Employee_Image'), function (req, res) {
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
                     //console.log(err);
                     res.json({ status: false, message: "ok5" });
                     result = false;
                  }
                  else {
                     //API FOR ADD EMPLOYEE FAMILY DETAILS DETAILS
                     var request = new sql.Request(transaction);

                     request.input('Operation', 'INSERT');
                     request.input('Relative_Name', req.body.Relative_Name);
                     request.input('Gender', req.body.Gender);
                     request.input('Relation', req.body.Relation);
                     request.input('Remarks', req.body.Remarks);
                     request.input('Date_Of_Birth', req.body.Date_of_Birth);// FORMAT (M-D-Y)
                     request.input('Created_By', parseInt(req.body.Created_By));

                     request.execute('Proc_Employee_Family_Details', function (err2, rec) {
                        if (err2) {
                           console.log(errr);
                           //res.json({ status: false, message: "ok2" });
                           result = false;
                        }
                        else {
                           //res.json({ status: true,message:"ok3"});
                           //EDUCATION DETAILS
                           var request = new sql.Request(transaction);

                           request.input('Operation', 'INSERT');
                           request.input('Qualfication', req.body.Qualfication);
                           request.input('University', req.body.University);
                           request.input('Year_Passed', req.body.Year_Passed);
                           request.input('Remarks', req.body.Remarks);
                           request.input('Created_By', parseInt(req.body.Created_By));

                           request.execute('Proc_Employee_Education_DTL', function (err3, rec) {
                              if (err3) {
                                 console.log(err);
                                 //res.json({ status: false });
                                 result = false;
                              }
                              else {
                                 // res.json({ status: true, result: rec.recordsets[0] });
                                 //var result = true;
                                 var request = new sql.Request(transaction);

                                 request.input('Operation', 'INSERT');
                                 request.input('Training_Name', req.body.Training_Name);
                                 request.input('From_Date', new Date(req.body.From_Date));
                                 request.input('To_Date', new Date(req.body.To_Date));
                                 request.input('Comments', req.body.Comments);
                                 request.input('Remarks', req.body.Remarks);
                                 request.input('Created_By', parseInt(req.body.Created_By));

                                 request.execute('Proc_Employee_Training_DTL', function (err4, rec) {
                                    if (err4) {
                                       console.log(err);
                                       //res.json({ status: false });
                                       result = false;
                                    }
                                    else {
                                       //res.json({ status: true, result: rec.recordsets[0] });
                                       //var result = true;

                                       //EMPLOYEE DISCIPLINARY

                                       var request = new sql.Request(transaction);

                                       request.input('Operation', 'INSERT');
                                       request.input('Memo', req.body.Memo);
                                       request.input('Issue_By', req.body.Issue_By);
                                       request.input('Issue_Date', new Date(req.body.Issue_Date));//M-D-Y
                                       request.input('Comments', req.body.Comments);
                                       request.input('Remarks', req.body.Remarks);
                                       request.input('Created_By', parseInt(req.body.Created_By));

                                       request.execute('Proc_Employee_Disciplinary_DTL', function (err5, rec) {
                                          if (err5) {
                                             console.log(err);
                                             //res.json({ status: false });
                                             result = false;
                                          }
                                          else {
                                             // res.json({ status: true, result: rec.recordsets[0] });
                                             // var result = true;

                                             //EXTRA CURRICULAR DETAILS

                                             var request = new sql.Request(transaction);

                                             request.input('Operation', 'INSERT');
                                             request.input('Activity_Name', req.body.Activity_Name);
                                             request.input('Event_Name', req.body.Event_Name);
                                             request.input('From_Date', new Date(req.body.From_Date));//M-D-Y
                                             request.input('To_Date', new Date(req.body.To_Date));//M-D-Y
                                             request.input('Award', req.body.Award);
                                             request.input('Remarks', req.body.Remarks);
                                             request.input('Created_By', parseInt(req.body.Created_By));

                                             request.execute('Proc_Employee_EXTRA_CURRICULAR_DTL', function (err6, rec) {
                                                if (err6) {
                                                   console.log(err);
                                                   //res.json({ status: false });
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
                     // res.json({ status: true,message:"ok"});
                  }

               });

               // if(result==false){
               //    connection.rollback(function(){
               //       res.json({ status: false, message:'fail' });
               //    });

               // }
               // else {
               //    connection.commit(function(){
               //       res.json({ status: true, message:'success' });
               //    });
               // }

               // console.log(data_added);
               setTimeout(function () {
                  if (result) {
                     transaction.commit((err) => {
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
               }, 100);



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
               data.push(rec.recordsets[0]);
               //res.json({ status: true, result:data });


               request.input('Operation', 'SELECT');
               request.execute('Proc_Employee_Training_DTL', function (err, rec2) {
                  if (err) {
                     console.log(err);
                     res.json({ status: false });
                  }
                  else {
                     //res.json({ status: true, result: rec2.recordsets[0] });
                     rec.recordsets[0].push(rec2.recordsets[0]);
                     //   res.json({ status: true, result: rec.recordsets[0] });


                     request.input('Operation', 'SELECT');
                     request.execute('Proc_Employee_Education_DTL', function (err, rec3) {
                        if (err) {
                           console.log(err);
                           res.json({ status: false });
                        }
                        else {

                           rec.recordsets[0].push(rec3.recordsets[0]);
                           //res.json({ status: true, result: rec.recordsets[0]});



                           request.input('Operation', 'SELECT');
                           request.execute('Proc_Employee_EXTRA_CURRICULAR_DTL', function (err, rec4) {
                              if (err) {
                                 console.log(err);
                                 res.json({ status: false });
                              }
                              else {
                                 rec.recordsets[0].push(rec4.recordsets[0]);
                                 //res.json({ status: true, result: rec.recordsets[0] });

                                 request.input('Operation', 'SELECT');
                                 request.execute('Proc_Employee_Disciplinary_DTL', function (err, rec5) {
                                    if (err) {
                                       console.log(err);
                                       res.json({ status: false });
                                    }
                                    else {
                                       rec.recordsets[0].push(rec5.recordsets[0]);
                                       //res.json({ status: true, result: rec.recordsets[0] });

                                       request.input('Operation', 'SELECT');
                                       request.execute('Proc_Employee_Family_Details', function (err, rec6) {
                                          if (err) {
                                             console.log(err);
                                             res.json({ status: false });
                                          }
                                          else {
                                             rec.recordsets[0].push(rec6.recordsets[0]);
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
            }
         });
      });

      /////////////////////////VIEW SINGLE EMPLOYEE & HR

      app.post('/viewsingleemployeehr', function (req, res) {
         
         var data = [];
         var request = new sql.Request(connection);
         request.input('Operation', 'SELECTBYID');
         request.input('EmployeeId', parseInt(req.body.id));//EMPLOYEE ID
         request.execute('Proc_Employee_Details', function (err, rec) {
            if (err) {
               res.json({ status: false });
            }
            else {
               data.push(rec.recordsets[0]);
               //res.json({ status: true, result:data });
               request.input('Operation', 'SELECTBYID');
               request.input('EmployeeId', parseInt(req.body.id));//EMPLOYEE ID
               request.execute('Proc_Employee_Training_DTL', function (err, rec2) {
                  if (err) {
                     console.log(err);
                     res.json({ status: false });
                  }
                  else {
                     //res.json({ status: true, result: rec2.recordsets[0] });
                     rec.recordsets[0].push(rec2.recordsets[0]);
                     //   res.json({ status: true, result: rec.recordsets[0] });
                     request.input('Operation', 'SELECTBYID');
                     request.input('EmployeeId', parseInt(req.body.id));//EMPLOYEE ID
                     request.execute('Proc_Employee_Education_DTL', function (err, rec3) {
                        if (err) {
                           console.log(err);
                           res.json({ status: false });
                        }
                        else {
                           rec.recordsets[0].push(rec3.recordsets[0]);
                           //res.json({ status: true, result: rec.recordsets[0]});
                           request.input('Operation', 'SELECTBYID');
                           request.input('EmployeeId', parseInt(req.body.id));//EMPLOYEE ID
                           request.execute('Proc_Employee_EXTRA_CURRICULAR_DTL', function (err, rec4) {
                              if (err) {
                                 console.log(err);
                                 res.json({ status: false });
                              }
                              else {
                                 rec.recordsets[0].push(rec4.recordsets[0]);
                                 //res.json({ status: true, result: rec.recordsets[0] });
                                 request.input('Operation', 'SELECTBYID');
                                 request.input('EmployeeId', parseInt(req.body.id));//EMPLOYEE ID
                                 request.execute('Proc_Employee_Disciplinary_DTL', function (err, rec5) {
                                    if (err) {
                                       console.log(err);
                                       res.json({ status: false });
                                    }
                                    else {
                                       rec.recordsets[0].push(rec5.recordsets[0]);
                                       //res.json({ status: true, result: rec.recordsets[0] });
                                       request.input('Operation', 'SELECTBYID');
                                       request.input('EmployeeId', parseInt(req.body.id));//EMPLOYEE ID
                                       request.execute('Proc_Employee_Family_Details', function (err, rec6) {
                                          if (err) {
                                             console.log(err);
                                             res.json({ status: false });
                                          }
                                          else {
                                             rec.recordsets[0].push(rec6.recordsets[0]);
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
            }
         });
      });

   }
}