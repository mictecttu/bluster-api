const mongoose = require('mongoose');

const { Schema, Types } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String
  },
  authToken: {
    type: String,
    required: true
  },
  profile: {
    type: String,
  },
  role: {
    type: Types.Array,
    default: [
      'contacts/add'
    ]
  },
  accountStatus: {
    type: String,
    default: 'NEW'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const User = mongoose.model('user', UserSchema);

module.default = User;
