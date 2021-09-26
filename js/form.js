// -------------------------------------
// FIREBASE CONSTANTS
// -------------------------------------
const kindOfQuestion = document.querySelector('.kindofquestion');
const optionContainer = document.querySelector('.optionscontainer');
const addQuestionBtn = document.querySelector('.add_question');
const statmentTxtArea = document.querySelector('.question_statment');
const yesRdoBtn = document.getElementById('yes');
const noRdoBtn = document.getElementById('no');
const error = document.querySelector('.dataform__error');
const activitiesCheckBoxs = document.querySelectorAll('.activity');
const previewActivity = document.querySelector('.preview_activity');
const label = document.querySelector('.label');
const questionsContainer = document.querySelector('.dataform__questionsContainer');
const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');
const newQuestionForm = document.querySelector('.newQuestion');
const associateQuestion = document.querySelector('.associateQuestion');
const idAssociateQuestion = document.querySelector('.id');
const removeHint = document.querySelector('.removeHint');
const addHint = document.querySelector('.addHint');
const questionHint = document.querySelector('.questionHint');
const labelError = document.querySelector('.assQstnError');
const assQstnContainer = document.querySelector('.renderAssQstn');
const assQstnStatment = document.querySelector('.dataform__assQstn--statment');
const assQstnOptions = document.querySelector('.dataform__assQstn--options');
const assQstnOptionSon = document.querySelector('.id2div');
const assQstnButton = document.querySelector('.associate');
const logoutButton = document.getElementById('logout');
const clearBtn = document.querySelector('.clearBtn');
const assQstnId2 = document.querySelector('.id2');
const sameIdsError = document.querySelector('.sameIdsError');
const type = document.querySelector('.kindofquestionType');
let buttonAddOption;
let values = [];
let optionsStatment = [];
let hints = [];
let hint;
let copySonQuestionId = false;
let assQstnButtonDisable = true;
let assQstnCurrentOptionIndex = [];


assQstnButton.classList.add('pressed');
assQstnButton.addEventListener('click', () => {

    if (!assQstnButtonDisable) {
        let idFather = idAssociateQuestion.value;
        let idSon = assQstnId2.value;

        console.log(idFather + ' ' + idSon + ' ');
        console.log(assQstnCurrentOptionIndex);
        console.log(questions);

        let fatherQuestion = questions[searchQuestionsInArrayById2(idFather, questions)];
        let sonQuestion = questions[searchQuestionsInArrayById2(idSon, questions)];
        sonQuestion.father = false;
        database.ref('questions/' + fatherQuestion.id).set({...fatherQuestion, idSon, assQstnCurrentOptionIndex }).then(() => {

            database.ref('questions/' + idSon).set(sonQuestion).then(() => {
                    clearBtn.click();
                }

            );

        });
    }


});

previewActivity.addEventListener('change', () => {
    askForQuestions();




});


let currentQuestions = null;

clearBtn.addEventListener('click', () => {
    assQstnContainer.classList.add('hidden');
    assQstnOptionSon.classList.add('hidden');
    assQstnButton.classList.add('hidden');
    assQstnButtonDisable = true;
    idAssociateQuestion.value = "";
    assQstnId2.value = '';
});

activitiesCheckBoxs.forEach((e) => {






    e.addEventListener('click', () => {
        let c = 1;

        while (c < 13) {
            const pLabelReminder = document.querySelector('.a' + c + 'Principles');
            pLabelReminder.classList.add('hidden');

            c++;

        }

        const activityIndex = e.value.substr(1, e.value.length);
        const pLabelReminder = document.querySelector('.a' + activityIndex + 'Principles');
        pLabelReminder.innerHTML = '<strong>' + getPrinciples('A' + activityIndex) + '</strong>';
        pLabelReminder.classList.remove('hidden');

    });

});

associateQuestion.addEventListener('change', () => {


    //let index = searchQuestionsInArrayById(associateQuestion.value);
    //renderAssQuestion(index);


});

renderAssQuestion = (index) => {

    assQstnOptionSon.classList.add('hidden');
    assQstnButton.classList.add('hidden');
    if (index != -1) {

        labelError.classList.add('hidden');
        assQstnContainer.classList.remove('hidden');
        let currentAssQstn = questions[index];
        assQstnOptions.innerHTML = '';
        assQstnStatment.innerText = '[Enunciado]' + currentAssQstn.statment;


        let optionIndex = 0;
        currentAssQstn.options.forEach((optn) => {

            let option = document.createElement('div');
            option.className = 'dataform__assQstn--optn';
            option.innerHTML = `<label><input type="checkbox" class="checked" id="optionIndex${optionIndex}">${optn.statment}</label>`;

            optionIndex++;
            /*
            let checked = option.querySelector('.checked');
            checked.addEventListener('click', () => {
                assQstnOptionSon.classList.remove('hidden');
                assQstnButton.classList.remove('hidden');
            });*/

            assQstnOptions.appendChild(option);

        });

        let checks = assQstnOptions.querySelectorAll('.checked');

        let chIndex = 0;
        checks.forEach((ch) => {
            ch.addEventListener('click', () => {



                if (!assQstnCurrentOptionIndex.includes(ch.id))
                    assQstnCurrentOptionIndex.push(ch.id);
                assQstnOptionSon.classList.remove('hidden');
                assQstnButton.classList.remove('hidden');
                let allUnchecked = true;
                checks.forEach((ch1) => {
                    if (ch1.checked) {
                        allUnchecked = false;

                    }
                });


                if (allUnchecked) {
                    assQstnOptionSon.classList.add('hidden');
                    assQstnButton.classList.add('hidden');
                    copySonQuestionId = false;
                }

            });


        });






    } else {
        labelError.classList.remove('hidden');
        assQstnContainer.classList.add('hidden');
    }
}



removeHint.addEventListener('click', () => {
    questionHint.classList.add('hidden');
    hint = false;
});

addHint.addEventListener('click', () => {
    questionHint.classList.remove('hidden');
    hint = true;
});

const multipleOption = '1';

let counter = 3;
let html;

leftBtn.addEventListener('click', () => {

    leftBtn.classList.remove('pressed');
    rightBtn.classList.add('pressed');

    newQuestionForm.classList.remove('hidden');
    associateQuestion.classList.add('hidden');

    const showAssociateQstn = document.querySelectorAll('.showAssociateQstn');

    showAssociateQstn.forEach(
        (elem) => {

            elem.classList.add('hidden');
        }
    );



});

rightBtn.addEventListener('click', () => {

    rightBtn.classList.remove('pressed');
    leftBtn.classList.add('pressed');

    newQuestionForm.classList.add('hidden');
    associateQuestion.classList.remove('hidden');
    sameIdsError.classList.add('hidden');
    assQstnButtonDisable = true;

    const showAssociateQstn = document.querySelectorAll('.showAssociateQstn');

    showAssociateQstn.forEach(
        (elem) => {
            elem.classList.remove('hidden');
        }
    );


});





askForQuestions = () => {
    let questions = null;
    reestartAjustQuestionsContainer();
    if (changeLabel()) {
        label.innerHTML = 'Cargando...';
        searchQuestionsByLevelAndActivity('', previewActivity.value);
    };




}

ajustQuestionsContainer = (questions) => {
    if (questions.length > 0) {
        label.classList.add('hidden');
        questionsContainer.classList.add('dataform__questionsContainer--pbottom');
    }
}

reestartAjustQuestionsContainer = () => {

    questionsContainer.innerHTML = '';
    questionsContainer.classList.remove('dataform__questionsContainer--pbottom');
}


changeLabelResult = (questions) => {
    if (questions) {
        if (questions.length == 0) {
            label.innerText = 'No se encontraron preguntas';
        } else {
            label.innerText = '';
        }

    }
}

changeLabel = () => {


    label.classList.remove('hidden');

    if (previewActivity.value != 'none') {
        label.innerText = 'Por favor seleccione una actividad para cargar las preguntas asociadas.';
        return true;
    } else if (previewActivity.value == 'none') {

        label.innerText = 'Por favor seleccione una actividad para cargar las preguntas asociadas.';
        return false;
    }

}



addQuestionBtn.addEventListener('click', handleAddQuestion);

//Uploads a new question to de database.
function handleAddQuestion() {




    if (evaluateQuestion()) {


        let kof = document.querySelector('.kindofquestionType').value;
        let localStatment = statmentTxtArea.value;
        let localJustify;
        let hintText = questionHint.value;

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



        let ref = database.ref('questions/').push();

        let activities = [];


        activitiesCheckBoxs.forEach((p) => {

            if (p.checked) {
                activities.push(p.value);
            }

        });

        let question = {
            id: ref.key,
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
                clearForm();
            }
        ).catch((error) => {
            console.log(error);
        });

    }

}

clearForm = () => {
    counter = 3;
    renderPred();
    addHint.checked = false;
    removeHint.checked = false;
    statmentTxtArea.value = '';
    yesRdoBtn.checked = false;
    document.querySelector('.kindofquestionType').value = "no_type";
    noRdoBtn.checked = false;
    error.innerText = '';
    questionHint.value = '';
    activitiesCheckBoxs.forEach((p) => {

        p.checked = false;

    });

}

//Render all questions to the default form.
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


            if (counter > 1) {

                let ID = xButton.parentNode.id;

                let div = document.getElementById(ID);


                let id = parseInt(ID.split('o')[1]);

                counter--;


                console.log('oe');

                optionContainer.removeChild(div);

                console.log(id + 1);
                console.log(limit);
                for (let i = (id + 1); i < limit; i++) {

                    console.log('>>>>>>>>>>>');
                    console.log(i);
                    let currentDiv = document.getElementById('o' + (i) + '');

                    if (currentDiv) {
                        currentDiv.setAttribute('id', 'o' + (i - 1) + '');
                        console.log(currentDiv);
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
        hints = [];


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



//Build an option in HTML
renderMultipleOption = (text, index) => {

    let textClass = '';

    console.log('index: ' + index);
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

//Determine if a question can be uploaded or not, throw the error if necessary
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

    if (type.value == 'no_type') {
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

renderQuestions = (questions) => {

    currentQuestions = questions;
    console.log(questions);
    questionsContainer.innerHTML = '';
    let html = '';
    let i = 0;

    let div = document.createElement('div');

    questions.forEach((q) => {


        i++;

        let info = 'hidden';

        if (q.info) {
            info = '';
        }

        let options = q.options;
        let optionsHtml = '';
        let textArea = ``;
        if (q.justify) {
            textArea = ` <textarea rows="4" cols="50" class="dataform__textarea dataform__textarea--question" placeholder="Por favor, justifique su respuesta"></textarea>`;
        }


        let optionIndex = 0;
        options.forEach((o, i) => {
            let hint = '';
            if (o.type !== "") {
                let popupusClass = 'popups' + i;
                let openHint = 'openHint' + i;
                let close = 'close' + i;
                hint = '<div class="dataform__icons"><img src="./images/info.png" class="info__icon ' + openHint + ' info__icon--noMargin"><div class="popup popups ' + popupusClass + ' hidden"><button class="popup__button ' + close + ' ">x</button><p class="popup__text">' + o.type + '</p></div></div>';
            }
            optionsHtml += `<div class="option__hint"> <input id="${optionIndex}" class="optionCheck" type="checkbox">${o.statment}<p>${hint}</p></div>`;
            optionIndex++;
        })


        let idString = `<p class="showAssociateQstn dataform__question--id hidden">${q.id}</p>`;


        let question = document.createElement('div');
        question.classList.add('dataform__question');
        question.classList.add('text');


        let principlesReminder = getPrinciples(q.activities[0]);

        question.innerHTML = `
               
                            <div class="dataform__question__row">
                  
                                <p class="dataform__question--statment"><strong>${i+'.</strong> '+q.statment+' <strong class="matrix__pReminder"><br>'+principlesReminder+'</strong>'}</p><img src="./images/copy.png" class="dataform__copyBtn showAssociateQstn hidden"><div class="dataform__icons"><img src="./images/info.png" class="info__icon ${info}"><div class="popup hidden"><button class="popup__button">x</button><p class="popup__text">${q.info}</p></div></div>
                            </div>
                                      ${idString }
                            ${optionsHtml}
                            
                            ${textArea}
                            <button class="dataform__question__deleteBtn deleteQuestionBtn"><strong>Eliminar</strong></button>
                            <a  class="dataform__question__deleteBtn dataform__question__editBtn editBtn"   href="./editQuestion.html?idQuestion=${q.id}"><strong>Editar</strong></a>
                     
                `;


        let optionsList = question.querySelectorAll('.optionCheck');
        let copyButton = question.querySelector('.dataform__copyBtn');
        let closeInfoButton = question.querySelector('.popup__button');
        let popup = question.querySelector('.popup');
        let openInfoButton = question.querySelector('.info__icon');
        let deleteQuestionBtn = question.querySelector('.deleteQuestionBtn');



        console.log('>>>>>>>>>>>>>>');
        options.forEach((e, i) => {
            let openHint = question.querySelector('.openHint' + i);

            if (openHint) {

                let popWindow = question.querySelector('.popups' + i);
                openHint.addEventListener('click', () => {
                    popWindow.classList.remove('hidden');

                });

                question.querySelector('.close' + i).addEventListener('click', () => {
                    popWindow.classList.add('hidden');
                });
            }
        });








        let confirmFlag = false;

        deleteQuestionBtn.addEventListener('click', () => {
            deleteQuestionBtn.classList.add('dataform__question__deleteBtn--confirm');
            deleteQuestionBtn.innerHTML = 'Confirmar';

            if (!confirmFlag) {
                confirmFlag = true;

                setTimeout(() => {
                    deleteQuestionBtn.classList.remove('dataform__question__deleteBtn--confirm');
                    deleteQuestionBtn.innerHTML = 'Eliminar';
                    confirmFlag = false;

                }, 3000);
            } else {

                console.log(q);
                let ref = database.ref('questions/' + q.id);
                ref.set(null);
                console.log(ref);
            }

        });



        openInfoButton.addEventListener('click', () => {
            popup.classList.remove('hidden');
        });

        closeInfoButton.addEventListener('click', () => {
            popup.classList.add('hidden');
        });

        copyButton.addEventListener('click', () => {

            if (!idAssociateQuestion.value) {
                idAssociateQuestion.value = q.id;
                assQstnCurrentOptionIndex = [];
                let index = searchQuestionsInArrayById2(q.id, questions);
                renderAssQuestion(index);
                copySonQuestionId = true;
            } else {

                console.log('-');
                console.log(assQstnId2.classList);
                if (copySonQuestionId) {
                    if (!assQstnOptionSon.classList.contains('hidden')) {
                        console.log('---');

                        if (q.id === idAssociateQuestion.value) {
                            sameIdsError.classList.remove('hidden');
                        } else {

                            assQstnButtonDisable = false;
                            assQstnButton.classList.remove('pressed');
                            assQstnId2.value = q.id;
                            sameIdsError.classList.add('hidden');
                        }
                    }


                }
            }


        });

        div.appendChild(question);

        switch (q.kindOfQuestion) {
            case 'multiple_choice':



                break;
            case 'multiple_choice_single_answer':
                verifyOneAnswer(optionsList);
                break;

            case 'multiple_choice_scale':
                verifyOneAnswer(optionsList);
                break;

        }





    });



    questionsContainer.appendChild(div);

}


verifyOneAnswer = (optionsList) => {
    optionsList.forEach((o) => {

        o.addEventListener("click", () => {


            let index = o.id;
            optionsList.forEach((optn) => {
                if (optn.id != index)
                    optn.checked = false;

            });

        });

    });

}

renderPred();