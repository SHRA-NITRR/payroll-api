var sql = require('mssql');

module.exports = {
   configure: function (app, assert, config, connection) {

      //API FOR ADD COMPANY & BRANCH DETAILS

      var multer = require('multer');
      var image = [];
      var Storage = multer.diskStorage({
         destination: function (req, file, callback) {
            callback(null, "./documents");
         },
         filename: function (req, file, callback) {
            //  callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
            callback(null, file.originalname);
            image.push(file.originalname);
            console.log(image);
         }
      });
      var upload = multer({ storage: Storage });
/////////////////ADD COMPANY,BRANCH,DOCUMENT DETAILS
      app.post('/add_companybranchdetails', upload.array('Company_File_Name',20), function (req, res) {
         
         console.log(req.body.branch);
         const transaction = new sql.Transaction();
         transaction.begin((err) => {
            if (err) {
               res.json({ status: false });
            } else {
               var request = new sql.Request(transaction);
               var data_added = true;
               request.input('Operation', 'INSERT');
               request.input('Company_Name', req.body.Company_Name);
               request.input('Company_Person_Name', req.body.Company_Person_Name)
               request.input('Company_Address', req.body.Company_Address);
               request.input('Company_Address2', req.body.Company_Address2);
               request.input('Company_PhoneNo', parseInt(req.body.Company_PhoneNo));
               request.input('Company_Website', req.body.Company_Website);
               request.input('Company_Email', req.body.Company_Email);
               request.input('Company_CINNo', req.body.Company_CINNo);
               request.input('Company_GSTNo', req.body.Company_GSTNo);
               request.input('Comapny_IsPF', req.body.Comapny_IsPF.toLowerCase() == 'true' ? true : false);
               request.input('Company_PFNo', req.body.Company_PFNo);

               request.input('Company_DBAFile_Code', req.body.Company_DBAFile_Code);

               request.input('Company_PF_Extn', req.body.Company_PF_Extn);

               request.input('Comapny_IsPFVol', req.body.Comapny_IsPFVol.toLowerCase() == 'true' ? true : false);

               request.input('Comapny_IsPFMultigrp', req.body.Comapny_IsPFMultigrp.toLowerCase() == 'true' ? true : false);

               request.input('Comapny_IsESI', req.body.Comapny_IsESI.toLowerCase() == 'true' ? true : false);

               request.input('Company_ESI_No', req.body.Company_ESI_No);

               request.input('Company_ESI_LocalOfc', req.body.Company_ESI_LocalOfc);

               request.input('Indv_Calculate_Emp_ESI', req.body.Indv_Calculate_Emp_ESI.toLowerCase() == 'true' ? true : false);

               request.input('Limit_ESI_Gross', req.body.Limit_ESI_Gross.toLowerCase() == 'true' ? true : false);

               request.input('Is_ESI_Multiple_Group', req.body.Is_ESI_Multiple_Group.toLowerCase() == 'true' ? true : false);

               request.input('Comapny_IsTDS', req.body.Comapny_IsTDS.toLowerCase() == 'true' ? true : false);

               request.input('Comapny_TanNo', req.body.Comapny_TanNo);

               request.input('Company_Type', req.body.Company_Type);

               request.input('Comapny_IsBonus', req.body.Comapny_IsBonus.toLowerCase() == 'true' ? true : false);

               request.input('Comapny_IsITR', req.body.Comapny_IsITR.toLowerCase() == 'true' ? true : false);

               request.input('Comapny_IsPT', req.body.Comapny_IsPT.toLowerCase() == 'true' ? true : false);

               request.input('Comapny_IsSupSalary', req.body.Comapny_IsSupSalary.toLowerCase() == 'true' ? true : false);

               request.input('Comapny_IsGratuity', req.body.Comapny_IsGratuity.toLowerCase() == 'true' ? true : false);

               request.input('Created_By', parseInt(req.body.Created_By));


               request.execute('PROC_COMPANY_DETAILS', function (err, rec) {
                  if (err) {
                     console.log(err);
                     data_added = false;
                  }
                  else {

                    var branch2 = JSON.parse(req.body.branch);
                     
                     console.log(req.body);

                     var count = 0;
                     branch2.forEach(function (doc, err) {
                        //assert.equal(null, err);
                        
                        request.input('Operation', 'INSERT');

                        request.input('Branch_Name', doc.Branch_Name);

                        request.input('Branch_Address', doc.Branch_Address);

                        request.input('Branch_Address2', doc.Branch_Address2);

                        request.input('Branch_PhoneNo',parseInt(doc.Branch_PhoneNo));

                        request.input('Branch_Person_Name', doc.Branch_Person_Name);

                        request.input('Branch_Email', doc.Branch_Email);

                        request.input('Branch_PF_Group', parseInt(doc.Branch_PF_Group));

                        request.input('Branch_PT_Group', parseInt(doc.Branch_PT_Group));

                        request.input('Branch_ESI_Group', parseInt(doc.Branch_ESI_Group));

                        request.execute('PROC_COMPANY_BRANCH', function (errr, rec) {
                           count++;
                           if (errr) {
                              console.log(errr);
                              data_added = false;
                              console.log(data_added);
                           }
                           else {
                              setTimeout(function(){
                                 console.log("hello");
                              }, 500);
                           }
                        });
                        
                     })
                     // END OF BRANCH INSERTION
                     if (count == branch2.length) {
                        //request = new sql.Request(transaction);
                        request.input('Operation', 'INSERT');
                        request.input('Company_Id', parseInt(req.body.Company_Id));
                        request.input('Company_File_Name',image);
                        //request.input('File_Data',req.body.File_Data);
                        request.execute('PROC_COMPANY_DOCUMENT', function (err2, rec) {
                           if (err2) {
                              console.log(err2);
                              data_added = false;
                              console.log(data_added);
                           }
                           else {
                              // res.json({ status: true, result: rec.recordsets[0] });
                              if (data_added) {
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
                              image = [];
                           }
                        });

                     }
                  }
               });
            }
         });
      });


      //API FOR UPDATE COMPANY & BRANCH DETAILS

      app.post('/update_companybranchdetails', upload.array('Company_File_Name', 20), function (req, res) {
         const transaction = new sql.Transaction();
         transaction.begin((err) => {
            if (err) {
               res.json({ status: false });
            } else {
               var request = new sql.Request(transaction);
               var data_added = true;
               request.input('Operation', 'UPDATE');
               request.input('Company_Name', req.body.Company_Name);
               request.input('Company_Person_Name', req.body.Company_Person_Name)
               request.input('Company_Address', req.body.Company_Address);
               request.input('Company_Address2', req.body.Company_Address2);
               request.input('Company_PhoneNo', parseInt(req.body.Company_PhoneNo));
               request.input('Company_Website', req.body.Company_Website);
               request.input('Company_Email', req.body.Company_Email);
               request.input('Company_CINNo', req.body.Company_CINNo);
               request.input('Company_GSTNo', req.body.Company_GSTNo);
               request.input('Comapny_IsPF', req.body.Comapny_IsPF.toLowerCase() == 'true' ? true : false);
               request.input('Company_PFNo', req.body.Company_PFNo);

               request.input('Company_DBAFile_Code', req.body.Company_DBAFile_Code);

               request.input('Company_PF_Extn', req.body.Company_PF_Extn);

               request.input('Comapny_IsPFVol', req.body.Comapny_IsPFVol.toLowerCase() == 'true' ? true : false);

               request.input('Comapny_IsPFMultigrp', req.body.Comapny_IsPFMultigrp.toLowerCase() == 'true' ? true : false);

               request.input('Comapny_IsESI', req.body.Comapny_IsESI.toLowerCase() == 'true' ? true : false);

               request.input('Company_ESI_No', req.body.Company_ESI_No);

               request.input('Company_ESI_LocalOfc', req.body.Company_ESI_LocalOfc);

               request.input('Indv_Calculate_Emp_ESI', req.body.Indv_Calculate_Emp_ESI.toLowerCase() == 'true' ? true : false);

               request.input('Limit_ESI_Gross', req.body.Limit_ESI_Gross.toLowerCase() == 'true' ? true : false);

               request.input('Is_ESI_Multiple_Group', req.body.Is_ESI_Multiple_Group.toLowerCase() == 'true' ? true : false);

               request.input('Comapny_IsTDS', req.body.Comapny_IsTDS.toLowerCase() == 'true' ? true : false);

               request.input('Comapny_TanNo', req.body.Comapny_TanNo);

               request.input('Company_Type', req.body.Company_Type);

               request.input('Comapny_IsBonus', req.body.Comapny_IsBonus.toLowerCase() == 'true' ? true : false);

               request.input('Comapny_IsITR', req.body.Comapny_IsITR.toLowerCase() == 'true' ? true : false);

               request.input('Comapny_IsPT', req.body.Comapny_IsPT.toLowerCase() == 'true' ? true : false);

               request.input('Comapny_IsSupSalary', req.body.Comapny_IsSupSalary.toLowerCase() == 'true' ? true : false);

               request.input('Comapny_IsGratuity', req.body.Comapny_IsGratuity.toLowerCase() == 'true' ? true : false);

               request.input('Created_By', parseInt(req.body.Created_By));

               request.input('Company_Id', parseInt(req.body.Company_Id));


               request.execute('PROC_COMPANY_DETAILS', function (err, rec) {
                  if (err) {
                     console.log(err);
                     // res.json({ status: false })
                     data_added = false;
                  }
                  else {
                  }
                  var request2 = new sql.Request(transaction);
                  var branch2 = JSON.parse(req.body.branch);
                  request2.input('Operation', 'UPDATE');
                  branch2.forEach(function (doc, err) {

                     request2.input('Branch_Id', parseInt(doc.Branch_Id));
                     console.log(doc.Branch_Id);
                     request2.input('Branch_Name', doc.Branch_Name);
                     console.log(doc.Branch_Name);
                     request2.input('Branch_Address', doc.Branch_Address);

                     request2.input('Branch_Address2', doc.Branch_Address2);

                     request2.input('Branch_PhoneNo', parseInt(doc.Branch_PhoneNo));

                     request2.input('Branch_Person_Name', doc.Branch_Person_Name);

                     request2.input('Branch_Email', doc.Branch_Email);

                     request2.input('Branch_PF_Group', parseInt(doc.Branch_PF_Group));

                     request2.input('Branch_PT_Group', parseInt(doc.Branch_PT_Group));

                     request2.input('Branch_ESI_Group', parseInt(doc.Branch_ESI_Group));
                  });

                  request2.input('Company_Id', parseInt(req.body.Company_Id));

                  request2.execute('PROC_COMPANY_BRANCH', function (errr, rec) {
                     if (errr) {
                        console.log(errr);
                        //res.json({ status: false });
                        data_added = false;
                     }
                     else {
                        //res.end(JSON.stringify(recordsets)); // Result in JSON format
                        //res.json({ status: true });
                     }
                  })

                  var request3 = new sql.Request(connection);
                  //var request3 = new sql.Request(transaction);
                  //image.forEach(function (doc, err) {
                  request3.input('Operation', 'UPDATE');
                  request3.input('Company_Id', parseInt(req.body.Company_Id));
                  request3.input('Company_File_Name', image);
                  // });
                  //request.input('File_Data',req.body.File_Data);
                  request3.execute('PROC_COMPANY_DOCUMENT', function (err, rec) {
                     if (err) {
                        console.log(err);
                        data_added = false;
                        console.log(data_added);
                     }
                     else {
                        // res.json({ status: true, result: rec.recordsets[0] });
                     }
                  });

                  // console.log(data_added);
                  setTimeout(function () {
                     if (data_added) {
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

               });

            }
         });
      });


      //API FOR VIEW ALL COMPANY & BRANCH DETAILS

      app.post('/view_companybranch_details', function (req, res) {
         var data = [];
         var request = new sql.Request(connection);
         request.input('Operation', 'SELECT');
         request.execute('PROC_COMPANY_DETAILS', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               request.input('Operation', 'SELECT');
               request.execute('PROC_COMPANY_BRANCH', function (err, rec2) {
                  if (err) {
                     console.log(err);
                     res.json({ status: false });
                  }
                  else {
                     request.input('Operation', 'SELECT');
                     request.execute('PROC_COMPANY_DOCUMENT', function (err, rec3) {
                        if (err) {
                           console.log(err);
                           res.json({ status: false });
                        }
                        else {
                           res.json({ status: true, Company_Details: rec.recordsets[0], Branch_Details: rec2.recordsets[0], Document_Details: rec3.recordsets[0] });
                        }
                     });
                  }
               });
            }
         });
      });

      //API FOR VIEW SINGLE COMPANY & BRANCH DETAILS

      app.post('/view_single_companybranch_details', function (req, res) {
         var data = [];
         var request = new sql.Request(connection);
         request.input('Operation', 'SELECT');
         request.input('Company_Id', parseInt(req.body.Company_Id));
         request.execute('PROC_COMPANY_DETAILS', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               //res.json({ status: true, result: rec.recordsets[0] });
               //var request = new sql.Request(connection);
               request.input('Operation', 'SELECT');
               //request.input('ID', req.body.id);
               //request.input('Company_Person_Name', req.body.Company_Person_Name)
               request.execute('PROC_COMPANY_BRANCH', function (err, rec2) {
                  if (err) {
                     console.log(err);
                     res.json({ status: false });
                  }
                  else {
                     //res.json({ status: true, result: rec.recordsets[0] });
                     rec.recordsets[0].push(rec2.recordsets[0])

                     request.input('Operation', 'SELECT');
                     //request.input('ID', req.body.id);
                     //request.input('Company_Person_Name', req.body.Company_Person_Name)
                     request.execute('PROC_COMPANY_DOCUMENT', function (err, rec3) {
                        if (err) {
                           console.log(err);
                           res.json({ status: false });
                        }
                        else {
                           //res.json({ status: true, result: rec.recordsets[0] });
                           rec.recordsets[0].push(rec3.recordsets[0])

                           res.json({ status: true, result: rec.recordsets[0] });

                        }
                     });

                  }
               });
            }
         });
      });



      //API FOR DELETE COMPANY,BRANCH,DOCUMENTS DETAILS

      app.post('/delete_allcompany_details', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'DELETE');
         request.input('Company_Id', req.body.id);//COMPANY ID

         request.execute('PROC_COMPANY_DETAILS', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               var request = new sql.Request(connection);
               request.input('Operation', 'DELETEBYID');
               request.input('Company_Id', req.body.id);//BRANCH ID
               console.log(req.body.id);
               request.execute('PROC_COMPANY_BRANCH', function (err, rec) {
                  if (err) {
                     console.log(err);
                     res.json({ status: false });
                  }
                  else {
                     //res.json({ status: true });
                     var request = new sql.Request(connection);
                     request.input('Operation', 'DELETEBYID');
                     request.input('Company_Id', req.body.id);//COMPANY ID
                     console.log(req.body.id);
                     request.execute('PROC_COMPANY_DOCUMENT', function (err, rec) {
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
            }
         });
      });


      // //API FOR VIEW SINGLE COMPANY DETAILS
      // app.post('/view_single_company_details', function (req, res) {

      //    var request = new sql.Request(connection);
      //    request.input('Operation', 'SELECTBYID');
      //    request.input('Company_Id', req.body.id);// COMPANY ID

      //    request.execute('PROC_COMPANY_DETAILS', function (err, rec) {
      //       if (err) {
      //          console.log(err);
      //          res.json({ status: false })
      //       }
      //       else {
      //          //res.end(JSON.stringify(recordsets)); // Result in JSON format
      //          res.json({ status: true, result: rec.recordset[0] });

      //       }
      //    });
      // });

      // //API FOR VIEW SINGLE COMPANY & BRANCH DETAILS

      // app.post('/view_single_companybranch_details', function (req, res) {

      //    var request = new sql.Request(connection);
      //    request.input('Operation', 'SELECTBYID2');
      //    request.input('Company_Id', req.body.id);// COMPANY ID

      //    request.execute('PROC_COMPANY_DETAILS', function (err, rec) {
      //       if (err) {
      //          console.log(err);
      //          res.json({ status: false })
      //       }
      //       else {
      //          res.json({ status: true, result: rec.recordset[0] });
      //       }
      //    });
      // });

      // //API FOR SEARCH COMPANY DETAILS

      // app.post('/search_company_details', function (req, res) {
      //    var request = new sql.Request(connection);
      //    request.input('Operation', 'SEARCH');
      //    //request.input('ID', req.body.id);
      //    request.input('OUT_CODE', req.body.rowid)
      //    request.execute('PROC_COMPANY_DETAILS', function (err, rec) {
      //       if (err) {
      //          console.log(err);
      //          res.json({ status: false })
      //       }
      //       else {
      //          res.send(rec.recordsets);
      //          res.json({ status: true, result: rec.recordset[0] });
      //       }
      //    });
      // });


      //API FOR DELETE COMPANY DETAILS

      app.post('/delete_company_details', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'DELETE');
         request.input('Company_Id', req.body.id);//COMPANY ID

         request.execute('PROC_COMPANY_DETAILS', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               res.json({ status: true });
            }
         });
      });

      //API FOR DELETE COMPANY & BRANCH DETAILS
      app.post('/delete_branch_details', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'DELETEBYID');
         request.input('Branch_Id', req.body.id);//BRANCH ID
         console.log(req.body.id);
         request.execute('PROC_COMPANY_BRANCH', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               res.json({ status: true });

            }
         });
      });


      //API FOR DELETE COMPANY DETAILS

      app.post('/delete_companydocuments_details', function (req, res) {
         var request = new sql.Request(connection);
         request.input('Operation', 'DELETEBYID');
         request.input('Company_Id', req.body.id);//COMPANY ID
         console.log(req.body.id);
         request.execute('PROC_COMPANY_DOCUMENT', function (err, rec) {
            if (err) {
               console.log(err);
               res.json({ status: false });
            }
            else {
               res.json({ status: true });
            }
         });
      });



      var multer = require('multer');
      var image = [];
      var Storage = multer.diskStorage({
         destination: function (req, file, callback) {
            callback(null, "./documents");
         },
         filename: function (req, file, callback) {
            //  callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
            callback(null, file.originalname);

            image.push(file.originalname);
            //console.log(image);

         }
      });

      var upload = multer({ storage: Storage });



      // TEST API FOR FILE UPLOADS
      app.post('/add_file', upload.array('file',5), function (req, res) {

res.json({status:true});
      });

      // //API FOR DOCUMENTS ADD
      // app.post("/companydocuments", upload.array('Company_File_Name', 20), function (req, res) {

      //    var request = new sql.Request(connection);
      //     //image.forEach(function (doc, err) {

      //       request.input('Operation', 'INSERT');
      //       request.input('Company_Id', parseInt(req.body.Company_Id));
      //       request.input('Company_File_Name',image);
      //    // });
      //    // INPUT TYPE FILE
      //    //request.input('File_Data',req.body.File_Data);
      //    request.execute('PROC_COMPANY_DOCUMENT', function (err, rec) {
      //       if (err) {
      //          console.log(err);
      //          res.json({ status: false });
      //       }
      //       else {
      //          res.json({ status: true, result: rec.recordsets[0] });
      //       }
      //    });
      // });

   }
}

