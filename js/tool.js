// -------------------------------------
// FIREBASE CONSTANTS
// -------------------------------------
const database = firebase.database();
const auth = firebase.auth();

// -------------------------------------
// DECLARATIONS
// -------------------------------------
const logout = document.getElementById('logout');
const start = document.getElementById('start__tool');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal__content');
const bigCard = document.querySelector('.card__big');
const acceptBtn = document.getElementById('acceptBtn');
const backBtn = document.getElementById('backBtn');


// -------------------------------------
// EVENTS
// -------------------------------------
logout.addEventListener('click', () => {

    auth.signOut().then(

        () => {
            window.location.href = './login.html';
        }

    ).catch(
        (error) => {
            alert(error.message);
        }
    );

});

backBtn.addEventListener('click', handleCloseModal);
acceptBtn.addEventListener('click', () => {

    bigCard.style.opacity = '0';
    handleCloseModal();
    let termsAndConditions = true;
    console.log('Holaaa');
    firebase.database().ref('users/' + loggedUser.id).set({...loggedUser, termsAndConditions }).then(
        () => {
            window.location.href = './tool-menu.html';
        }
    );

});

start.addEventListener('click', () => {
    handleOpenModal();
});


function handleOpenModal() {

    document.body.style.overflow = 'hidden';
    modal.style.display = 'block';
    setTimeout(handleModalAppear, 15);


}

function handleCloseModal() {
    modal.style.opacity = 0;
    modalContent.style.transform = 'translate(0px, -500px)';
    document.body.style.overflow = 'hidden scroll';
    document.body.style.overflowX = 'hidden';
    setTimeout(function() {
        modal.style.display = 'none';
    }, 500);
}

function handleModalAppear() {
    modal.style.opacity = 1;
    modalContent.style.transform = 'translate(0px, 0px)';
}

const goToMenu = () => {
    window.location = './tool-menu.html';
}