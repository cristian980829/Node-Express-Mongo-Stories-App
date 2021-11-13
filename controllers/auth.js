const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');


const createUser = async(req, res = response ) => {

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if ( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'User already exists'
            });
        }

        user = new User( req.body );
    
        //Password encrypt
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        console.log(user);
        await user.save();
    
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'An error occurred'
        });
    }
}

module.exports = {
    createUser
}