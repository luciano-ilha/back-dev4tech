const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const APIError = require('../errors/api-error');

const sessionSchema = new mongoose.Schema({
  workerId: {
    type: String,
    required: true,
  },
  patientId: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    maxlength: 128,
    trim: true,
  },
  sessionDescription: {
    type: String,
    trim: true,
  },
  sessionDate: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

sessionSchema.statics = {
  async get(id) {
    let session;

    if (mongoose.Types.ObjectId.isValid(id)) {
      session = await this.findById(id).exec();
    }
    if (session) {
      return session;
    }

    throw new APIError({
      message: 'Session does not exist',
      status: httpStatus.NOT_FOUND,
    });
  },

  list({
    workerId, page = 1, perPage = 10, patientName, sessionDate,
  }) {
    const options = omitBy({ patientName, sessionDate }, isNil);

    return this.find(options)
      .find({ workerId })
      .sort({ sessionDate: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },
};

module.exports = mongoose.model('Session', sessionSchema);
