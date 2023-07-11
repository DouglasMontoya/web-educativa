var express = require('express');
var router = express.Router();
var db = require('../models/bd_connection.js');
const { get } = require('jquery');

/* GET register page. */
function getData(id) {
    return db.getDataStudent(id);
}

function increaseScore(score, id, mod_comple = 0) {
    let newScore = score + 100;
    return db.updateScore(newScore, id, mod_comple);
}

function decreaseScore(score, id, mod_comple = 0) {
    let newScore = score - 40;
    return db.updateScore(newScore, id, mod_comple);
}

router.get('/module-one', function (req, res, next) {
    getData(req.session.userId)
        .then(function (result) {
            if (result[0].id_room != null) {
                res.render('module-one', {
                    title: 'Modulo 1',
                    usrLoggedIn: true,
                    isStudent: true,
                    score: result[0].score,
                    id_room: result[0].id_room,
                    mod_compl: result[0].mods_completed
                });
            } else {
                res.redirect('/');
            }
        })
        .catch(function (error) {
            console.log(error);
        });
});

router.post('/module-one', function (req, res, next) {
    getData(req.session.userId).then(function (result) {
        if (result[0].mods_completed <= 0) {
            increaseScore(result[0].score, req.session.userId, 1).then(function (result) {
                res.json({ score: result });
            }).catch(function (error) {
                res.json({ error: error });
            });
        } else {
            res.json({ score: result[0].score });
        }
    }).catch(function (error) {
        res.json({ error: error });
    });
});

router.get('/module-two', function (req, res, next) {
    getData(req.session.userId)
        .then(function (result) {
            if (result[0].mods_completed >= 1) {
                res.render('module-two', {
                    title: 'Modulo 2',
                    usrLoggedIn: true,
                    isStudent: true,
                    score: result[0].score,
                    id_room: result[0].id_room,
                    mod_compl: result[0].mods_completed
                });
            } else {
                res.redirect('/');
            }
        })
        .catch(function (error) {
            console.log(error);
        });
});

router.post('/module-two', function (req, res, next) {
    getData(req.session.userId).then(function (result) {
        if (result[0].mods_completed == 1) {
            if (req.body['inputsRd[]'][0] == 'true' && req.body['inputsRd[]'][3] == 'true') {
                increaseScore(result[0].score, req.session.userId, 2).
                    then(function (result) {
                        res.json({
                            answer: true,
                            score: result,
                        });
                    }).catch(function (error) {
                        console.log(error);
                        res.json({ error: true });
                    });
            } else {
                decreaseScore(result[0].score, req.session.userId)
                    .then(function (result) {
                        res.json({ answer: false, score: result });
                    }).catch(function (error) {
                        res.json({ error: error });
                    });

            }
        } else {
            res.json({ error: true });
        }
    }).catch(function (error) {
        console.log(error);
        res.json({ error: error });
    });
});

router.get('/module-three', function (req, res, next) {
    getData(req.session.userId)
        .then(function (result) {
            if (result[0].mods_completed >= 2) {
                res.render('module-three', {
                    title: 'Modulo 3',
                    usrLoggedIn: true,
                    isStudent: true,
                    score: result[0].score,
                    id_room: result[0].id_room,
                    mod_compl: result[0].mods_completed
                });
            } else {
                res.redirect('/');
            }
        })
        .catch(function (error) {
            console.log(error);
        });
});

router.post('/module-three', function (req, res, next) {
    if (req.body.ask == 0) {
        if (req.body.inputTwo == 'true') {
            res.json({ correct: true });
        } else {
            answerWrong();
        }
    } else if (req.body.ask == 1) {
        if (req.body.inputOne == 'true') {
            res.json({ correct: true });
        } else {
            answerWrong();
        }
    } else if (req.body.ask == 2) {
        if (req.body.inputOne == 'true') {
            res.json({ correct: true });
        } else {
            answerWrong();
        }
    } else if (req.body.ask == 3) {
        if (req.body.inputTwo == 'true') {
            getData(req.session.userId)
                .then(function (result) {
                    increaseScore(result[0].score, req.session.userId, 3).then(function (result) {
                        res.json({ correct: true, score: result });
                    }).catch(function (error) {
                        res.json({ error: error });
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            answerWrong();
        }
    }

    function answerWrong() {
        getData(req.session.userId)
            .then(function (result) {
                decreaseScore(result[0].score, req.session.userId)
                    .then(function (result) {
                        res.json({ correct: false, score: result });
                    }).catch(function (error) {
                        res.json({ error: error });
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
});

router.get('/module-four', function (req, res, next) {
    getData(req.session.userId)
        .then(function (result) {
            if (result[0].mods_completed >= 3) {
                res.render('module-four', {
                    title: 'Modulo 4',
                    usrLoggedIn: true,
                    isStudent: true,
                    score: result[0].score,
                    id_room: result[0].id_room,
                    mod_compl: result[0].mods_completed
                });
            } else {
                res.redirect('/');
            }
        })
        .catch(function (error) {
            console.log(error);
        });
});

router.post('/module-four', function (req, res, next) {
    let answers = [
        "Honestidad",
        "Objetividad",
        "Independencia",
        "Confidencialidad",
        "Cumplimientos de las normas",
        "Actualizacion de sus conocimientos",
        "Difusion de su saber",
        "Respeto entre colegas",
        "Apego al codigo de etica de su gremio"
    ];
    let boolResult = req.body['answers[]'].every(element => answers.includes(element));
    getData(req.session.userId).then(function (result) {
        if (!boolResult) {
            decreaseScore(result[0].score, req.session.userId).then(function (result) {
                res.json({ correct: boolResult, score: result });
            }).catch(function (error) {
                res.json({ error: error });
            });
        } else {
            increaseScore(result[0].score, req.session.userId, 4).then(function (result) {
                res.json({ correct: boolResult, score: result });
            }).catch(function (error) {
                res.json({ error: error });
            });
        }
    }).catch(function (error) {
        res.json({ error: error });
    });
});

router.get('/module-five', function (req, res, next) {
    getData(req.session.userId)
        .then(function (result) {
            if (result[0].mods_completed >= 4) {
                res.render('module-five', {
                    title: 'Modulo 5',
                    usrLoggedIn: true,
                    isStudent: true,
                    score: result[0].score,
                    id_room: result[0].id_room,
                    mod_compl: result[0].mods_completed
                });
            } else {
                res.redirect('/');
            }
        })
        .catch(function (error) {
            console.log(error);
        });
});

router.post('/module-five', function (req, res, next) {
    getData(req.session.userId).then(function (result) {
        if (req.body.blank1 == 'computacion' &&
            req.body.blank2 == 'redes' &&
            req.body.blank3 == 'comunicacion' &&
            req.body.blank4 == 'desarrollo sostenible' &&
            req.body.blank5 == 'opiniones' &&
            req.body.blank6 == 'enseñar'
        ) {
            increaseScore(result[0].score, req.session.userId, 5).then(function (result) {
                res.json({ correct: true, score: result });
            }).catch(function (error) {
                res.json({ error: error });
            });
        } else {
            decreaseScore(result[0].score, req.session.userId).then(function (result) {
                res.json({ correct: false, score: result });
            }).catch(function (error) {
                res.json({ error: error });
            });
        }
    }).catch(function (error) {
        res.json({ error: error });
    });
});

router.get('/module-six', function (req, res, next) {
    getData(req.session.userId)
        .then(function (result) {
            if (result[0].mods_completed >= 5) {
                res.render('module-six', {
                    title: 'Modulo 6',
                    usrLoggedIn: true,
                    isStudent: true,
                    score: result[0].score,
                    id_room: result[0].id_room,
                    mod_compl: result[0].mods_completed
                });
            } else {
                res.redirect('/');
            }
        })
        .catch(function (error) {
            console.log(error);
        });
});

router.post('/module-six', function (req, res, next) {
    getData(req.session.userId).then(function (result) {
        if (
            req.body['answers[]'][3] == 'true',
            req.body['answers[]'][5] == 'true',
            req.body['answers[]'][12] == 'true',
            req.body['answers[]'][16] == 'true',
            req.body['answers[]'][24] == 'true'
        ) {
            increaseScore(result[0].score, req.session.userId, 6).then(function (result) {
                res.json({ correct: true, score: result });
            }).catch(function (error) {
                res.json({ error: error });
            });
        } else {
            decreaseScore(result[0].score, req.session.userId).then(function (result) {
                res.json({ correct: false, score: result });
            }).catch(function (error) {
                res.json({ error: error });
            });
        }
    }).catch(function (error) {
        res.json({ error: error });
    });
});

router.get('/module-seven', function (req, res, next) {
    getData(req.session.userId)
        .then(function (result) {
            if (result[0].mods_completed >= 6) {
                res.render('module-seven', {
                    title: 'Modulo 7',
                    usrLoggedIn: true,
                    isStudent: true,
                    score: result[0].score,
                    id_room: result[0].id_room,
                    mod_compl: result[0].mods_completed
                });
            } else {
                res.redirect('/');
            }
        })
        .catch(function (error) {
            console.log(error);
        });
});

router.post('/module-seven', function (req, res, next) {
    getData(req.session.userId).then(function (result) {
        if (result[0].mods_completed == 6){
            increaseScore(result[0].score, req.session.userId, 7).then(function (result) {
                res.json({ score: result, passed: false});
            }).catch(function (error) { 
                res.json({ error: error });  
            });
        }else{
            res.json({passed: true});
        }
    }).catch(function (error) {
        res.json({ error: error });
    });
});

module.exports = router;
