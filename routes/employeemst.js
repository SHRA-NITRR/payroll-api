var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');

module.exports = {
   configure: function (app, assert, config) {

      sql.close();
      var executeQuery = function (res, query) {
         sql.connect(config, function (err) {
            if (err) {
               console.log("Error while connecting database :- " + err);
               res.send(err);
            }
            else {
               // create Request object
               var request = new sql.Request();
               // query to the database
               request.query(query, function (err, res) {
                  if (err) {
                     console.log("Error while querying database :- " + err);
                     //res.send(err);
                  }
                  else {
                     //res.send(res);
                     //res.json({status:true});
                  }
               });
            }
         });
      }

      var multer = require('multer');

      var Storage = multer.diskStorage({
         destination: function(req, file, callback) {
             callback(null, "./Employee_Images");
         },
         filename: function(req, file, callback) {
            //  callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
             callback(null, file.originalname);
         }
      });

      var upload = multer({ storage: Storage });
      //API FOR ADD EMPLOYEE DETAILS
      app.post('/addemployeedetails',upload.single('Employee_Image'), function (req, res) {
         //console.log(req);
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();
            var request2 = new sql.Request();
            var data_added = true;
            request.input('Operation', 'INSERT');

            request.input('Created_By', parseInt(req.body.Created_By));
            request.input('Employee_Title',req.body.Employee_Title);
            request.input('Employee_Name',req.body.Employee_Name);
            request.input('FathersName',req.body.FathersName);
            request.input('MothersName',req.body.MothersName);
            request.input('NomineeName',req.body.NomineeName);
            request.input('Gender',req.body.Gender);
            request.input('Occupation',req.body.Occupation);
            request.input('Division',req.body.Division);
            request.input('Grade',req.body.Grade);
            request.input('Emp_Attendance',req.body.Emp_Attendance);
            request.input('BloodGroup',req.body.BloodGroup);
       request.input('DateOfBirth',req.body.DateOfBirth);////////////
            request.input('Present_Res_No',req.body.Present_Res_No);
            request.input('Present_Res_Name',req.body.Present_Res_Name);
            request.input('Present_Road',req.body.Present_Road);
            request.input('Present_Area',req.body.Present_Area);
            request.input('Present_City',req.body.Present_City);
            request.input('Present_State',req.body.Present_State);
            request.input('Present_Pincode',req.body.Present_Pincode);
            request.input('Marital_Status',req.body.Marital_Status);
            request.input('Ward_Circle',req.body.Ward_Circle);
            request.input('BankAcNo',req.body.BankAcNo);
            request.input('Bank_Name',req.body.Bank_Name);
            request.input('Branch_Name',req.body.Branch_Name);
            request.input('Email_ID',req.body.Email_ID);
            request.input('Is_Default_EmailId',req.body.Is_Default_EmailId.toLowerCase() == 'true' ? true : false);
            request.input('Alt_Email_ID',req.body.Alt_Email_ID);
            //request.input('Is_Default_Alt_EmailId',req.body.Is_Default_Alt_EmailId);
            request.input('Is_Default_Alt_EmailId',req.body.Is_Default_Alt_EmailId.toLowerCase() == 'true' ? true : false);
            request.input('CC_Email_ID',req.body.CC_Email_ID);
            request.input('STD_Code',req.body.STD_Code);
            request.input('PhoneNo',req.body.PhoneNo);
            request.input('Mobile',req.body.Mobile);
            request.input('PANno',req.body.PANno);
            request.input('AAdhar_No',req.body.AAdhar_No);
            request.input('VoterId',req.body.VoterId);
            request.input('PassportNo',req.body.PassportNo);
            request.input('Marriage_Date',req.body.Marriage_Date);///////////
            request.input('Department_Id',parseInt(req.body.Department_Id));
            request.input('Desig_Id',parseInt(req.body.Desig_Id));
            request.input('Emp_Cate_Id',parseInt(req.body.Emp_Cate_Id));
request.input('Employee_Image',req.file.Employee_Image);////////////
            request.input('Date_of_Join',req.body.Date_of_Join);
            request.input('Salary_Calc_From',req.body.Salary_Calc_From);
            request.input('Is_Leaving', req.body.Is_Leaving.toLowerCase() == 'true' ? true : false);
           request.input('Date_of_Leave',req.body.Date_of_Leave);
            request.input('Reason_Of_Leave',req.body.Reason_Of_Leave);
            request.input('Past_Service_inDay',parseInt(req.body.Past_Service_inDay));
            request.input('IsESI', req.body.IsESI.toLowerCase() == 'true' ? true : false);
            request.input('ESI_No',req.body.ESI_No);
            request.input('ESI_Dispensary',req.body.ESI_Dispensary);
            request.input('IsPF', req.body.IsPF.toLowerCase() == 'true' ? true : false);
            request.input('PF_No',req.body.PF_No);
            request.input('PF_Dept_File',req.body.PF_Dept_File);
            request.input('Is_Restrict_PF', req.body.Is_Restrict_PF.toLowerCase() == 'true' ? true : false);
            request.input('Is_Zero_Pension', req.body.Is_Zero_Pension.toLowerCase() == 'true' ? true : false);
            request.input('Is_Zero_PT', req.body.Is_Zero_PT.toLowerCase() == 'true' ? true : false);
            request.input('IsGRI', req.body.IsGRI.toLowerCase() == 'true' ? true : false);
            request.input('GRI_No',req.body.GRI_No);
            request.input('IsInsurance', req.body.IsInsurance.toLowerCase() == 'true' ? true : false);
            request.input('Insurance_No',req.body.Insurance_No);
            request.input('IsDisabled',req.body.IsDisabled);
            request.input('IsInternationalworker',req.body.IsInternationalworker);
            request.input('IsHigherEPF',req.body.IsHigherEPF);
            request.input('IsHigherEPS',req.body.IsHigherEPS);  
            request.input('Permanent_Res_No',req.body.Permanent_Res_No);
            request.input('Permanent_Res_Name', req.body.Permanent_Res_Name);
            request.input('Permanent_Road',req.body.Permanent_Road);
            request.input('Permanent_Area',req.body.Permanent_Area);
            request.input('Permanent_City',req.body.Permanent_City);
            request.input('Permanent_State',req.body.Permanent_State); 
            request.input('Permanent_Pincode',req.body.Permanent_Pincode);   
            
            // @Employee_Title varchar(10)= NULL,
            // @Employee_Name varchar(85)=NULL,
            // @FathersName varchar(100)=NULL,
            // @MothersName varchar(100)=NULL,
            // @NomineeName varchar(47)=NULL,
            // @Gender varchar(20)=NULL,
            // @Occupation varchar(200) =NULL,
            // @Division varchar(200) =NULL,
            // @Grade varchar(100) =NULL,
            // @Emp_Attendance varchar(50)=NULL,
            // @BloodGroup varchar(20)=NULL,
            // @DateOfBirth datetime= NULL,
            // @Present_Res_No varchar(30)= NULL,
            // @Present_Res_Name varchar(100)= NULL,
            // @Present_Road varchar(100) =NULL,
            // @Present_Area varchar(100)= NULL,
            // @Present_City varchar(30)= NULL,
            // @Present_State varchar(30)=NULL,
            // @Present_Pincode varchar(6)=NULL,
            // @Permanent_Res_No varchar(30)= NULL,
            // @Permanent_Res_Name varchar(100)= NULL,
            // @Permanent_Road varchar(100)= NULL,
            // @Permanent_Area varchar(100)= NULL,
            // @Permanent_City varchar(30)= NULL,
            // @Permanent_State varchar(30)= NULL,
            // @Permanent_Pincode varchar(6)= NULL,
            // @Marital_Status varchar(10)= NULL,
            // @Ward_Circle varchar(50)=NULL,
            // @BankAcNo varchar(30)=NULL,
            // @Bank_Name varchar(30)=NULL,
            // @Branch_Name varchar(50)=NULL,
            // @Email_ID varchar(50)=NULL,
            // @Is_Default_EmailId bit= NULL,
            // @Alt_Email_ID varchar(50)=NULL,
            // @Is_Default_Alt_EmailId bit=NULL,
            // @CC_Email_ID varchar(50)=NULL,
            // @STD_Code varchar(15)=NULL,
            // @PhoneNo varchar(15)=NULL,
            // @Mobile varchar(15)=NULL,
            // @PANno varchar(50)=NULL,
            // @AAdhar_No varchar(50)= NULL,
            // @VoterId varchar(50)=NULL,
            // @PassportNo varchar(50)=NULL,
            // @Marriage_Date date= NULL,
            // @Department_Id int= NULL,
            // @Desig_Id int=NULL,
            // @Emp_Cate_Id int= NULL,
            // @Employee_Image image= NULL,
            // @Date_of_Join date= NULL,
            // @Salary_Calc_From date=NULL,
            // @Is_Leaving bit=NULL,
            // @Date_of_Leave date= NULL,
            // @Reason_Of_Leave varchar(250)=NULL,
            // @Past_Service_inDay int= NULL;
            // @IsESI bit =NULL,
            // @ESI_No varchar(30)=NULL,
            // @ESI_Dispensary varchar(50)=NULL,
            // @IsPF bit=NULL,
            // @PF_No varchar(30)= NULL,
            // @PF_Dept_File varchar(50)=NULL,
            // @Is_Restrict_PF bit=NULL,
            // @Is_Zero_Pension bit=NULL,
            // @Is_Zero_PT bit=NULL,
            // @IsGRI bit=NULL,
            // @GRI_No varchar(30)=NULL,
            // @IsInsurance bit=NULL,
            // @Insurance_No varchar(30)=NULL,
            // @IsDisabled varchar(1)=NULL,
            // @IsInternationalworker varchar(1)=NULL,
            // @IsHigherEPF varchar(1)=NULL,
            // @IsHigherEPS varchar(1)=NULL,
            // @Created_By int=NULL,

            request.execute('Proc_Employee_Details', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
                  sql.close();
               }
               else {
                  res.json({ status: true });
                  //res.json({ status: true, result:rec.recordsets[0]});
                  sql.close();
               }
            });
         });
      });


      //API FOR UPDATE EMPLOYEEDETAILS
      app.post('/updateemployeedetails', function (req, res) {
         //console.log(req);
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();
           
            var data_added = true;
            request.input('Operation','UPDATE');
            request.input('EmployeeId',parseInt(req.body.id));//EMPLOYEE ID

            request.input('Employee_Title',req.body.Employee_Title);
            request.input('Employee_Name',req.body.Employee_Name);
            request.input('FathersName',req.body.FathersName);
            request.input('MothersName',req.body.MothersName);
            request.input('NomineeName',req.body.NomineeName);
            request.input('Gender',req.body.Gender);
            request.input('Occupation',req.body.Occupation);
            request.input('Division',req.body.Division);
            request.input('Grade',req.body.Grade);
            request.input('Emp_Attendance',req.body.Emp_Attendance);
            request.input('BloodGroup',req.body.BloodGroup);
       request.input('DateOfBirth',req.body.DateOfBirth);////////////
            request.input('Present_Res_No',req.body.Present_Res_No);
            request.input('Present_Res_Name',req.body.Present_Res_Name);
            request.input('Present_Road',req.body.Present_Road);
            request.input('Present_Area',req.body.Present_Area);
            request.input('Present_City',req.body.Present_City);
            request.input('Present_State',req.body.Present_State);
            request.input('Present_Pincode',req.body.Present_Pincode);
            request.input('Marital_Status',req.body.Marital_Status);
            request.input('Ward_Circle',req.body.Ward_Circle);
            request.input('BankAcNo',req.body.BankAcNo);
            request.input('Bank_Name',req.body.Bank_Name);
            request.input('Branch_Name',req.body.Branch_Name);
            request.input('Email_ID',req.body.Email_ID);
            request.input('Is_Default_EmailId', req.body.Is_Default_EmailId.toLowerCase() == 'true' ? true : false);
            request.input('Alt_Email_ID',req.body.Alt_Email_ID);
            request.input('Is_Default_Alt_EmailId',req.body.Is_Default_Alt_EmailId);
            request.input('Is_Default_Alt_EmailId', req.body.Is_Default_Alt_EmailId.toLowerCase() == 'true' ? true : false);
            request.input('CC_Email_ID',req.body.CC_Email_ID);
            request.input('STD_Code',req.body.STD_Code);
            request.input('PhoneNo',req.body.PhoneNo);
            request.input('Mobile',req.body.Mobile);
            request.input('PANno',req.body.PANno);
            request.input('AAdhar_No',req.body.AAdhar_No);
            request.input('VoterId',req.body.VoterId);
            request.input('PassportNo',req.body.PassportNo);
      request.input('Marriage_Date',req.body.Marriage_Date);///////////
            request.input('Department_Id',parseInt(req.body.Department_Id));
            request.input('Desig_Id',parseInt(req.body.Department_Id));
            request.input('Emp_Cate_Id',parseInt(req.body.Emp_Cate_Id));
            //request.input('Employee_Image',req.body.Employee_Image);////////////
            request.input('Date_of_Join',req.body.Date_of_Join);
            request.input('Salary_Calc_From',req.body.Salary_Calc_From);
            request.input('Is_Leaving', req.body.Is_Leaving.toLowerCase() == 'true' ? true : false);
           request.input('Date_of_Leave',req.body.Date_of_Leave);
            request.input('Reason_Of_Leave',req.body.Reason_Of_Leave);
            request.input('Past_Service_inDay',parseInt(req.body.Past_Service_inDay));
            request.input('IsESI', req.body.IsESI.toLowerCase() == 'true' ? true : false);
            request.input('ESI_No',req.body.ESI_No);
            request.input('ESI_Dispensary',req.body.ESI_Dispensary);
            request.input('IsPF', req.body.IsPF.toLowerCase() == 'true' ? true : false);
            request.input('PF_No',req.body.PF_No);
            request.input('PF_Dept_File',req.body.PF_Dept_File);
            request.input('Is_Restrict_PF', req.body.Is_Restrict_PF.toLowerCase() == 'true' ? true : false);
            request.input('Is_Zero_Pension', req.body.Is_Zero_Pension.toLowerCase() == 'true' ? true : false);
            request.input('Is_Zero_PT', req.body.Is_Zero_PT.toLowerCase() == 'true' ? true : false);
            request.input('IsGRI', req.body.IsGRI.toLowerCase() == 'true' ? true : false);
            request.input('GRI_No',req.body.GRI_No);
            request.input('IsInsurance', req.body.IsInsurance.toLowerCase() == 'true' ? true : false);
            request.input('Insurance_No',req.body.Insurance_No);
            request.input('IsDisabled',req.body.IsDisabled);
            request.input('IsInternationalworker',req.body.IsInternationalworker);
            request.input('IsHigherEPF',req.body.IsHigherEPF);
            request.input('IsHigherEPS',req.body.IsHigherEPS);  
            request.input('Permanent_Res_No',req.body.Permanent_Res_No);
            request.input('Permanent_Res_Name', req.body.Permanent_Res_Name);
            request.input('Permanent_Road',req.body.Permanent_Road);
            request.input('Permanent_Area',req.body.Permanent_Area);
            request.input('Permanent_City',req.body.Permanent_City);
            request.input('Permanent_State',req.body.Permanent_State); 
            request.input('Permanent_Pincode',req.body.Permanent_Pincode);
            request.input('Created_By', parseInt(req.body.Created_By));

            request.execute('Proc_Employee_Details', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
                  sql.close();
               }
               else {
                  res.json({ status: true });
                  sql.close();
               }
            });
         });
      });

      //API FOR VIEW ALL EMPLOYEE DETAILS

      app.post('/viewallemployee', function (req, res) {
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();
            var data_added = true;
            request.input('Operation','SELECT');
            request.execute('Proc_Employee_Details',function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
                  sql.close();
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0]});
                  sql.close();
               }
            });
         });
      });


      //API FOR SEARCH EMPLOYEE DETAILS

      app.post('/search_employee', function (req, res) {
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();
            var data_added = true;
            request.input('Operation','SELECT');
            //request.input('ID', req.body.id);
            request.input('OUT_CODE',parseInt(req.body.id));
            request.execute('Proc_Employee_Details', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
                  sql.close();
               }
               else {
                  res.json({ status: true, result: rec.recordsets[0] });
                  sql.close();
               }
            });
         });
      });

      //API FOR VIEW SINGLE EMPLOYEE DETAILS

      app.post('/view_single_employee', function (req, res) {
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();
            var data_added = true;
            request.input('Operation', 'SELECTBYID');
            request.input('EmployeeId', parseInt(req.body.id));//EMPLOYEE ID

            request.execute('Proc_Employee_Details', function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
                  sql.close();
               }
               else {
                  res.json({ status: true, result: rec.recordset[0] });
                  sql.close();
               }
            });
         });
      });
      
      //API FOR DELETE EMPLOYEE DETAILS

      app.post('/delete_employee',function (req, res) {
         //console.log(req);
         sql.close();
         sql.connect(config, function () {
            var request = new sql.Request();
            var data_added = true;
            request.input('Operation','DELETE');
            request.input('EmployeeId', parseInt(req.body.id));//EMPLOYEE ID

            request.execute('Proc_Employee_Details',function (err, rec) {
               if (err) {
                  console.log(err);
                  res.json({ status: false });
                  sql.close();
               }
               else {
                  res.json({ status: true });
                  sql.close();
               }
            });
         });
      });
   }
}