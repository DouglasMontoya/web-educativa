var express = require('express');
var router = express.Router();
const db = require('../models/bd_connection.js');

/* GET register page. */
router.post('/', function (req, res, next) {
    let id_room = req.body.codeClass;
    let id_student = req.session.userId;

    db.addClass(id_room, id_student).then(function(result){
        if (!result){
            res.json({error: true});
        }else{
            res.json({result: result, classAdd: true});
        }
    }).catch(function(error){

    });
});

module.exports = router;