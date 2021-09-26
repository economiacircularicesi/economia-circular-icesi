const database = firebase.database();
const auth = firebase.auth();

auth.onAuthStateChanged(
    (user) => {

        if (user !== null) {

            /*
            firebase.database().ref('users/' + user.uid).once('value').then((snapshot) => {
                currentUser = snapshot.val();
                if (currentUser.admin) {

                    window.location.href = 'admin.html';
                    password.value = '';
                    email.value = '';

                } else if (currentUser.accepted) {
                    window.location.href = 'tool.html';
                } else {
                    window.location.href = 'denied.html';
                }
            });*/



        } else {
            window.location.href = './login.html';
        }

    }
);

if (logout) {
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
}

let questions = [];


database.ref('questions').on('value', (elements) => {
    elements.forEach(e => {

        questions.push(e.val());
    });
    if (typeof questionsLoadFinished === 'function') {
        questionsLoadFinished();
    }


});