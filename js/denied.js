// -------------------------------------
// FIREBASE CONSTANTS
// -------------------------------------
const database = firebase.database();
const auth = firebase.auth();


// -------------------------------------
// DECLARATIONS
// -------------------------------------
const logoutButton = document.getElementById('denied__logout');

// -------------------------------------
// EVENTS
// -------------------------------------
logoutButton.addEventListener('click', () => {

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


// -------------------------------------
// USER AUTHENTICATION
// -------------------------------------
auth.onAuthStateChanged(

    (user) => {

        if (user == null) {
            window.location.href = 'login.html';
        }

    }

);