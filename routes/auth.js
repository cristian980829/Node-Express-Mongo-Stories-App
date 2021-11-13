const { Router } = require('express');
const { check } = require('express-validator');
const { createUser } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validateFields');


const router = Router();

router.post(
    '/new',
    // middlewares
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be 6 characters').isLength({ min: 6 }),
        check('urlimage', 'Url Image is required').not().isEmpty(),
        check('rol', 'Rol is required').not().isEmpty(),
        validateFields
    ],
    createUser 
);


module.exports = router;