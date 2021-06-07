const express = require('express');
const mongoose = require('mongoose');
const booking = require('../Models/booking');
const nodemailer = require('nodemailer');

mongoose.connect(`mongodb+srv://sathishm2408:${encodeURIComponent('S@chu2408')}@cluster0.ifzlg.mongodb.net/BookingEngine?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const router = express.Router()
router.use(express.json());
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bookinghotel.engine@gmail.com',
    pass: 'shruti$123'
  }
});
//GET API

router.get('/booking',function(req,res)
{
    try{
        booking.find(function(err,response){
            if(err)
            res.status(400).send(err)
            else
            res.send(response)
        })
    }
    catch(error){
        res.send(error)
    }
})

//POST API
// router.post("/Book", async (req, res) => {
//     const post = new booking({
//       propertyId: req.body.propertyId,
//       roomType: req.body.roomType,
//       guestName: req.body.guestName,
//       mobile: req.body.mobile,
//       email: req.body.email,
//       Adults: req.body.Adults,
//       Children: req.body.Children,
//       planType: req.body.planType,
//       stayingDays: req.body.stayingDays,
//       totalRate: req.body.totalRate,
//       address: req.body.address
//     });
//     try {
//       const savedPost = await post.save();
//       res.json(savedPost);
//     } catch (err) {
//       res.status(400).send({ message: err });
//     }
//   });

router.post("/Book", async (req, res) => {
  console.log(req.body);
  const book = new booking(req.body)
  book.save().then(() => {
      res.status(201).send(book);
      return transporter.sendMail({
        from: 'bookinghotel.engine@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: "Booking was Successful! ", // Subject line
        html: `<html><head><style>.centre { display: flex; justify-content: center; align-items: center; height:200px; border: 3px solid green;}</style></head><body><p><img src="https://www.lamalmaisonnice.com/wp-content/uploads/2021/06/Sans-titre-2-1024x621.png" height="300px" width="800px"></p><h3 style="color:black">Dear <strong>${req.body.guestName}</strong>, your booking was successful with us. Your booking details are as follows: </h3><div class ="center"><p><strong>Hotel: </strong>${req.body.hotelNow}</p><p><strong>Check In Date: </strong>${req.body.checkIn}</p><p><strong>Check Out Date: </strong>${req.body.checkOut}</p><p><strong>Booked on: </strong>${req.body.bookedDate}</p></body></div><p><strong>For any enquiry reach out to us on this number +91 7836528737 or you can reply to this email.</strong></p><p><img src="https://www.kashmirpen.com/wp-content/uploads/2020/07/booked.png" width="80px"/></p><p>Warm regards,</p><p>Team Booking Engine</p></body></html>`, // html body
        });
  }).catch((err) => {
      res.status(400).send(err);
  })
})
  


module.exports = router;