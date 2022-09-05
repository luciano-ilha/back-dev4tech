const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/session.controller');
const {
  listSessions,
  createSession,
  replaceSession,
  updateSession,
} = require('../../validations/session.validation');

const router = express.Router();

router.param('sessionId', controller.load);

router
  .route('/')
  .get(validate(listSessions), controller.list)
  .post(validate(createSession), controller.create);

router
  .route('/:sessionId')
  .get(controller.get)
  .put(validate(replaceSession), controller.replace)
  .patch(validate(updateSession), controller.update)
  .delete(controller.remove);

module.exports = router;
