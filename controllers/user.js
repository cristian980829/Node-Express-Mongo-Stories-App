const { response } = require('express');
const User = require('../models/User');

const getUserById = async( req, res = response ) => {

    const userId = req.params.id;

    const user = await User.find( {"_id" : userId} );

    res.json({
        ok: true,
        user
    });

}



module.exports = {
    getUserById,
}