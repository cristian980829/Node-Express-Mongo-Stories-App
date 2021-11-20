const { Router } = require('express');

const { validateJWT } = require('../middlewares/validate-jwt');
const {  getUserById } = require('../controllers/user');

const router = Router();

// All requests must go through jwt validation
router.use( validateJWT );

// Get user by id
router.get('/:id', getUserById );


module.exports = router;