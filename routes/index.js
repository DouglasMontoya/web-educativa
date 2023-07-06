var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.userId) {
    res.redirect('home');
  } else {
    res.render('index', { title: 'Inicio', usrLoggedIn: false });
  }
});

module.exports = router;
