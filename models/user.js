import mongoose from 'mongoose';

// Define the schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password should be at least 6 characters long'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  }
}, {
  timestamps: true
});

// Add any pre-save hooks, methods, or statics here if needed
// For example:
userSchema.pre('save', function(next) {
  // Hash password before saving if it's modified
  if (this.isModified('password')) {
    // Add password hashing logic here
  }
  next();
});

// Create and export the model
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;