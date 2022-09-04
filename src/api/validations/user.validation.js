const Joi = require('joi');
const User = require('../models/user.model');

module.exports = {
  // GET /v1/users
  listUsers: {
    query: {
      page: Joi.number().min(1).required(),
      perPage: Joi.number().min(1).max(100).required(),
      name: Joi.string().max(128),
      birthDate: Joi.string(),
      phone: Joi.string(),
      email: Joi.string().email(),
      address: Joi.string(),
      workerId: Joi.string(),
      role: Joi.string().valid(User.roles),
    },
  },

  // POST /v1/users
  createUser: {
    body: {
      name: Joi.string().max(128).required(),
      password: Joi.string().min(6).max(128).required(),
      birthDate: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().email().required(),
      address: Joi.string(),
      workerId: Joi.string().required(),
      role: Joi.string().valid(User.roles).required(),
    },
  },

  // PUT /v1/users/:userId
  replaceUser: {
    body: {
      name: Joi.string().max(128).required(),
      password: Joi.string().min(6).max(128).required(),
      birthDate: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().email().required(),
      address: Joi.string(),
      workerId: Joi.string().required(),
      role: Joi.string().valid(User.roles).required(),
    },
    params: {
      userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },

  // PATCH /v1/users/:userId
  updateUser: {
    body: {
      name: Joi.string().max(128),
      password: Joi.string().min(6).max(128).required(),
      birthDate: Joi.string(),
      phone: Joi.string(),
      email: Joi.string().email(),
      address: Joi.string(),
      workerId: Joi.string(),
      role: Joi.string().valid(User.roles),
    },
    params: {
      userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },
};
