let mongoose = require('mongoose');

// Article Schema
let postSchema = mongoose.Schema({
  container:{
    type: String,
    required: true
  },
  dhumuc:{
    type: String,
    required: true
  },
  agent:{
    type: String,
    required: true
  },
  ship:{
    type: String,
    required: true
  },
  vogane:{
    type: String,
    required: true
  },
  nooca:{
    type: String,
    required: true
  },
  date:{
    type: Date,
    required: true
  },
  certN:{
    type: String,
    required: true
  },
  certD:{
    type: Date,
    required: true
  },
  delivery:{
    type: String,
    required: true
  },
  articleimage:{
    type: String,
    required: true
  }
});

let Post = module.exports = mongoose.model('Post', postSchema);
