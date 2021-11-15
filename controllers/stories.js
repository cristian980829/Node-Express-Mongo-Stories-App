const { response } = require('express');
const Storie = require('../models/Storie');

const getStories = async( req, res = response ) => {

    const stories = await Storie.find()
                                .populate('user','name');

    res.json({
        ok: true,
        stories
    });
}

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

const updateStorie = async( req, res = response ) => {
    
    const storieId = req.params.id;
    const uid = req.uid;

    try {

        const storie = await Storie.findById( storieId );

        if ( !storie ) {
            return res.status(404).json({
                ok: false,
                msg: "History doesn't exist"
            });
        }

        if ( storie.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: "You don't have permission to edit this story"
            });
        }

        const newStorie = {
            ...req.body,
            user: uid
        }

        const storieUpdated = await Storie.findByIdAndUpdate( storieId, newStorie, { new: true } );

        res.json({
            ok: true,
            storie: storieUpdated
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
    createStorie,
    getStories,
    updateStorie
}