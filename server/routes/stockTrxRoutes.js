const express = require("express");
const router = express.Router();
const pool = require("./connection");
const chalk = require("chalk");
const { checktoken, jwtSignUser } = require("./checkToken");
const dayjs = require("dayjs")
const businessDays = require("dayjs-business-days");


router.post("/getStockList", (req, res) => {
    console.log(req.body)
    // res.json({awesome: "It Works"})
    let mysql = `select * from deliveries where development = ${req.body.id}`
  
    pool.getConnection(function (err, connection) {
      if (err) {
        connection.release();
        resizeBy.send("Error with connection");
      }
      connection.query(mysql, function (error, result) {
        if (error) {
          console.log(error);
        } else {
          console.log(result)
          res.json(result);
        }
      });
      connection.release();
    });
  });


module.exports = router;
