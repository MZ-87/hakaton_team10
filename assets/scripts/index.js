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

document.querySelector('.saveBtn').addEventListener('click', (e) => {
    e.preventDefault();
    const senderName = document.querySelector('#senderName').value;
    const accepterName = document.querySelector('#accepterName').value;
    const email = document.querySelector('#email').value;
    const comment = document.querySelector('#comm').value;

    const sexAll = document.getElementsByName('sex');
    let sex = 0;
    sexAll.forEach(element => {
        if (element.checked) {
            sex = `${element.id}`;
        }
    })

    const greetAll = document.getElementsByName('greeting');
    let greeting = 0;
    greetAll.forEach(element => {
        if (element.checked) {
            greeting = `${element.value}`;
        }
    })

    let card = new Card(senderName, accepterName, email, sex, greeting, comment);

    console.log(card);
})

//отправка формы
document.querySelector('.sendBtn').addEventListener('click', (e) => {
    e.preventDefault();

    fetch('https://httpbin.org/post', {
            method: 'POST',
            body: new FormData(popup__content)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
})

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