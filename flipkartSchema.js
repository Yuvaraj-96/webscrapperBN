const mongoose = require('mongoose');

const productDetailSchema = new mongoose.Schema(
    {
        id:String,
        title: String,
        price: String,
        rating: String,
        image: String
    }
)

const productdetails =mongoose.model('flipkart',productDetailSchema);
module.exports = productdetails;