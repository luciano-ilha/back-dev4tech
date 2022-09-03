const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/session.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
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
  .get(authorize(ADMIN), validate(listSessions), controller.list)
  .post(authorize(ADMIN), validate(createSession), controller.create);

router
  .route('/:sessionId')
  .get(authorize(LOGGED_USER), controller.get)
  .put(authorize(LOGGED_USER), validate(replaceSession), controller.replace)
  .patch(authorize(LOGGED_USER), validate(updateSession), controller.update)
  .delete(authorize(LOGGED_USER), controller.remove);

module.exports = router;
