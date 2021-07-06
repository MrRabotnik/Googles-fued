document.onload(function(){
    
})

// ========================= Starting the game ======================= //
$(".start_btn").click(function(){
    $(".starting_page").fadeOut("slow")
})


//======================== GETTING QUESTIONS ======================//
let questions = [
    ["How can we ...", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    ["How is this ...", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";"],
    ["How we should ...", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
]

// ==================== Filling Answers and Question=======================//
//question,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9
let i = 0
function filling_Answers_Questions(questions[i]){
    $(".question_container").html(questions[i][0])
    $(".real_answers0").html(questions[i][1])
    $(".real_answers1").html(questions[i][2])
    $(".real_answers2").html(questions[i][3])
    $(".real_answers3").html(questions[i][4])
    $(".real_answers4").html(questions[i][5])
    $(".real_answers5").html(questions[i][6])
    $(".real_answers6").html(questions[i][7])
    $(".real_answers7").html(questions[i][8])
    $(".real_answers8").html(questions[i][9])
    $(".real_answers9").html(questions[i][10])
}

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
        if (questions_list[i].includes(guess)) {
            index = answers_list.indexOf(guess)
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
                    setTimeout(function(){alert("WOOOOOOOW")},1500)
                    reset();
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
                reset();
                $(".closing_icon2").css("display","block");
                setTimeout(function(){$(".closing_icon2").css("display","none");},1500)

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
//======================== RESETING EVERYTHING ======================//
function reset(){
    oppened = 0;
    minutes = 0;
    seconds = 0;
    $(".score").html("----")
    $(".removing_divs").animate({width:"100%"},"2s");
    $(".removing_divs").html("")
    $(".removing_divs").css("color","white")
    setTimeout(fillingScores,1000);
    score = 0;
}
