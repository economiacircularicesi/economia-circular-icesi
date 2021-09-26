const usersContainer = document.querySelector('.results__container');
let users = new Map();


const isAdmin = () => {
    if (!loggedUser.admin) {
        window.location.href = './index.html';
    } else {

        downloadUsers();

    }

}

const downloadUsers = () => {


    let ref = database.ref('users').once('value', function(data) {
        data.forEach(element => {

            let user = element.val();
            if (user.results) {
                users.set(user.id, user);
            }

        });

        renderUsers();

    });


}

const renderUsers = () => {

    let counter = 1;
    for (var [key, value] of users) {

        let rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        rowDiv.classList.add('row--results');

        let date = new Date(value.resultsDate);

        let noTop = 'row--noTop';

        if (counter > 1) {
            rowDiv.classList.add(noTop);
        }

        let html = `<div>${counter}</div><div>${value.name} ${value.lastName}</div><div>${value.company}</div><div>${date.getDay()+'/'+date.getMonth()+'/'+date.getFullYear()}</div><button class="results__button">Descargar</button>`;

        rowDiv.innerHTML = html;

        rowDiv.querySelector('.results__button').addEventListener('click', () => {
            //console.log(value.results);
            //console.log(questions);
            downloadResults(value.results, value.company, value.name, value.lastName);
        });

        usersContainer.appendChild(rowDiv);
        counter++;

    }

}

const downloadResults = (results, company, name, lastName) => {

    let matrixToPrint = [];

    let firstRow = 'ENUNCIADO,RESPUESTAS,JUSTIFICACIÓN,ACTIVIDAD,PUNTAJE'.split(',');
    matrixToPrint.push(firstRow);

    results.forEach((e) => {

        let currentQuestion = questions[searchQuestionsInArrayById2(e[0], questions)];

        let currentRow = [];
        currentRow.push(currentQuestion.statment);

        let answers = '';

        let answersArray = e[1];

        for (let i = 0; i < answersArray.length; i++) {
            if (i + 1 == answersArray.length) {
                answers += answersArray[i];
            } else {
                answers += answersArray[i] + ';';
            }
        }

        currentRow.push(answers);

        if (e[2]) {
            currentRow.push(e[2]);
        } else {
            currentRow.push(' ');
        }

        currentRow.push(currentQuestion.activities[0]);
        currentRow.push(' ');

        matrixToPrint.push(currentRow);

    });

    let csvContent = "data:text/csv;charset=utf-8,";
    console.log(matrixToPrint);

    matrixToPrint.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", name + lastName + '_' + company + ".csv");
    document.body.appendChild(link); // Required for FF
    link.click();

}