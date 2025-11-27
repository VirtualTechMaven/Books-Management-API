const Book = require('../models/Book');
const Joi = require('joi');
const { paginate } = require('../utils/paginate');

// validation schema for book
const bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  year: Joi.number().integer().min(0).optional(),
  genre: Joi.string().optional()
});

exports.createBook = async (req, res, next) => {
  try {
    const { error, value } = bookSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const book = new Book({ ...value, owner: req.user._id });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

// Get all books with pagination and filtering
exports.getBooks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, author, genre, year } = req.query;
    const query = { owner: req.user._id };

    if (author) query.author = new RegExp(author, 'i');
    if (genre) query.genre = new RegExp(genre, 'i');
    if (year) query.year = Number(year);
    if (search) {
      const s = new RegExp(search, 'i');
      query.$or = [{ title: s }, { author: s }, { genre: s }];
    }

    const total = await Book.countDocuments(query);
    const { skip, perPage } = paginate(page, limit);

    const books = await Book.find(query).sort({ createdAt: -1 }).skip(skip).limit(perPage);

    res.json({
      total,
      page: Number(page),
      limit: Number(perPage),
      data: books
    });
  } catch (err) {
    next(err);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, owner: req.user._id });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    next(err);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const { error, value } = bookSchema.min(1).validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { $set: value },
      { new: true }
    );
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    next(err);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (err) {
    next(err);
  }
};
