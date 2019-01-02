
var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');


module.exports = {
    configure: function (app,assert,config) {


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
         



 

  //API FOR ADD ESI
  app.post('/addesigroup', function (req, res) {
    //console.log(req);
       sql.connect(config, function () {
          var request = new sql.Request();
         
          var data_added = true;

          request.input('Operation', 'INSERT');

          request.input('ESIGroup_Id', parseInt(req.body.ESIGroup_Id));
          request.input('ESI_No', req.body.ESI_No);
          request.input('ESI_Local_Office', req.body.ESI_Local_Office);
          request.input('Address', req.body.Address);
          request.input('Is_Limit_ESI_Gross', req.body.Is_Limit_ESI_Gross.toLowerCase() == 'true' ? true : false);
          request.input('Is_Individual_Calc', req.body.Is_Individual_Calc.toLowerCase() == 'true' ? true : false);
          request.input('Created_By', parseInt(req.body.Created_By));

          // request.input('Modified_By', parseInt(req.body.Modified_By));
          // request.input('Is_Deleted', req.body.Is_Deleted.toLowerCase() == 'true' ? true : false);
          // request.input('Modified_On',req.body.Modified_On);
          
          request.execute('Proc_ESIGROUP_MST', function (err, recordsets, returnValue, affected) {
             if (err) {
                console.log(err);
                res.json({ status: false })
                //data_added= false;
             }
             else {
                //res.end(JSON.stringify(recordsets)); // Result in JSON format
                //res.json({ status: true });
                res.json({ status: true,result:recordsets });
                sql.close();         
       }
       });
       });
    });

    //API FOR VIEW ESI GROUP

app.post('/viewallesigroup', function (req, res) {
 //console.log(req);
    sql.connect(config, function () {
       var request = new sql.Request();
      
       var data_added = true;
       request.input('Operation', 'SELECT');
       //request.input('ID', req.body.id);
            //request.input('Company_Person_Name', req.body.Company_Person_Name)
       request.execute('Proc_ESIGROUP_MST', function (err, recordsets, returnValue, affected) {
          if (err) {
             console.log(err);
             res.json({ status: false })
             //data_added= false;
          }
          else {
             //res.end(JSON.stringify(recordsets)); // Result in JSON format
             //res.json({ status: true });
             res.send(recordsets);
             sql.close();         
    }
    });
    });
 });







        }
    }