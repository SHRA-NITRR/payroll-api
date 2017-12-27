var express = require('express');
var app = express();
var mongo = require('mongodb');
var assert = require('assert');
var bodyParser = require('body-parser');
var cors = require('cors');
var ObjectID = require('mongodb').ObjectID;
var router = express.Router();

router.get('/', function(req, res){
    res.send("WELCOME TO MODULE 2");
});
