const fileInput = document.querySelector('.file');
const dateLabel = document.querySelector('.lastUpdate');
const matrixName = document.querySelector('.matrixName');
const downloadMatrixBtn = document.querySelector('.downloadMatrixBtn');
const MATRIX_REF = database.ref('matrices/P-A');


let matrixPA;
let matrixNameTxt;
MATRIX_REF.on('value', (snapshot) => {

    const data = snapshot.val();


    matrixName.innerText = 'Matriz relación actividades y principios: ' + data.name;
    dateLabel.innerHTML = 'Ultima actualización <br>' + data.date;
    matrixNameTxt = data.name;
    matrixPA = data.matrix;



});


let matrixFileName;




const readFile = (evt) => {



    let file = evt.target.files[0];
    matrixFileName = file.name;
    let reader = new FileReader();

    if (file) {
        reader.readAsText(file);
        reader.onload = (evt) => {
            translateMatrix(evt.target.result);
        }
    }
}

const translateMatrix = (matrixTxt) => {


    let rows = matrixTxt.split('\n');
    let matrix = [];
    rows.forEach(row => {

        let columns = row.split(',');
        if (columns[0].length > 1) {

            let matrixRow = [];
            columns.forEach(column => {

                if (!(column.charAt() === 'A')) {

                    if (!(column.charAt() === 'P'))
                        matrixRow.push(column.charAt());

                }

            });

            matrix.push(matrixRow);

        }

    });


    loadMatrix(matrix);

}

const loadMatrix = (matrix) => {


    let date = new Date().toLocaleString();
    database.ref('matrices/P-A').set({ matrix, date, name: matrixFileName }).then(() => {

    });


}




const downloadMatrix = () => {

    let matrixToPrint = [];

    let rowOne = ',A1,A2,A3,A4,A5,A6,A7'.split(',');
    matrixToPrint.push(rowOne);
    let pCounter = 1;
    matrixPA.forEach(row => {
        let rowToPrint = [];
        rowToPrint.push('P' + pCounter);
        pCounter++;

        row.forEach(e => {
            rowToPrint.push(e);
        });

        matrixToPrint.push(rowToPrint);

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
    link.setAttribute("download", matrixNameTxt.split('.')[0] + ".csv");
    document.body.appendChild(link); // Required for FF
    link.click();

}

downloadMatrixBtn.addEventListener('click', downloadMatrix);

fileInput.addEventListener('change', readFile, false);

const getPrinciples = (activity) => {

    let a = parseInt(activity.substr(1, activity.length)) - 1;

    let principles = '';

    let counterP = 1;
    let flag = false;
    matrixPA.forEach(row => {

        if (row[a] === '1') {
            if (principles === '') {
                flag = true;
                principles += '(P' + counterP + ' ';
            } else if (counterP < matrixPA.length) {
                principles += ', P' + counterP;
            }
        }




        counterP++;
    });

    if (flag)
        principles += ')';

    return principles;
}