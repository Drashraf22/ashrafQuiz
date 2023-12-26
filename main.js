const questions =[
    {
        question:"من هو الصحابي صاحب الهجرات الثلاث ؟",
        answers:[
            {text:"علي بن أبي طالب", correct:"false"},
            {text:"عبدالله بن عمر", correct:"false"},
            {text:"أبي موسي الأشعري", correct:"true"},
            {text:"جابر بن عبد الله", correct:"false"}
        ]
    },
    {
        question:"من هو أول صحابي ولد في الاسلام ؟",
        answers:[
            {text:"سعد بن معاذ", correct:"false"},
            {text:"عبدالله بن عمر", correct:"true"},
            {text:"عبدالله بن الزبير", correct:"false"},
            {text:"أنس بن مالك", correct:"false"}
        ]
    },
    {
        question:"كم عدد سور القرأن الكريم التي تبدأ ب الم",
        answers:[
            {text:"ثلاث سور", correct:"false"},
            {text:"أربعه سور", correct:"false"},
            {text:"خمس سور", correct:"false"},
            {text:"ست سور", correct:"true"}
        ]
    },
    {
        question:"كم عدد حمله عرش الرحمن يوم القيامه",
        answers:[
            {text:"5", correct:"false"},
            {text:"8", correct:"true"},
            {text:"9", correct:"false"},
            {text:"11", correct:"false"}
        ]
    }
];

let questionTitle = document.getElementById("questionTitle");
let answerButtons = document.getElementById("question-buttons");
let nextButton = document.getElementById("nextButton");

let currentQuestionIndex =0;
let score =0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionTitle.innerHTML = questionNo + ' . ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        let button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = 'none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add('correct');
        }
        button.disabled = true;
    })
    nextButton.style.display = 'block';
}


function showScore(){
    resetState();
        questionTitle.innerHTML = `You Scored ${score} of ${questions.length}!`;
    nextButton.innerHTML = `Try Again`;
    nextButton.style.display = 'block';
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener('click', function(){
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})








startQuiz();