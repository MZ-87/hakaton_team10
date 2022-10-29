'use strict'
// счетчик обратного времени
timeend = new Date();
timeend = new Date(timeend.getFullYear() + 1, 0, 1);

function time() {
    today = new Date();
    today = Math.floor((timeend - today) / 1000);
    today = Math.floor(today / 60);
    // if (tsec < 10)
    //     tsec = '0' + tsec;
    tmin = today % 60;
    today = Math.floor(today / 60);
    if (tmin < 10)
        tmin = '0' + tmin;
    thour = today % 24;
    today = Math.floor(today / 24);
    timestr = today + " дней " + thour + " часов " + tmin + " минут ";
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

document.querySelector('.sendBtn').addEventListener('click', (e) => {
    e.preventDefault();

    fetch('https://httpbin.org/post', {
            method: 'POST',
            body: new FormData(questionlist)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
})