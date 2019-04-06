
// set up the question number 
let questionNumber = 0;
//set up the score
let questionScore = 0;

function startQuestion (event){
    event.preventDefault();
   $('#h1Title').hide();
   $('#h2Title').hide();
   $('#js-button').hide();
   $("#newQuestion").text(1);
   generateNewQuestion();
  }

  function reset (event){
    event.preventDefault();
   $('#h1Title, #h2Title, #js-button').show();
   $('#question_container').html('');
   $("#newQuestion").text(1);
   questionNumber = 0;
   questionScore = 0;
  }

//render questions template 
function startTheQuiz(){
  $('#js-button').on('click', startQuestion);
};
//final version is on GitHub
//CSS formating does not look right. Keep working later;pull in questions
//new question format
function generateNewQuestion(){
  $("#question_container").html(
      `<section id = "questionPage">
      <div>
        <h2 class="header2"> ${STORE[questionNumber].question} </h2>
      </div>
        <div>
          <form id="QuestionChoices">
            <fieldset class = "questionFormat">
              <label class= "formSpan"><input type="radio"  value="${STORE[questionNumber].answers[0]}" name="Choice" checked> ${STORE[questionNumber].answers[0]} </input></label>
              <label class= "formSpan"><input type="radio"   value="${STORE[questionNumber].answers[1]}" name="Choice"> ${STORE[questionNumber].answers[1]} </input></label>
              <label class= "formSpan"><input type="radio"  value="${STORE[questionNumber].answers[2]}"name="Choice"> ${STORE[questionNumber].answers[2]} </input></label>
             <label class= "formSpan"><input type="radio"  value="${STORE[questionNumber].answers[3]}" name="Choice"> ${STORE[questionNumber].answers[3]} </input></label>
           </fieldset>
          </form>
          <div class="button">
            <button type="button" id="js_submit"> Submit </button>
          </div>
        </div> 
       </section>`
  );
       console.log('generateNewQuestion ran');
};

//what happened after hitting submit
function submitQuestion(){
  $('#question_container').on('click', '#js_submit',function(event){
    event.preventDefault();
    $('#questionPage').hide();
    feedbackGenerate();
  });
}
//Create a feedback
function feedbackGenerate(questionAnswer, questionInput){ 
   questionAnswer = STORE[questionNumber].correctAnswer;
   questionInput = $("input:checked").val();
   
    if (questionAnswer === questionInput){
      correctFeedback();
    } else 
    {
      incorrectFeedback();
    }
  console.log(`feedbackGenerate ran`);
  //switchQuestion();<redundant>
};
//what happened after clicking "next"
function switchQuestion(){
  $('#question_container').on('click','#js_next',function (event){
    event.preventDefault();
      $('#questionPage').hide();
    let i = questionNumber;
    if (i === STORE.length -1){
     finalResult();
     $("#newQuestion").text(10);

    } else if (i < STORE.length){
      changeQuestionNum();
      generateNewQuestion();
      i++;
    }
   
  }
  )
  console.log('switchQuestion ran');
};

//correct feedback
function correctFeedback(){
  let questionAnswer = STORE[questionNumber].correctAnswer;
$('#question_container').html(`<div class="questionFormat" id="feedBack"> <span class ="header2"> CORRECT! The answer is <span class="spanquestionAnswer"> ${questionAnswer} </span></span> </div>
      <div class="button">
        <button type="button" id="js_next"> Next </button>
       </div>`);
  changeScore();
};

//incorrect feedback
function incorrectFeedback(){
  const questionAnswer = STORE[questionNumber].correctAnswer;
  $('#question_container').html(`<div class="questionFormat"> <span class ="header2" id="feedBack"> SORRY! The answer is <span class="spanquestionAnswer">${questionAnswer}</span>. Try again later. </span> </div>
      <div class="button"><button type="button" id="js_next"> Next </button>
      </div>`);
};

//change the score after "Next"
function changeScore(){
questionScore++;
$("#newScore").text(questionScore);
};

//change question number
function changeQuestionNum() {
  questionNumber++;
  $("#newQuestion").text(questionNumber + 1);
   console.log(questionNumber);
};
//generate the final result
function finalResult(){
  //$('#question_container').hide("#questionPage");
  //$('#question_container').hide("#resultFooter");
 if(`${questionScore}` < 6) {
$('#question_container').html(`<div class="questionFormat"> <span class ="formSpan"> You have finished the quiz. <p class="enlarge">Final score: <em>${questionScore}</em></p><div>If you want to try again, click the button to restart! </div></span> </div>
      <div class="button"><button type="button" id="js_restart"> Restart </button>
       </div>`
  );
  $("#newScore").css({
 "color": "#f0ea94",
 //"font-size":"2em",
  });
 } else {
  $('#question_container').html(`<div class="questionFormat"> <span class ="formSpan"> Congratulations! You have finished the quiz. <p class="enlarge">Final score:  ${questionScore}.</p><div>If you want to try again, click the button to restart! </div></span> </div>
      <div class="button"><button type="button" id="js_restart"> Restart </button>
       </div>`
  );
  $("#newScore").css({
 "color": "#f0ea94",
  });
 };
  console.log('finalResult ran!');
  listenToreStart();
};

//
//restart
function listenToreStart(){
  $('#question_container').on('click','#js_restart', reset);
  console.log('reStart ran');
};


/*finalfunction*/

function calltheApp(){
  //renderQuestion();
  startTheQuiz();
  submitQuestion();
  switchQuestion();
}

$(calltheApp);
