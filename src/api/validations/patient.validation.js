const Joi = require('joi');
const Patient = require('../models/patient.model');

module.exports = {
  // GET /v1/patients
  listPatients: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      name: Joi.string(),
      email: Joi.string(),
      cpf: Joi.string(),
      gender: Joi.string().valid(Patient.genders),
      birthDate: Joi.date(),
    },
  },

  // POST /v1/patients
  createPatient: {
    body: {
      name: Joi.string(),
      email: Joi.string(),
      cpf: Joi.string(),
      gender: Joi.string().valid(Patient.genders),
      birthDate: Joi.date(),
    },
  },

  // PUT /v1/patients/:patientId
  replacePatient: {
    body: {
      name: Joi.string(),
      email: Joi.string(),
      cpf: Joi.string(),
      gender: Joi.string().valid(Patient.genders),
      birthDate: Joi.date(),
    },
    params: {
      patientId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },

  // PATCH /v1/patients/:patientId
  updatePatient: {
    body: {
      name: Joi.string(),
      email: Joi.string(),
      cpf: Joi.string(),
      gender: Joi.string().valid(Patient.genders),
      birthDate: Joi.date(),
    },
    params: {
      patientId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },
};
