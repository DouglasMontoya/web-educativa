var express = require('express');
var router = express.Router();
const db = require('../models/bd_connection.js');

/* GET register page. */
router.post('/', function (req, res, next) {
    let id = req.session.userId;

    db.leaveClass(id).then(function(result){
        res.json({result: result.leaveClass});
    }).catch(function(error){
        console.log(error);
        res.json({error: true});
    });
});

module.exports = router;