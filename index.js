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


app.set('port', (process.env.PORT || 8008));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//DATABASE CONNECTION SET UP

var config = {
   user: 'sa',
   password: '12345',
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

module.exports = connection;

//WELCOME API
app.get('/', function (req, res) {
   res.send("WELCOME TO PAYROLL APP API'S");
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

app.post('/view', function (req, res) {
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

