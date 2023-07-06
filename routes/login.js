var express = require('express');
var router = express.Router();
const db = require('../models/bd_connection.js');

/* GET login page. */
router.get('/', function (req, res, next) {
  if (req.session.userId) {
    res.redirect('home');
  } else {
    res.render('login', { title: 'Iniciar Sesion', usrLoggedIn: false });
  }
});

router.post('/', function (req, res, next) {
  const email = req.body.email;
  const pass = req.body.pass;

  db.authUser(email, pass).then(function (result) {
    if (!result.length) {
      res.json({ userNoExist: true });
    } else {
      res.json({ authSuccessful: true });
    }
  }).catch(function (error) {
    res.json({ error: true });
  });
  
});

module.exports = router;