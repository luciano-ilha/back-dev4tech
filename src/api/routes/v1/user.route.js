const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/user.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {
  listUsers,
  createUser,
  replaceUser,
  updateUser,
} = require('../../validations/user.validation');

const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
router.param('userId', controller.load);

router
  .route('/patients')
  .get(authorize(ADMIN), validate(listUsers), controller.list);

router
  .route('/:workerId/patients')
  .post(authorize(ADMIN), validate(createUser), controller.create);

router
  .route('/profile')
  .get(authorize(), controller.loggedIn);

router
  .route('/:userId')
  .get(authorize(LOGGED_USER), controller.get)
  .put(authorize(LOGGED_USER), validate(replaceUser), controller.replace)
  .patch(authorize(LOGGED_USER), validate(updateUser), controller.update)
  .delete(authorize(LOGGED_USER), controller.remove);

module.exports = router;
