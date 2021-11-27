const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validateFields');
const {  getUserById, updateUserPassword, updateUser, getUsers } = require('../controllers/user');

const router = Router();

// All requests must go through jwt validation
router.use( validateJWT );

// Get users 
router.get('/', getUsers );

// Get user by id
router.get('/:id', getUserById );

// Update user password
router.put(
    '/password',
    [
        check('password', 'Password must be 6 characters').isLength({ min: 6 }),
        check('newPassword', 'Password must be 6 characters').isLength({ min: 6 }),
        validateFields
    ],
    updateUserPassword 
);

// Update user
router.put(
    '/',
    [
        check('name','Name is required').not().isEmpty(),
        check('urlimage','Url Image is required').not().isEmpty(),
        validateFields
    ],
    updateUser
);


module.exports = router;