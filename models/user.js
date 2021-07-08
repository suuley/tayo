const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  idNumber:{
    type: String,
    required: true

  },
  dekedda:{
    type: Boolean,
    default: false
  },
  airporka:{
    type: Boolean,
    default: false
  },
  isAdmin:{
    type: Boolean,
    default: false
  },
  isDiwan: {
    type: Boolean,
    default: false
  },
  isGate: {
    type: Boolean,
    default: false
  },
  active:{
    type: Boolean
  }
});

const User = module.exports = mongoose.model('User', UserSchema);
