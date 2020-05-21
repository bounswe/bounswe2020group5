const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');

router.get('/', function(req, res, next) {
  const MongoClient = require('mongodb').MongoClient;
  const assert = require('assert');
  
  // Connection URL
  const url = 'mongodb://localhost:27017';
  
  // Database Name
  const dbName = 'products';
  
  // Create a new MongoClient
  const client = new MongoClient(url);
  
  // Use connect method to connect to the Server
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
  
    const db = client.db(dbName);
  
    client.close();
    console.log("close")
  })
  res.send("asdasdasd")
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
      var collection = db.collection('products');
   
      // Find all products
      collection.find({}).toArray(function (err, result) {
        if (err) {
          res.send(err);
        } else if (result.length) {
          res.render('productlist',{
   
            // Pass the returned database documents to Jade
            "productlist" : result
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

router.get('/newproduct', function(req, res){
  res.render('newproduct', {title: 'Add Product' });
});

router.post('/addproduct', function(req, res){

  const MongoClient = require('mongodb').MongoClient;
  const assert = require('assert');

// Connection URL
  const url = 'mongodb://localhost:27017';

// Database Name
  const dbName = 'products';
  const client = new MongoClient(url, { useNewUrlParser: true });

// Use connect method to connect to the server
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    const product1 = {name: req.body.name, price: req.body.price,
      color: req.body.color, rating: req.body.rating, size: req.body.size,
      comments: req.body.comments};

    const collection = db.collection('products');
    collection.insertOne(product1, function (err, result){
      if (err) {
        console.log(err);
      } else {
        // Redirect to the updated product list
        res.send(result);
      }
      // Close the database
      client.close();
    });
  });
});

module.exports = router;
