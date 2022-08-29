const httpStatus = require('http-status');
const Patient = require('../models/patient.model');

exports.load = async (req, res, next, id) => {
  try {
    const patient = await Patient.get(id);
    req.locals = { patient };
    return next();
  } catch (error) {
    return next(error);
  }
};

exports.get = (req, res) => res.json(req.locals.patient);

exports.create = async (req, res, next) => {
  try {
    const patient = new Patient(req.body);
    const savedPatient = await patient.save();
    res.status(httpStatus.CREATED);
    res.json(savedPatient.transform());
  } catch (error) {
    next(error);
  }
};

// exports.replace = async (req, res, next) => {
//   try {
//     const { patient } = req.locals;
//     const newPatient = new Patient(req.body);
//     const newPatientObject = omit(newPatient.toObject(), '_id');

//     await patient.updateOne(newPatientObject, { override: true, upsert: true });
//     const savedPatient = await Patient.findById(patient._id);

//     res.json(savedPatient.transform());
//   } catch (error) {
//     next(error);
//   }
// };

// exports.update = (req, res, next) => {
//   const patient = Object.assign(req.locals.patient);

//   patient.save()
//     .then((savedPatient) => res.json(savedPatient.transform()))
//     .catch((e) => next(e));
// };

exports.list = async (req, res, next) => {
  try {
    const patients = await Patient.list(req.query);
    const transformedPatients = patients.map((patient) => patient.transform());
    res.json(transformedPatients);
  } catch (error) {
    next(error);
  }
};

// exports.remove = (req, res, next) => {
//   const { patient } = req.locals;

//   patient.remove()
//     .then(() => res.status(httpStatus.NO_CONTENT).end())
//     .catch((e) => next(e));
// };
