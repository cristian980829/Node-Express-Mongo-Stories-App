const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');


const createUser = async(req, res = response ) => {

    console.log(req.body)
    const { email, password } = req.body;

    res.status(201).json({
            ok: true,
            email,
            password
        })


}

module.exports = {
    createUser
}