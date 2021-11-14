const { response } = require('express');
const Storie = require('../models/Storie');

const createStorie = async ( req, res = response ) => {

    const storie = new Storie( req.body );

    try {

        storie.user = req.uid;
        
        const storieSaved = await storie.save();

        res.json({
            ok: true,
            storie: storieSaved
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'An error ocurred'
        });
    }
}


module.exports = {
    createStorie
}