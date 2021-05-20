const counters = require('../Models/counters');
const mongoose = require('mongoose');
const express = require('express');
 
mongoose.connect(`mongodb+srv://sathishm2408:${encodeURIComponent('S@chu2408')}@cluster0.ifzlg.mongodb.net/BookingEngine?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const router = express.Router()
// router.get('/', isAuth, cartController.getCart);
// router.post('/add', isAuth, cartController.addToCart);
// router.post('/delete', isAuth, cartController.removeFromCart);
// router.post('/update', isAuth, cartController.updateCart);
// router.post('/sync', isAuth, cartController.syncCart);
 
// GET API  

router.post('/Latest', (req, res) => {
    console.log("get req", req.body)
    var newProperty = new counters({
        count:req.body.count,
        model:req.body.model,
        field:req.body.field
    })
    newProperty.save(function (err, Person) {
        if (err)
            res.status('400').send(err)
        else
            res.send(Person)
    })
});


module.exports = router;
    
