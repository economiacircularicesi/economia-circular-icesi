// -------------------------------------
// FIREBASE CONSTANTS
// -------------------------------------


// -------------------------------------
// DECLARATIONS
// -------------------------------------
const logoutButton = document.getElementById('logout');
const adminName = document.getElementById('adminName');
const adminEmail = document.getElementById('adminEmail');
const requestscontainer = document.getElementById('requestscontainer');
const acceptedcontainer = document.getElementById('acceptedcontainer');
const adminText = document.getElementById('textadmin');
const adminFormButton = document.querySelector('.buttom__form');
const results = document.querySelector('.results');


// -------------------------------------
// USER AUTHENTICATION
// -------------------------------------
auth.onAuthStateChanged(

    (user) => {

        if (user == null) {
            window.location.href = 'login.html';
        } else {

            database.ref('users/' + user.uid).once('value', function(data) {
                let userDb = data.val();
                adminName.innerHTML = userDb.name + ' ' + userDb.lastName;
                adminEmail.innerHTML = userDb.email;
                adminText.style.visibility = 'visible';
            });
        }

    }

);

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

// -------------------------------------
// READING
// -------------------------------------
database.ref('pending').on('value', function(data) {
    requestscontainer.innerHTML = '';
    let counter = 0;

    data.forEach(

        request => {

            let val = request.val();
            let requestQueue = new Request(val, counter);
            requestscontainer.appendChild(requestQueue.render());
            counter++;

        }

    );

});

database.ref('accepted').on('value', function(data) {
    acceptedcontainer.innerHTML = '';
    let counter = 0;

    data.forEach(

        accepted => {

            let val = accepted.val();
            let requestQueue = new Accepted(val, counter);
            acceptedcontainer.appendChild(requestQueue.render());
            counter++;

        }

    );

});




const downloadResultsMatrix = () => {
    let matrixToPrint = [];

    questions.forEach((e, i) => {

        let f = [];
        f.push(i + 1);
        f.push('');
        matrixToPrint.push(f);
        let row1 = [];
        row1.push('Pregunta');
        row1.push(e.statment);
        matrixToPrint.push(row1);
        e.results.forEach((o, io) => {
            let row = [];
            row.push('Opción: ' + io);
            row.push(e.options[io].statment);
            row.push(o);
            matrixToPrint.push(row);
        });

        if (e.justifications) {
            e.justifications.forEach((j, ij) => {
                let row = [];
                row.push(j[1]);
                row.push(j[2]);
                matrixToPrint.push(row);
            });
        }

    });

    let csvContent = "data:text/csv;charset=utf-8,";

    matrixToPrint.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", 'Resultados' + ".csv");
    document.body.appendChild(link); // Required for FF
    link.click();





}



results.addEventListener('click', () => {
    window.location.href = './results.html';
});

const isAdmin = () => {
    if (!loggedUser.admin) {
        window.location.href = './index.html';
    }
}