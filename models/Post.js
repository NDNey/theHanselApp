const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  title: {
    type: String,
  },
  photo: {
    type: String,
  },
  description: {
    type: String,
  },
  tags: {
    type: Array,
  },
  bids: {
    type: Array,
  },
  bidTime: {
    type: Date,
  },
  location: {
    type: String,
  },
  coments: {
    type: Object,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  cloudinaryId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  winner: {
    type: String,
  },
});

module.exports = mongoose.model("Post", PostSchema);
