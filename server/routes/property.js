const propertyMaster = require('../Models/propertyMaster');
const mongoose = require('mongoose');
const express = require('express');

mongoose.connect('mongodb+srv://badrinaths:Subudhi1@cluster0.f4kvq.mongodb.net/test/BookingEngine', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

 
const router = express.Router();


 
// router.get('/', isAuth, cartController.getCart);
// router.post('/add', isAuth, cartController.addToCart);
// router.post('/delete', isAuth, cartController.removeFromCart);
// router.post('/update', isAuth, cartController.updateCart);
// router.post('/sync', isAuth, cartController.syncCart);
 

router.post('/addProperty', (req, res) => {
    console.log("get req")
    var newProperty = new propertyMaster({
    PropertyId: 1234,
    name: 'horseLand',
    location: 'coimbatore',
    description: "hotel",
    website: "kkk",
    contact: "kkk",
    Address: "kkk"
    })
    newProperty.save(function (err, Person) {
    if (err)
    res.send("error while adding")
    else
    res.send("added successfully")
    })
   });

   module.exports = router;
    