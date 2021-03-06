
var sql = require('mssql');

module.exports = {
   configure: function (app, assert, config, connection) {

      //API FOR ADD PAYHEAD DETAILS
      app.post('/addpayheadmapslab', function (req, res) {
         var result = true;
         var request = new sql.Request(connection);
         request.input('Operation', 'INSERT');
         request.input('Effective_From', new Date(req.body.Effective_From));
         request.input('Salary_Str_Id', parseInt(req.body.Salary_Str_Id));
         request.input('Payhead_Id', parseInt(req.body.Payhead_Id));
         //request.input('Payid',req.body.Payid);
         request.input('Pay_Calc_Basic', req.body.Pay_Calc_Basic);
         request.input('Pay_Calc_Type', req.body.Pay_Calc_Type);
         request.input('Created_By', parseInt(req.body.Created_By));
         request.input('Pay_Calc_Rate', parseFloat(req.body.Pay_Calc_Rate));
         request.input('Cutoff_Amount', parseFloat(req.body.Cutoff_Amount));
         request.input('Round_Off', req.body.Round_Off);
         request.input('Formula_Name', req.body.Formula_Name);
         request.input('Formula_Value', req.body.Formula_Value);

         request.execute('Proc_PayHead_Map_Mst', function (err, rec) {
            if (err) {
               console.log(err);
               //res.json({ status: false });  
               result = false;
            }
            else {
               //res.json({ status: true }); 

               var request2 = new sql.Request(connection);
               var ok = [];
               ok.push(req.body.map)
               console.log(ok);
               if (ok.length == 0) {

               }
               else {
                  var map2 = JSON.parse(req.body.map);
                  console.log(map2);
                  map2.forEach(function (doc, err) {
                     request2.input('Operation', 'INSERT');
                     // request2.input('Branch_Id', parseInt(doc.Branch_Id));
                     // console.log(doc.Branch_Id);
                     request2.input('Salary_Str_Id', parseInt(req.body.Salary_Str_Id));
                     request2.input('Payhead_Id', parseInt(req.body.Payhead_Id));
                     request2.input('Paymap_Min_Amount', parseFloat(doc.Paymap_Min_Amount));
                     request2.input('Paymap_Max_Amount', doc.Paymap_Max_Amount);
                     request2.input('Paymap_Type', doc.Paymap_Type);
                     request2.input('Created_By', parseInt(req.body.Created_By));
                     request2.input('Paymap_Amount', parseInt(doc.Paymap_Amount));

                     request2.execute('Proc_Payhead_Map_Slab', function (err, rec) {
                        if (err) {
                           console.log(err);
                           result = false;
                        }
                        else {
                           //res.json({ status: true });
                        }
                     });
                  });
               }
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
            if (result == false) {
               res.json({ status: false });
            }
            else {
               res.json({ status: true });
            }
         });
      });

      //API FOR VIEW ALL  DETAILS///////////////////////////////////////////////////////////////////////////////////

      app.post('/view_payheadmapslab', function (req, res) {
         var data = [];
         var request = new sql.Request(connection);
         request.input('Operation', 'SELECT');
         request.execute('Proc_PayHead_Map_Mst', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               
               for (var i = 0; i < rec.recordsets[0].length; i++) {
                  console.log(rec.recordsets[0].length+" -- "+i);
                  console.log(rec.recordsets[0][i].Paymap_Calc_Type);
                  if (rec.recordsets[0][i].Paymap_Calc_Type == "SLAB") {
                     var currentSlab = rec.recordsets[0][i];
                     var currentI = i;
                     console.log("is slab "+i);
                     request.input('Operation', 'SELECT');
                     request.input('Payhead_Map_Id',rec.recordsets[0][i].Payhead_Map_Id );
                     request.execute('Proc_Payhead_Map_Slab', function (err, rec2) {
                        if (err) {
                           console.log(err);
                           res.json({ status: false });
                        }
                        else {
                           console.log(currentI);
                           var a = {
                              "RowId": rec.recordsets[0][currentI].RowId,
                              "Payhead_Map_Id": rec.recordsets[0][currentI].Payhead_Map_Id,
                              "Effective_From": rec.recordsets[0][currentI].Effective_From,
                              "Salary_Stru_Id":rec.recordsets[0][currentI].Salary_Stru_Id,
                              "Payhead_Id":rec.recordsets[0][currentI].Payhead_Id,
                              "Paymap_Calc_Basic":rec.recordsets[0][currentI].Paymap_Calc_Basic,
                              "Paymap_Calc_Type":rec.recordsets[0][currentI].Paymap_Calc_Type,
                              "Paymap_Calc_Rate":rec.recordsets[0][currentI].Paymap_Calc_Rate,
                              "Formula_Name":rec.recordsets[0][currentI].Formula_Name,
                              "Formula_Value":rec.recordsets[0][currentI].Formula_Value,
                              "Cutoff_Amount":rec.recordsets[0][currentI].Cutoff_Amount,
                              "Round_Off":rec.recordsets[0][currentI].Round_Off,
                              "Created_By":rec.recordsets[0][currentI].Created_By,
                              "Created_On": rec.recordsets[0][currentI].Created_On,
                              "Modified_By":rec.recordsets[0][currentI].Modified_By,
                              "Modified_On":rec.recordsets[0][currentI].Modified_On,
                              "Is_Deleted":rec.recordsets[0][currentI].Is_Deleted,
                              "slab":rec2.recordsets[0]
                           }
                           // var dataToPush =  rec.recordsets[0][currentI];
                           // dataToPush["slab"] =  rec2.recordsets[0];
                           // console.log("dataToPush");
                           console.log(a);
                           data.push(a);

                        }
                     });
                  }else{
                     var a = {
                        "RowId": rec.recordsets[0][i].RowId,
                        "Payhead_Map_Id": rec.recordsets[0][i].Payhead_Map_Id,
                        "Effective_From": rec.recordsets[0][i].Effective_From,
                        "Salary_Stru_Id":rec.recordsets[0][i].Salary_Stru_Id,
                        "Payhead_Id":rec.recordsets[0][i].Payhead_Id,
                        "Paymap_Calc_Basic":rec.recordsets[0][i].Paymap_Calc_Basic,
                        "Paymap_Calc_Type":rec.recordsets[0][i].Paymap_Calc_Type,
                        "Paymap_Calc_Rate":rec.recordsets[0][i].Paymap_Calc_Rate,
                        "Formula_Name":rec.recordsets[0][i].Formula_Name,
                        "Formula_Value":rec.recordsets[0][i].Formula_Value,
                        "Cutoff_Amount":rec.recordsets[0][i].Cutoff_Amount,
                        "Round_Off":rec.recordsets[0][i].Round_Off,
                        "Created_By":rec.recordsets[0][i].Created_By,
                        "Created_On": rec.recordsets[0][i].Created_On,
                        "Modified_By":rec.recordsets[0][i].Modified_By,
                        "Modified_On":rec.recordsets[0][i].Modified_On,
                        "Is_Deleted":rec.recordsets[0][i].Is_Deleted,
                        "slab":[]
                     }
                     data.push(a);
                  }
               }
               setTimeout(function(){
                  res.json({ status: true, Pay_HeadMap_Details: data });
               },100);

            }
         });
      });

      //API FOR VIEW ALL  DETAILS

      app.post('/view_single_payheadmapslab', function (req, res) {
         var data = [];
         var request = new sql.Request(connection);
         request.input('Operation', 'SELECTBYID');
         request.input('Payhead_Id', parseInt(req.body.Payhead_Id));
         request.execute('Proc_PayHead_Map_Mst', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               request.input('Operation', 'SELECTBYID');
               request.input('Payhead_Id', parseInt(req.body.Payhead_Id));
               request.execute('Proc_Payhead_Map_Slab', function (err, rec2) {
                  if (err) {
                     console.log(err);
                     res.json({ status: false });
                  }
                  else {
                     res.json({ status: true, Pay_HeadMap_Details: rec.recordsets[0], Pay_HeadMap_Slab_Details: rec2.recordsets[0] });
                  }
               });
            }
         });
      });


      //API FOR DELETE ALL  DETAILS

      app.post('/delete_single_payheadmapslab', function (req, res) {
         var data = [];
         var request = new sql.Request(connection);
         request.input('Operation', 'DELETE');
         request.input('Payhead_Map_Id', parseInt(req.body.Payhead_Map_Id));
         request.execute('Proc_PayHead_Map_Mst', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               request.input('Operation', 'DELETE');
               request.input('Payhead_Map_Id', parseInt(req.body.Payhead_Map_Id));
               request.execute('Proc_Payhead_Map_Slab', function (err, rec2) {
                  if (err) {
                     console.log(err);
                     res.json({ status: false });
                  }
                  else {
                     res.json({ status: true });
                  }
               });
            }
         });
      });


      //API FOR ADD PAYHEAD DETAILS
      app.post('/addpayheadmapdetails', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'INSERT');
         request.input('Effective_From', new Date(req.body.Effective_From));
         request.input('Salary_Str_Id', parseInt(req.body.Salary_Str_Id));
         request.input('Payhead_Id', parseInt(req.body.Payhead_Id));
         request.input('Payid', req.body.Payid);
         request.input('Pay_Calc_Basic', req.body.Pay_Calc_Basic);
         request.input('Pay_Calc_Type', req.body.Pay_Calc_Type);
         request.input('Created_By', parseInt(req.body.Created_By));
         request.input('Pay_Calc_Rate', parseFloat(req.body.Pay_Calc_Rate));
         request.input('Cutoff_Amount', parseFloat(req.body.Cutoff_Amount));
         request.input('Round_Off', req.body.Round_Off);
         request.input('Formula_Name', req.body.Formula_Name);
         request.input('Formula_Value', req.body.Formula_Value);

         request.execute('Proc_PayHead_Map_Mst', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               res.json({ status: true });
            }
         });
      });

      //API FOR UPDATE PAYHEAD DETAILS
      app.post('/updatepayheadmapdetails', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'UPDATE');
         request.input('Effective_From', new Date(req.body.Effective_From));
         request.input('Salary_Str_Id', parseInt(req.body.Salary_Str_Id));
         request.input('Payhead_Id', parseInt(req.body.Payhead_Id));
         request.input('Payid', req.body.Payid);
         request.input('Pay_Calc_Basic', req.body.Pay_Calc_Basic);
         request.input('Pay_Calc_Type', req.body.Pay_Calc_Type);
         request.input('Created_By', parseInt(req.body.Created_By));
         request.input('Pay_Calc_Rate', parseFloat(req.body.Pay_Calc_Rate));
         request.input('Cutoff_Amount', parseFloat(req.body.Cutoff_Amount));
         request.input('Round_Off', req.body.Round_Off);
         request.input('Formula_Name', req.body.Formula_Name);
         request.input('Formula_Value', req.body.Formula_Value);

         request.input('Payhead_Map_Id', parseInt(req.body.id));//PAYHEADMAP ID

         request.execute('Proc_PayHead_Map_Mst', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               res.json({ status: true });
            }
         });
      });

      //API FOR VIEW ALL PAYHEAD MAP DETAILS

      app.post('/viewallpayheadmap', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'SELECT');
         request.execute('Proc_PayHead_Map_Mst', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               res.json({ status: true, result: rec.recordsets[0] });
            }
         });
      });

      //API FOR SEARCH PAYHEAD MAP DETAILS

      app.post('/search_payheadmapdetails', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'SEARCH');
         //request.input('ID', req.body.id);
         request.input('OUT_CODE', parseInt(req.body.id));
         request.execute('Proc_PayHead_Map_Mst', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               //res.json({ status: true, result: rec.recordsets[0] }); 
               var idd = rec.recordsets[0].Payhead_Map_Id;
               console.log(idd);
               request.input('Operation', 'SEARCH2');
               //request.input('ID', req.body.id);
               request.input('Payhead_Map_Id', idd);
               request.execute('Proc_Payhead_Map_Slab', function (err, rec2) {
                  if (err) {
                     console.log(err);
                     res.json({ status: false });
                  }
                  else {
                     res.json({ status: true, payheadmapdetails: rec.recordsets[0], payheadmapslap: rec2.recordsets[0] });
                  }
               });


            }
         });
      });

      //API FOR VIEW SINGLE PAYHEAD MAP DETAILS

      app.post('/view_single_payheadmap', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'SELECTBYID');
         request.input('Payhead_Map_Id', parseInt(req.body.id));//PAYHEAD ID

         request.execute('Proc_PayHead_Map_Mst', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               res.json({ status: true, result: rec.recordset[0] });
            }
         });
      });

      //API FOR DELETE PAYHEADMAP DETAILS
      app.post('/delete_payheadmap', function (req, res) {
         var request = new sql.Request(connection);
         console.log(req.body);
         request.input('Operation', 'DELETE');
         request.input('Payhead_Map_Id', parseInt(req.body.id));//PAYHEAD ID

         request.execute('Proc_PayHead_Map_Mst', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               res.json({ status: true });
            }
         });
      });





      //API FOR ADD PAYHEAD DETAILS
      app.post('/updatepayheadmapslab2', function (req, res) {
         console.log(req.body);
         var result = true;
         var request = new sql.Request(connection);
         request.input('Operation', 'UPDATE');
         request.input('Effective_From', new Date(req.body.Effective_From));
         request.input('Salary_Str_Id', parseInt(req.body.Salary_Str_Id));
         request.input('Payhead_Id', parseInt(req.body.Payhead_Id));
         //request.input('Payid',req.body.Payid);
         request.input('Pay_Calc_Basic', req.body.Pay_Calc_Basic);
         request.input('Pay_Calc_Type', req.body.Pay_Calc_Type);
         request.input('Created_By', parseInt(req.body.Created_By));
         request.input('Pay_Calc_Rate', parseFloat(req.body.Pay_Calc_Rate));
         request.input('Cutoff_Amount', parseFloat(req.body.Cutoff_Amount));
         request.input('Round_Off', req.body.Round_Off);
         request.input('Formula_Name', req.body.Formula_Name);
         request.input('Formula_Value', req.body.Formula_Value);
         request.input('Payhead_Id', req.body.Payhead_Id);

         request.execute('Proc_PayHead_Map_Mst', function (err, rec) {
            if (err) {
               console.log(err);
               //res.json({ status: false });  
               result = false;
            }
            else {
               //res.json({ status: true }); 

               var request2 = new sql.Request(connection);
               var ok = [];
               ok.push(req.body.map)
               console.log(ok);
               if (ok.length == 0) {

               }
               else {
                  var map2 = JSON.parse(req.body.map);
                  console.log(map2);

                  map2.forEach(function (doc, err) {
                     request2.input('Operation', 'UPDATE');
                     // request2.input('Branch_Id', parseInt(doc.Branch_Id));
                     // console.log(doc.Branch_Id);
                     request2.input('Salary_Str_Id', parseInt(req.body.Salary_Str_Id));
                     request2.input('Payhead_Id', parseInt(req.body.Payhead_Id));
                     request2.input('Paymap_Min_Amount', parseFloat(doc.Paymap_Min_Amount));
                     request2.input('Paymap_Max_Amount', doc.Paymap_Max_Amount);
                     request2.input('Paymap_Type', doc.Paymap_Type);
                     request2.input('Created_By', parseInt(req.body.Created_By));
                     request2.input('Paymap_Amount', parseInt(doc.Paymap_Amount));
                     request.input('Payhead_Id', req.body.Payhead_Id);

                     request2.execute('Proc_Payhead_Map_Slab', function (err, rec) {
                        if (err) {
                           console.log(err);
                           result = false;
                        }
                        else {
                           //res.json({ status: true });
                        }
                     });
                  });
               }
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
            if (result == false) {
               res.json({ status: false });
            }
            else {
               res.json({ status: true });
            }
         });
      });




   }
}
