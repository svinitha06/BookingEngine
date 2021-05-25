const express = require('express');

const RoomTypeMaster = require('../Models/RoomTypeMaster');
const mongoose = require('mongoose');


mongoose.connect(`mongodb+srv://sathishm2408:${encodeURIComponent('S@chu2408')}@cluster0.ifzlg.mongodb.net/BookingEngine?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


const router = express.Router()

//get back all the rooms
router.get('/getRoomType',async(req,res) =>{
    try{
        const posts = await RoomTypeMaster.find();
        res.json(posts);
    } catch (err){
        res.json({message: err});
    }
})


//Submit a post for rooms
router.post('/addRoomType', async (req, res) => {
    const post = new RoomTypeMaster({
        PropertyId: req.body.PropertyId,
        roomType: req.body.roomType,
        roomImage: req.body.roomImage,
        description: req.body.description,
        numberofRooms: req.body.numberofRooms,
        availability: req.body.availability

    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err){
        res.status(400).send({message:err});
    }
});


//Getting rooms by Proprty ID
//  router.get('/getRoomType/:availability', async (req, res) => {
//      try{
//          const post = await RoomTypeMaster.find({availability: {$gte : 11}});
//          res.json(post);
//      } catch(err){
//          res.status(400).send(err)        
//      }
//  });


module.exports = router;