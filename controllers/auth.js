const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');


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
        user.rol = 'USER';
    
        //Password encrypt
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();
        // Generar JWT
        const token = await generateJWT( user.id, user.name );
    
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            urlimage: user.urlimage,
            email: user.email,
            rol: user.rol,
            token
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'An error occurred'
        });
    }
}

const loginUser = async(req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });

        if ( !user ) {
            return res.status(400).json({
                ok: false,
                msg: "Email doesn't exist"
            });
        }

        // Confirmar password
        const validPassword = bcrypt.compareSync( password, user.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect password'
            });
        }

        // Generate JWT
        const token = await generateJWT( user.id, user.name );

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            urlimage: user.urlimage,
            email: user.email,
            rol: user.rol,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'An error occurred'
        });
    }
}


const revalidateToken = async (req, res = response ) => {

    const { uid, name } = req;

    const user = await User.findOne({ uid });

    // Generate JWT
    const token = await generateJWT( uid, name );

    res.json({
        ok: true,
        token,
        uid,
        name,
        email: user.email,
        urlimage: user.urlimage,
        rol: user.rol
    })
}

module.exports = {
    createUser,
    loginUser,
    revalidateToken
}