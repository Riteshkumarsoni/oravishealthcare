const mongoose = require('mongoose');

const CheckupSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dentistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dentist' },
  imagesbypatient: {type: String},
  notesbypatient: {type: String},
  imagesbydoctor: {type: String},
  notesbydoctor: {type: String}
});

module.exports = mongoose.model('Checkup', CheckupSchema);