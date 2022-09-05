const httpStatus = require('http-status');
const { omit } = require('lodash');
const Session = require('../models/session.model');

exports.load = async (req, res, next, id) => {
  try {
    const session = await Session.get(id);
    req.locals = { session };
    return next();
  } catch (error) {
    return next(error);
  }
};

exports.get = (req, res) => res.json(req.locals.session);

exports.create = async (req, res, next) => {
  try {
    const session = new Session(req.body);
    const savedSession = await session.save();
    res.status(httpStatus.CREATED);
    res.json(savedSession);
  } catch (error) {
    next(error);
  }
};

exports.replace = async (req, res, next) => {
  try {
    const { session } = req.locals;
    const newSession = new Session(req.body);
    const newSessionObject = omit(newSession.toObject(), '_id');

    await session.updateOne(newSessionObject, { override: true, upsert: true });
    const savedSession = await Session.findById(session._id);

    res.json(savedSession);
  } catch (error) {
    next(error);
  }
};

exports.update = (req, res, next) => {
  const session = Object.assign(req.locals.session);

  session.save()
    .then((savedSession) => res.json(savedSession))
    .catch((e) => next(e));
};

exports.list = async (req, res, next) => {
  try {
    const sessions = await Session.list(req.query);
    res.json(sessions);
  } catch (error) {
    next(error);
  }
};

exports.remove = (req, res, next) => {
  const { session } = req.locals;

  session.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch((e) => next(e));
};
