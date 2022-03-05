
// Array of deck of card images 
const deckCards=["1.webp","1.webp","2.webp","2.webp","3.webp","3.webp","4.webp","4.webp","5.webp","5.webp","6.webp","6.webp","7.webp","7.webp","8.webp","8.webp"];

// Global arrays


// Access the <ul> with class of .deck 
const deck=document.querySelector(".deck");

// Create an empty array to store the opened cards 
let opened=[];

// Create an empty array to store the matched cards
let matched=[];

//Access the modal
const modal=document.getElementById("modal");

//Access the reset button
const reset=document.querySelector(".reset-btn");

//Access the play again button
const playAgain=document.querySelector(".play-again-btn");

//Select the class moves-counter and change it's html
const movesCount=document.querySelector(".moves-counter");

//Create variable for moves counter , start the count from zero
let moves=0;
const star=document.getElementById("star-rating").querySelectorAll(".star");

let starCount=3;

const timeCounter=document.querySelector(".timer");

let time;

let minutes=0;
let seconds=0;
let timeStart=false;

function shuffle(array){
    let currentIndex=array.length, temporaryValue, randomIndex;
    while(currentIndex!==0){
        randomIndex=Math.floor(Math.random()*currentIndex);
        // console.log(randomIndex);
        currentIndex-=1;
        temporaryValue=array[currentIndex];
        array[currentIndex]=array[randomIndex];
        array[randomIndex]=temporaryValue;
    }
    // console.log(array);
    return array;
}


function startGame(){
    //Invoke shuffle function and store in variable
    const shuffledDeck=shuffle(deckCards);
    //Iterate over deck of cards array
    for(let i=0;i<shuffledDeck.length;i++){
        //Create the <li> tags
        const liTag=document.createElement('LI');
        //Give <li> class of card
        liTag.classList.add('card');
        //Create the <img> tags
        const addImage=document.createElement("IMG");
        //Append <img> to <li>
        liTag.appendChild(addImage);
        //Set the img src path with shuffled deck
        addImage.setAttribute("src","images/"+shuffledDeck[i]);
        //Add an alt tag to the image
        addImage.setAttribute("alt","Emoji");
        //Update the new <li> to the deck <ul>
        deck.appendChild(liTag);
    }
}

startGame();

function removeCard(){
    while(deck.hasChildNodes()){
        deck.removeChild(deck.firstChild);
    }
}

function timer(){
    time=setInterval(function(){
        seconds++;
        if(seconds===60){
            minutes++;
            seconds=0;
        }
        timeCounter.innerHTML="<i class='fa fa-hourglass-start'></i>"+"Timer:"+minutes+"Mins"+seconds+"Secs" ;
    },1000);
}

function stopTime(){
    clearInterval(time);
}

function resetEverything(){
    stopTime();
    timeStart=false;
    seconds=0;
    minutes=0;
    timeCounter.innerHTML="<i class='fa fa-hourglass-start'></i>"+"Timer: 00:00";
    //Reset start count and the add the class back to show stars again
    star[1].firstElementChild.classList.add("fa-star");
    star[2].firstElementChild.classList.add("fa-star");
    starCount=3;
    //Reset moves count and reset its innerHtml
    moves=0;
    movesCount.innerHTML=0;
    //clear both arrays that hold the opened and matched cards
    matched=[];
    opened=[];
    //Clear the deck
    removeCard();
    //Create a new deck
    startGame();
    
}

function movesCounter(){
    movesCount.innerHTML++;
    moves++;
}

function starRating(){
    if(moves===14){
        star[2].firstElementChild.classList.remove("fa-star");
        starCount--;
    }
    if(moves===18){
        star[1].firstElementChild.classList.remove("fa-star");
        starCount--;
    }

}

//Compare two cards to see if they match or not 
function compareTwo(){
    //When there are 2 cards in the opened array 
    if(opened.length===2){
        console.log("In compare length=2")
        console.log(opened[0].src);
        console.log(opened[1].src);
        document.body.style.pointerEvents="none";
    }
    if(opened.length===2 && (opened[0].src===opened[1].src)){
        console.log("In compare length=2 and match");
        match();
    }else if(opened.length===2 && (opened[0].src!==opened[1].src)){
        console.log("In compare length=2 and nomatch");
        noMatch();
    }
}

function match(){
    setTimeout(function(){
        opened[0].parentElement.classList.add("match");
        // evt.target.classList.add("flip");
        console.log(opened[0]);
        opened[1].parentElement.classList.add("match");
        matched.push(...opened);
        document.body.style.pointerEvents="auto";
        winGame();
        opened=[];
    },600);
    movesCounter();
    starRating();
}

function noMatch(){
    setTimeout(function() {
        opened[0].parentElement.classList.remove("flip");
        console.log(opened[0]);
        opened[1].parentElement.classList.remove("flip");
        document.body.style.pointerEvents="auto";
        opened=[];
        
    }, 700);
    movesCounter();
    starRating();
}

function AddStats(){
    const stats=document.querySelector(".modal-content");
    for(let i=1;i<=3;i++){
        const statsElement=document.createElement("p");
        statsElement.classList.add("stats");
        stats.appendChild(statsElement);
    }
    let p=stats.querySelectorAll("p.stats");
    p[0].innerHTML="Time to complete:"+minutes+" Minutes and "+seconds+"Seconds";
    p[1].innerHTML="Moves Taken: "+moves;
    p[2].innerHTML="Your start rating:"+starCount+"out of 3";

}

function displayModal(){
    const modalClose=document.getElementsByClassName("close")[0];
    modal.style.display="block";
    modalClose.onclick=function(){
        modal.style.display="none";
    };
    window.onclick=function(event){
        if(event.target===modal){
            modal.style.display="none";
        }
    };
}

function winGame(){
    if(matched.length===16){
        stopTime();
        AddStats();
        displayModal();
    }
}

deck.addEventListener("click",function(evt){
    if(evt.target.nodeName==="LI"){
        console.log(evt.target.nodeName+" was clicked");
        if(timeStart===false){
            timeStart=true;
            timer();
        }
        flipCard();
    }
    function flipCard(){
        evt.target.classList.add("flip");
        addToOpened();
        // console.log("In flipcard");
    }
    function addToOpened(){
        // console.log("In addtoopen")
        if(opened.length===0||opened.length===1){
            opened.push(evt.target.firstElementChild);
            // console.log("Hello");
        }
        compareTwo();
    }
});


reset.addEventListener('click',resetEverything);
playAgain.addEventListener('click',function(){
    modal.style.display="none";
    resetEverything();
});


