var express = require("express");
var router = express.Router();

var mappings = {
  num1:0,
  num2:0,
  num3:0
};

router.get("/",function (req,res) {
    console.log("Calculator Route");

   res.render("calculator",mappings);

});

router.post("/",function (req,res) {
   var num1 = Number(req.body.num1);
   var num2 = Number(req.body.num2);

   var num3 ;

   switch (req.body.op) {
       case "+": num3 = num1 + num2;
                 break;
       case "-": num3 = num1 - num2;
                 break;




   }

   mappings.num1 = num1;
   mappings.num2 = num2;

   mappings.num3 = num3;


   res.render("calculator",mappings);

});

module.exports = router;
