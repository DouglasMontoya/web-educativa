var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            // Manejar el error
        } else {
            res.redirect('/login');
        }
    });
});

module.exports = router;