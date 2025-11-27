const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  author: { type: String, required: true, index: true },
  year: { type: Number },
  genre: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // owner for future RBAC
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);
