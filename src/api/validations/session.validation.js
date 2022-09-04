const Joi = require('joi');

module.exports = {
  listSessions: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      workerId: Joi.string(),
      patientId: Joi.string(),
      patientName: Joi.string(),
      sessionDescription: Joi.string(),
      sessionDate: Joi.string(),
    },
  },
  showSessions: {
    query: {
      id: Joi.string().required(),
      workerId: Joi.string().required(),
    },
  },
  createSession: {
    body: {
      workerId: Joi.string().required(),
      patientId: Joi.string().required(),
      patientName: Joi.string().required(),
      sessionDescription: Joi.string().required(),
      sessionDate: Joi.string().required(),
    },
  },
  replaceSession: {
    body: {
      workerId: Joi.string().required(),
      patientId: Joi.string().required(),
      patientName: Joi.string().required(),
      sessionDescription: Joi.string().required(),
      sessionDate: Joi.string().required(),
    },
    params: {
      sessionId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },
  updateSession: {
    body: {
      workerId: Joi.string(),
      patientId: Joi.string(),
      patientName: Joi.string(),
      sessionDescription: Joi.string(),
      sessionDate: Joi.string().required(),
    },
    params: {
      sessionId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },
};
