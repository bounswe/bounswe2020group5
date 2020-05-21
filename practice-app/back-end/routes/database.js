var express = require('express');
var router = express.Router();
var mongodb = require('mongodb')

router.get('/', function(req, res, next) {
  var MongoClient = require('mongodb').MongoClient;

  // Connect to the db
  MongoClient.connect("mongodb://localhost:27017/MyDb", function (err, db) {
   
     res.send(err.message)
     //Write databse Insert/Update/Query code here..
                
});
});

router.get('/thelist', function(req,res){
  var MongoClient = mongodb.MongoClient
  
  var url = 'mongodb://localhost:27017/sampsite'
  
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the Server', err);
    } else {
      // We are connected
      console.log('Connection established to', url);
   
      // Get the documents collection
      var collection = db.collection('students');
   
      // Find all students
      collection.find({}).toArray(function (err, result) {
        if (err) {
          res.send(err);
        } else if (result.length) {
          res.render('studentlist',{
   
            // Pass the returned database documents to Jade
            "studentlist" : result
          });
        } else {
          res.send('No documents found');
        }
        //Close connection
        db.close();
      });
    }
    });
});

router.get('/newstudent', function(req, res){
  res.render('newstudent', {title: 'Add Student' });
});

router.post('/addstudent', function(req, res){
 
  // Get a Mongo client to work with the Mongo server
  var MongoClient = mongodb.MongoClient;

  // Define where the MongoDB server is
  var url = 'mongodb://localhost:27017/sampsite';

  // Connect to the server
  MongoClient.connect(url, function(err, db){
    if (err) {
      console.log('Unable to connect to the Server:', err);
    } else {
      console.log('Connected to Server');

      // Get the documents collection
      var collection = db.collection('students');

      // Get the student data passed from the form
      var student1 = {student: req.body.student, street: req.body.street,
        city: req.body.city, state: req.body.state, sex: req.body.sex,
        gpa: req.body.gpa};

      // Insert the student data into the database
      collection.insert([student1], function (err, result){
        if (err) {
          console.log(err);
        } else {

          // Redirect to the updated student list
          res.redirect("thelist");
        }

        // Close the database
        db.close();
      });

    }
  });

});

module.exports = router;
