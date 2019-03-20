var express = require('express');
var app = express();
var assert = require('assert');
var bodyParser = require('body-parser');
var cors = require('cors');
var nodemailer = require('nodemailer');
var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');
var multer = require('multer');
var async = require("async");

app.set('port', (process.env.PORT || 8008));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//DATABASE CONNECTION SET UP

var config = {
   user: 'sa',
   password: 'Hapi@12',
   server: 'localhost',
   database: 'VYPAK'
}

var companyroute = require('./routes/company.js');
var branchroute = require('./routes/branch.js');
var esigrouproute = require('./routes/esigroup.js');
var pfgroupoute = require('./routes/pfgroup.js');
var ptgroupoute = require('./routes/ptgroup.js');
var bankroute = require('./routes/bankmaster.js');
var pfsettingroute = require('./routes/pfsetting.js');
var retirementroute = require('./routes/retirement.js');
var salarystructureroute = require('./routes/salarystructure.js');
var graderoute = require('./routes/grade.js');
var holidayroute = require('./routes/holiday.js');
var leaveroute = require('./routes/leave.js');
var siteroute = require('./routes/site.js');
var workroute = require('./routes/workorder.js');
var pfesirateroute = require('./routes/pfesirate.js');
var qualificationroute = require('./routes/qualification.js');
var payheadroute = require('./routes/payheadmst.js');
var lumpsumroute = require('./routes/lumpsummst.js');
var employeeroute = require('./routes/employeemst.js');
var designationroute = require('./routes/designation.js');
var departmentroute = require('./routes/department.js');
var ptrateroute = require('./routes/ptrateeditor.js');
var occupationroute = require('./routes/occupationmst.js');
var attendanceroute = require('./routes/attendancemst.js');
var divisionroute = require('./routes/divisionmst.js');
var salarycalenderroute = require('./routes/salarycalender.js');
var Employee_Family_Detailsroute = require('./routes/Employee_Family_Details.js');
var empeducationdtlsroute = require('./routes/empeducationdtls.js');
var emptrainingdtlroute = require('./routes/empltrainingdtl.js');
var empdisciplinaryroute = require('./routes/empdisciplinarydtls.js');
var empcurriculamroute = require('./routes/employeecurridtls.js');
var payheadmaproute = require('./routes/payhead_map_mst.js');
var payheadmapslabproute = require('./routes/payhead_map_slab_master.js');
var empsalarystruroute = require('./routes/emp_salary_struc.js');
var empattendanceroute = require('./routes/emp_attendance_mst.js');


var connection = sql.connect(config, function (err) {
   if (err) {
      throw err
   }
});



companyroute.configure(app, assert, config, connection);
branchroute.configure(app, assert, config, connection);
esigrouproute.configure(app, assert, config, connection);
pfgroupoute.configure(app, assert, config, connection);
ptgroupoute.configure(app, assert, config, connection);
bankroute.configure(app, assert, config, connection);
pfsettingroute.configure(app, assert, config, connection);
retirementroute.configure(app, assert, config, connection);
salarystructureroute.configure(app, assert, config, connection);
graderoute.configure(app, assert, config, connection);
holidayroute.configure(app, assert, config, connection);
leaveroute.configure(app, assert, config, connection);
siteroute.configure(app, assert, config, connection);
workroute.configure(app, assert, config, connection);
pfesirateroute.configure(app, assert, config, connection);
qualificationroute.configure(app, assert, config, connection);
payheadroute.configure(app, assert, config, connection);
lumpsumroute.configure(app, assert, config, connection);
employeeroute.configure(app, assert, config, connection);
designationroute.configure(app, assert, config, connection);
departmentroute.configure(app, assert, config, connection);
ptrateroute.configure(app, assert, config, connection);
occupationroute.configure(app, assert, config, connection);
attendanceroute.configure(app, assert, config, connection);
divisionroute.configure(app, assert, config, connection);
salarycalenderroute.configure(app, assert, config, connection);
Employee_Family_Detailsroute.configure(app, assert, config, connection);
empeducationdtlsroute.configure(app, assert, config, connection);
emptrainingdtlroute.configure(app, assert, config, connection);
empdisciplinaryroute.configure(app, assert, config, connection);
empcurriculamroute.configure(app, assert, config, connection);
payheadmaproute.configure(app, assert, config, connection);
payheadmapslabproute.configure(app, assert, config, connection);
empsalarystruroute.configure(app, assert, config, connection);
empattendanceroute.configure(app, assert, config, connection);

module.exports = connection;

//WELCOME API
app.get('/', function (req, res) {
   res.send("WELCOME TO PAYROLL APP API'S");
});


app.get('/array', function (req, res) {
   var a = [{
      "Branch_Name": "BbbsrPATIA",
      "Branch_Address": "Patia",
      "Branch_Address2": "Infocity",
      "Branch_PhoneNo": "123",
      "Branch_Person_Name": "Soumya",
      "Branch_Email": "soumya@gmail.com",
      "Branch_PF_Group": 1,
      "Branch_PT_Group": 22,
      "Branch_ESI_Group": 7676,
      "Branch_Id": 1
   }, {
      "Branch_Name": "BbbsrPATIA",
      "Branch_Address": "Patia",
      "Branch_Address2": "Infocity",
      "Branch_PhoneNo": "123",
      "Branch_Person_Name": "Soumya",
      "Branch_Email": "soumya@gmail.com",
      "Branch_PF_Group": 1,
      "Branch_PT_Group": 22,
      "Branch_ESI_Group": 7676,
      "Branch_Id": 1
   }];
   // var b = [];
   // for(var i=0;i<a.length;i++){
   //    var c = [];
   //    c.push(a[i].branch, a[i].name);
   //    b.push(c);
   // }
   // var d = [];
   // d.push(b);
   // console.log(d);
   const transaction = new sql.Transaction();
   var data_added = true;
   var i=0, length = a.length;
   transaction.begin((err) => {
      async.forEachSeries(a, function iteratee(doc, callback) {
         console.log(doc);


         request = new sql.Request(transaction);

         request.input('Operation', 'INSERT');

         request.input('Branch_Name', doc.Branch_Name);

         request.input('Branch_Address', doc.Branch_Address);

         request.input('Branch_Address2', doc.Branch_Address2);

         request.input('Branch_PhoneNo', parseInt(doc.Branch_PhoneNo));

         request.input('Branch_Person_Name', doc.Branch_Person_Name);

         request.input('Branch_Email', doc.Branch_Email);

         request.input('Branch_PF_Group', parseInt(doc.Branch_PF_Group));

         request.input('Branch_PT_Group', parseInt(doc.Branch_PT_Group));

         request.input('Branch_ESI_Group', parseInt(doc.Branch_ESI_Group));

         request.execute('PROC_COMPANY_BRANCH', function (errr, rec) {

            if (errr) {
               // console.log(errr);
               data_added = false;
               console.log(data_added);
            }
            else {
               // setTimeout(function () {
               console.log("hello");
               // }, 500);
            }
            i = i +1;
            if(i==length){
               console.log("end");
               res.send("WELCOME TO PAYROLL APP API'S");
            }
         });


      });

   });
   
});

app.listen(app.get('port'), function () {
   console.log('Node app is running on port', app.get('port'));
});


//API FOR VIEW ALL COUNTRY

app.post('/viewallcountry', function (req, res) {
   var request = new sql.Request(connection);
   request.input('Operation', 'SELECT');

   request.execute('Proc_COUNTRY', function (err, recordsets, returnValue, affected) {
      if (err) {
         console.log(err);
         res.json({ status: false });
      }
      else {
         res.send(recordsets);
      }
   });
});

//API FOR VIEW ALL STATE

app.get('/viewallstate', function (req, res) {
   var request = new sql.Request(connection);
   request.input('Operation', 'SELECTBYID');
   //request.input('ID', req.body.id);//COUNTRY ID
   request.input('ID', 101);//COUNTRY ID
   request.execute('Proc_State', function (err, rec) {
      if (err) {
         res.json({ status: false });
      }
      else {
         res.json({ status: true, result: rec.recordsets[0] });
      }
   });
});

//API FOR VIEW ALL CITY

app.post('/viewallcity', function (req, res) {
   var request = new sql.Request(connection);
   request.input('Operation', 'SELECTBYID');
   request.input('ID', req.body.id);//STATE ID
   request.execute('Proc_City', function (err, rec) {
      if (err) {
         console.log(err);
         res.json({ status: false });
      }
      else {
         res.json({ status: true, result: rec.recordsets[0] });
      }
   });
});


//API FOR VIEW ALL DEPARTMENT FOR EMPLOYEE

app.post('/viewdepartment', function (req, res) {
   var request = new sql.Request(connection);
   request.input('Operation', 'SELECTBYID2');
   //request.input('ID', req.body.id);//STATE ID
   request.execute('Proc_DepartmentMaster', function (err, rec) {
      if (err) {
         console.log(err);
         res.json({ status: false });
      }
      else {
         res.json({ status: true, result: rec.recordsets[0] });
      }
   });
});


//API FOR VIEW ALL EMPLOYEE FOR DEPARTMENT

app.post('/viewdepartmentemployee', function (req, res) {
   var request = new sql.Request(connection);
   request.input('Operation', 'SELECTBYID22');
   request.input('id', req.body.id);//DEPARTMENT ID
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


//API FOR VIEW ALL PAYHEAD TYPE

app.post('/viewallpayheadtype', function (req, res) {
   var request = new sql.Request(connection);
   request.input('Operation', 'SELECTBYID2');
   request.input('PayHead_Type', req.body.id);//PayHead_Type 
   request.execute('Proc_PayHead_Mst', function (err, rec) {
      if (err) {
         console.log(err);
         res.json({ status: false });
      }
      else {
         res.json({ status: true, result: rec.recordsets[0] });
      }
   });
});



//API  TYPE

app.post('/view2', function (req, res) {
   var resultArry = [];
   var request = new sql.Request(connection);
   request.input('Operation', 'SELECTBYID2');
   request.input('PayHead_Type', req.body.id);//PayHead_Type 
   request.execute('Proc_PayHead_Mst', function (err, rec) {
      if (err) {
         console.log(err);
         res.json({ status: false });
      }
      else {
         var paylength = rec.recordsets[0].length;
         //res.json({ status: true, result: paylength });

         //var ok=JSON.parse(rec.recordsets[0]);
         // rec.recordsets[0].forEach(function (doc, err) {

         //       resultArry.push(doc.PayHead_Name);




         // })

         var request = new sql.Request(connection);
         request.input('Operation', 'SELECTBYID22');
         request.input('id', req.body.idd);//DEPARTMENT ID
         request.execute('Proc_Employee_Details', function (err, rec2) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               rec2.recordsets[0].forEach(function (doc2, err) {
                  rec.recordsets[0].forEach(function (doc, err) {
                     resultArry.push({ emp_id: doc2.EmployeeId, pay_id: doc.PayHead_Name, });

                  })

               })
               res.json({ status: true, result: resultArry });
            }
         });
         console.log(rec.recordsets[0]);
         //res.json({ status: true, result:resultArry});
      }
   });
});



//API  TYPE

app.post('/viewalldetails', function (req, res) {
   var resultArry = [];
   var request = new sql.Request(connection);
   request.input('Operation', 'SELECTBYID28');
   request.input('EmployeeId', req.body.EmployeeId);//PayHead_Type 
   request.execute('Proc_PayHead_Mst', function (err, rec) {

      if (err) {
         console.log(err);
         res.json({ status: false });
      }
      else {

         //res.json({ status: true, result:rec.recordsets[0]});
         request.input('Operation', 'SELECTBYID29');
         request.input('EmployeeId', req.body.EmployeeId);//employee id
         request.execute('Proc_PayHead_Mst', function (err, rec2) {

            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {

               rec2.recordsets[0].forEach(function (doc2, err) {

                  if (rec.length == 0) {
                     resultArry.push({ emp_id: doc2.EmployeeId, emp_name: doc2.Employee_Name, payhead_name: doc2.PayHead_Name, pay_code: doc2.PayHead_Code, Amount: 0 });
                  } else {
                     var exists = false;
                     rec.recordsets[0].forEach(function (doc, err) {
                        if (doc.PayHead_Id == doc2.PayHead_Id) {
                           resultArry.push({ emp_id: doc.EmployeeId, emp_name: doc.Employee_Name, payhead_name: doc.PayHead_Name, pay_code: doc.PayHead_Code, Amount: doc.Amount });
                           exists = true;
                        }
                     });
                     if (exists == false) {
                        resultArry.push({ emp_id: doc2.EmployeeId, emp_name: doc2.Employee_Name, payhead_name: doc2.PayHead_Name, pay_code: doc2.PayHead_Code, Amount: 0 });

                     }
                  }

               })
               res.json({ status: true, result: resultArry });
            }
         });

      }
   });
   //console.log(rec.recordsets[0]);
   //res.json({ status: true, result:resultArry});

});

