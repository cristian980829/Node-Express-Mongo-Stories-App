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
    
    const { password, newPassword } = req.body;

    const uid = req.uid;

    
    try {

        const user = await User.findById( uid );
        
        if ( !user ) {
            return res.status(400).json({
                ok: false,
                msg: "User doesn't exist"
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
        await User.updateOne(
            { _id: uid },
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

const updateUser = async( req, res = response ) => {
    
    //User Id that will be updated
    const { name, urlimage, rol, uid } = req.body;
    //User Id who is going to do the update
    const { uid: userId } = req;
    
    try {
        const user = await User.findById( userId );
        
        if ( !user ) {
            return res.status(400).json({
                ok: false,
                msg: "User doesn't exist"
            });
        }

        const userToUpdate = await User.findById( uid );
        
        if ( !userToUpdate ) {
            return res.status(400).json({
                ok: false,
                msg: "User doesn't exist"
            });
        }
        
        //Check if the person who is going to perform the update is an 
        //admin or a common user
        if(user.rol==='USER'){
            await User.updateOne(
                { _id: uid },
                {
                    $set: {
                        name,
                        urlimage
                    }
                }
            )
        }else if(user.rol==='ADMIN'){
            await User.updateOne(
                { _id: uid },
                {
                    $set: {
                        name,
                        urlimage,
                        rol
                    }
                }
            )
        }


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
    updateUserPassword,
    updateUser
}