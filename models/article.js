let mongoose = require('mongoose');
// Article Schema

let articleSchema = mongoose.Schema({
  

  city:{
    type: String,
    required: true
  },
  magac:{
    type: String,
    required: true
  },
  dhashay:{
    type: String,
    required: true
  }, 
  hooyo:{
    type: String,
    required: true
  },
  deggan:{
    type: String,
    required: true
  },
  canshuur: {
    type: Number,
    default: 0
  },
  idNumber:{
    type: String,
    required: true
  },
  image:{
    type: String,
  }

});
let Article = module.exports = mongoose.model('Article', articleSchema);
