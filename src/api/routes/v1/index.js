const express = require('express');
const userRoutes = require('./user.route');
const sessionRoutes = require('./session.route');
const authRoutes = require('./auth.route');

const router = express.Router();

router.get('/status', (req, res) => res.send('OK'));

router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
router.use('/sessions', sessionRoutes);
router.use('/auth', authRoutes);

module.exports = router;
