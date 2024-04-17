const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('./model/User.js')
const router1 = require('./route/Router.js');
const dotenv = require('dotenv');
const path = require('path')


dotenv.config()
 
const app = express();
app.use(express.json())

app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8080  
 
app.use(cors({ credentials: true }));
// app.use(cors({ origin: origin, credentials: true }));//provided by the `cors` package for enabling Cross-Origin Resource Sharing (CORS) in an Express app, CORS is a mechanism that allows a web page to make requests to a different domain. 
 

mongoose
  .connect("mongodb://127.0.0.1:27017/Ecommerce-Analysis")
  .then(() => {
    console.log("DB is connected");

    //  Product.insertMany(dataProduct)
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // OverallStat.insertMany(dataOverallStat);
    // AffiliateStat.insertMany(dataAffiliateStat);
  })
  .catch((e) => {
    console.log("DB error " + e);
  });

app.use('/', router1);

// Serving the frontent
// app.use(express.static(path.join(__dirname, 'client', 'dist')))
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
// })

app.listen(port, () => {
    console.log(`Server is running on port - ${port}`);
})