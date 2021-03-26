const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const exphbs = require('express-handlebars')
const nodemailer = require("nodemailer");

const app = express();
app.use(cors({ origin: "*" }));

//body parser middleware
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


  app.listen(3000, () => {
    console.log("The server started on port 3000 !!!!!!");
  });

  app.get("/", (req, res) => {
    res.send(
      "<h1 style='text-align: center'>Wellcome to first mail notifications</h1>"
    );
  });

  app.post("/sendmail", (req, res) => {
    console.log("request came");
    let user = req.body;
    sendMail(user, info => {
      console.log(`The mail has beed send  and the id is ${info.messageId}`);
      res.send(info);
    });
  });

  async function sendMail(user, callback) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "uttam.bitcoin1982@gmail.com",
        pass: "mitutinku1982"
      }
    });

    let mailOptions = {
        from: '"Fun and Play"<uttam.bitcoin1982@gmail.com>', // sender address
        to: user.email, // list of receivers
        subject: "Wellcome to  Fun and Play ", // Subject line
        html: `<h1>Hi ${user.name}</h1><br>
        <h4>Thanks for joining us</h4>`
      };
      // send mail with defined transport object
      let info = await transporter.sendMail(mailOptions);

  callback(info);
}