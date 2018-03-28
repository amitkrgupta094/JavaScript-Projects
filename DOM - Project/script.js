// give them 6 colors - first we give them constant color,then randomize it
var numbSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");


init();


function init(){
   setUpModeButtons();
   setUpSquares();
   reset();
}




function setUpModeButtons() {
    // Mode button event listeners
    for(var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click",function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");

            this.textContent === "Easy" ? numbSquares = 3: numbSquares = 6;
            reset();
        });
    }
}



function setUpSquares(){
    for(var i = 0; i < squares.length; i++){
        // add click listeners to squares
        squares[i].addEventListener("click", function(){
            // grab the color of cliked square
            var clickedColor = this.style.background;
            console.log(pickedColor, clickedColor);
            // compare to color to pickedColor
            console.log(clickedColor === pickedColor);
            if(clickedColor === pickedColor){
                messageDisplay.textContent ="Correct!";
                changeColor(pickedColor);
                h1.style.background = pickedColor;
                resetButton.textContent = "Play Again?";
            } else {
                this.style.background = "#232323";
                message.textContent = "Try Again"
            }
        })
    }
}


function reset(){
    // generate all new color
    colors = generateRandomColors(numbSquares);
    // pick a new random color
    pickedColor = pickColor();

    // change new color to match new pickedcolor
    colorDisplay.textContent = pickedColor;


    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";
    // change colors of squares
    for(var i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.background = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    h1.style.background = "steelblue";
}


resetButton.addEventListener("click",function () {
    reset();
});

function changeColor(color){
    //loop over all the divs
    for(var i = 0; i < squares.length; i++){
        // change the color of every divs
        squares[i].style.background = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random()*colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    // make an array
    var arr = [];
    for(var i = 0; i < num; i++){
        //get random color and push into arr
        arr.push(randomColor());
    }
    // return that array
    return arr;
}

function randomColor(){
    // pick a "red" from 0-255
    var r =  Math.floor(Math.random()*256);
    // pick a "green" from 0-255
    var g =  Math.floor(Math.random()*256);
    // pick "blue" from 0-255
    var b =  Math.floor(Math.random()*256);

    return  "rgb(" + r + ", " + g + ", " + b + ")";

}

// nuances css automatically adds spaces beween numbers inside rgb
