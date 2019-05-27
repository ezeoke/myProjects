//listen for click
document.getElementById('calculate').addEventListener('click', function(e){
      //hide results
    document.getElementById('results').style.display = 'none';
   
    //show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculate, 2000);
    
    e.preventDefault();
});

//calculate result
function calculate(){
   console.log('Calculating....')

    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monPayment = document.getElementById('monPayment');
    const totPayment = document.getElementById('totPayment');
    const totInterest = document.getElementById('totInterest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value)*12;

  //compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        monPayment.value = monthly.toFixed(2);
        totPayment.value = (monthly * calculatedPayments).toFixed(2);
        totInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
        
        //show results
        document.getElementById('results').style.display = 'block';

        //hide loader
        document.getElementById('loading').style.display = 'none';

    } else {
        showError('please check your numbers');
         //hide loader
         document.getElementById('loading').style.display = 'none'
    }
}

//show error
function showError(error){
    //create a div
    const errorDiv = document.createElement('div');

    //Add class
    errorDiv.className = 'alert';

    //Add text
    errorDiv.appendChild(document.createTextNode(error));

    //Get elements
    const main = document.querySelector('.main');
    const heading = document.querySelector('h1');

    //Insert error above heading
    main.insertBefore(errorDiv, heading);

    //clear error after 3 seconds
    setTimeout(clearError, 3000);
    
    //clear error
  function clearError(){
    document.querySelector('.alert').remove()
}
}

  