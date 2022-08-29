const express = require('express');
// const validate = require('express-validation');
const controller = require('../../controllers/patient.controller');
// const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
// const {
//   createPatient,
//   replacePatient,
//   updatePatient,
// } = require('../../validations/patient.validation');

const router = express.Router();

router.param('patientId', controller.load);

router
  .route('/')
  .get(controller.list)
  .post(controller.create);

// router
//   .route('/:patientId')
//   .get(controller.get)
//   .put(controller.replace)
//   .patch(controller.update)
//   .delete(controller.remove);

module.exports = router;
