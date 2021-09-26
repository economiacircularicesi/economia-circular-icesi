let formQuestions1 = [];


searchQuestionsByLevelAndActivity = (level, activity) => {

    database.ref('questions').on('value', function(data) {


        questions = [];

        data.forEach(dbquestion => {


            let question = dbquestion.val();
            let activities = question.activities;

            activities.forEach((a) => {
                if (activity == a) {
                    questions.push(question);

                }
            });

        });

        renderQuestions(questions);
        ajustQuestionsContainer(questions);
        changeLabelResult(questions);
        formQuestions1 = questions;


        if (!rightBtn.classList.contains('pressed')) {

            const showAssociateQstn = document.querySelectorAll('.showAssociateQstn');
            console.log(showAssociateQstn.length);
            showAssociateQstn.forEach(
                (elem) => {
                    console.log(elem);
                    elem.classList.remove('hidden');
                }
            );
        }


    });

}

searchQuestionsInArrayById = (id) => {
    let gotIt = false;
    for (let i = 0; i < formQuestions1.length & !gotIt; i++) {

        if (id == formQuestions[i].id) {
            gotIt = true;
            return i;
        }
    }
    return -1;
}

searchQuestionsInArrayById2 = (id, questions) => {
    let gotIt = false;
    for (let i = 0; i < questions.length & !gotIt; i++) {

        if (id == questions[i].id) {
            gotIt = true;
            return i;
        }
    }
    return -1;
}