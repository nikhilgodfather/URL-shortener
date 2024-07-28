const mongoose = require('mongoose');
const shortid = require('shortid');
const ShorTenSchema = new mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    TimeStamp:{
        type:Date,
        required:true,
        default:Date.now
    },
    Tag:{
        type:String,
        required:true
    },
    OrignalUrl:{
        type:String,
        required:true
    },
    ShortUrl:{
        type:String,
        required:true,
    },
    ShortUrlScan:{
      type:String,
      required:true
    },
    shortid:{
        type:String,
        required:true
    },
    UrlClicks:{
        type:Number,
        required:true,
        default:0
    },
    QrCodeClicks:{
        type:Number,
        required:true,
        default:0
    }
});

module.exports = new mongoose.model('ShorTen-Url' , ShorTenSchema)