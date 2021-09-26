// -------------------------------------
// FIREBASE CONSTANTS
// -------------------------------------
const database = firebase.database();
const auth = firebase.auth();

// -------------------------------------
// DECLARATIONS
// -------------------------------------
const nameInput = document.getElementById('name');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const positionInput = document.getElementById('position');
const companyInput = document.getElementById('company');
const passwordInput = document.getElementById('password');
const rePasswordInput = document.getElementById('repassword');
const yesCheckBox = document.getElementById('yes');
const noCheckBox = document.getElementById('no');
const signupButton = document.getElementById('signup');



// -------------------------------------
// USER AUTHENTICATION
// -------------------------------------
var isSigningUp = false;

auth.onAuthStateChanged(

    (user) => {

        if (user != null) {
            if (isSigningUp) {

                let nameValue = nameInput.value;
                let lastNameValue = lastNameInput.value;
                let emailValue = emailInput.value;
                let companyValue = companyInput.value;
                let positionValue = positionInput.value;
                let f = new Date();

                let userDatabase = {
                    admin: false,
                    accepted: false,
                    id: user.uid,
                    name: nameValue,
                    lastName: lastNameValue,
                    email: emailValue,
                    company: companyValue,
                    position: positionValue,
                    requestDate: f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear()
                }

                nameInput.value = '';
                lastNameInput.value = '';
                emailInput.value = '';
                companyInput.value = '';
                positionInput.value = '';
                passwordInput.value = '';
                rePasswordInput.value = '';

                database.ref('pending/' + userDatabase.id).set(userDatabase);
                database.ref('users/' + userDatabase.id).set(userDatabase).then(
                    () => {
                        window.location.href = './denied.html';
                    }
                );

            } else {

            }
        }
    }

);

// -------------------------------------
// EVENTS
// -------------------------------------
signupButton.addEventListener('click', () => {

    let name = nameInput.value;
    let lastName = lastNameInput.value;
    let email = emailInput.value;
    let company = companyInput.value;
    let position = positionInput.value;
    let password = passwordInput.value;
    let repassword = rePasswordInput.value;
    let checked = yesCheckBox.checked;

    if (name != '' && lastName != '' && email != '' && company != '' && position != '' && password != null && repassword != '') {

        if (password != repassword) {
            alert("Las contraseñas no son iguales");
        } else {

            if (checked) {

                isSigningUp = true;
                auth.createUserWithEmailAndPassword(email, password);

            } else {
                alert("Debes aceptar los terminos y condiciones y politicas de privacidad");
            }

        }

    } else {
        alert("Por favor digite todos los campos para completar el registro");
    }

});

yesCheckBox.addEventListener('click', () => {

    if (noCheckBox.checked) {
        noCheckBox.checked = false;
    }

});

noCheckBox.addEventListener('click', () => {

    if (yesCheckBox.checked) {
        yesCheckBox.checked = false;
    }

});