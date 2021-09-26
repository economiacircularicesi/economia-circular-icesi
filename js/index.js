// -------------------------------------
// FIREBASE CONSTANTS
// -------------------------------------
const database = firebase.database();
const auth = firebase.auth();

// -------------------------------------
// DECLARATIONS
// -------------------------------------
const logoutButton = document.getElementById("logout");

// -------------------------------------
// USER AUTHENTICATION
// -------------------------------------
auth.onAuthStateChanged(
    (user) => {

        console.log(user);
        if (user !== null) {

            firebase.database().ref('users/' + user.uid).once('value').then((snapshot) => {
                currentUser = snapshot.val();
                if (currentUser.admin) {

                    window.location.href = './admin.html';
                    password.value = '';
                    email.value = '';

                } else if (currentUser.accepted) {


                    window.location.href = './tool.html';
                    if (currentUser.termsAndCoditions)
                        window.location.href = './tool.html';
                    else
                        window.location.href = './tool-menu.html';

                } else {
                    window.location.href = 'denied.html';
                }
            });



        } else {
            window.location.href = './login.html';
        }

    }
);