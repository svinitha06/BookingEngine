// const counters = require('../Models/counters');
// const mongoose = require('mongoose');
// const express = require('express');

// mongoose.connect(`mongodb+srv://sathishm2408:${encodeURIComponent('S@chu2408')}@cluster0.ifzlg.mongodb.net/BookingEngine?retryWrites=true&w=majority`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
// })

// const router = express.Router()
// // router.get('/', isAuth, cartController.getCart);
// // router.post('/add', isAuth, cartController.addToCart);
// // router.post('/delete', isAuth, cartController.removeFromCart);
// // router.post('/update', isAuth, cartController.updateCart);
// // router.post('/sync', isAuth, cartController.syncCart);

// // GET API  

// router.post('/count', async (req, res) => {
//     try {
//         await IdentityCounter.findOneAndUpdate({ _id: req.body.count }, { $set: req.body }, { new: true }
//             (err, user) => {
//             if(err) {
//                 re.status(400).send(err)
//             }
//                 else(user) {
//                 res.status(200).json(user)
//             }
//         }
//     catch (error) {
//             console.log(error.message)
//             res.status(404).send({ message: error.message })
//         }
//     });


// module.exports = router;

