var express = require('express');
var router = express.Router();
const db = require('../models/bd_connection.js');

/* GET login page. */
router.get('/', function (req, res, next) {

    function renderHomeStudent(resultOne, nameClass) {
        res.render('home', {
            title: 'Inicio',
            usrLoggedIn: true,
            name: resultOne[0].name,
            surname: resultOne[0].surname,
            score: resultOne[0].score,
            mod_compl: resultOne[0].mods_completed,
            id_room: resultOne[0].id_room,
            nameClass: nameClass,
            isStudent: true
        });
    }

    if (req.session.userId) {
        if (req.session.occupation == 'student') {
            db.getDataStudent(req.session.userId).then(function (resultOne) {
                if (resultOne[0].id_room != null) {
                    db.getNameClass(resultOne[0].id_room).then(function (nameClass) {
                        renderHomeStudent(resultOne, nameClass[0].name);
                    }).catch(function (error) {
                        console.log(error);
                    });
                } else {
                    renderHomeStudent(resultOne, false);
                }
            }).catch(function (error) {
                console.log(error);
                res.json({ error: true });
            });
        } else if (req.session.occupation == 'teacher') {
            db.getDataTeacher(req.session.userId).then(function (result) {
                let resultOne = result;
                db.getCodeClasses(req.session.userId).then(function (result) {
                    res.render('home', {
                        title: 'Inicio',
                        usrLoggedIn: true,
                        name: resultOne[0].name,
                        surname: resultOne[0].surname,
                        isStudent: false,
                        result: result
                    });
                }).catch();

            }).catch(function (error) {
                console.log(error);
                res.json({ error: true });
            });
        }
    } else {
        res.redirect('/login');
    }
});

router.post('/', function (req, res, next) {
    const email = req.body.email;
    const pass = req.body.pass;

    db.authUser(email, pass).then(function ({ results, occupation }) {
        if (!results.length) {
            res.json({ userNoExist: true });
        } else {
            const user = results[0];
            req.session.userId = user.id;
            req.session.occupation = occupation;
            res.json({ authSuccessful: true });
        }
    }).catch(function (error) {
        console.log(error);
        res.json({ error: true });
    });
});

module.exports = router;