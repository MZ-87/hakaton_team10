'use strict'
// счетчик обратного времени
let timeend = new Date();
timeend = new Date(timeend.getFullYear() + 1, 0, 1);

function time() {
    let today = new Date();
    today = Math.floor((timeend - today) / 1000);
    today = Math.floor(today / 60);
    // if (tsec < 10)
    //     tsec = '0' + tsec;
    let tmin = today % 60;
    today = Math.floor(today / 60);
    if (tmin < 10)
        tmin = '0' + tmin;
    let thour = today % 24;
    today = Math.floor(today / 24);
    let timestr = today + " дней " + thour + " часов " + tmin + " минут ";
    document.getElementById('time').innerHTML = timestr;
    window.setTimeout(time, 1000);
}

//форма для открытки
class Card {
    constructor(senderName, accepterName, email, sex, greeting, comment) {
        this.senderName = senderName;
        this.accepterName = accepterName;
        this.email = email;
        this.sex = sex;
        this.greeting = greeting;
        this.comment = comment;
    }
}

//модальное окно
const openPopupButtons = document.querySelectorAll('.popup__open'); //кнопки-ссылки открытия
const closePopupButtons = document.querySelectorAll('.popup__close'); //кнопки-ссылки закрытия

for (let openPopupButton of openPopupButtons) {
    openPopupButton.addEventListener('click', (event) => {
        const popupName = openPopupButton.getAttribute('href').replace('#', '');
        const currentPopup = document.getElementById(popupName);
        popupOpen(currentPopup);

        event.preventDefault;
    })
}

for (let closePopupButton of closePopupButtons) {
    closePopupButton.addEventListener('click', (event) => {
        popupClose(event.target.closest('.popup'));
        event.preventDefault;
    })
}

const popupOpen = (currentPopup) => {
    if (currentPopup) {
        const popupActive = document.querySelector('.popup.open');

        if (popupActive) {
            popupClose(popupActive, false);
        }
    }
    currentPopup.classList.add('open');
    currentPopup.addEventListener('click', (event) => {
        if (!event.target.closest('.popup__content')) {
            popupClose(event.target.closest('.popup'));
        }
    })
}
const popupClose = (popupActive) => {
    popupActive.classList.remove('open');
}

//открытка
//отправка формы
document.querySelector('.sendBtn').addEventListener('click', (e) => {
    e.preventDefault();
    popupClose(e.target.closest('.popup'));

    fetch('https://httpbin.org/post', {
            method: 'POST',
            body: new FormData(popup__content)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.form.sex);
            if (data.form.sex = 'male') {
                console.log(data.form.sex);
                document.querySelector('.container-card').innerHTML = `
                            <h3>Дорогой <span>${data.form.accepterName}</span>!</h3>
                            <p>${data.form.comments}</p>
                            <p>${data.form.senderName}</p>
                            `;
            } else if (data.form.sex = 'female') {
                console.log(data.form.sex);
                document.querySelector('.container-card').innerHTML = `
                            <h3>Дорогая <span>${data.form.accepterName}</span></h3>
                            <p>${data.form.comments}</p>
                            <p>${data.form.senderName}</p>
                            `;
            };
            document.querySelector('.container-card').classList.add('hidden');
        })
        .catch(err => console.log(err));
})