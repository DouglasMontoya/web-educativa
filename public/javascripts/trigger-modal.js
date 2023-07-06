
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

if (document.cookie.includes("session=true") && getCookie('tabsClose') == '0') {
    window.location.href = "/home";
} else {
    document.cookie = "session=true";
    document.cookie = "tabsClose=0";
}

window.addEventListener("beforeunload", function () {
    document.cookie = "tabsClose=1";
});

document.addEventListener('DOMContentLoaded', () => {

    function openModal($el) {
        $el.classList.add('is-active');
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener('click', () => {
            window.scrollTo(0, 0);
            openModal($target);
        });
    });

    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    document.addEventListener('keydown', (event) => {
        const e = event || window.event;

        if (e.keyCode === 27) {
            closeAllModals();
        }
    });
});