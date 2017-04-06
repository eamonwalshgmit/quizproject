var pos = 0, test, test_status, question, choice, choices, choiceA, choiceB, choiceC, choiceD, correct=0, name = 0; 
//setting variables

//Set array to hold answers
var quizAnswers = [];

var questions=[
    {
	    question: "What is 99 divided by 3?",//question
	    correctAnswer: "33",//right answer to question
        
        //list of multiple choice answers
	    answer0: "30",
	    answer1: "33",
	    answer2: "36",
        answer3: "39"
	},
    {
	    question: "What is 34 multiplied by 2?",//question
	    correctAnswer: "68",//right answer to question
        
        //list of multiple choice answers
	    answer0: "64",
	    answer1: "66",
	    answer2: "68",
        answer3: "62"
	},
    {
	    question: "What is 25% of 200?",//question
	    correctAnswer: "50",//right answer to question
        
        //list of multiple choice answers
	    answer0: "100",
	    answer1: "80",
	    answer2: "50",
        answer3: "25"
	},
    {
	    question: "What is one third of 900?",//question
	    correctAnswer: "300",//right answer to question
        
        //list of multiple choice answers
	    answer0: "100",
	    answer1: "300",
	    answer2: "150",
        answer3: "200"
	}
];

/*
var questions=[
    ['What is 99 divided by 3?', 30, 33, 36, "B"],
    ['What is 34 multiplied by 2?', 36, 68, 66, "B"],
    ['What is 25% of 200?', 100, 80, 50, "C"],
    ['What is one third of 900?', 100, 300, 150, "B"],
    ['What is 5 multiplied by 25?', 100, 150, 125, "C"],
    ['Divide 4/8 by 0.5.', 0.25, 2.25, 0.5, "A"],
    ['Multiply 0.75 by 100. ', 75, 25, 50, "A"],
    ['What is 40% of 200?', 40, 80, 60, "B"],
    ['Take 39 away from 92.', 43, 53, 63, "B"],
    ['What is 66x2?', 122, 132, 120, "B"]
]; */

//function which takes an array and shuffles its contents
//used to get different order of multiple choice answers every time quiz is taken
function shuffleArray(array) 
{
	for (var i = array.length - 1; i > 0; i--) 
	{
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
	}
	return array;
}

//Above I have set my questions, 3 multi-choice answers and the answers in an multi-dimensional array, zero indexed
function _(x)
{ 
    return document.getElementById(x);
} 
//Setting underscore equal to document.getElementById
		
function percent()
{
    var perc = Math.round((correct/questions.length)*100);
    return perc;//gets percentage and returns to form
}

function renderQuestion()
{ 
    test = _("test"); 
    if(pos >= questions.length)//If position is greater or equal to the length of question, ie 20
    { 
        test.innerHTML = "<h2>You got "+correct+" of "+questions.length+" questions correct (" +percent() + "%)</h2>";//Print # correct out of 20
        _("test_status").innerHTML += "  Thank you for completing the quiz";//Print "thank you .... "
        pos = 0;
        correct = 0; 
        return false; 
    }

    _("test_status").innerHTML = "Question "+(pos+1)+" of "+questions.length;
    //Print questions and increment by one each iteration

    var bar=document.getElementById("progressBar");//Progress bar value
    bar.value = (pos+1);//Progress bar increments as we go through questions, starts at 1

    //console.log("Pos value is " + pos);//write this to console

    //push all potential answers to the quizAnswers array
    quizAnswers[0] = questions[pos].answer0;
    quizAnswers[1] = questions[pos].answer1;
    quizAnswers[2] = questions[pos].answer2;
    quizAnswers[3] = questions[pos].answer3;
    
    console.log("Unshuffled answers" + quizAnswers);
    
    //Shuffle the answers
    var shuffledAnswers = shuffleArray(quizAnswers);
    
    console.log("Shuffled answers" + shuffledAnswers);
    
    question = questions[pos].question;//question is in position 0 in the array(zero indexed)
    choiceA = shuffledAnswers[0]; //choice A is in position 1 in the array
    choiceB = shuffledAnswers[1]; //choice B is in position 2 in the array
    choiceC = shuffledAnswers[2]; //choice C is in position 3 in the array
    choiceD = shuffledAnswers[3]; //choice D is in position 4 in the array
    
    test.innerHTML = "<h3>"+question+"</h3>"; //questions are written in h3 size
    test.innerHTML += "<input type='radio' name='choices' value='"+choiceA+"' checked> "+choiceA+"<br>"; //Radio button
    test.innerHTML += "<input type='radio' name='choices' value='"+choiceB+"'> "+choiceB+"<br>"; //Radio button
    test.innerHTML += "<input type='radio' name='choices' value='"+choiceC+"'> "+choiceC+"<br>"; //Radio button
    test.innerHTML += "<input type='radio' name='choices' value='"+choiceD+"'> "+choiceD+"<br><br>"; //Radio button
    test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";//on clicking submit button, it checks your answers
}
		
		
function checkAnswer()
{ 
    choices = document.getElementsByName("choices"); //Creates an array
    for(var i=0; i<choices.length; i++)//variable i=0, when i is less than the length of the choices, increment it by one
    { 
        if(choices[i].checked) //if a choice is checked
        { 
            choice = choices[i].value; //Take the value of that choice and put it into choice
        }
    } 
    console.log("Chosen answer is " + choice);
    if(choice == questions[pos].correctAnswer)//If the value of choices is equal to the answer
    { 
        alert('Correct!');//Alert correct
        correct++;//Increment your correct answers by one
    }
    else//or else
    {
        alert('Sorry wrong answer. The correct answer is ' + questions[pos].correctAnswer);
    } 
    pos++; //Increment position by one ie go on to the next question
    
    renderQuestion(); //go to render question again
}

//Call the question with an event handler
window.addEventListener("load", renderQuestion, false);