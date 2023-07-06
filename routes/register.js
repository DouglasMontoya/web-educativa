var express = require('express');
var router = express.Router();
const db = require('../models/bd_connection.js');

/* GET register page. */
router.get('/', function (req, res, next) {
  if (req.session.userId) {
    res.redirect('home');
  } else {
    res.render('register', { title: 'Registrarse', usrLoggedIn: false });
  }
});

router.post('/', function (req, res, next) {
  const occupation = req.body.occupation;
  const email = req.body.email;
  const dni = req.body.dni;
  const nameusr = req.body.nameusr;
  const surname = req.body.surname;
  const pass = req.body.pass;
  const data = {occupation, email, dni, nameusr, surname, pass};

  db.emailDniExist(dni, email).then(function (result) {
    let emailExist = 0;
    let dniExist = 0;
    result.forEach(element => {
      if (element.email == email && emailExist != 1){
        emailExist = 1;
      }
      if (element.id == dni && dniExist != 1){
        dniExist = 1;
      }
    });
    if (emailExist == 0 && dniExist == 0){
      if (occupation == 'student'){
        db.insertStudent(data).then(function (result){
          res.json({regSuccess: true});
        }).catch(function(err){
          res.json({ error: true });
        });
      }else if(occupation == 'teacher'){
        db.insertTeacher(data).then(function (result){
          res.json({regSuccess: true});
        }).catch(function(err){
          res.json({ error: true });
        });
      }
      
    }else{
      res.json({ emailExist: emailExist, dniExist: dniExist});
    }
    
  }).catch(function (error) {
    res.json({ error: true });
  });
});

module.exports = router;