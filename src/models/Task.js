const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { 
      type: String, 
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending'
    },
    dueDate: { type: Date },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }, { timestamps: true });
  
  module.exports = {
    Task: mongoose.model('Task', taskSchema)
  };