let mongoose = require('mongoose');

// Article Schema

let articleSchema = mongoose.Schema({
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
  status:{
    type: String,
    default: ""
  },
  date: { 
    type: String,
  },
  certN:{
    type: String,
    required: true
  },
  certD:{
    type: String,
    default: true
  },
  delivery:{
    type: String,
    required: true
  },
  
  articleimage:{
    type: String,
  }
 
});

let Article = module.exports = mongoose.model('Article', articleSchema);