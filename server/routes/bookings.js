const express = require('express');
const mongoose = require('mongoose');
const bookForm = require('../Models/bookForm');

mongoose.connect(`mongodb+srv://sathishm2408:${encodeURIComponent('S@chu2408')}@cluster0.ifzlg.mongodb.net/BookingEngine?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const router = express.Router()
router.use(express.json());

//GET API

router.get('/booking',function(req,res)
{
    try{
        bookForm.find(function(err,response){
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
router.post("/Book", async (req, res) => {
  const post = new bookForm({
    propertyId: req.body.propertyId,
    roomType: req.body.roomType,
    guestName: req.body.guestName,
    mobile: req.body.mobile,
    email: req.body.email,
    Adults: req.body.Adults,
    Children: req.body.Children,
    planType: req.body.planType,
    stayingDays: req.body.stayingDays,
    totalRate: req.body.totalRate,
    // address: req.body.address,
    // gender:req.body.gender
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

module.exports = router;