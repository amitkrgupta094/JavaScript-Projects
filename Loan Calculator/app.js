// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    // Hide results
    document.querySelector('.results').style.display = 'none';

    // Show loader
    document.querySelector('#loading').style.display = 'block';
    
    setTimeout(calculateResults, 2000);
    e.preventDefault();
});

// Caluclate Results
function calculateResults() {
    console.log('Caluclating...');;

    // UI Vars
    const amount = document.getElementById('amount');
    const interst = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculateInterest = parseFloat(interst.value) / 100 / 12;
    const calculatePayments = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculateInterest, calculatePayments);
    const monthly =(principal*x*calculateInterest)/(x-1);
    
    // Checking if monthly value if finite or not
    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatePayments).toFixed(2);
        totalInterest.value = ((monthly * calculatePayments) - principal).toFixed(2);
        
        // Show results
        document.querySelector('.results').style.display = 'block';

        // Hide loader
        document.querySelector('#loading').style.display = 'none';
    } else {
        // Show error when input is not correct
        showError('Please check your numbers');
    }
    
}

// Show Error
function showError(error){

    // Hide results
    document.querySelector('.results').style.display = 'none';

    // Hide loader
    document.querySelector('#loading').style.display = 'none';

    //Create a div
    const errorDiv = document.createElement('div');
    
    // Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add bts class to look it red
    errorDiv.className ='alert alert-danger';

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv,heading);

    // Clear error after 3 seconds
    setTimeout(clearError, 3000);
}

// Clear error
function clearError(){
    document.querySelector('.alert').remove();
}