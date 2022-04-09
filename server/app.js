const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const imageToBase64 = require("image-to-base64");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Hems@1005",
  database: "sig_db",
});

app.post("/api/sigimg", function (req, res) {
  const imageB64 = imageToBase64(req.body.imageURL);

  con.query(
    "INSERT INTO sig_images (imageURL) VALUES (?)",
    [imageB64],
    function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    }
  );
});

app.get("/api/getimg", function (req, res) {
  con.query("SELECT * FROM sig_images", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3010, function () {
  console.log("Server running on Port 3010");
});
