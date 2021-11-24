const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validateFields');
const {  getUserById, updateUserPassword } = require('../controllers/user');

const router = Router();

// All requests must go through jwt validation
router.use( validateJWT );

// Get user by id
router.get('/:id', getUserById );

// Update user password
router.put(
    '/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be 6 characters').isLength({ min: 6 }),
        check('newPassword', 'Password must be 6 characters').isLength({ min: 6 }),
        validateFields
    ],
    updateUserPassword 
);


module.exports = router;