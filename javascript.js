const options=document.querySelector(".options").children;
const answerTrackerContainer=document.querySelector(".answers-tracker");
const questionNumberSpan=document.querySelector(".question-num-value");
const totalQuestionSpan=document.querySelector(".total-question");
const question=document.querySelector(".question");
const correctAnswerSpan=document.querySelector(".correct-answers");
const totalQuestionSpan2=document.querySelector(".total-question2");
const percentage=document.querySelector(".percentage");

const op1=document.querySelector(".option1");
const op2=document.querySelector(".option2");
const op3=document.querySelector(".option3");
const op4=document.querySelector(".option4");

let questionIndex;
let index=0;

let myArray=[];
let myArr=[];
let score=0;

const questions=[
{
	q:'What is a CMS in web design?',
	options:['Content Management System','Creative Management System','Content Mixing System','Creatives Managerial System'],
	answer:0
},
{
	q:'To make your website mobile friendly, you can make your website',
	options:['Responsive','Reactive','Fast Loading','Light'],
	answer:0
},
{
	q:'What does CSS stand for?',
	options:['Current Style Sheets','Current Sheets Style','Cascading Style Sheets','Cascading Sheets Style'],
	answer:2
},
{
	q:'Which of the following statements is false?',
	options:['You can make a website without using HTML','You can make a website without using PHP','You can make a website without using CSS','You can make a website without using Javascript'],
	answer:0
},
{
	q:'Which of the following is true about Javascript?',
	options:['It is a server side scripting language','It is client side scripting language','It is a Software','It is a database'],
	answer:1
}
]

totalQuestionSpan.innerHTML=questions.length;

function load()
{
	questionNumberSpan.innerHTML=index+1;
	question.innerHTML=questions[questionIndex].q;
	op1.innerHTML=questions[questionIndex].options[0];
	op2.innerHTML=questions[questionIndex].options[1];
	op3.innerHTML=questions[questionIndex].options[2];
	op4.innerHTML=questions[questionIndex].options[3];
	index++;

}

function check(element)
{
	if(element.id==questions[questionIndex].answer){
		element.classList.add("correct");
		updateAnswerTracker("correct")
		score++;
	}
	else
	{
		element.classList.add("wrong");	
		updateAnswerTracker("wrong")
	}
	disabledOptions()
}

function disabledOptions(){
for(let i=0;i<options.length;i++)
{
	options[i].classList.add("disabled");
	if(options[i].id==questions[questionIndex].answer)
	{
		options[i].classList.add("correct");
	}
}
}

function enableOptions(){
for(let i=0;i<options.length;i++)
{
	options[i].classList.remove("disabled","correct","wrong");
}
}
function randomQuestion()
{
	let randomNumber=Math.floor(Math.random()*questions.length);
	let hitDuplicate=0;
	if(index==questions.length)
	{
		quizOver();
	}
	else{
		if(myArray.length>0)
		{
			for(let i=0;i<myArray.length;i++)
			{
				if(myArray[i]==randomNumber)
				{
					hitDuplicate=1;
					break;
				}
			}
			if(hitDuplicate==1)
			{
				randomQuestion();
			}
			else
			{
				questionIndex=randomNumber;
				load();
				myArr.push(questionIndex);		
			}
		}
		if(myArray.length==0)
		{
			questionIndex=randomNumber;
			load();
			myArr.push(questionIndex);
		}
	myArray.push(randomNumber);
	}
}

function answerTracker()
{
	for(let i=0;i<questions.length;i++)
	{
		const div=document.createElement("div");
		answerTrackerContainer.appendChild(div);
	}

}

function next()
{
	if(!options[0].classList.contains("disabled"))
	{
		alert("Please select one option!")
	}
	else
	{
		enableOptions();
		randomQuestion();
	}
}

function updateAnswerTracker(classNam){
	answerTrackerContainer.children[index-1].classList.add(classNam);
}

function quizOver()
{
	document.querySelector(".quiz-over").classList.add("show");
	correctAnswerSpan.innerHTML=score;
	totalQuestionSpan2.innerHTML=questions.length;
	percentage.innerHTML=(score/questions.length)*100 + "%";
}

function tryAgain()
{
	window.location.reload();
}

window.onload=function()
{
	randomQuestion();
	answerTracker();
}