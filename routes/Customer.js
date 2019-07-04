var express = require("express");
var router = express.Router();
var Customer = require('../Model/Customer');
var bodyParser = require("body-parser");
var response = require("../Response");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/",function (req,res) {

    console.log("New Customer Creation");

    var newCustomer = new Customer(req.body);

    newCustomer.save(function (err) {
        if (err)
            res.status(500).json(new response(newCustomer._id, "Unable to add to database!"));

        res.status(200).json(new response(custId, "Added successfully!"));
    });


    res.end();

});


router.get("/",function (req,res) {

    console.log("Get all customers");

    Customer.find({}, function (err, customers) {
        if (err)
            res.status(500).json(new response(null, "Could not retrieve all customers!"));

        res.json(customers);
    });

    res.end();



});


router.get("/:custId",function (req,res) {


    console.log("Getting customer by id");

    Customer.findById(req.params.custId,function (err,customer) {
        if (err)
            res.status(500).json(new response(req.params.custId, "Could not retrieve customer!"));

        res.json(customer);


    });

});


//Update by ID sent as query parameter. Just a different case to path variable used for 'GET' by Id.
router.put("/",function (req,res) {

    console.log("Updating ID "+req.query.custId);

    Customer.findByIdAndUpdate(req.query.custId, req.body, {new: true}, function (err, customer) {
        if (err)
            res.status(500).json(new response(req.query.custId, "Could not update"));

        res.status(200).json(new response(req.query.custId, "Update successful!"));


    });


});


router.delete("/:custId",function (req,res) {

    var custId = req.params.custId;

    Customer.remove({_id : custId},function (err,customer) {
        if (err) {
             res.status(500).json(new response(custId, "Could not delete!"));
        }

        else {

            res.json(new response(custId, "Deletion successful!"));

        }
    });



});

module.exports = router;