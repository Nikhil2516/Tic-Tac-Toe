const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const btngame = document.querySelector(".btn-game");

let currentPlayer;
let gameGrid;

const winningPosition = [[0,1,2],
                        [3,4,5],
                        [6,7,8],
                        [0,3,6],
                        [1,4,7],
                        [2,5,8],
                        [0,4,8],
                        [2,4,6]];



function intialize()
{
    currentPlayer = 'X';
    gameGrid = ["","","","","","","","",""]; //only update array not ui

    //Update UI game-grid to make boxes empty
    boxes.forEach((box,index) => {
        //to make box empty
        box.innerText = "";
        //to on pointer effect
        box.style.pointerEvents = "all";
        //intialize all box class again to remove win class 
        //romove bg-color 
        box.classList = (`box box${index+1}`);
    });

    let currplayer =  `Current Player - ${currentPlayer}`;

    gameinfo.innerText = currplayer;
    btngame.classList.remove("active");
}

//when page launch it will first intialize screen
intialize();

//swapping player after each successful turn
function swapPlayer(){
    //check who is currently playing
    if(currentPlayer === "X")
    {
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }

    let player = `Current Player - ${currentPlayer}`;
    gameinfo.innerText = player;
};


function checkGameOver()
{
    let answer = "";

    winningPosition.forEach((position) => {
        if((gameGrid[position[0]]!=="") && (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]]))
        {
            if(gameGrid[position[0]]==="X")
            {
                answer = "X";
            }
            else
            {
                answer = "O";
            }

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

             //now we know X/O is a winner
             console.log("Error = ");
             console.log(boxes[position[0]]);
             console.log(boxes[position[1]]);
             console.log(boxes[position[2]]);

             boxes[position[0]].classList.add("win");
             boxes[position[1]].classList.add("win");
             boxes[position[2]].classList.add("win");
        }
    });

    //if we have winner
    if(answer!="")
    {
        let player = `Winner Player - ${answer}`;
        gameinfo.innerText = player;
        btngame.classList.add("active");
        return;
    }

    let count = 0;
    
    gameGrid.forEach((value) => {
        if(value!=="")
        {
            count++;
        }
    });

    //board is fill and no one will win
    if(count===9)
    {
        gameinfo.innerText = "Game Tie !"; 
        btngame.classList.add("active");
    } 
}




// to handle click event for box
function handleClick(index)
{
    if(gameGrid[index]==="")
    {
        //to fill value in click box
        boxes[index].innerText = currentPlayer; //to update on UI
        gameGrid[index] = currentPlayer; //to update in array for verify

        //make markbox unclickable
        boxes[index].style.pointerEvents = "none";

        //Swap player 
        swapPlayer();

        //check Game is over either tie or win
        checkGameOver(); 
    }
}

//add event Listener to all boxex
boxes.forEach((box,index) => {
    
    box.addEventListener("click", () => {
        // console.log("click"+index);
        handleClick(index);
    })
});


//after game finish
btngame.addEventListener("click",intialize);