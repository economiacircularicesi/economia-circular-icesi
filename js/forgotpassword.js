// -------------------------------------
// FIREBASE CONSTANTS
// -------------------------------------
const database = firebase.database();
const auth = firebase.auth();

// -------------------------------------
// DECLARATIONS
// -------------------------------------
const sendButton = document.getElementById("send");
const emailInput = document.getElementById("email");

sendButton.addEventListener('click', () => {

    let emailValue = emailInput.value;

    if (emailValue != '') {

        auth.sendPasswordResetEmail(emailValue).then(
            () => {
                alert("Email de recuperacion enviado");
                window.location.href = "./login.html"
            }
        ).catch(
            (console) => {
                alert(error);
            }
        );

    } else {
        alert("Por favor digite su correo electrónico para continuar");
    }

});