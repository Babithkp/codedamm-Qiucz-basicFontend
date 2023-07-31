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

const  leaderBoard = {
  nikename: [],
  score: [],
};


let score = 0;
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
  boxContainer.style.display = "none";
  question.style.display = "none";
  box.style.width = "auto";
  allDoneBox.style.display = "block";
};

const hightLightOption = function () {
  const element = document.querySelector(":focus");
  element.style.background = "#48adaa";
  finalSubmitBtn.style.display = "block";
};

const questionChanging = function (que, queNo) {
  if (queNo === que.length) {
    hightLightOption();
    return;
  }
  qustionsDisplay(que[queNo]);
};

const displayResultCorrect = function () {
  resultLine.style.display = "block";
  resultLine.innerHTML = "Correct!";
};
const displayResultWrong = function () {
  resultLine.style.display = "block";
  resultLine.innerHTML = "InCorrect!";
};

const questionStart = function (que, queNo) {
  btn1.addEventListener("click", function () {
    if (que[queNo - 1].answer == btn1.innerHTML) {
      que[queNo - 1].result = "Correct!";
      totalScore++;
    } else que[queNo - 1].result = "Incorrect!";
    questionChanging(que, queNo);
    queNo++;
  });
  btn2.addEventListener("click", function () {
    if (que[queNo - 1].answer == btn2.innerHTML) {
      que[queNo - 1].result = "Correct!";
      totalScore++;
    } else que[queNo - 1].result = "Incorrect!";
    questionChanging(que, queNo);
    queNo++;
  });
  btn3.addEventListener("click", function () {
    if (que[queNo - 1].answer == btn3.innerHTML) {
      que[queNo - 1].result = "Correct!";
      totalScore++;
    } else que[queNo - 1].result = "Incorrect!";
    questionChanging(que, queNo);
    queNo++;
  });
  btn4.addEventListener("click", function () {
    if (que[queNo - 1].answer == btn4.innerHTML) {
      que[queNo - 1].result = "Correct!";
      totalScore++;
    } else que[queNo - 1].result = "Incorrect!";
    questionChanging(que, queNo);
    queNo++;
  });
  return queNo;
};

StartButton.addEventListener("click", function () {
  startLogoutTimer();
  boxContainer.style.display = "none";
  question.style.display = "block";
  qustionsDisplay(questions[0]);
  queNo = questionStart(questions, queNo);
});

const startLogoutTimer = function () {
  let time = 1;

  //call the timer second
  const timer = setInterval(() => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    //in each call, print the remaininng timing
    overAllTime.textContent = `${min}:${sec}`;

    if (time === 3600) {
      clearInterval(timer);
    }
    time++;

    finalSubmitBtn.addEventListener("click", function () {
      clearInterval(timer);
      removeQue();
      allDone();
      const Totaltime = min * 60 + +sec;
      const score = FinalScore(
        questions.length,
        Totaltime,
        (totalScore / questions.length) * 50
      );
      FinalScoreCount.textContent = `Your final Score is ${
        score < 0 ? 0 : score
      }.`;
      leaderBoard.score = score;

    });
  }, 100);
};

const FinalScore = function (arrayLenth, timeTaken, totalScore) {
  const maxScore = 55;
  const maxTime = Math.trunc(arrayLenth + (arrayLenth / 60) * 100);
  const minTime = maxTime / maxScore;

  const totalTime = Math.trunc(
    maxScore -
      (timeTaken / (minTime * 100) - minTime) * (maxScore / (maxTime - minTime))
  );

  return (totalTime > 50 ? 50 : totalTime) + totalScore;
};

allDoneSubmit.addEventListener("click", function () {
  let player = 0;
  if (allDoneInbox.value === "") {
    allDoneCondition.style.display = "block";
  } else {

    allDoneCondition.style.display = "none";
    leaderBoard.nikename = allDoneInbox.value;
    DispalyLeaderBoard();
    allDoneInbox.value = "";
    localStorage.setItem(`player${0}`, JSON.stringify(leaderBoard));
    let fetched = localStorage.getItem(`player${0}`);
    const refetchhed = JSON.parse(fetched);
    destruce(refetchhed);
    player++;
  }
});

const destruce = function(fetched){
  const { nikename, score } = fetched;
  leaderBoardScores(nikename,score);
}

const leaderBoardScores = function(name,score){
  let html = `
  <li>${name}: ${score}</li>
  `;
  console.log(name,score);

  leaderBoardRecord.insertAdjacentHTML("afterbegin", html);
};

const DispalyLeaderBoard = function(){
  allDoneBox.style.display = "none";
  leaderBoardBox.style.display = "block";
}

leaderBoardBack.addEventListener("click",function(){
    allDoneBox.style.display = "block";
    leaderBoardBox.style.display = "none";
});

leaderBoardClear.addEventListener(".click",function(){
  leaderBoardRecord.remove();

});