var mongoose = require("mongoose");

var customerSchema = new mongoose.Schema({

    name: String,
    email:String,
    password: String

});

mongoose.model("Customer",customerSchema);

module.exports = mongoose.model("Customer");