const express = require("express");
const property = require("./server/routes/property");
const RoomTypeRoute = require("./server/routes/AddingRooms");
const rate = require("./server/routes/rate");
const RateMaster = require("./server/Models/RateMaster");
const app = express();
const port = process.env.PORT || 5000;
const Booking = require("./server/routes/bookings");
// const IdentityCounter = require('./server/routes/IdentityCounter')
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

//create a GET route
app.get("/", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.use("/property", property);
app.use("/rate", rate);
app.use("/rooms", RoomTypeRoute);
app.use("/book", Booking);
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
