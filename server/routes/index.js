'use strict';

const express = require('express');

const authRoutes = require('./auth-routes');
const apiRoutes = require('./api/index');
const authMiddleware = require('../middleware/auth-middleware');
const csrfMiddleware = require('../middleware/csrf-middleware');

const router = express.Router();

// All APIs that are called from an unauthenticated state.
router.use('/auth', authRoutes);

/* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
/* CSRF_TOUCHPOINT */
// The middlewares here ensure that an authenticated user's JWTs/session data/CSRF token exists
// and are valid.
router.use('/v1', [authMiddleware, csrfMiddleware], apiRoutes);

module.exports = router;
