const { Router } = require('express');
const { check } = require('express-validator');
const { createUser } = require('../controllers/auth');


const router = Router();

router.post(
    '/new',
    createUser 
);


module.exports = router;