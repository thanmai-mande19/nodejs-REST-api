var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({

    productName : String,
    brand:String,
    price: Number
});

mongoose.model("Product",productSchema);

module.exports = mongoose.model("Product");
