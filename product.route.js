const express = require('express');

// create object ref for express router
const proRoutes = express.Router();

// import model
let Product = require('./product.model');

// get request

proRoutes.route('/').get(function(req, res) {
  Product.find(function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

// post Request
proRoutes.route('/add').post(function(req, res) {
  // const to receive post data from front end
  let pro = new Product(req.body);

  pro
    .save()
    .then(pro => {
      res.status(200).json({ product: 'Product added successfully' });
    })
    .catch(err => {
      res.status(400).send('Unable to save value in to database');
    });
});

// get request with reference
proRoutes.route('/edit/:id').get(function(req, res) {
  let id = req.params.id;
  Product.findById({ _id: id }, function(err, data) {
    res.json(data);
  });
});

// update request
proRoutes.route('/update/:id').put(function(req, res) {
  let id = req.params.id;
  Product.findById({ _id: id }, function(err, data) {
    if (!data) {
      res.status(400).send('No data found..');
    } else {
      data.title = req.body.title;
      data.price = req.body.price;
      data.image = req.body.image;
      data.description = req.body.description;

      data
        .save()
        .then(mydata => {
          res.status(200).send({ response: 'Successfully Updated the values' });
        })
        .catch(err => {
          res.status(400).send('Unable to update the database');
        });
    }
  });
});

// delete request
proRoutes.route('/delete/:id').delete(function(req, res) {
  let id = req.params.id;

  Product.findByIdAndDelete({ _id: id }, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({ response: 'Successfully deleted the product ' });
    }
  });
});
module.exports = proRoutes;
