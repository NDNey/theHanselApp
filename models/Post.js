const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
    // AI implementatio for tags || logic for manual add
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
    

})

module.exports = mongoose.model("Post", PostSchema)