'use strict'
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