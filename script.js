// start the quiz
function startQuiz() {
  startBtn.style.display = 'none'; 
  quizContainer.style.display = 'block'; 
  loadQuestions();
}
const startBtn = document.getElementById('startQuiz');
startBtn.addEventListener('click', startQuiz);

// questions
const questions = [
    {
      question: "What does CSS stand for?",
      options: ["Cascading Style Sheets", "Creative Style Sheets", "Capital Style Sheets", "Constructive Style Sheets"],
      answer: "Cascading Style Sheets"
    },
    {
      question: "How do you say OR in JavaScript?",
      options: ["//", "OR", "or", "||"],
      answer: "||"
    },
    {
      question: "What Is the Structure of websites?",
      options: ["Javascript", "Python", "HTML", "CSS"],
      answer: "HTML"
    },
    {
      question: "How do you say and in JavaScript?",
      options: ["&&", "and", "//", "++"],
      answer: "&&"
      },
      {
      question: "How does JavaScript listen to a user?",
      options: ["Event Listeners", "Logic", "Clicks", "Buttons"],
      answer: "Event Listeners"
      }
  ];

 
  let currentQuestion = 0;
  let score = 0;
  const totalQuestions = questions.length;

  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const questionElement = document.querySelector('.question');
  const scoreElement = document.getElementById('score');
  const quizOptions = document.querySelector('.options');
  const submitBtn = document.getElementById('submit');
 

  // load the questions and options
  function loadQuestions() {
    const currentQues = questions[currentQuestion];
    questionElement.textContent = currentQues.question;
    quizOptions.innerHTML = '';
    currentQues.options.forEach(option => {
      const list = document.createElement('li');
      list.textContent = option;
      list.addEventListener('click', () => selectAnswer(option));
      quizOptions.appendChild(list);
    });
  }

  // timer
  const timer = 60; 
  let timeLeft = timer;
  const timerElement = document.createElement('div');
  timerElement.textContent = `Time Left: ${timeLeft} seconds`;
  quizContainer.appendChild(timerElement);

  const timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time Left: ${timeLeft}`;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      showResult();
    }
  }, 1000);

  submitBtn.addEventListener('click', showResult);
  
  function selectAnswer(selectedOption) {
    const currentQues = questions[currentQuestion];
    if (selectedOption === currentQues.answer) {
      score++;
    } else {
      // if wrong answer take off 10 secs
      timeLeft -= 10;
      if (timeLeft < 0) {
        timeLeft = 0;
      }
      timerElement.textContent = `Time Left: ${timeLeft} seconds`;
    }
    currentQuestion++;
    if (currentQuestion < totalQuestions) {
      loadQuestions();
    } else {
      showResult();
    }
  }

  // function to show results
function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    scoreElement.textContent = `${score} out of ${totalQuestions}`;
  
    // button to save score
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save Score';
    saveBtn.addEventListener('click', saveScore);
    resultContainer.appendChild(saveBtn);
  }
  
  // save initials
  function saveScore() {
    const initials = prompt('Enter your initials:');
    if (initials !== null && initials.trim() !== '') {
      const userScore = {
        initials: initials.trim(),
        score: score
      };
      // save score to local storage
      const savedScores = JSON.parse(localStorage.getItem('quizScores')) || [];
      savedScores.push(userScore);
      localStorage.setItem('quizScores', JSON.stringify(savedScores));
      alert('Score saved successfully!');
    } else {
      alert('You must enter your initials.');
    }
  }