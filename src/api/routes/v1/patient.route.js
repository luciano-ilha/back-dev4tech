const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/patient.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {
  // listPatients,
  createPatient,
  replacePatient,
  updatePatient,
} = require('../../validations/patient.validation');

const router = express.Router();

router.param('patientId', controller.load);

router
  .route('/')

  .get(controller.list)

  .post(authorize(ADMIN), validate(createPatient), controller.create);

router
  .route('/:patientId')

  .get(authorize(LOGGED_USER), controller.get)

  .put(authorize(LOGGED_USER), validate(replacePatient), controller.replace)

  .patch(authorize(LOGGED_USER), validate(updatePatient), controller.update)

  .delete(authorize(LOGGED_USER), controller.remove);

module.exports = router;
