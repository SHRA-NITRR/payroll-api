
var sql = require('mssql');

module.exports = {
   configure: function (app, assert, config, connection) {

      //API FOR ADD PAYHEAD MAP SLAB DETAILS
      app.post('/addpayheadmapslab', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'INSERT');
         request.input('Salary_Str_Id', parseInt(req.body.Salary_Str_Id));
         request.input('Payhead_Id', parseInt(req.body.Payhead_Id));
         request.input('Paymap_Min_Amount', parseFloat(req.body.Paymap_Min_Amount));
         request.input('Paymap_Max_Amount', req.body.Paymap_Max_Amount);
         request.input('Paymap_Type', req.body.Paymap_Type);
         request.input('Created_By', parseInt(req.body.Created_By));
         request.input('Paymap_Amount', parseFloat(req.body.Paymap_Amount));


         request.execute('Proc_Payhead_Map_Slab', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               res.json({ status: true });
            }
         });
      });



      //API FOR UPDATE PAYHEAD MAP SLAB DETAILS
      app.post('/updatepayheadmapslab', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'UPDATE');
         request.input('Salary_Str_Id', parseInt(req.body.Salary_Str_Id));
         request.input('Payhead_Id', parseInt(req.body.Payhead_Id));
         request.input('Paymap_Min_Amount', parseFloat(req.body.Paymap_Min_Amount));
         request.input('Paymap_Max_Amount', req.body.Paymap_Max_Amount);
         request.input('Paymap_Type', req.body.Paymap_Type);
         request.input('Created_By', parseInt(req.body.Created_By));
         request.input('Paymap_Amount', parseFloat(req.body.Paymap_Amount));

         request.input('Payhead_Map_Slab_Id', parseInt(req.body.id));//PAYHEADMAP SLAB ID

         request.execute('Proc_Payhead_Map_Slab', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               res.json({ status: true });
            }
         });
      });

      //API FOR VIEW ALL PAYHEAD MAP SLAB DETAILS

      app.post('/viewallpayheadmapslab', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'SELECT');
         request.execute('Proc_Payhead_Map_Slab', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               res.json({ status: true, result: rec.recordsets[0] });
            }
         });
      });

      //API FOR SEARCH PAYHEAD MAP SLAB DETAILS

      app.post('/search_payheadmapslab', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'SEARCH');
         //request.input('ID', req.body.id);
         request.input('OUT_CODE', parseInt(req.body.id));
         request.execute('Proc_Payhead_Map_Slab', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               res.json({ status: true, result: rec.recordsets[0] });
            }
         });
      });

      //API FOR VIEW SINGLE PAYHEAD MAP SLAB  DETAILS

      app.post('/view_single_payheadmapslab', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'SELECTBYID');
         request.input('Payhead_Id', parseInt(req.body.id));//PAYHEAD ID

         request.execute('Proc_Payhead_Map_Slab', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               res.json({ status: true, result: rec.recordset[0] });
            }
         });
      });

      //API FOR DELETE PAYHEADMAP SLAB DETAILS
      app.post('/delete_payheadmapslab', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'DELETE');
         request.input('Payhead_Map_Slab_Id', parseInt(req.body.id));//PAYHEADMAP SLAB ID

         request.execute('Proc_Payhead_Map_Slab', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               res.json({ status: true });
            }
         });
      });







//API FOR ADD DETAILS
app.post('/addpayheadmapslab2', function (req, res) {
   var result=true;
   const transaction = new sql.Transaction();
         transaction.begin((err) => {
            if (err) {
               res.json({ status: false });
            } else {
               var request = new sql.Request(transaction);
   request.input('Operation', 'INSERT');
   request.input('Effective_From',new Date(req.body.Effective_From));
   request.input('Salary_Str_Id',parseInt(req.body.Salary_Str_Id));
   request.input('Payhead_Id',parseInt(req.body.Payhead_Id));
   //request.input('Payid',req.body.Payid);
   request.input('Pay_Calc_Basic',req.body.Pay_Calc_Basic);
   request.input('Pay_Calc_Type',req.body.Pay_Calc_Type);
   request.input('Created_By', parseInt(req.body.Created_By));
   request.input('Pay_Calc_Rate',parseFloat(req.body.Pay_Calc_Rate));
   request.input('Cutoff_Amount',parseFloat(req.body.Cutoff_Amount));
   request.input('Round_Off',req.body.Round_Off);
   request.input('Formula_Name',req.body.Formula_Name);
   request.input('Formula_Value',req.body.Formula_Value);

   request.execute('Proc_PayHead_Map_Mst', function (err, rec) {
      if (err) {
         console.log(err);
         //res.json({ status: false });  
         result=false;
      }
      else {
         //res.json({ status: true }); 
      
         var request2 = new sql.Request(transaction);
         var map2 = JSON.parse(req.body.map);
         console.log(map2);
         request2.input('Operation', 'INSERT');
         map2.forEach(function (doc, err) {

            // request2.input('Branch_Id', parseInt(doc.Branch_Id));
            // console.log(doc.Branch_Id);
            request2.input('Salary_Str_Id',parseInt(req.body.Salary_Str_Id));
            request2.input('Payhead_Id',parseInt(req.body.Payhead_Id));
            request2.input('Paymap_Min_Amount', parseFloat(doc.Paymap_Min_Amount));
            request2.input('Paymap_Max_Amount', doc.Paymap_Max_Amount);
            request2.input('Paymap_Type', doc.Paymap_Type);
            request2.input('Created_By', parseInt(req.body.Created_By));
            request2.input('Paymap_Amount', parseInt(doc.Paymap_Amount));

 request2.execute('Proc_Payhead_Map_Slab', function (err, rec) {
            if (err) {
               console.log(err);
              result=false;
            }
            else {
               //res.json({ status: true });


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

            }
         });
         });
         // var request2 = new sql.Request(connection);
         // request2.input('Operation', 'INSERT');
         // request2.input('Salary_Str_Id', parseInt(req.body.Salary_Str_Id));
         // request2.input('Payhead_Id', parseInt(req.body.Payhead_Id));
         // request2.input('Paymap_Min_Amount', parseFloat(req.body.Paymap_Min_Amount));
         // request2.input('Paymap_Max_Amount', req.body.Paymap_Max_Amount);
         // request2.input('Paymap_Type', req.body.Paymap_Type);
         // request2.input('Created_By', parseInt(req.body.Created_By));
         // request2.input('Paymap_Amount', parseFloat(req.body.Paymap_Amount));

         // request2.execute('Proc_Payhead_Map_Slab', function (err, rec) {
         //    if (err) {
         //       console.log(err);
         //       res.json({ status: false });
         //    }
         //    else {
         //       res.json({ status: true });
         //    }
         // });

    
      }
     
   })
}
   });
});














   }
}
