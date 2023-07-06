var mysql = require('mysql');
const bcrypt = require('bcrypt');
require('dotenv').config()

const saltRounds = 10;
var connection;

function connectDataBase() {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
}

function insertStudent(data) {
    return new Promise((resolve, reject) => {
        connectDataBase();
        bcrypt.hash(data['pass'], saltRounds, function (err, hash) {
            let strQuery = `INSERT INTO students (id, name, surname, email, pass, score, id_room) VALUES ('${data['dni']}', '${data['nameusr']}', '${data['surname']}', '${data['email']}', '${hash}', '0', NULL);`;
            connection.query(strQuery, function (error, results, fields) {
                connection.end();
                if (error) {
                    console.error('error connecting: ' + error.stack);
                    reject(error);
                } else {
                    console.log('connected as id ' + connection.threadId);
                    resolve(results);
                }
            });
        });
    });
}

function insertTeacher(data) {
    return new Promise((resolve, reject) => {
        connectDataBase();
        bcrypt.hash(data['pass'], saltRounds, function (err, hash) {
            let strQuery = `INSERT INTO teachers (id, name, surname, email, pass) VALUES ('${data['dni']}', '${data['nameusr']}', '${data['surname']}', '${data['email']}', '${hash}');`;
            connection.query(strQuery, function (error, results, fields) {
                connection.end();
                if (error) {
                    console.error('error connecting: ' + error.stack);
                    reject(error);
                } else {
                    console.log('connected as id ' + connection.threadId);
                    resolve(results);
                }
            });
        });
    });
}

function emailDniExist(dni, email) {
    return new Promise((resolve, reject) => {
        connectDataBase();
        let strQuery = `SELECT id, email FROM students WHERE id = '${dni}' OR email = '${email}';`;
        connection.query(strQuery, function (error, results, fields) {
            connection.end();
            if (error) {
                console.error('error connecting: ' + error.stack);
                reject(error);
            } else {
                console.log('connected as id ' + connection.threadId);
                if (results.length == 0) {
                    connectDataBase();
                    strQuery = `SELECT id, email FROM teachers WHERE id = '${dni}' OR email = '${email}';`;
                    connection.query(strQuery, function (error, results, fields) {
                        connection.end();
                        if (error) {
                            console.error('error connecting: ' + error.stack);
                            reject(error);
                        } else {
                            console.log('connected as id ' + connection.threadId);
                            resolve(results);
                        }
                    });
                } else {
                    resolve(results);
                }
            }
        });
    });
}

function authUser(email, pass) {
    let occupation;
    return new Promise((resolve, reject) => {
        connectDataBase();
        let strQuery = `SELECT * FROM students WHERE email = '${email}';`;
        connection.query(strQuery, function (error, results, fields) {
            connection.end();
            if (error) {
                console.error('error connecting: ' + error.stack);
                reject(error);
            } else {
                console.log('connected as id ' + connection.threadId);
                if (results.length == 0) {
                    connectDataBase();
                    strQuery = `SELECT * FROM teachers WHERE email = '${email}';`;
                    connection.query(strQuery, function (error, results, fields) {
                        connection.end();
                        if (error) {
                            console.error('error connecting: ' + error.stack);
                            reject(error);
                        } else {
                            bcrypt.compare(pass, results[0].pass, function (err, res) {
                                if (res) {
                                    occupation = 'teacher';
                                    resolve({ results: results, occupation: occupation });
                                } else {
                                    occupation = 'teacher';
                                    resolve({ results: [], occupation: occupation });
                                }
                            });
                        }
                    });
                } else {
                    bcrypt.compare(pass, results[0].pass, function (err, res) {
                        if (res) {
                            occupation = 'student';
                            resolve({ results: results, occupation: occupation });
                        } else {
                            occupation = 'student';
                            resolve({ results: [], occupation: occupation });
                        }
                    });
                }
            }
        });
    });
}
function getDataStudent(id) {
    return new Promise((resolve, reject) => {
        connectDataBase();
        let strQuery = `SELECT name, surname, score, mods_completed, id_room FROM students WHERE id = '${id}';`;

        connection.query(strQuery, function (error, results, fields) {
            connection.end();
            if (error) {
                console.error('error connecting: ' + error.stack);
                reject(error);
            } else {
                console.log('connected as id ' + connection.threadId);
                resolve(results);
            }
        });
    });
}

function getDataTeacher(id) {
    return new Promise((resolve, reject) => {
        connectDataBase();
        let strQuery = `SELECT name, surname FROM teachers WHERE id = '${id}';`;
        connection.query(strQuery, function (error, results, fields) {
            connection.end();
            if (error) {
                console.error('error connecting: ' + error.stack);
                reject(error);
            } else {
                console.log('connected as id ' + connection.threadId);
                resolve(results);
            }
        });
    });
}

function checkCodeClass(code) {
    return new Promise((resolve, reject) => {
        connectDataBase();
        let strQuery = `SELECT COUNT(*) AS result FROM rooms WHERE id = ${code};`;
        connection.query(strQuery, function (error, results, fields) {
            connection.end();
            if (error) {
                console.error('error connecting: ' + error.stack);
                reject(error);
            } else {
                console.log('connected as id ' + connection.threadId);
                resolve(results[0]['result']);
            }
        });
    });
}

function getCodeClasses(id) {
    return new Promise((resolve, reject) => {
        connectDataBase();
        let strQuery = `SELECT id, name FROM rooms WHERE id_teacher = '${id}';`;
        connection.query(strQuery, function (error, results, fields) {
            connection.end();
            if (error) {
                console.error('error connecting: ' + error.stack);
                reject(error);
            } else {
                console.log('connected as id ' + connection.threadId);
                resolve(results);
            }
        });
    });
}

function getNameClass(id) {
    return new Promise((resolve, reject) => {
        connectDataBase();
        let strQuery = `SELECT name FROM rooms WHERE id = '${id}';`;
        connection.query(strQuery, function (error, results, fields) {
            connection.end();
            if (error) {
                console.error('error connecting: ' + error.stack);
                reject(error);
            } else {
                console.log('connected as id ' + connection.threadId);
                resolve(results);
            }
        });
    });
}

function createClass(code, nameClass, owner) {
    return new Promise((resolve, reject) => {
        connectDataBase();
        let strQuery = `INSERT INTO rooms (id, name, id_teacher) VALUES ('${code}', '${nameClass}', '${owner}');`;
        connection.query(strQuery, function (error, results, fields) {
            connection.end();
            if (error) {
                console.error('error connecting: ' + error.stack);
                reject(error);
            } else {
                console.log('connected as id ' + connection.threadId);
                getCodeClasses(owner).then(function (result) {
                    resolve(result);
                }).catch(function (error) {
                    console.log(error);
                });
            }
        });
    });
}

function deleteClass(id_room, id_teacher) {
    return new Promise((resolve, reject) => {
        connectDataBase();
        let strQuery = `UPDATE students SET id_room = NULL, score = 0, mods_completed = 0 WHERE students.id_room = ${id_room};`;
        connection.query(strQuery, function (error, results, fields) {
            connection.end();
            if (error) {
                console.error('error connecting: ' + error.stack);
                reject(error);
            } else {
                console.log('connected as id ' + connection.threadId);
                connectDataBase();
                let strQuery = `DELETE FROM rooms WHERE rooms.id = ${id_room} AND rooms.id_teacher = ${id_teacher};`;
                connection.query(strQuery, function (error, results, fields) {
                    connection.end();
                    if (error) {
                        console.error('error connecting: ' + error.stack);
                        reject(error);
                    } else {
                        console.log('connected as id ' + connection.threadId);
                        getCodeClasses(id_teacher).then(function (result) {
                            resolve(result);
                        }).catch(function (error) {
                            console.log(error);
                        });
                    }
                });
            }
        });
    });
}

function addClass(code, id_student) {
    return new Promise((resolve, reject) => {
        checkCodeClass(code).then(function (result) {
            console.log(`aqui ${result}`);
            if (result) {
                connectDataBase();
                let strQuery = `UPDATE students SET id_room = '${code}' WHERE students.id = ${id_student};`;
                connection.query(strQuery, function (error, results, fields) {
                    connection.end();
                    if (error) {
                        console.error('error connecting: ' + error.stack);
                        reject(error);
                    } else {
                        console.log('connected as id ' + connection.threadId);
                        getNameClass(code).then(function (result) {
                            resolve(result);
                        }).catch(function (error) {
                            console.log(error);
                        });
                    }
                });
            } else {
                resolve(result);
            }
        }).catch(function (error) {
            console.log(error);
        });
    });
}

function leaveClass(id) {
    return new Promise((resolve, reject) => {
        connectDataBase();
        let strQuery = `UPDATE students SET id_room = NULL, score = 0, mods_completed = 0 WHERE students.id = ${id};`;
        connection.query(strQuery, function (error, results, fields) {
            connection.end();
            if (error) {
                console.error('error connecting: ' + error.stack);
                reject(error);
            } else {
                console.log('connected as id ' + connection.threadId);
                resolve({ leaveClass: true });
            }
        });
    });
}

function getStudentsClass(id) {
    return new Promise((resolve, reject) => {
        connectDataBase();
        let strQuery = `SELECT id, name, surname, score, mods_completed FROM students WHERE id_room = ${id};`;
        connection.query(strQuery, function (error, results, fields) {
            connection.end();
            if (error) {
                console.error('error connecting: ' + error.stack);
                reject(error);
            } else {
                console.log('connected as id ' + connection.threadId);
                resolve(results);
            }
        });
    });
}

function updateScore(value, id, mod_compl) {
    return new Promise((resolve, reject) => {
        connectDataBase();
        let strQuery
        if (mod_compl > 0) {
            strQuery = `UPDATE students SET score = '${value}', mods_completed = ${mod_compl} WHERE students.id = ${id};`;
        } else {
            strQuery = `UPDATE students SET score = '${value}' WHERE students.id = ${id};`;
        }
        connection.query(strQuery, function (error, results, fields) {
            connection.end();
            if (error) {
                console.error('error connecting: ' + error.stack);
                reject(error);
            } else {
                console.log('connected as id ' + connection.threadId);
                resolve(value);
            }
        });
    });
}

module.exports = {
    insertStudent,
    insertTeacher,
    emailDniExist,
    authUser,
    getDataStudent,
    getDataTeacher,
    checkCodeClass,
    createClass,
    getCodeClasses,
    deleteClass,
    addClass,
    getNameClass,
    leaveClass,
    getStudentsClass,
    updateScore
};