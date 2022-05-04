const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    userId:{
        type: String,
        // ref: "User",
    },
    title:{
        type:String,
    },
    photo:{
        type:String,
    },
    description:{
        type:String,
    },
    // AI implementation for tags || logic for manual add
    tags:{
        type:Array,
    },
    bids:{
        type:Array,
    },
    bidTime:{
        type: Date,
    },
    location:{
        type: String
    },
    coments:{
        type: Object,
    },
    isAvailable:{
        type: Boolean,
        default:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    winner: {
        type: String
    }
    

})

module.exports = mongoose.model("Post", PostSchema)