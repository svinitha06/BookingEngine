const express = require("express");

const RoomTypeMaster = require("../Models/RoomTypeMaster");
const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://sathishm2408:${encodeURIComponent(
    "S@chu2408"
  )}@cluster0.ifzlg.mongodb.net/BookingEngine?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const router = express.Router();

//get back all the rooms
router.get("/getRoomType", async (req, res) => {
  try {
    const posts = await RoomTypeMaster.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

//Submit a post for rooms
router.post("/addRoomType", async (req, res) => {
  const post = new RoomTypeMaster({
    PropertyId: req.body.PropertyId,
    roomType: req.body.roomType,
    roomImage: req.body.roomImage,
    description: req.body.description,
    numberofRooms: req.body.numberofRooms,
    availability: req.body.availability,
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});
<<<<<<< HEAD



//getting rooms by PropertyId
 router.get('/getRoomType/:PropertyId', async (req, res) => {
=======
//Getting rooms by ProprtyID
<<<<<<< HEAD
 router.get('/:PropertyId', async (req, res) => {

>>>>>>> 19af6b01e591f7a6e50b57f6dc969a5bd65a494e
     try{
         const post = await RoomTypeMaster.find({PropertyId:(req.params.PropertyId)});
         res.json(post);
     } catch(err){
         res.status(400).send(err)
         
     }
 });
module.exports = router;
=======
router.get("/:PropertyId", async (req, res) => {
  try {
    const post = await RoomTypeMaster.find({
      PropertyId: req.params.PropertyId,
    });
    res.json(post);
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = router;
>>>>>>> bff372748e835ca05815ff2d00a011bf661bb4e0
