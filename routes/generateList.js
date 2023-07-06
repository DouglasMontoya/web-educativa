var express = require('express');
var router = express.Router();
const db = require('../models/bd_connection.js');

/* GET register page. */
router.post('/', function (req, res, next) {
    let id_room = req.body.idClass;

    db.getStudentsClass(id_room).then(function(result){
        res.json({result: result});
    }).catch(function(error){
        res.json({error: true});
    });
});

module.exports = router;