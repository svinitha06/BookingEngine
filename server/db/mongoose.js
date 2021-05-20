

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://sathishm2408:${encodeURIComponent('S@chu2408')}@cluster0.ifzlg.mongodb.net/BookingEngine?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.createCollection("IdentityCounters", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});
