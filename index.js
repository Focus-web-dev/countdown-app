/* CLOSE POPUP
======================*/
const popup = document.getElementById('popup');

[document.getElementById('close-popup'), document.getElementById('crosshair-close-popup')].forEach((el) => {
    el.addEventListener('click', () => {
        popup.classList.add('invise');
    })
})

/* DATE
==============*/

let targetDate = '2022-12-31 00:00:00'; //set the target date (format: 'YYYY-MM-DD HH:MM:SS')

const daysElement = document.getElementById('days-element');
const hoursElement = document.getElementById('hours-element');
const minutesElement = document.getElementById('minutes-element');
const secondsElement = document.getElementById('seconds-element');

let seconds = Math.floor((new Date(`${targetDate}`) - new Date()) / 1000);

function timer () {
    seconds = Math.floor((new Date(`${targetDate}`) - new Date()) / 1000);

    daysElement.innerHTML = Math.floor(seconds / 86400);
    seconds = seconds % 86400;

    Math.floor(seconds / 3600) <= 9 ?  hoursElement.innerHTML = `0${Math.floor(seconds / 3600)}` : hoursElement.innerHTML = `${Math.floor(seconds / 3600)}`;
    seconds = seconds % 3600;

    Math.floor(seconds / 60) <= 9 ? minutesElement.innerHTML = `0${Math.floor(seconds / 60)}` : minutesElement.innerHTML = `${Math.floor(seconds / 60)}`;
    seconds = seconds % 60;

    seconds <= 9 ? secondsElement.innerHTML = `0${seconds}` : secondsElement.innerHTML = `${seconds}`;
}

if (seconds > 0) {
    setInterval(timer, 1000);
}

/* FORM
============*/

$("#mail-form").submit(function(e) {
    e.preventDefault();

    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    if (EMAIL_REGEXP.test($('#email').val())) {

        $('#email').removeClass('error');

        $(this).prop('disabled', true);

        $.ajax({
            url: 'ajax/mail.php',
            type: 'POST',
            cache: false,
            data: $(this).serialize(),
            success: function (data) {
                if (!data) {
                    alert('Error!');
                }
                else {
                    popup.classList.remove('invise');
                    $('#mail-form').trigger("reset");
                }
                $(this).prop('disabled', false);
            },
            error: function () {
                alert('Error!');
                $(this).prop('disabled', false);
            }      
        })
    }

    else {
        $('#email').addClass('error');
    }
}) 