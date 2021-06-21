const express = require("express");
const mongoose = require("mongoose");
const booking = require("../Models/booking");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const { ObjectID } = require("bson");

mongoose.connect(
  `mongodb+srv://sathishm2408:${encodeURIComponent(
    "S@chu2408"
  )}@cluster0.ifzlg.mongodb.net/BookingEngine?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

const router = express.Router();
router.use(express.json());
router.use(bodyParser.json());
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bookinghotel.engine@gmail.com",
    pass: "shruti$123",
  },
});

//GET API
router.get("/booking", function (req, res) {
  try {
    booking.find(function (err, response) {
      if (err) res.status(400).send(err);
      else res.send(response);
    });
  } catch (error) {
    res.send(error);
  }
});

//POST API
router.post("/Book", async (req, res) => {
  console.log(req.body);
  const book = new booking(req.body);
  book
    .save()
    .then(() => {
      let i = 0;
      // let oderDetails2 =

      let orderDetails =
        "<table style='border:1px solid #990202'><tr style='background:#990202 '><th width='100' style ='color:white'>Room Type</th><th width='100' style ='color:white'>Rooms</th><th  width='100' style ='color:white'>Food</th><th  width='80' style ='color:white'>Price</th><tr/>";
      req.body.detailsOfRooms.map((el, i) => {
        orderDetails +=
          "<tr><td width='250'>" +
          el.roomType +
          "</td><td width='80' style='text-align:center'>" +
          el.count +
          "</td><td width='100' style='text-align:center'>" +
          el.isChecked +
          "</td><td width='100' style='text-align:center'>" +
          el.priceO +
          "</td></tr>";
      });
      orderDetails +=
        "<tr ><td width='250'><strong>Amount</strong></td><td width='80'></td><td width='100'></td><td width='100' style='text-align:center'><strong>" +
        req.body.Amount +
        "</strong></td></tr>";
      orderDetails +=
        "<tr ><td width='250'><strong>GST (18%)</strong></td><td width='80'></td><td width='100'></td><td width='100' style='text-align:center'><strong>" +
        req.body.gstPrice +
        "</strong></td></tr>";
      orderDetails +=
        "<tr ><td width='250'><strong>Discount (15%)</strong></td><td width='80'></td><td width='100'></td><td width='100' style='text-align:center'><strong>" +
        req.body.discountPrice +
        "</strong></td></tr>";
      orderDetails +=
        "<tr style='background:#990202 '><td width='100'><strong style ='color:white'>Amount Paid</strong></td><td width='80'></td><td width='100'></td><td width='100' style='text-align:center' ><strong style ='color:white'>" +
        req.body.totalPrice +
        "</strong></td></tr>";
      orderDetails += "</table>";

      res.status(201).send(book);
      return transporter.sendMail({
        from: "bookinghotel.engine@gmail.com", // sender address
        to: req.body.email, // list of receivers
        subject: "Booking was Successful! ", // Subject line
        html: `<html>
        <head>
        <style>.centre { display: flex; justify-content: center; align-items: center; height:200px; border: 3px solid green;}</style>
        </head>
        <body>
        <p>
        <img src="https://www.lamalmaisonnice.com/wp-content/uploads/2021/06/Sans-titre-2-1024x621.png" height="300px" width="800px">
        </p>
        <h3 style="color:black ">Dear <strong>${req.body.guestName}</strong>, your booking was successful with us. Your booking details are as follows: </h3>
        <p><strong>Hotel: </strong>${req.body.hotelNow}</p>
        <p><strong>Check In Date: </strong>${req.body.checkIn}</p>
        <p><strong>Check Out Date: </strong>${req.body.checkOut}</p>
        <p><strong>Booking ID: </strong>${req.body.bookingId}</p>
        <p><strong>Booked on: </strong>${req.body.bookedDate}</p>
        <p>${orderDetails}</p>
      
      
        </body>
        <p><img src="https://i.ebayimg.com/images/i/112559543852-0-1/s-l1000.jpg" width="120px" height:"80px"></p>
        <p><strong>For any enquiry or cancellation of your booking, contact us on this number +91 7836528737 or write us to this email.</strong></p>
        <p><strong>Warm regards,</strong></p>
        <p>
        <img src="https://www.bing.com/images/blob?bcid=S-8WvpWxmuACuw" width="60px"/>
        <h3><strong>Booking Engine</strong></h3>
        </p>
        </body>
        </html>`, // html body
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
