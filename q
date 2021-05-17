[1mdiff --git a/package.json b/package.json[m
[1mindex 19c8f9c..ddc9e2d 100644[m
[1m--- a/package.json[m
[1m+++ b/package.json[m
[36m@@ -12,6 +12,7 @@[m
   "license": "ISC",[m
   "dependencies": {[m
     "express": "^4.17.1",[m
[32m+[m[32m    "mongodb": "^3.6.6",[m
     "mongoose": "^5.12.4"[m
   }[m
 }[m
[1mdiff --git a/server.js b/server.js[m
[1mindex 3301b86..8e0c2c9 100644[m
[1m--- a/server.js[m
[1m+++ b/server.js[m
[36m@@ -1,7 +1,7 @@[m
 const express = require('express');[m
[31m-[m
 const app = express();[m
 const port = process.env.PORT || 5000;[m
[32m+[m[32mconst property = require('./server/routes/property')[m
 [m
 app.use(express.json())[m
 [m
[36m@@ -15,12 +15,12 @@[m [mapp.use((req, res, next) => {[m
   next();[m
 });[m
 [m
[31m-// create a GET route[m
[32m+[m[32m//create a GET route[m
 app.get('/', (req, res) => {[m
   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });[m
 });[m
 [m
[31m-[m
[32m+[m[32mapp.use('/property',property);[m
 // console.log that your server is up and running[m
 app.listen(port, () => console.log(`Listening on port ${port}`));[m
 [m
