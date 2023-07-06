var express = require('express');
var router = express.Router();
const db = require('../models/bd_connection.js');

router.post('/', function(req, res, next) {
    let nameClass = req.body.nameClass;
    let owner = req.session.userId;

    function generateCode() {
        let code = '';
        for (let i = 0; i < 4; i++) {
            let numRandom = Math.floor(Math.random() * 10);
            numRandom.toString();
            code += numRandom;
        }
        code = parseInt(code);
        return code;
    }

    function checkCode() {
        let code = generateCode();
        db.checkCodeClass(code).then(function(results) {
            if (results != 1) {
                db.createClass(code, nameClass, owner).then(function(results) {
                    res.json({classCreated: true, result: results});
                }).catch(function(error) {
                    console.log(error);
                    res.json({error: error});
                });
            } else {
                checkCode();
            }
        }).catch(function(error) {
            console.log(error);
            res.json({error: error});
        });
    }

    checkCode();
});

module.exports = router;