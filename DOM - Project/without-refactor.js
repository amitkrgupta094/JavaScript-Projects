// give them 6 colors - first we give them constant color,then randomize it
var numbSquares = 6;
var colors = generateRandomColors(6);

// loop through all divs and giving them color
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");

easyBtn.addEventListener("click",function () {
    easyBtn.classList.add("selected");
    hardBtn.classList.remove("selected");
    numbSquares = 3;
    colors = generateRandomColors(numbSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for(var i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.background = colors[i];
        }else{
            squares[i].style.background = "none";
        }
    }
});

hardBtn.addEventListener("click",function () {
    easyBtn.classList.remove("selected");
    hardBtn.classList.add("selected");
    numbSquares = 6;
    colors = generateRandomColors(numbSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for(var i = 0; i < squares.length; i++) {
        squares[i].style.background = colors[i];
        squares[i].style.background = "block";
    }
});

resetButton.addEventListener("click",function () {
    // generate all new color
    colors = generateRandomColors(numbSquares);
    // pick a new random color
    pickedColor = pickColor();

    // change new color to match new pickedcolor
    colorDisplay.textContent = pickedColor;
    this.textContent = "New Colors";
    messageDisplay.textContent = "";
    // change colors of squares
    for(var i = 0; i < squares.length; i++){
        squares[i].style.background = colors[i];
    }
    h1.style.background = "steelblue";

});



colorDisplay.textContent = pickedColor;
for(var i = 0; i < squares.length; i++){
    // add initial colors to squares
    squares[i].style.background = colors[i];
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
