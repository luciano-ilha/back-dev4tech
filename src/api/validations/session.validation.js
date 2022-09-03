const Joi = require('joi');

module.exports = {
  // GET /v1/sessions
  listSessions: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      workerId: Joi.string(),
      patientId: Joi.string(),
      patientName: Joi.string(),
      sessionDescription: Joi.string(),
      sessionDate: Joi.date(),
    },
  },

  // POST /v1/sessions
  createSession: {
    body: {
      workerId: Joi.string().required(),
      patientId: Joi.string().required(),
      patientName: Joi.string().required(),
      sessionDescription: Joi.string().required(),
      sessionDate: Joi.date().required(),
    },
  },

  // PUT /v1/sessions/:sessionId
  replaceSession: {
    body: {
      workerId: Joi.string().required(),
      patientId: Joi.string().required(),
      patientName: Joi.string().required(),
      sessionDescription: Joi.string().required(),
      sessionDate: Joi.date().required(),
    },
    params: {
      sessionId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },

  // PATCH /v1/sessions/:sessionId
  updateSession: {
    body: {
      workerId: Joi.string(),
      patientId: Joi.string(),
      patientName: Joi.string(),
      sessionDescription: Joi.string(),
      sessionDate: Joi.date().required(),
    },
    params: {
      sessionId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },
};
