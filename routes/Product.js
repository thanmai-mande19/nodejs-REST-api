var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var Product = require("../Model/Products");
var Response = require("../Response");

module.exports = router;



// Retrieve all products.
router.get("/",function (req,res) {

    Product.find({},function (err,products) {
        if (err)
            return res.status(500).json(new Response(null,"Unable to retrieve all products"));

        res.status(200).json(products);
    });

    res.end();

});

router.get("/:productId",function (req,res) {

    Product.find({_id:req.params.productId},function (err,product) {
        if (err)
            res.status(500).json(new Response(req.params.productId));

        res.status(200).json(product);

    });

    res.end();

});



router.post("/",function (req,res) {

    var new_product = new Product(req.body);


    new_product.save(function (err) {
        if (err)
            res.status(500).json(new Response(new_product._id,"Could not create a new Product"));

        res.status(200).json(new Response(new_product._id,"Successfully created a new product"))
    });

    res.end();

});



router.put("/:productId",function (req,res) {

   Product.findByIdAndUpdate(req.params.productId,req.body,{new:true},function (err,product) {
       if (err)
           res.status(500).json(new Response(req.params.productId));

       res.status(200).json(new Response(req.params.productId,"Successfully updated the product"))

   });

   res.end();

});

router.delete("/:productId",function (req,res) {

   Product.remove({_id: req.params.productId},function (err) {
       if (err)
           res.status(500).json(new Response(req.params.productId,"Could not delete the product"));

       res.status(200).json(new Response(req.params.productId,"Deleted the product successfully "))
   });

    res.end();

});