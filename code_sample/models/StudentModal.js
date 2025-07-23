const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StudentSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  age: {
    type: Number,
    required: true,
    min: 1,
    max: 120,
  },
  grade: {
    type: String,
    enum: ['A', 'B', 'C', 'D', 'F'],
    required: true,
  },
  enrolledCourses: [
    {
      courseName: {
        type: String,
        required: true,
      },
      courseCode: {
        type: String,
        required: true,
      },
    },
  ],
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Student = mongoose.model("student", StudentSchema);