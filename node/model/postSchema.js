// 스키마 : 데이터베이스에 저장될 자료형식이나 키값을 강제하는 시스템적인 틀 
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  communityNum: Number,
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { collection: 'Posts', timestamps: true });

const Post = mongoose.model('Post', postSchema);
module.exports = { Post };