const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validate-jwt');
const {  createStorie } = require('../controllers/stories');

const router = Router();

// All requests must go through jwt validation
router.use( validateJWT );


// Create a new storie
router.post(
    '/',
    [
        check('title','Title is required').not().isEmpty(),
        check('description','Description is required').not().isEmpty(),
        check('registration_date','Registration date invalid').custom( isDate ),
        validateFields
    ],
    createStorie 
);


module.exports = router;