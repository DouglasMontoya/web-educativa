var express = require('express');
var router = express.Router();
const db = require('../models/bd_connection.js');

/* GET register page. */
router.post('/', function (req, res, next) {
    let id_room = req.body.value;
    let id_teacher = req.session.userId;

    db.deleteClass(id_room, id_teacher).then(function(result){
        res.json({result: result});
    }).catch(function(error){
        console.log(error);
    });
});

module.exports = router;