//Change mode in input password to text
if ($('title').text() == 'EduETICA - Registrarse' || $('title').text() == 'EduETICA - Iniciar Sesion') {
    let passwordInput = document.querySelectorAll('.password');
    let togglePasswordButton = document.getElementById('togglePassword');

    togglePasswordButton.addEventListener('click', () => {
        passwordInput.forEach(element => {
            if (element.type === 'password') {
                element.type = 'text';
                togglePasswordButton.src = 'images/eye_close.svg';
            } else {
                element.type = 'password';
                togglePasswordButton.src = 'images/eye_open.svg';
            }
        });
    });
}

//Set max length of 10 char in input number
if ($('title').text() == 'EduETICA - Registrarse') {
    let input = document.querySelector('input[type="number"]');
    input.addEventListener('input', function () {
        if (this.value.length > 10) {
            this.value = this.value.slice(0, 10);
        }
    });
}

//Check password matches
if ($('title').text() == 'EduETICA - Registrarse') {
    let inputPass = document.querySelector('#pass');
    let inputRepeatPass = document.querySelector('#repPass');
    let msgPassError = document.querySelector('.msgPassError');
    let msgPassMatch = document.querySelector('.msgPassMatch');
    let btnSingup = document.querySelector('.btnSingup');
    [inputPass, inputRepeatPass].forEach(element => {
        element.addEventListener('keyup', () => {
            if (inputPass.value == '' && inputRepeatPass.value == '' || inputRepeatPass.value == '') {
                msgPassMatch.style.display = 'none';
                msgPassError.style.display = 'none';
                btnSingup.disabled = 0;
            } else if (inputPass.value != inputRepeatPass.value) {
                msgPassMatch.style.display = 'none';
                msgPassError.style.display = 'block';
                btnSingup.disabled = 1;
            } else {
                msgPassError.style.display = 'none';
                msgPassMatch.style.display = 'block';
                btnSingup.disabled = 0;
            }
        })
    });
}

if ($('title').text() == 'EduETICA - Registrarse') {
    let msgEmailError = document.querySelector('.msgEmailError');
    let msgDniError = document.querySelector('.msgDniError');
    $("#formRegister").on("submit", function (e) {
        e.preventDefault();

        $('.btnSingup').addClass('is-loading');

        const occupation = $("#formRegister [name='occupation']:checked").val();
        const email = $("#formRegister [name='email']").val();
        const dni = $("#formRegister [name='dni']").val();
        const nameusr = $("#formRegister [name='nameusr']").val();
        const surname = $("#formRegister [name='surname']").val();
        const pass = $("#formRegister [name='pass']").val();
        const repeatPass = $("#formRegister [name='repeatPass']").val();

        $.ajax({
            url: '/register',
            type: 'POST',
            data: {
                occupation: occupation,
                email: email,
                dni: dni,
                nameusr: nameusr,
                surname: surname,
                pass: pass,
                repeatPass: repeatPass
            },
            success: function (response) {
                $('.btnSingup').removeClass('is-loading');
                if (response.emailExist) {
                    msgDniError.style.display = 'none';
                    msgEmailError.style.display = 'block';
                } else {
                    msgEmailError.style.display = 'none';
                    if (response.dniExist) {
                        msgDniError.style.display = 'block';
                    } else {
                        msgDniError.style.display = 'none';
                        if (response.error) {
                            alert("Error al conectar con la base de datos. Intentelo de nuevo");
                        } else {
                            if (response.regSuccess) {
                                $("#formRegister").attr('style', 'display: none !important');
                                $("#regSuccess").attr('style', 'display: block');
                            }
                        }
                    }
                }
            },
            error: function (response) {
                alert('Error al procesar los datos')
            }
        })
    })
}

if ($('title').text() == 'EduETICA - Iniciar Sesion') {
    $("#formLogin").on("submit", function (e) {
        e.preventDefault();

        $('#btnLogin').addClass('is-loading');

        // Obtener los valores de los campos del formulario
        const email = $("#formLogin [name='email']").val();
        const pass = $("#formLogin [name='pass']").val();

        $.ajax({
            url: '/home',
            type: 'POST',
            data: {
                email: email,
                pass: pass,
            },
            success: function (response) {
                $('#btnLogin').removeClass('is-loading');
                if (response.userNoExist) {
                    $('.msgUserNoExist').css('display', 'block');
                } else if (response.authSuccessful) {
                    window.location.href = '/home';
                } else if (response.error) {
                    alert("Error al conectar con la base de datos. Intentelo de nuevo");
                }
            },
            error: function (response) {
                alert('Error al procesar los datos')
            }
        })
    })
}

if ($('title').text() == 'EduETICA - Inicio') {
    document.addEventListener("DOMContentLoaded", () => {
        // Functions to open and close a modal
        function openModal($el) {
            $el.classList.add("is-active");
        }

        function closeModal($el) {
            $el.classList.remove("is-active");
        }

        function closeAllModals() {
            (document.querySelectorAll(".modal") || []).forEach(($modal) => {
                closeModal($modal);
            });
        }

        // Add a click event on buttons to open a specific modal
        (document.querySelectorAll(".js-modal-trigger") || []).forEach(
            ($trigger) => {
                const modal = $trigger.dataset.target;
                const $target = document.getElementById(modal);

                $trigger.addEventListener("click", () => {
                    openModal($target);
                });
            }
        );

        // Add a click event on various child elements to close the parent modal
        (
            document.querySelectorAll(
                ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
            ) || []
        ).forEach(($close) => {
            const $target = $close.closest(".modal");

            $close.addEventListener("click", () => {
                closeModal($target);
            });
        });

        // Add a keyboard event to close all modals
        document.addEventListener("keydown", (event) => {
            const e = event || window.event;

            if (e.keyCode === 27) {
                // Escape key
                closeAllModals();
            }
        });
    });
}

if ($('title').text() == 'EduETICA - Inicio' && $('.menu-label').text() == 'Clases') {

    $(`
    <style>
        #continerLoad {
        opacity: 1;
        animation: load 1s ease-in infinite;
        }

        @keyframes load {
        50% {
            opacity: 0.2;
        }
        100% {
            opacity: 1;
        }
        }
    </style>
    `).appendTo('head');
    function generateList() {
        $('.btnClass').on('click', function () {
            $(`
            <div id="continerLoad">
                <h3 class="title is-3">Cargando</h3>
            </div>
            `).appendTo("#dataTeacher");
            let value = $(this).data('value');
            $.ajax({
                url: '/generateList',
                type: 'POST',
                data: {
                    idClass: value
                },
                success: function (response) {
                    $('#continerLoad').remove();
                    if ($('#containerTable').length) {
                        $('#containerTable').remove();
                    }
                    $(`
                    <div id="containerTable">
                        <h3 class="title is-3">El codigo de esta clase es ${value}</h3>
                        <button class="button is-info btnPrint mb-3">Imprimir excel</button>
                        <table class="table is-hoverable is-striped is-fullwidth is-bordered tableData">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Cedula</th>
                                    <th>Puntaje</th>
                                    <th>Modulos Completados</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${generateDataStudents(response.result)}
                            </tbody>
                        </table>
                    </div>
                    `).appendTo('#dataTeacher');
                    $('.btnPrint').on('click', ()=>{
                        $('.tableData').tblToExcel();
                    });
                },
                error: function (response) {
                    alert('Error al procesar los datos')
                }
            })
        });
    }

    function generateDataStudents(value) {
        let result = '';
        value.forEach(element => {
            result += `
            <tr>
                <td>${element.name}</td>
                <td>${element.surname}</td>
                <td>${element.id}</td>
                <td>${element.score}</td>
                <td>${element.mods_completed}</td>
            </tr>
            `;
        });
        return result;
    }

    function deleteClass() {
        $(".btnDelete").on("click", function () {
            let value = $(this).val();
            $(`
            <div class="contanerMessage">
                <div class="notification is-danger" id="msgDelteClass">
                    Esta a punto de eliminar una clase. Si continua
                    <strong>se perdera toda la iformacion de esta clase</strong> y los alumnos
                    que tenian agregada esta clase se les eliminara y no podran acceder a ella.
                    <div class="buttons mt-4 is-justify-content-center">
                        <div class="button is-warning" id="btnAccept">Eliminar</div>
                        <div class="button is-primary" id="btnCancel">Cancelar</div>
                    </div>
                </div>
            </div>
            `).appendTo("body");
            $('#btnCancel').on('click', () => {
                $('.contanerMessage').remove();
            });
            $('#btnAccept').on('click', () => {
                $('#btnAccept').addClass('is-loading');
                $.ajax({
                    url: '/deleteClass',
                    type: 'POST',
                    data: {
                        value: value
                    },
                    success: function (response) {
                        $('#btnAccept').removeClass('is-loading');
                        updateClasses(response.result);
                        $('.contanerMessage').remove();
                    },
                    error: function (response) {
                        alert('Error al procesar los datos')
                    }
                })
            });

        });
        generateList();
    }
    deleteClass();

    function updateClasses(result) {
        $('#container-list').empty();
        result.forEach(element => {
            $(`
                <li class="item-class">
                    <button class="delete btnDelete" value="${element.id}"></button>
                    <a class="btnClass" data-value="${element.id}">${element.name}</a>
                </li>
            `).appendTo("#container-list");
        });
        deleteClass();
    }

    $("#formCreateClass").on("submit", function (e) {
        e.preventDefault();
        $('#btnCreate').addClass('is-loading');
        const nameClass = $("#formCreateClass [name='nameClass']").val();
        $.ajax({
            url: '/createClass',
            type: 'POST',
            data: {
                nameClass: nameClass
            },
            success: function (response) {
                $('#btnCreate').removeClass('is-loading');
                if (response.classCreated) {
                    $('#msgClassCreated').css('display', 'block');
                    setTimeout(() => {
                        $('#msgClassCreated').css('display', 'none');
                    }, 3000);
                    updateClasses(response.result);
                }
            },
            error: function (response) {
                alert('Error al procesar los datos')
            }
        })
    });
}

if ($('title').text() == 'EduETICA - Inicio' && $('.menu-label').text() == 'Modulos') {
    $("#formAddClass").on("submit", function (e) {
        e.preventDefault();
        $('#btnAdd').addClass('is-loading');
        const codeClass = $("#formAddClass [name='codeClass']").val();
        $.ajax({
            url: '/addClass',
            type: 'POST',
            data: {
                codeClass: codeClass
            },
            success: function (response) {
                $('#btnAdd').removeClass('is-loading');
                if (response.error) {
                    alert('Error. El codigo de la clase no existe. Verifique y vuelva a intentarlo');
                } else if (response.classAdd) {
                    $(`
                    <div class="notification is-success" id="msgClassAdd">
                        La clase se agrego correctamente
                    </div>
                    `).appendTo("body");
                    $('.modal').remove();
                    setTimeout(() => {
                        $('#msgClassAdd').remove();
                        window.location.href = '/home';
                    }, 1800);
                }
            },
            error: function (response) {
                alert('Error al procesar los datos')
            }
        })
    })
    $('#leaveClass').on('click', () => {
        $(`
            <div class="contanerMessage">
                <div class="notification is-danger" id="msgDelteClass">
                    Esta a punto de salir de la clase. Si continua
                    <strong>se perdera toda su iformacion de esta clase</strong> y no
                    aparecera en el listado del profesor que creo esta clase.
                    <div class="buttons mt-4 is-justify-content-center">
                        <div class="button is-warning" id="btnAccept">Eliminar</div>
                        <div class="button is-primary" id="btnCancel">Cancelar</div>
                    </div>
                </div>
            </div>
            `).appendTo("body");
        $('#btnCancel').on('click', () => {
            $('.contanerMessage').remove();
        });
        $('#btnAccept').on('click', () => {
            $.ajax({
                url: '/leaveClass',
                type: 'POST',
                success: function (response) {
                    if (response.result) {
                        window.location.href = '/home';
                    } else if (response.error) {
                        alert('Error al procesar los datos');
                    }

                },
                error: function (response) {
                    alert('Error al procesar los datos')
                }
            })
        });
    });
}