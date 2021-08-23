var questions = [
  {
    question: "1. How do you write 'Hello World' in an alert box?",
    choices: [
      "msg('Hello World')",
      "msgBox('Hello World');",
      "alertBox('Hello World');",
      "alert('Hello World');",
    ],
    correctAnswer: 3,
  },
  {
    question: "2. How to empty an array in JavaScript?",
    choices: [
      "arrayList[]",
      "arrayList(0)",
      "arrayList.length=0",
      "arrayList.len(0)",
    ],
    correctAnswer: 2,
  },
  {
    question:
      "3. What function to add an element at the begining of an array and one at the end?",
    choices: ["push,unshift", "unshift,push", "first,push", "unshift,last"],
    correctAnswer: 1,
  },
  {
    question: "4. What will this output? var a = [1, 2, 3]; console.log(a[6]);",
    choices: ["undefined", "0", "prints nothing", "Syntax error"],
    correctAnswer: 0,
  },
  {
    question:
      "5. What would following code return? console.log(typeof typeof 1);",
    choices: ["string", "number", "Syntax error", "undefined"],
    correctAnswer: 0,
  },
  {
    question: "6. Which software company developed JavaScript?",
    choices: ["Mozilla", "Netscape", "Sun Microsystems", "Oracle"],
    correctAnswer: 1,
  },
  {
    question: "7. What would be the result of 3+2+'7'?",
    choices: ["327", "12", "14", "57"],
    correctAnswer: 3,
  },
  {
    question:
      "8. Look at the following selector: $('div'). What does it select?",
    choices: [
      "The first div element",
      "The last div element",
      "All div elements",
      "Current div element",
    ],
    correctAnswer: 2,
  },
  {
    question: "9. How can a value be appended to an array?",
    choices: [
      "arr(length).value;",
      "arr[arr.length]=value;",
      "arr[]=add(value);",
      "None of these",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "10. What will the code below output to the console? console.log(1 +  +'2' + '2');",
    choices: ["'32'", "'122'", "'13'", "'14'"],
    correctAnswer: 0,
  },
];

var currentQuestion = 0;
var viewingAns = 0;
var correctAnswers = 0;
var quizOver = false;
var iSelectedAnswer = [];
var c = 120;
var t;
var highscore = [];
var numberofHighScores = 10;

// const highScoreList = document.getElementById(highScores);

// highScoreList.innerHTML = highScores.map((score) => 
//   `<li>${score.score} - ${score.name}`
// );

function startQuiz () {
  // Display the first question
  resetQuiz();
  displayCurrentQuestion();
  $(this).find(".quizMessage").hide();
  $(this).find(".preButton").attr("disabled", "disabled");
  console.log("Calling timed count in display current question.");
  timedCount();
}

  // On clicking next, display the next question
function nextQuestion () {
      console.log("Next button clicked.");
      if (!quizOver) {
        var val = $("input[type='radio']:checked").val();
        if (val == undefined) {
          $(document).find(".quizMessage").text("Please select an answer");
          $(document).find(".quizMessage").show();
        } else {
          // TODO: Remove any message -> not sure if this is efficient to call this each time....
          $(document).find(".quizMessage").hide();
          // if they got the correct answer.
          if (val == questions[currentQuestion].correctAnswer) {
            correctAnswers++;
          }
          else{
            console.log("wrong answer 5 seconds removed.");
            decreaseTimer();
          }
          iSelectedAnswer[currentQuestion] = val;

          currentQuestion++; // Since we have already displayed the first question on DOM ready
          if (currentQuestion < questions.length) {
            console.log("Displaying question");
            displayCurrentQuestion();
          } 
          else {
            displayScore();
            $("#iTimeShow").html("Quiz Time Completed!");
            $("#timer").html(
              "You scored: " + correctAnswers + " out of: " + questions.length
            );

            c = 120;            
            $(document).find(".startButton").text("Play Again?");
            quizOver = true;
            return false;
          }
        }
      } 
      else {
        // quiz is over and clicked the next button (which now displays 'Play Again?'
        quizOver = false;
        $("#iTimeShow").html("Time Remaining:");
        iSelectedAnswer = [];
        $(document).find(".nextButton").text("Next Question");        
        //$(".preButton").attr("disabled", "disabled");
        resetQuiz();
        viewingAns = 1;
        displayCurrentQuestion();
        hideScore();
      }
  };

function timedCount() {
  if (c == 185) {
     return false;
  }
  var hours = parseInt(c / 3600) % 24;
  var minutes = parseInt(c / 60) % 60;
  var seconds = c % 60;
  var result =
    (hours < 10 ? "0" + hours : hours) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds);
  $("#timer").html(result);
  if (c == 0) {
    displayScore();
    $("#iTimeShow").html("Quiz Time Completed!");
    $("#timer").html(
      "You scored: " + correctAnswers + " out of " + questions.length
    );
    c = 120;    
    $(document).find(".startButton").text("Play Again?");
    quizOver = true;
    return false;
  }
  c = c - 1;
  t = setTimeout(function () {
    timedCount();
  }, 1000);
}

function decreaseTimer () {
    c -= 5;
}

// This displays the current question AND the choices
function displayCurrentQuestion() {
  // if (c == 120) {
  //   c = 119;
  //   console.log("Calling timed count in display current question.");
  //   //timedCount();
  // }
  //console.log("In display current Question");
  var question = questions[currentQuestion].question;
  var questionClass = $(document).find(".quizContainer > .question");
  var choiceList = $(document).find(".quizContainer > .choiceList");
  var numChoices = questions[currentQuestion].choices.length;
  // Set the questionClass text to the current question
  $(questionClass).text(question);
  // Remove all current <li> elements (if any)
  $(choiceList).find("li").remove();
  var choice;
  for (i = 0; i < numChoices; i++) {
    choice = questions[currentQuestion].choices[i];
    if (iSelectedAnswer[currentQuestion] == i) {
      $(
        '<li><input type="radio" class="radio-inline" checked="checked"  value=' +
          i +
          ' name="dynradio" />' +
          " " +
          choice +
          "</li>"
      ).appendTo(choiceList);
    } else {
      $(
        '<li><input type="radio" class="radio-inline" value=' +
          i +
          ' name="dynradio" />' +
          " " +
          choice +
          "</li>"
      ).appendTo(choiceList);
    }
  }
}

function resetQuiz() {
  currentQuestion = 0;
  correctAnswers = 0;
  hideScore();
}

function displayScore() {
  $(document)
    .find(".quizContainer > .result")
    .text("You scored: " + correctAnswers + " out of " + questions.length);
  $(document).find(".quizContainer > .result").show();
  const name = prompt('You got a high score! Enter name:');
  const newScore = { correctAnswers , name };

}

function hideScore() {
  $(document).find(".result").hide();
}

// This displays the current question AND the choices
function viewResults() {
  if (currentQuestion == 10) {
    currentQuestion = 0;
    return false;
  }
  if (viewingAns == 1) {
    return false;
  }

  hideScore();
  var question = questions[currentQuestion].question;
  var questionClass = $(document).find(".quizContainer > .question");
  var choiceList = $(document).find(".quizContainer > .choiceList");
  var numChoices = questions[currentQuestion].choices.length;
  // Set the questionClass text to the current question
  $(questionClass).text(question);
  // Remove all current <li> elements (if any)
  $(choiceList).find("li").remove();
  var choice;

  for (i = 0; i < numChoices; i++) {
    choice = questions[currentQuestion].choices[i];

    if (iSelectedAnswer[currentQuestion] == i) {
      if (questions[currentQuestion].correctAnswer == i) {
        $(
          '<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' +
            i +
            ' name="dynradio" />' +
            " " +
            choice +
            "</li>"
        ).appendTo(choiceList);
      } else {
        $(
          '<li style="border:2px solid red;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' +
            i +
            ' name="dynradio" />' +
            " " +
            choice +
            "</li>"
        ).appendTo(choiceList);
      }
    } else {
      if (questions[currentQuestion].correctAnswer == i) {
        $(
          '<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" value=' +
            i +
            ' name="dynradio" />' +
            " " +
            choice +
            "</li>"
        ).appendTo(choiceList);
      } else {
        $(
          '<li><input type="radio" class="radio-inline" value=' +
            i +
            ' name="dynradio" />' +
            " " +
            choice +
            "</li>"
        ).appendTo(choiceList);
      }
    }
  }
  currentQuestion++;
  setTimeout(function () {
    viewResults();
  }, 3000);
}

function saveHighScore(score, highScores) {
  const name = prompt('You got a highscore! Enter name:');
  const newScore = { score, name };  
  // 1. Add to list
  highScores.push(newScore);
  // 2. Sort the list
  highScores.sort((a, b) => b.score - a.score);  
  // 3. Select new list
  highScores.splice(numberofHighScores);  
  // 4. Save to local storage
  localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
};
