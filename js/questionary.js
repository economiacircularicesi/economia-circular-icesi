const database = firebase.database();
const advButton = document.querySelector('.advButton');
const rdeButton = document.querySelector('.rdeButton');
const bigNumber = document.querySelector('.bigNumber');
const title = document.querySelector('.card__qTitle');
const subtitle = document.querySelector('.card__qSubtitle');
const description = document.querySelector('.card__qText');
const questionsContainer = document.querySelector('.containerQtns');
const submitButton = document.querySelector('.submitQuestionary');
const questionaryCounters = document.querySelector('.questionaryCounters');


let alreadyAnswered = [];

let ACTIVITIES;

let activityCounter = 1;
let subtitleTxt;
let descriptionTxt;

let questions = [];
let answers = new Map();
let totalQuestions = 0;
let totalJustify = 0;

let ft = true;
let ft1 = true;
let alreadyJustify = [];

let allCompleted = false;


//LOAD ANSWERS
const miStorage = window.localStorage;












const questionsByActivities = new Map();
questionsByActivities.set()

questionsByActivities.set('A1', []);
questionsByActivities.set('A2', []);
questionsByActivities.set('A3', []);
questionsByActivities.set('A4', []);
questionsByActivities.set('A5', []);
questionsByActivities.set('A6', []);
questionsByActivities.set('A7', []);
questionsByActivities.set('A8', []);
questionsByActivities.set('A9', []);
questionsByActivities.set('A10', []);
questionsByActivities.set('A11', []);
questionsByActivities.set('A12', []);


submitButton.addEventListener('click', () => {

    console.log(answers);
    saveAnswers();




});

const saveAnswers = () => {

    let user = loggedUser;
    let r = [];

    for (var [key, value] of answers) {

        let answer = [];
        answer.push(key);
        answer.push(value);

        let justification = miStorage.getItem(loggedUser.id + key);
        if (justification) {
            answer.push(justification)
        }

        r.push(answer);

        //alert(key + " = " + value);
    }

    loggedUser.results = r;
    loggedUser.resultsDate = new Date().getTime();

    console.log(loggedUser);

    let ref = database.ref('users/' + loggedUser.id).set(loggedUser).then(
        () => {

            window.location.href = './questionary_done.html';
        }
    );




}

const firstSubmit = () => {
    let currentQuestions;
    let justificationsByUser = [];
    let ref = database.ref('questions').once('value', function(data) {
        data.forEach((e) => {

            let current = e.val();
            let results = [];

            if (current.results) {

                results = current.results;

            } else {

                let numberOfOptions = current.options.length;


                for (let i = 0; i < numberOfOptions; i++) {
                    results[i] = 0;
                }


            }

            let thisAnswer = answers.get(current.id);
            if (thisAnswer) {

                thisAnswer.forEach(e => {
                    let index = parseInt(e);
                    results[index]++;

                });

            }



            current.results = results;


            let justifications;
            if (current.justifications) {
                justifications = current.justifications;
            } else {
                justifications = [];
            }

            let j = miStorage.getItem(loggedUser.id + current.id);
            if (j) {
                let jj = [];
                jj.push(loggedUser.id);
                jj.push(loggedUser.company);
                jj.push(j);
                justifications.push(jj);

                let jjj = [];
                jjj.push(current.id);
                jjj.push(current.statment);
                jjj.push(j);
                justificationsByUser.push(jjj);
            }
            current.justifications = justifications;




            database.ref('questions/' + current.id).set(current);





        });
    }).then(
        () => {

            let formattedAnwers = [];

            let i = 0;
            for (var [key, value] of answers) {
                let a = [];
                a.push(key);
                a.push(value);
                formattedAnwers.push(a)
            }

            loggedUser.justifications = justificationsByUser;
            loggedUser.answers = formattedAnwers;
            database.ref('accepted/' + loggedUser.id).set(loggedUser).then(
                () => {
                    window.location = './tool-menu.html';
                }
            );

        }
    );
    if (allCompleted) {

        for (var [key, value] of answers) {
            alert(key + " = " + value);
        }

    }
}
advButton.addEventListener('click', () => {

    if (activityCounter < 12) {

        activityCounter++;
        updateInfo();

    }

});

rdeButton.addEventListener('click', () => {
    if (activityCounter > 1) {

        activityCounter--;
        updateInfo();
    }
});


database.ref('activities').on('value', function(data) {
    ACTIVITIES = data.val();

    let cc = 0;
    let justifyCc = 0;

    database.ref('questions').on('value', function(elements) {

        elements.forEach((e) => {


            let currentQuestion = e.val();
            questions.push(e.val());
            let array = questionsByActivities.get(currentQuestion.activities[0]);
            array.push(currentQuestion);

            if (!e.val().assQstnCurrentOptionIndex) {

                cc++;
            } else {
                //FALTA SUMAR LA PREGUNTAS HIJO QUE ESTEN CONTESTADAS

                alreadyAnswered.push(e.val());
                alreadyJustify

            }

            if (e.val().justify) {
                justifyCc++;



            }






        });

        totalQuestions = cc;
        totalJustify = justifyCc;


        renderQuestions(questionsByActivities.get('A1'));

        translateAnswers();
        loadPageCompleted();

    });

});

const updateInfo = () => {

    bigNumber.innerText = activityCounter;

    title.innerText = 'A' + activityCounter;
    let color = getActivityColor(activityCounter);

    document.querySelector(':root').style.setProperty('--questionary-color', color);
    let activity = 'A' + activityCounter;
    subtitle.innerText = subtitleTxt;
    description.innerText = descriptionTxt;


    renderQuestions(questionsByActivities.get(activity));
    markAnswers();
}
const loadPageCompleted = () => {

    let container = document.querySelector('.loading__container');
    container.style.visibility = 'hidden';
    container.style.opacity = 0;








    //answers = new Map(JSON.parse(miStorage.getItem(loggedUser.id)));


    markAnswers();




}

const translateAnswers = () => {
    let newMap = false;



    if (!miStorage.getItem(loggedUser.id)) {

        newMap = true;
        let map = new Map();
        miStorage.setItem(loggedUser.id, JSON.stringify(mapToObj(map)));
    }

    //Translate from json to map

    if (!newMap) {
        let currentMap = miStorage.getItem(loggedUser.id);

        if (currentMap != '{}') {

            let cM = currentMap.replace('{', '');
            cM = cM.replace('}', '');

            cM = cM.split('"').join('');

            let pairs = cM.split('],');






            pairs.forEach(
                (e, i) => {


                    if (i < pairs.length - 1)
                        e = e + ']';
                    let parts = e.split(':');
                    let key = parts[0];
                    let value = parts[1];

                    value = value.replace('[', '');
                    value = value.replace(']', '');

                    let stringsArr = value.split(',');

                    answers.set(key, stringsArr);
                }
            );
        } else {
            answers = new Map();
        }

    }



    alreadyAnswered.forEach((e) => {
        if (answers.has(e.id)) {


            let add = false;


            indexesAnswered = answers.get(e.id);

            realIndexes = [];

            e.assQstnCurrentOptionIndex.forEach(a => {

                realIndexes.push(a.split('x')[1]);
            });


            indexesAnswered.forEach(el => {
                if (realIndexes.includes(el)) {
                    totalQuestions++;
                }
            });
            /*
            fatherQuestionHTML.querySelectorAll('.optionCheck').forEach((element, i) => {

                let index = e.assQstnCurrentOptionIndex[i].split('x')[1];


            });*/


        }
    });



}

const markAnswers = () => {



    questions.forEach((e) => {
        if (miStorage.getItem(loggedUser.id + e.id)) {
            const questionToBeAnswered = document.querySelector('.' + e.id);
            if (questionToBeAnswered) {
                let justifyTA = questionToBeAnswered.querySelector('.justify');
                if (justifyTA) {
                    justifyTA.value = miStorage.getItem(loggedUser.id + e.id);
                }
            }

        }
    });
    for (var [key, value] of answers) {
        const questionToBeAnswered = document.querySelector('.' + key);






        if (questionToBeAnswered) {




            questionToBeAnswered.classList.remove('hidden');
            value.forEach((e) => {



                console.log(value);
                let index = searchQuestionsInArrayById2(key, questions);


                if (index != -1) {

                    let fatherQuestion = questions[index];


                    if (fatherQuestion.assQstnCurrentOptionIndex) {

                        fatherQuestion.assQstnCurrentOptionIndex.forEach(iii => {
                            let indexString = iii.split('x')[1];

                            if (indexString == e) {
                                document.querySelector('.' + fatherQuestion.idSon).classList.remove('hidden');
                                let i = searchQuestionsInArrayById2(questions, fatherQuestion.idSon);
                                if (i > 0) {
                                    if (questions[i].justify) {
                                        // totalJustify++;
                                    }

                                }


                                if (ft) {
                                    //NO ES

                                    //totalQuestions++;
                                    ft = false;
                                }


                            }
                        });


                    }


                }

                let optionToBeAnswered = questionToBeAnswered.querySelector('.c' + e);
                if (optionToBeAnswered)
                    optionToBeAnswered.checked = true;
            });
        }


    }

    if (ft1) {
        ft1 = false;
        questions.forEach((qqq) => {
            if (qqq.idSon) {

                let idSonQ = questions[searchQuestionsInArrayById2(qqq.idSon, questions)];
                let idxs = getIndexes(qqq.assQstnCurrentOptionIndex);
                let aswd = answers.get(qqq.id);
                console.log(qqq.id);
                console.log(aswd);
                console.log(answers);
                console.log(idxs);
                let flag = true;
                if (aswd) {

                    aswd.forEach(a => {

                        if (flag && (!idxs.includes(a))) {
                            flag = false;

                            if (idSonQ.justify)
                                alreadyJustify.push(qqq);
                        }
                    })

                } else {
                    totalJustify--;
                }



            }
        });


        alreadyJustify.forEach((e) => {





            totalJustify--;






        });
    }





    verifyAllCompleted();

}
const mapToObj = m => {
    return Array.from(m).reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
    }, {});
};

const getActivityColor = (activity) => {

    switch (activity) {
        case 1:
            subtitleTxt = ACTIVITIES.A1.title;
            descriptionTxt = ACTIVITIES.A1.description;
            return '#ECC65E';
        case 2:
            subtitleTxt = ACTIVITIES.A2.title;
            descriptionTxt = ACTIVITIES.A2.description;
            return '#D33A44'
        case 3:
            subtitleTxt = ACTIVITIES.A3.title;
            descriptionTxt = ACTIVITIES.A3.description;
            return '#4AA35B'
        case 4:
            subtitleTxt = ACTIVITIES.A4.title;
            descriptionTxt = ACTIVITIES.A4.description;
            return '#4083BF'
        case 5:
            subtitleTxt = ACTIVITIES.A5.title;
            descriptionTxt = ACTIVITIES.A5.description;
            return '#68148E'
        case 6:
            subtitleTxt = ACTIVITIES.A6.title;
            descriptionTxt = ACTIVITIES.A6.description;
            return '#4BA35C'
        case 7:
            subtitleTxt = ACTIVITIES.A7.title;
            descriptionTxt = ACTIVITIES.A7.description;
            return '#184375'
        case 8:
            subtitleTxt = ACTIVITIES.A8.title;
            descriptionTxt = ACTIVITIES.A8.description;
            return '#F6C75A'
        case 9:
            subtitleTxt = ACTIVITIES.A9.title;
            descriptionTxt = ACTIVITIES.A9.description;
            return '#D43A44'
        case 10:
            subtitleTxt = ACTIVITIES.A10.title;
            descriptionTxt = ACTIVITIES.A10.description;
            return '#ECC65E'
        case 11:
            subtitleTxt = ACTIVITIES.A11.title;
            descriptionTxt = ACTIVITIES.A11.description;
            return '#D33A44'
        case 12:
            subtitleTxt = ACTIVITIES.A12.title;
            descriptionTxt = ACTIVITIES.A12.description;
            return '#4AA35B'


    }



}


renderQuestions = (questions) => {



    let sonsArray = [];
    let sonsMap = new Map();
    questionsContainer.innerHTML = '';
    let html = '';
    let i = 0;

    let div = document.createElement('div');

    questions.forEach((q) => {



        if (q.father)
            i++;

        let info = 'hidden';

        if (q.info) {
            info = '';
        }

        let options = q.options;
        let optionsHtml = '';
        let textArea = ``;
        if (q.justify) {
            textArea = ` <textarea rows="4" cols="50" class="dataform__textarea dataform__textarea--question justify" placeholder="Por favor, justifique su respuesta"></textarea>`;
        }




        let optionIndex = 0;
        options.forEach((o, i) => {
            let hint = '';
            if (o.type !== "") {
                let popupusClass = 'popups' + i;
                let openHint = 'openHint' + i;
                let close = 'close' + i;
                hint = '<div class="dataform__icons"><img src="./images/info.png" class="info__icon ' + openHint + ' info__icon--noMargin"><div class="popup popups ' + popupusClass + ' hidden"><button class="popup__button popup__button--r ' + close + ' ">x</button><p class="popup__text">' + o.type + '</p></div></div>';
            }
            optionsHtml += `<div class="option__hint"> <input id="${optionIndex}" class="optionCheck c${optionIndex}" type="checkbox">${o.statment}<p>${hint}</p></div>`;
            optionIndex++;
        })

        let idString = `<p class="showAssociateQstn dataform__question--id hidden">${q.id}</p>`;


        let question = document.createElement('div');
        question.classList.add('dataform__question');
        question.classList.add('text');
        question.classList.add(q.id);


        let I = '';
        if (q.father) {
            I = i + '.';

        } else {

            question.classList.add('dataform__question--son');

        }

        question.innerHTML = `
               
                            <div class="dataform__question__row">
                  
                                <p class="dataform__question--statment"><strong>${I+'</strong> '+q.statment+' <strong class="matrix__pReminder"><br>'+'</strong>'}</p><img src="./images/copy.png" class="dataform__copyBtn showAssociateQstn hidden"><div class="dataform__icons"><img src="./images/info.png" class="info__icon ${info} info__iconNm"><div class="popup hidden"><button class="popup__button popup__button--r">x</button><p class="popup__text">${q.info}</p></div></div>
                            </div>
                                      ${idString }
                            ${optionsHtml}
                            
                            ${textArea}
                            <div class="dataform__question text ${q.id}father"></div>
                            
                     
                `;


        let optionsList = question.querySelectorAll('.optionCheck');
        let copyButton = question.querySelector('.dataform__copyBtn');
        let closeInfoButton = question.querySelector('.popup__button');
        let popup = question.querySelector('.popup');
        let openInfoButton = question.querySelector('.info__icon');

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






        let justify = question.querySelector('.justify');

        if (justify) {
            justify.addEventListener('change', () => {



                let key = loggedUser.id + q.id;


                if (justify.value.length == 0) {

                    miStorage.removeItem(key);

                } else {
                    miStorage.setItem(key, justify.value);

                }

                verifyAllCompleted();

            });
        }



        let confirmFlag = false;





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
                let index = searchQuestionsInArrayById(q.id);
                renderAssQuestion(index);
                copySonQuestionId = true;
            } else {



                if (copySonQuestionId) {
                    if (!assQstnOptionSon.classList.contains('hidden')) {


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

        if (!q.father) {
            question.classList.add('hidden');
        } else {


            if (q.assQstnCurrentOptionIndex) {

                let sonQuestion = questions[searchQuestionsInArrayById2(q.idSon, questions)];

                let numberIndexes = [];
                q.assQstnCurrentOptionIndex.forEach((e) => {
                    let optionIndex = e.slice(11, e.length);
                    let numberIndex = parseInt(optionIndex);

                    numberIndexes.push(numberIndex);

                });



                question.querySelectorAll('.optionCheck').forEach((e, i) => {


                    if (!numberIndexes.includes(i)) {


                        e.addEventListener('click', () => {





                            if (e.checked) {

                                let questionHTML = document.querySelector('.' + q.idSon);
                                if (questionHTML) {




                                    // totalQuestions--;


                                    if (!questionHTML.classList.contains('hidden')) {

                                        answers.delete(q.idSon);
                                        totalQuestions--;
                                        document.querySelector('.' + q.idSon).querySelector('.dataform__textarea').value = '';




                                    }




                                    if (sonQuestion.justify) {

                                        console.log(sonQuestion.id);
                                        console.log(document.querySelector('.' + sonQuestion.id).classList.contains('hidden'))

                                        if (!document.querySelector('.' + sonQuestion.id).classList.contains('hidden'))

                                            totalJustify--;
                                        console.log('la');
                                        miStorage.removeItem(loggedUser.id + sonQuestion.id);
                                    }
                                    questionHTML.classList.add('hidden');
                                }
                            } else {

                                //ESTE TAMPOCO
                                //otalQuestions++;
                            }
                        });

                        // 
                    } else {







                    }

                });

                numberIndexes.forEach((e) => {


                    let optionCheck = question.querySelector('.c' + e);




                    if (optionCheck) {




                        optionCheck.addEventListener('click', () => {


                            let questionHTML = document.querySelector('.' + q.idSon);
                            questionHTML.querySelectorAll('.optionCheck').forEach(e => {
                                e.checked = false;
                            });










                            if (optionCheck.checked) {


                                if (questionHTML.classList.contains('hidden')) {
                                    totalQuestions++;







                                    if (sonQuestion.justify)
                                        totalJustify++;
                                    questionHTML.classList.remove('hidden');
                                }



                                answers.delete(q.idSon)




                            } else {
                                questionHTML.classList.add('hidden');




                                totalQuestions--;
                                if (sonQuestion.justify) {

                                }
                                //totalJustify--;


                            }





                        });


                    }

                });






            }

        }


        optionsList.forEach((e) => {

            e.addEventListener('click', () => {



                if (e.checked) {

                    let arr = [];
                    switch (q.kindOfQuestion) {

                        case 'multiple_choice_single_answer':

                            arr.push(e.id);
                            answers.set(q.id, arr);
                            break;

                        case 'multiple_choice_scale':

                            arr.push(e.id);
                            answers.set(q.id, arr);

                            break;

                        case 'multiple_choice':

                            if (answers.get(q.id))
                                arr = answers.get(q.id);

                            arr.push(e.id);
                            answers.set(q.id, arr);




                            break;

                    }





                } else {




                    let arr = [];
                    switch (q.kindOfQuestion) {

                        case 'multiple_choice_single_answer':


                            answers.set(q.id, arr);
                            answers.delete(q.id);
                            break;

                        case 'multiple_choice_scale':


                            answers.set(q.id, arr);
                            answers.delete(q.id);
                            break;

                        case 'multiple_choice':
                            if (answers.get(q.id))
                                arr = answers.get(q.id);

                            if (arr.includes(e.id)) {

                                let index = -1;
                                for (let i = 0; i < arr.length && index == -1; i++) {
                                    if (arr[i] == e.id) {
                                        index = i;
                                    }
                                }
                                arr.splice(index, 1);
                                answers.set(q.id, arr);

                                if (arr.length == 0) {
                                    answers.delete(q.id);
                                }

                            }

                            break;

                    }

                }



                miStorage.setItem(loggedUser.id, JSON.stringify(mapToObj(answers)));



                verifyAllCompleted();
            });


        });

        if (q.father)
            div.appendChild(question);
        if (q.idSon) {
            sonsMap.set(q.idSon, q.id);
        } else {
            sonsArray.push({ question, id: q.id });
        }



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

    sonsArray.forEach((e) => {
        let idFather = sonsMap.get(e.id);

        if (idFather != undefined) {
            let idFatherFather = idFather + 'father';




            let fatherFatherContainer = questionsContainer.querySelector('.' + idFatherFather);

            if (fatherFatherContainer) {


                fatherFatherContainer.appendChild(e.question);
            }
            //document.querySelector(idFather + 'father').appendChild(e.question);
        }

        // document.querySelector(idFather + 'father').appendChild(e.question);
    });

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

const verifyAllCompleted = () => {

    let justifySoFar = 0;

    questions.forEach(e => {

        if (miStorage.getItem(loggedUser.id + e.id)) {
            justifySoFar++;
        }

    });
    console.log(justifySoFar + '   justifySoFar');
    console.log(totalJustify + '   totalJustify');
    console.log(answers.size + '    answers');
    console.log(totalQuestions + '   totalQuestions');
    console.log('----');

    let remaining = totalQuestions - answers.size;
    let remainingJ = totalJustify - justifySoFar;


    questionaryCounters.innerText = 'Preguntas sin contestar:  ' + remaining + '\nJustificaciones restantes: ' + remainingJ;
    if (justifySoFar == totalJustify) {
        if (answers.size == totalQuestions) {

            allCompleted = true;
            document.querySelector('.submitQuestionary').classList.remove('pressed');
        } else {
            document.querySelector('.submitQuestionary').classList.add('pressed');
            allCompleted = false;
        }
    } else {
        document.querySelector('.submitQuestionary').classList.add('pressed');
        allCompleted = false;
    }




}

const getIndexes = (e) => {
    realIndexes = [];

    e.forEach(a => {

        realIndexes.push(a.split('x')[1]);
    });

    return realIndexes;
}