var mongoose = require( 'mongoose' );
var feedSchema = new mongoose.Schema({
  created_at: {
    type: String,
    required: true
  },
  entry_id: {
    type: Number,
    required: true
  },
  field1: {
    type: Number,
    required: true
  },
  field2: {
    type: String,
    required: true
  },
  field3: {
    type: String,
    required: true
  },field4:  {
    type: String,
    required: true
  },field5:  {
    type: String,
    required: true
  },field6:  {
    type: String,
    required: true
  },field7:  {
    type: String,
    required: true
  },field8:  {
    type: String,
    required: true
  }
});

mongoose.model('feedData', feedSchema);