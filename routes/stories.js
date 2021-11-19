const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validate-jwt');
const {  createStorie, getStories, updateStorie, deleteStorie } = require('../controllers/stories');

const router = Router();

// All requests must go through jwt validation
router.use( validateJWT );

// Get stories 
router.get('/', getStories );

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

// Update storie
router.put(
    '/:id',
    [
        check('title','Title is required').not().isEmpty(),
        check('description','Description is required').not().isEmpty(),
        check('registration_date','Registration date invalid').custom( isDate ),
        validateFields
    ],
    updateStorie 
);

// Delete storie
router.delete('/:id', deleteStorie );


module.exports = router;