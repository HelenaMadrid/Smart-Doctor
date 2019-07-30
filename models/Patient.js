const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PatientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    // required: true
  },
  weight: {
    type: Number,
    // required: true
  },
  height: {
    type: Number,
    // required: true
  },
  notes: {
    type: String,
  },
  owner: {
    type: Object,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Patient = mongoose.model("patients", PatientSchema);
