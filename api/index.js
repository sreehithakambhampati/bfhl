const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());


const FULL_NAME = "k_sreehitha";
const DOB = "09062005"; 
const EMAIL = "sreehitha.22bce20297@vitapstudent.ac.in";
const ROLL_NO = "22BCE20297";


function alternateCapsReverse(str) {
  let result = "";
  let toggle = true;
  for (let i = str.length - 1; i >= 0; i--) {
    result += toggle ? str[i].toUpperCase() : str[i].toLowerCase();
    toggle = !toggle;
  }
  return result;
}
app.get("/", (req, res) => {
  res.send("Use POST method with JSON body to test.");
});


app.post("/bfhl", (req, res) => {
  try {
    const inputArray = req.body.data || [];

    let odd = [];
    let even = [];
    let alphabets = [];
    let special = [];
    let sum = 0;
    let alphaString = "";

    inputArray.forEach((item) => {
      if (/^-?\d+$/.test(item)) {
       
        let num = parseInt(item, 10);
        if (num % 2 === 0) {
          even.push(item.toString());
        } else {
          odd.push(item.toString());
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        alphaString += item;
      } else {
        special.push(item);
      }
    });

    const concatString = alternateCapsReverse(alphaString);

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NO,
      odd_numbers: odd,
      even_numbers: even,
      alphabets: alphabets,
      special_characters: special,
      sum: sum.toString(),
      concat_string: concatString,
    });
  } catch (err) {
    res.status(500).json({
      is_success: false,
      message: err.message,
    });
  }
});


module.exports = app;

