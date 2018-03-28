document.querySelector('.get-jokes').addEventListener('click',getJokes);

function getJokes(e) {
    const number = document.querySelector('input[type="number"]').value;
    const xhr = new XMLHttpRequest();
    xhr.open('GET',`https://api.icndb.com/jokes/random/${number}`, true);
    
    xhr.onload = function(){
        if(xhr.status === 200) {
            const response = JSON.parse(this.responseText);
            
            let output = '';

            if(response.type === 'success' && (response.value instanceof Array) ) {
                console.log(response.value);
                response.value.forEach(function(joke) {
                    output +=`<li>${joke.joke}</li><hr>`;
                });
            } else {
                output += '<li>Something went wrong</li>';
            }

            document.querySelector('.jokes').innerHTML = output;
			
        }   
    }
    xhr.send();

    e.preventDefault();

}



















































/*
Every API is different and have documents.
http://www.icndb.com/api/
*/


