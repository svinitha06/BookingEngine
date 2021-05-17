const propertyMaster = require('../Models/propertyMaster');
const mongoose = require('mongoose');
const express = require('express');

mongoose.connect(`mongodb+srv://sathishm2408:${encodeURIComponent('S@chu2408')}@cluster0.ifzlg.mongodb.net/BookingEngine?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


const router = express.Router()
// router.get('/', isAuth, cartController.getCart);
// router.post('/add', isAuth, cartController.addToCart);
// router.post('/delete', isAuth, cartController.removeFromCart);
// router.post('/update', isAuth, cartController.updateCart);
// router.post('/sync', isAuth, cartController.syncCart);

// GET API  

router.get('/Property', function (req, res) {
    try {
        propertyMaster.find(function (err, response) {
            if (err)
                res.status('400').send(err)
            else
                res.send(response)
        })
    }
    catch (error) {
        console.log(error)
    }
});


router.post('/addProperty', (req, res) => {
    console.log("get req", req.body)
    var newProperty = new propertyMaster({
        PropertyId: 241379,
        name: req.body.name,
        location: req.body.location,
        description: req.body.description,
        logo: req.body.logo,
        ratings: req.body.ratings,
        website: req.body.website,
        contact: req.body.contact,
        Address: req.body.Address
    })
    newProperty.save(function (err, Person) {
        if (err)
            res.status('400').send(err)
        else
            res.send(Person)
    })
});

module.exports = router;