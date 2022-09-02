const db = require("../models");
const User = db.user;

exports.updateUser = async (req, res) => {
    let id = req.params.id;
    let data = req.body.data;
    
    await User.updateOne({ _id: id }, {$set: data});

    res.status(200).send({
        data: data,
    });
}
