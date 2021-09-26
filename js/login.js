// -------------------------------------
// FIREBASE CONSTANTS
// -------------------------------------
const database = firebase.database();
const auth = firebase.auth();

// -------------------------------------
// DECLARATIONS
// -------------------------------------
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login");
const signupButton = document.getElementById("signup");
let flag = false;

// -------------------------------------
// USER AUTHENTICATION
// -------------------------------------
auth.onAuthStateChanged(
    (user) => {

        if (user !== null) {

            firebase.database().ref('users/' + user.uid).once('value').then((snapshot) => {
                currentUser = snapshot.val();

                if (currentUser) {
                    if (currentUser.admin) {

                        window.location.href = './admin.html';
                        password.value = '';
                        email.value = '';

                    } else if (currentUser.accepted) {

                        if (!currentUser.termsAndCoditions)
                            window.location.href = './tool.html';
                        else
                            window.location.href = './tool-menu.html';
                    } else {
                        window.location.href = 'denied.html';
                    }
                }





            });



        }

    }
);

// -------------------------------------
// EVENTS
// -------------------------------------
loginButton.addEventListener('click', () => {

    let emailValue = emailInput.value;
    let passwordValue = passwordInput.value;

    if (emailValue != '' && passwordValue != '') {

        auth.signInWithEmailAndPassword(emailValue, passwordValue).then(

            (data) => {
                setInterval(() => {

                    if (!currentUser) {
                        window.location.href = 'notfound.html';
                    }

                }, 2000);


            }

        ).catch(

            (error) => {

                alert(error.message)
                password.value = '';
                email.value = '';

            }

        );

    } else {
        alert('Por favor, digite todos los campos para iniciar sesión');
    }

});



signupButton.addEventListener('click', () => {
    window.location.href = "./signup.html"
});