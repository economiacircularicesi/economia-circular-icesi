const userName = document.querySelector('.userName');
const userEmail = document.querySelector('.userEmail');
const userCompany = document.querySelector('.userCompany');
const pdfButton = document.querySelector('.pdfButton');
const questionaryButton = document.querySelector('.questionaryButton');
const columnLeft = document.querySelector('.column__left');

let ableQuestionaryBtn = false;

pdfButton.addEventListener('click', () => {
    window.open('https://firebasestorage.googleapis.com/v0/b/economia-circular-icesi.appspot.com/o/GuiaDeUsuario%20copia_compressed.pdf?alt=media&token=7ec26af0-7426-4928-be4f-d31ed5ae40f2', '_blank')
});

questionaryButton.addEventListener('click', () => {

    if (ableQuestionaryBtn)
        window.location.href = './questionary.html';
});


const updateMenuUser = () => {

    ableQuestionaryBtn = true;
    console.log(loggedUser);
    if (loggedUser.results) {
        ableQuestionaryBtn = false;
        questionaryButton.classList.add('noHover');
        questionaryButton.classList.add('pressed');
    }

    userName.innerText = loggedUser.name + ' ' + loggedUser.lastName;
    userEmail.innerText = loggedUser.email;
    userCompany.innerText = loggedUser.company;


    if (loggedUser.admin) {
        let button = document.createElement('button');
        button.classList.add('button');
        button.classList.add('form__button');
        button.innerText = 'Volver a administrador';
        columnLeft.appendChild(button);

        button.addEventListener('click', () => {
            window.location.href = './admin.html';
        });

    }


}