const buttons = document.querySelectorAll('input[type="button"]');
const display = document.getElementById('display');

    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener('click',function(){
            if(this.value === "C") {
                display.value  = '';
            }else if(this.value === '='){
                display.value = eval(display.value);
            }else if(this.value === "x") {
                display.value += '*';
            }else if(this.value === "÷") {
                console.log(this.value);
                display.value += '/';
            }
            else {
                display.value += this.value;
            } 
        });
    }
