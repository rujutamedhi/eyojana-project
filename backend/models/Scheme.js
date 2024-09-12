const mongoose = require('mongoose');
const { Schema } = mongoose;

const SchemeSchema = new Schema({
  schemename: {
    type: String,
    required: true,
    maxlength: 50
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  },
  password: {
    type: String,
    required: true,
    maxlength: 255
  },
  category: {
    type: String,
    required: true,
    maxlength: 255
  }
});

module.exports = mongoose.model('Scheme', SchemeSchema);
