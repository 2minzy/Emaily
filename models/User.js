const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
});

// mongoose model command to create a new collection called 'users'
mongoose.model('users', userSchema);