  
// クイズの問題データ
const questions = [
  {
    question: "日本の首都はどこ？",
    answers: ["大阪", "東京", "京都", "福岡"],
    correct: 1
  },
  {
    question: "1 + 1 の答えは？",
    answers: ["1", "2", "3", "4"],
    correct: 1
  },
  {
    question: "水の化学式は？",
    answers: ["CO2", "O2", "H2O", "NaCl"],
    correct: 2
  },
  {
    question: "日本で一番高い山は？",
    answers: ["富士山", "北岳", "阿蘇山", "筑波山"],
    correct: 0
  },
  {
    question: "地球は太陽の周りを何日で一周する？",
    answers: ["約30日", "約180日", "約365日", "約700日"],
    correct: 2
  }
];

// ゲームの状態
let currentQuestion = 0;
let score = 0;

// HTMLの要素を取得
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const resultElement = document.getElementById("result");
const nextButton = document.getElementById("nextButton");

// 問題を表示する
function showQuestion() {
  const question = questions[currentQuestion];

  questionElement.textContent = question.question;
  answersElement.innerHTML = "";
  resultElement.textContent = "";
  nextButton.style.display = "none";

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.textContent = answer;
    button.className = "answer-button";

    button.addEventListener("click", () => {
      checkAnswer(index);
    });

    answersElement.appendChild(button);
  });
}

// 回答を判定する
function checkAnswer(selectedIndex) {
  const correctIndex = questions[currentQuestion].correct;
  const buttons = answersElement.querySelectorAll("button");

  buttons.forEach(button => {
    button.disabled = true;
  });

  if (selectedIndex === correctIndex) {
    resultElement.textContent = "🎉 正解！";
    resultElement.style.color = "green";
    score++;
  } else {
    resultElement.textContent =
      "残念！正解は「" +
      questions[currentQuestion].answers[correctIndex] +
      "」です";
    resultElement.style.color = "red";
  }

  nextButton.style.display = "inline-block";
}

// 次の問題へ進む
nextButton.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

// 結果を表示する
function showResult() {
  questionElement.textContent = "クイズ終了！";
  answersElement.innerHTML = "";

  resultElement.style.color = "#6366f1";
  resultElement.textContent =
    questions.length + "問中 " + score + "問正解！";

  nextButton.textContent = "もう一度遊ぶ";
  nextButton.style.display = "inline-block";

  nextButton.onclick = () => {
    currentQuestion = 0;
    score = 0;
    nextButton.textContent = "次の問題へ";
    showQuestion();
  };
}

// ゲーム開始
showQuestion();
