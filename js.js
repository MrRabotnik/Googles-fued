// ========================= Starting the game ======================= //
$(".start_btn").click(function(){
    $(".starting_page").fadeOut("slow")
})


//======================== GETTING QUESTIONS ======================//
let questions = [
    ["Numbers from 1 to 10 ?"],
    ["Letters from a to j ?"],
    ["Why is my girlfriend so ...?"],
    ["Can pigs eat ... ?"],
    ["Why do people ... ?"]
]

//======================== GETTING QUESTIONS ======================//
let answers = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    ["mean to me", "cute", "clingy","annoying", "insecure", "emotional", "amazing", "sensitive", "jealous", "mean"],
    ["chocolate", "humans", "grapes","bananas", "tomatoes", "onions", "watermelon", "watermelon rind", "potatoes", "oranges"],
    ["snore", "yawn", "cheat","say bless you", "have sex", "get hiccups", "lie", "smoke", "talk in their sleep", "eat corn starch"],
]

// ==================== Filling Answers and Question=======================//
let i = 0;
function filling_Answers_Questions(questions,answers){
    $(".question_container").html(questions[i])
    $(".real_answers0").html(answers[i][0])
    $(".real_answers1").html(answers[i][1])
    $(".real_answers2").html(answers[i][2])
    $(".real_answers3").html(answers[i][3])
    $(".real_answers4").html(answers[i][4])
    $(".real_answers5").html(answers[i][5])
    $(".real_answers6").html(answers[i][6])
    $(".real_answers7").html(answers[i][7])
    $(".real_answers8").html(answers[i][8])
    $(".real_answers9").html(answers[i][9])
}

filling_Answers_Questions(questions, answers);

// ==================== Filling Scores and Guesses =======================//
let guesses = 3;
$(".guesses").html(guesses)
function fillingScores(){
    let j = 0;
    for(let i = 9;i>=
        0;i--){
        $(".removing_divs" + j).html((i+1)*1000)
        j++;
    }
}
fillingScores()
//================ CHECKING ENTER KEY PRESS =================//
let index;
let score = 0;
let oppened = 0;
$(".answers_input").on('keypress',function(e) {
    if(e.which == 13) {
        let guess = $(".answers_input").val();
        // Cheking if the guess in answers //
        if (answers[i].includes(guess)) {
            index = answers[i].indexOf(guess)
            let removing_divs = $(".removing_divs" + index);
            if ($(".removing_divs" + index).html() == 0) {
                $(".real_answers" + index).toggleClass("margat");
                setTimeout(function(){$(".real_answers" + index).toggleClass("margat")},1000)
            }else{
                removing_divs.animate({width:0,display:"none"},1000);
                score += parseInt(removing_divs.html());
                removing_divs.html(0)
                removing_divs.css("color","transparent")
                asigningScore(score)
                //===== IF OPPENED =======//
                oppened++;
                if (oppened == 10) {
                    setTimeout(function(){
                        alert("WOOOOOOOW")
                        next();
                        reset();
                    },1500)
                }
            }
        }else{
            //=================== Decreasing Guesses ====================/
            guesses--;
            $("#guesses_box").toggleClass("shaking");

            setTimeout(function(){$("#guesses_box").toggleClass("shaking")},1000)
            if (guesses == 0) {
                // ================ Reseting All ================ //
                guesses = 3;
                $(".guesses").css("color","green");
                showAllAnswers();
                $(".closing_icon").css("display","block");
                setTimeout(function(){$(".closing_icon").css("display","none");},1500)

            }else if(guesses == 2){
                $(".guesses").css("color","#f6f578");
                $(".closing_icon").css("display","block");
                setTimeout(function(){$(".closing_icon").css("display","none");},1000)
            }else if(guesses == 1){
                $(".guesses").css("color","red");
                $(".closing_icon").css("display","block");
                setTimeout(function(){$(".closing_icon").css("display","none");},1000)
            }
            $(".guesses").html(guesses);

        }
        $(".answers_input").val("");

    }
});
//========================== Start Timer===========================//

let startTime;
let started = true;
$(".answers_input").click(function(){
    if(started){
        $(".time").html("0" + minutes + ":" + "0" + seconds);
        startTime = setInterval(startSeconds,1000);
        started = false;
    }
})


//========================= Start Timer function ===================== //
let seconds = 0;
let minutes = 0;
function startSeconds(){

    seconds++;
    if(minutes <= 9 && seconds <= 9){
        $(".time").html("0" + minutes + ":0" + seconds);
    }else if(minutes <= 9 && seconds > 9){
        $(".time").html("0" + minutes + ":" + seconds);
    }else if(minutes > 9 && seconds > 9){
        $(".time").html(minutes + ":" + seconds);
    }else if(minutes > 9 && seconds <= 9){
        $(".time").html(minutes + ":0" + seconds);
    }
    if (seconds == 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes == 60 && seconds == 0) {
        alert("Your Time Is Out");
        clearInterval(startTime);
        $(".time").html("--:--");
        minutes = 0
        seconds = 0
        started = true
    }
}
//======================== ASIGNING SCORE ======================//
function asigningScore(score){
    $(".score").html(score)
}


//======================== SHOWING ANSWERS ======================//
function showAllAnswers(){
    oppened = 0;
    minutes = 0;
    seconds = 0;
    $(".score").html("- - - -")
    $(".removing_divs").animate({width:"0%"},"2s")
    $(".removing_divs").html("")
    $(".removing_divs").css("color","white")
    score = 0
}

//======================== RESETING EVERYTHING ======================//
function reset(){
    oppened = 0;
    minutes = 0;
    seconds = 0;
    $(".score").html("- - - -")
    $(".removing_divs").animate({width:"100%"},"2s")
    $(".removing_divs").html("")
    $(".removing_divs").css("color","white")
    setTimeout(fillingScores,500)
    score = 0
    // guesses = 3;
    filling_Answers_Questions(questions, answers)
}

$("#reset").click(reset);
//======================== SHOWING NEXT QUESTION ======================//
function next() {
    i++;
    if(answers[i] == undefined){
        i = 0;
    }
}

$("#next").click(() => {
    next();
    reset();
});