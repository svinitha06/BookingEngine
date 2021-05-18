const express = require('express');

const RoomTypeMaster = require('../Models/RoomTypeMaster');
const mongoose = require('mongoose');


mongoose.connect(`mongodb+srv://sathishm2408:${encodeURIComponent('S@chu2408')}@cluster0.ifzlg.mongodb.net/BookingEngine?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


const router = express.Router()

//get back all the posts
router.get('/getRoomType',async(req,res) =>{
    try{
        const posts = await RoomTypeMaster.find();
        res.json(posts);
    } catch (err){
        res.json({message: err});
    }
})


//Submit a post
router.post('/addRoomType', async (req, res) => {
    const post = new RoomTypeMaster({
        PropertyId: req.body.PropertyId,
        roomType: req.body.roomType,
        description: req.body.description,
        numberofRooms: req.body.numberofRooms

    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err){
        res.json({message:err});
    }
});

//Specific Post
router.get('/:postId', async (req, res) => {
    try{
        const post = await RoomTypeMaster.find(Number(req.params.postId));
    } catch(err){
        res.json({ message: err});
    }
});

module.exports = router;