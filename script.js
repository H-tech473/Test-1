
// Timer
var min = 50, sec =2;
setTimeout(function next(){
    if(sec === 0){
        sec = 59;
        min--;
    }else{
        sec--;
    }
    if(min == 0){
        $(".timer").css("color","#ff3333")
    }
    $(".timer").empty();
    $(".timer").append(`${min}m : ${sec}s`);
    if((min > 0 || sec > 0) && an+un < ques.length) setTimeout(next, 1000);
    else{
        $("*").css("pointer-events","none");
        $(".done").css("pointer-events","all");
        $(".submit").css("z-index","-1");
        $(".selected").removeClass("selected");
        for(let j=an+un;j<ques.length;j++){
            li[j] = "n";
            $(`.n${j+1}`).css("background-color","#ff7276");
        }
        if(an+un != ques.length){
            un = -(an+un) + ques.length;
            $(".unansweredq").empty();
            $(".unansweredq").append(un);
        }
    }
}, 1000);

// Questions
const ques = ["Who was the First Prime Minister Of Great Britain?",
"Name of Worlds Rainiest Spot?",
"Who was the First Female President of England?",
"What is the National Sport of China?",
"Which country won first world cup in football?"];

const op = [["A. George Washington", "B. Dwight David Eisenhower","C. Roald Amundson", "D. Robert Walpole"],
["A. Indore", "B. Bangaluru","C. Mawsynram","D. Itanagar"],
["A. Jessica Meir","B. Margerat Thatcher","C. Chritina koch","D. Ann Bancroft"],
["A. Cricket","B. Hockey","C. Football","D. Table Tennis"],
["A. England","B. India","C. Uruguay","D. Greece"]];

const marks = [2,.5,0];

var cc = [], i=0;
while(cc.length != ques.length){
    var tt = true;
    i = Math.floor(Math.random()*ques.length);
    for(let j = 0;j<cc.length; j++){
        if(cc[j] == i && i < op.length){
            tt = false;
            break;
        }
    }
    if(tt) cc[cc.length] = i;
}

// Choices
$(".ch").click(function(){
    $(".chsel").removeClass("chsel");
    $(this).addClass("chsel");
});
$(".chsel").click(function(){
    $(this).removeClass("chsel");
});

// Clear
$(".clear").click(function(){
    $(".chsel").removeClass("chsel");
});

// Submit
var an = 0, un = 0, li = [];
$(".submit").css("z-index","5");
$(".answeredq, .unansweredq").empty();
$(".answeredq, .unansweredq").append("0");
$(".submit").click(function(){
    $("*").css("pointer-events","none");
    if((an+un) < ques.length){
        li[an+un] = "";
        if($(".ch").hasClass("chsel")){
            if($(".chsel").hasClass("ch1")) li[an+un] = li[an+un]+"a";
            if($(".chsel").hasClass("ch2")) li[an+un] = li[an+un]+"b";
            if($(".chsel").hasClass("ch3")) li[an+un] = li[an+un]+"c";
            if($(".chsel").hasClass("ch4")) li[an+un] = li[an+un]+"d";
            $(".chsel").removeClass("chsel");
            an++;
            $(".answeredq").empty();
            $(".answeredq").append(an);
            $(`.n${an+un}`).css("background-color","#90ee90");
        }else{
            li[an+un] = "n";
            un++;
            $(".unansweredq").empty();
            $(".unansweredq").append(un);
            $(`.n${an+un}`).css("background-color","#ff7276");
        }
    $("*").css("pointer-events","all");
    $(".selected").removeClass("selected");
    if(question < ques.length-1)question++;
    assign();
    $(`.n${an+un+1}`).addClass("selected");
    }
    if((an+un) == ques.length){
        $("*").css("pointer-events","none");
        $("form").css("z-index","5");
        $(".done").css("pointer-events","all");
        $(".submit").css("z-index","-1");
        $(".selected").removeClass("selected");
    }
});

$(".done").click(function(){
});

// question numbers
var lvl = 0, aaa = ques.length;
function num(){
    if(aaa <= 4)
{
    $(".up, .down").css("opacity",".4");
    $(".up, .down").css("pointer-events","none");
    var numbers = "";
    for(let j = 1; j<=aaa; j++){
        numbers += `<div class="nn n${j}">${j}</div>`;
    }
    $(".numbered").append(numbers);
    $(".n1").addClass("selected");
}else if(aaa-4*lvl > 4){
    if(lvl == 0){
        $(".up").css("opacity",".4");
        $(".up").css("pointer-events","none");
    }
    $(".down").css("opacity","1");
    $(".down").css("pointer-events","all");
    var numbers = "";
    for(let j = 4*lvl+1; j<=4*lvl+4; j++){
        numbers += `<div class="nn n${j}">${j}</div>`;
    }
    $(".numbered").append(numbers);
    $(".n1").addClass("selected");
}else{
    
    $(".down").css("opacity",".4");
    $(".down").css("pointer-events","none");
    $(".up").css("opacity","1");
    $(".up").css("pointer-events","all");
    var numbers = "";
    for(let j = 4*lvl+1; j<=aaa; j++){
        numbers += `<div class="nn n${j}">${j}</div>`;
    }
    $(".numbered").append(numbers);
    $(".n1").addClass("selected");
}
}
num();

// Arrow buttons
$(".down").click(function(){
    if(lvl < Math.floor(aaa/4)){
        lvl++;
        $(".numbered").empty();
        num();
        $(".up").css("opacity","1");
        $(".up").css("pointer-events","all");
    }
});
$(".up").click(function(){
    if(lvl > 0){
        lvl--;
        $(".numbered").empty();
        num();
        $(".up").css("opacity","1");
        $(".up").css("pointer-events","all");
    }
    if(lvl == 0){
        $(".up").css("opacity",".4");
        $(".up").css("pointer-events","none");
    }
});

// Assigning Questions
var question = 0;
function assign(){
    $(".no1").empty();
    $(".no1").append(`${question+1}`);
    $(".no2 span").empty();
    $(".no2 span").append(`${question+1}`);
    $("p").empty();
    $("p").append(`${ques[cc[question]]}`);
    $(".ch").empty();
    for(let j=1; j<=4; j++){
        $(`.ch${j}`).append(op[cc[question]][j-1]);
    }
}
assign();