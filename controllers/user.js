const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const getUserById = async( req, res = response ) => {

    const userId = req.params.id;

    const user = await User.find( {"_id" : userId} );
    const { _id, name, email, urlimage, rol } = user[0];

    res.json({
        ok: true,
        user: {
            _id, 
            name, 
            email, 
            urlimage, 
            rol 
        }
    });

}

const updateUserPassword = async( req, res = response ) => {
    
    const { email, password, newPassword } = req.body;

    
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

        //Password encrypt
        const salt = bcrypt.genSaltSync();
        const newPasswordEncrypt = bcrypt.hashSync( newPassword, salt );
        

        //Update password
        const passwordUpdated = await User.updateOne(
            { email: email },
            {
                $set: {
                    password: newPasswordEncrypt,
                }
            }
        )



        res.json({
            ok: true
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'An error ocurred'
        });
    }

}

module.exports = {
    getUserById,
    updateUserPassword
}