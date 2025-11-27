const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const booksController = require('../controllers/books');

router.use(authenticate); 

router.post('/', booksController.createBook);
router.get('/', booksController.getBooks); 
router.get('/:id', booksController.getBookById);
router.put('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;
