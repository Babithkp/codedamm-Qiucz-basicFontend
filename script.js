const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];

const StartButton = document.querySelector(".sumbitButton");
const box = document.querySelector(".box");
const boxContainer = document.querySelector(".change");
const btn1 = document.querySelector(".button-1");
const btn2 = document.querySelector(".button-2");
const btn3 = document.querySelector(".button-3");
const btn4 = document.querySelector(".button-4");
const question = document.querySelector(".questions");
const queHeader = document.querySelector(".question-header");
const allDoneBox = document.querySelector(".allDone");
const allDoneInbox = document.querySelector(".allDode-inbox");
const allDoneSubmit = document.querySelector(".allDone-info--submit");
const resultLine = document.querySelector(".options-result");
const overAllTime = document.querySelector(".TotalTime");
const allDoneCondition = document.querySelector(".condition");
const FinalScoreCount = document.querySelector(".allDone-score");
const finalSubmitBtn = document.querySelector(".finalSumit");
const leaderBoardRecord = document.querySelector(".scores");
const leaderBoardBox = document.querySelector(".leaderBoard");
const leaderBoardBack = document.querySelector(".leaderBoard-back");
const leaderBoardClear = document.querySelector(".leaderBoard-clear");

let leaderBoard = {
  nikename: [],
  score: [],
};

let sec = 50;
let queNo = 1;
let totalScore = 0;

const qustionsDisplay = function (question) {
  queHeader.innerHTML = question.questionText;
  btn1.innerHTML = question.options[0];
  btn2.innerHTML = question.options[1];
  btn3.innerHTML = question.options[2];
  btn4.innerHTML = question.options[3];
};

const removeQue = function () {
  boxContainer.style.display = "block";
  question.style.display = "none";
};

const allDone = function () {
  question.style.display = "none";
  boxContainer.style.display = "none";
  box.style.width = "auto";
  allDoneBox.style.display = "block";
};

const questionChanging = function (que, queNo) {
  qustionsDisplay(que[queNo]);
};

const hiddenResult = function () {
  resultLine.style.display = "none";
};

const displayResultCorrect = function () {
  resultLine.style.display = "block";
  resultLine.innerHTML = "Correct!";
  setTimeout(hiddenResult, 1000);
};
const displayResultWrong = function () {
  resultLine.style.display = "block";
  resultLine.innerHTML = "Incorrect!";
  setTimeout(hiddenResult, 1000);
};

const questionStart = function (que, queNo) {
  btn1.addEventListener("click", function () {
    if (que[queNo - 1].answer == btn1.innerHTML) {
      que[queNo - 1].result = "Correct!";
      displayResultCorrect();
      totalScore++;
    } else {
      que[queNo - 1].result = "Incorrect!";
      displayResultWrong();
      sec = sec - 10;
    }
    questionChanging(que, queNo);
    queNo++;
  });
  btn2.addEventListener("click", function () {
    if (que[queNo - 1].answer == btn2.innerHTML) {
      que[queNo - 1].result = "Correct!";
      displayResultCorrect();
      totalScore++;
    } else {
      que[queNo - 1].result = "Incorrect!";
      displayResultWrong();
      sec = sec - 10;
    }
    questionChanging(que, queNo);
    queNo++;
  });
  btn3.addEventListener("click", function () {
    if (que[queNo - 1].answer == btn3.innerHTML) {
      que[queNo - 1].result = "Correct!";
      displayResultCorrect();
      totalScore++;
    } else {
      que[queNo - 1].result = "Incorrect!";
      displayResultWrong();
      sec = sec - 10;
    }
    questionChanging(que, queNo);
    queNo++;
  });
  btn4.addEventListener("click", function () {
    if (que[queNo - 1].answer == btn4.innerHTML) {
      que[queNo - 1].result = "Correct!";
      displayResultCorrect();
      totalScore++;
    } else {
      que[queNo - 1].result = "Incorrect!";
      displayResultWrong();
      sec = sec - 10;
    }
    questionChanging(que, queNo);
    queNo++;
  });
  return queNo;
};

const startLogoutTimer = function () {
  time = setInterval(() => {
    if (sec < 10) {
      overAllTime.textContent = `00:0${sec}`;
    } else overAllTime.textContent = `00:${sec}`;

    sec--;

    if (sec < 0) {
      clearInterval(time);
      allDone();
      overAllTime.textContent = `00:00`;
    }
  }, 1000);
};

StartButton.addEventListener("click", function () {
  sec = 50;
  queNo = 1;
  totalScore = 0;
  startLogoutTimer();
  boxContainer.style.display = "none";
  question.style.display = "block";
  qustionsDisplay(questions[0]);
  questionStart(questions, queNo);
});

allDoneSubmit.addEventListener("click", function () {
  if (allDoneInbox.value === "") {
    allDoneCondition.style.display = "block";
  } else {
    allDoneCondition.style.display = "none";
    leaderBoard.nikename = allDoneInbox.value;
    leaderBoard.score = (totalScore / questions.length) * 100;
    DispalyLeaderBoard();
    allDoneInbox.value = "";
    localStorage.setItem(`leaderboard`, JSON.stringify(leaderBoard));
    let refetchhed = JSON.parse(localStorage.getItem(`leaderboard`));
    setLeaderboared(refetchhed);
  }
});

const setLeaderboared = function (refetchhed) {
  if (!refetchhed) return;

  const { nikename, score } = refetchhed;

  let html = `
  <li>${nikename}-- ${score}</li>
  `;

  leaderBoardRecord.insertAdjacentHTML("afterbegin", html);
};

const DispalyLeaderBoard = function () {
  allDoneBox.style.display = "none";
  leaderBoardBox.style.display = "block";
};

leaderBoardBack.addEventListener("click", function () {
  leaderBoardBox.style.display = "none";
  boxContainer.style.display = "block";
  box.style.width = "60%";
});

leaderBoardClear.addEventListener(".click", function () {
  const sibling = leaderBoardRecord.nextSibling;
  sibling.remove();
});
