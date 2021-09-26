// -------------------------------------
// FIREBASE CONSTANTS
// -------------------------------------
const database = firebase.database();
const auth = firebase.auth();

const logoutButton = document.getElementById('logout');

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