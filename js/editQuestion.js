const kindOfQuestion = document.querySelector('.kindofquestionType');
const statmentTxtArea = document.querySelector('.question_statment');
const yesRdoBtn = document.getElementById('yes');
const noRdoBtn = document.getElementById('no');
const yesJustify = document.getElementById('yesJustify');
const noJustify = document.getElementById('noJustify');
const questionHint = document.querySelector('.questionHint');
const optionContainer = document.querySelector('.optionscontainer');
const addQuestionBtn = document.querySelector('.add_question');
const activitiesCheckBoxs = document.querySelectorAll('.activity');
const addHint = document.querySelector('.addHint');
const removeHint = document.querySelector('.removeHint');

const error = document.querySelector('.dataform__error');
let hint;

let counter;

const isAdmin = () => {
    if (!loggedUser.admin) {
        window.location.href = './index.html';
    }
}



const params = new URLSearchParams(location.search);
const id = params.get('idQuestion');
if (!id) {
    location.href = './404.html';
}

let questionToEdit;
const questionsLoadFinished = () => {

    let indexToEdit = searchQuestionsInArrayById2(id, questions);
    questionToEdit = questions[indexToEdit];

    console.log(questionToEdit);
    loadQuestionToEdit();
    let container = document.querySelector('.loading__container');
    container.style.visibility = 'hidden';
    container.style.opacity = 0;


}

const loadQuestionToEdit = () => {

    let activityUpperCase = questionToEdit.activities[0];
    let kindOfQuestionString = questionToEdit.kindOfQuestion;
    let statementString = questionToEdit.statment;
    let optionsArray = questionToEdit.options;
    let justifyBoolean = questionToEdit.justify;
    let infoString = questionToEdit.info;

    let activity = activityUpperCase.toLowerCase();
    document.querySelector('.' + activity).checked = true;
    kindOfQuestion.value = kindOfQuestionString;
    statmentTxtArea.value = statementString;

    counter = optionsArray.length;

    if (justifyBoolean) {
        yesRdoBtn.checked = true;
    } else {
        noRdoBtn.checked = true;
    }

    if (infoString === "") {
        noJustify.checked = true;
    } else {
        yesJustify.checked = true;
        questionHint.value = infoString;
        questionHint.classList.remove('hidden');
    }


    renderOptions();


    for (let i = 0; i < counter; i++) {
        console.log('.o' + i);
        let option = document.getElementById('o' + i);
        let input = option.querySelector('.option_content');
        console.log(input);

        input.value = optionsArray[i].statment;
    }

    let values = document.querySelectorAll('.values');
    values.forEach((e, i) => {

            console.log(questionToEdit.options[i]);
            e.value = questionToEdit.options[i].type;

        }

    );




}

const renderOptions = () => {

    html = '';
    let localCounter = 0;
    while (localCounter < counter) {

        html += renderMultipleOption('', localCounter);

        localCounter++;
    }


    html += '<button class="dataform__option--add">+</button>'

    optionContainer.innerHTML = html;

    xButtons = document.querySelectorAll('.x');
    let limit = xButtons.length;

    xButtons.forEach((xButton) => {


        xButton.addEventListener('click', () => {


            if (counter > 1) {

                let id = xButton.parentNode.id;
                let div = document.getElementById(id);

                id = parseFloat(id.split('o')[1]);
                counter--;

                console.log(div);
                optionContainer.removeChild(div);

                for (let i = (id + 1); i < limit; i++) {


                    console.log(i);
                    let currentDiv = document.getElementById('o' + (i) + '');

                    if (currentDiv) {
                        currentDiv.setAttribute('id', 'o' + (i - 1) + '');
                        let p = currentDiv.querySelector('.dataform__row--text');
                        p.innerHTML = (i);
                    }


                }
            }

        });

    });

    buttonAddOption = document.querySelector('.dataform__option--add');

    //Add a new option, save the input values ​​and then overwrite the default values
    buttonAddOption.addEventListener('click', () => {
        counter++;

        values = [];
        optionsStatment = [];

        let vals = document.querySelectorAll('.values');
        vals.forEach((value) => {
            values.push(value.value);
        });

        let statements = document.querySelectorAll('.option_content');
        statements.forEach((value) => {
            optionsStatment.push(value.value);
        });



        renderPred();


        vals = document.querySelectorAll('.values');
        statements = document.querySelectorAll('.option_content');



        let i = 0;
        vals.forEach((val) => {


            val.value = values[i];

            if (i >= (vals.length - 1)) {
                val.value = '';
            }
            i++;
        });

        i = 0;

        statements.forEach((val) => {

            if (i < optionsStatment.length) {
                val.value = optionsStatment[i];
            } else {
                val.value = '';
            }


            i++
        });

    });
}

renderMultipleOption = (text, index) => {

    let textClass = '';

    if (index > 8) {
        textClass = 'dataform__option--input--t';
    }

    let div =
        `
        <div id="o${index}" class="dataform__option">
        <p class="text dataform__option--text dataform__row--text">${index+1}</p> <input  class="dataform__select--inner dataform__option--input ${textClass} option_content"><input  class="dataform__select--inner dataform__option--input ${textClass} option_hint values" placeholder="Pista"><button class="dataform__option--button x">X</button>
        </div>
    
    
    `;

    return div;

}

renderPred = () => {


    html = '';
    let localCounter = 0;
    while (localCounter < counter) {

        html += renderMultipleOption('', localCounter);

        localCounter++;
    }


    html += '<button class="dataform__option--add">+</button>'

    optionContainer.innerHTML = html;

    xButtons = document.querySelectorAll('.x');
    let limit = xButtons.length;

    xButtons.forEach((xButton) => {


        xButton.addEventListener('click', () => {
            console.log('hOLAAAA');

            if (counter > 1) {

                let id = xButton.parentNode.id;
                let div = document.getElementById(id);

                id = parseFloat(id.split('o')[1]);
                counter--;


                optionContainer.removeChild(div);

                for (let i = (id + 1); i < limit; i++) {


                    console.log(i);
                    let currentDiv = document.getElementById('o' + (i) + '');

                    if (currentDiv) {
                        currentDiv.setAttribute('id', 'o' + (i - 1) + '');
                        let p = currentDiv.querySelector('.dataform__row--text');
                        p.innerHTML = (i);
                    }


                }
            }

        });

    });

    buttonAddOption = document.querySelector('.dataform__option--add')

    //Add a new option, save the input values ​​and then overwrite the default values
    buttonAddOption.addEventListener('click', () => {
        counter++;

        values = [];
        optionsStatment = [];

        let vals = document.querySelectorAll('.values');
        vals.forEach((value) => {
            values.push(value.value);
        });

        let statements = document.querySelectorAll('.option_content');
        statements.forEach((value) => {
            optionsStatment.push(value.value);
        });



        renderPred();


        vals = document.querySelectorAll('.values');
        statements = document.querySelectorAll('.option_content');



        let i = 0;
        vals.forEach((val) => {


            val.value = values[i];

            if (i >= (vals.length - 1)) {
                val.value = '';
            }
            i++;
        });

        i = 0;

        statements.forEach((val) => {

            if (i < optionsStatment.length) {
                val.value = optionsStatment[i];
            } else {
                val.value = '';
            }


            i++
        });

    });

}

evaluateQuestion = () => {

    let errorMsg = '';

    let noOneActivitySelected = true;
    activitiesCheckBoxs.forEach(e => {

        console.log(e);
        if (e.checked)
            noOneActivitySelected = false;

    });

    if (noOneActivitySelected) {
        errorMsg += 'Debes seleccionar una actividad para la pregunta. \n';
    }

    if (kindOfQuestion.value == 'no_type') {
        errorMsg += 'Debes asignar un tipo a la pregunta. \n';
    }

    if (statmentTxtArea.value == '') {
        errorMsg += 'Debes agregar un enunciado para registrar una pregunta. \n';
    }

    let options = document.querySelectorAll('.option_content');
    let stop = false;
    options.forEach((val) => {
        if (val.value == '' && !stop) {
            errorMsg += 'Todas las opciones deben tener un enunciado para registrar una pregunta. \n';
            stop = true;
        }
    });

    stop = false;



    if (!yesRdoBtn.checked && !noRdoBtn.checked) {
        errorMsg += 'Debes especificar la justificación abierta de la pregunta \n';
    }


    if (hint) {
        if (!questionHint.value) {
            errorMsg += 'Debes añadir una pista para la pregunta \n';
        }
    }

    error.innerText = errorMsg;

    if (errorMsg == '') {
        return true;
    } else {
        return false;
    }


}

function handleAddQuestion() {


    if (evaluateQuestion()) {


        let kof = document.querySelector('.kindofquestionType').value;
        let localStatment = statmentTxtArea.value;
        let localJustify;
        let hintText = questionHint.value;
        console.log(hintText);

        if (yesRdoBtn.checked) {
            localJustify = true;
        } else if (noRdoBtn.checked) {
            localJustify = false;
        }

        let valuesCounter = 0;
        let localOptions = [];
        vals = document.querySelectorAll('.values');
        var options = document.querySelectorAll('.option_content');

        options.forEach((val, i) => {



            let option = {
                statment: val.value,
                type: vals[i].value
            }

            valuesCounter++;
            localOptions.push(option);
        });




        let ref = database.ref('questions/' + id);

        let activities = [];


        activitiesCheckBoxs.forEach((p) => {

            if (p.checked) {
                activities.push(p.value);
            }

        });

        let question = {
            id: id,
            kindOfQuestion: kof,
            statment: localStatment,
            justify: localJustify,
            options: localOptions,
            activities,
            info: hintText,
            father: true

        }

        ref.set(question).then(
            () => {
                window.location.href = './form.html';
            }
        ).catch((error) => {
            console.log(error);
        });

    }

}

addQuestionBtn.addEventListener('click', handleAddQuestion);

addHint.addEventListener('click', () => {
    questionHint.classList.remove('hidden');
    hint = true;
});

removeHint.addEventListener('click', () => {
    questionHint.classList.add('hidden');
    hint = false;
});