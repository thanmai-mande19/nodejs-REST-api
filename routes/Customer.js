var express = require("express");
var router = express.Router();
var customer = require('../Model/Customer');
var bodyParser = require("body-parser");
var response = require("../Response")

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/",function (req,res) {

    console.log("New Customer Creation");

    var newCustomer = new customer(req.body);

    newCustomer.save(function (err) {
        if (err)
            res.status(500).send("Unable to add to Database");
        
        var newReponse = new response(newCustomer.id,"New Customer Created successfully ");
        res.json(newReponse);

    });

    res.end();

});


router.get("/",function (req,res) {

    console.log("Get all customers");

    customer.find({}, function (err, customers) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(customers);});

    res.end();



});

module.exports = router;