const Joi = require('joi');

exports.createBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  year: Joi.number().integer().optional(),
  genre: Joi.string().optional()
});
