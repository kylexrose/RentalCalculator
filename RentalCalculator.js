var purchasePrice;
var closingCosts;
var initialRenovation;
var rent;
var principle;
var interestRate;
var loanTerm;
var vacancy;
var repairs;
var propManFee;
var taxes;
var insurance;
var mortgagePayment;
var cashFlow;
var initialInvestment;

function first(){
    purchasePrice = parseInt(document.querySelector("#purchasePrice").value);
    closingCosts = parseInt(document.querySelector("#closingCosts").value);
    initialRenovation = parseInt(document.querySelector("#initialRenovation").value);
    rent = parseInt(document.querySelector("#rent").value);
    principle = parseInt(document.querySelector("#principle").value);
    interestRate = parseInt(document.querySelector("#interestRate").value);
    loanTerm = parseInt(document.querySelector("#loanTerm").value);
    vacancy = parseInt(document.querySelector("#vacancy").value);
    repairs = parseInt(document.querySelector("#repairs").value);
    propManFee = parseInt(document.querySelector("#propManFee").value);
    taxes = parseInt(document.querySelector("#taxes").value);
    insurance = parseInt(document.querySelector("#insurance").value);
    monthlyMortgagePayment(principle, interestRate, loanTerm);
    monthlyCashFlow(rent, mortgagePayment, vacancy, repairs, propManFee, taxes, insurance);
    capRate(purchasePrice, closingCosts, initialRenovation, rent, taxes, insurance, repairs, propManFee, vacancy);
    cashOnCash(cashFlow, purchasePrice, principle, closingCosts, initialRenovation);
}

function init(num){
    isValid(num);
    if (valid){
    purchasePrice = parseInt(document.querySelector("#purchasePrice").value);
    closingCosts = parseInt(document.querySelector("#closingCosts").value);
    initialRenovation = parseInt(document.querySelector("#initialRenovation").value);
    rent = parseInt(document.querySelector("#rent").value);
    principle = parseInt(document.querySelector("#principle").value);
    interestRate = parseInt(document.querySelector("#interestRate").value);
    loanTerm = parseInt(document.querySelector("#loanTerm").value);
    vacancy = parseInt(document.querySelector("#vacancy").value);
    repairs = parseInt(document.querySelector("#repairs").value);
    propManFee = parseInt(document.querySelector("#propManFee").value);
    taxes = parseInt(document.querySelector("#taxes").value);
    insurance = parseInt(document.querySelector("#insurance").value);
    monthlyMortgagePayment(principle, interestRate, loanTerm);
    monthlyCashFlow(rent, mortgagePayment, vacancy, repairs, propManFee, taxes, insurance);
    capRate(purchasePrice, closingCosts, initialRenovation, rent, taxes, insurance, repairs, propManFee, vacancy);
    cashOnCash(cashFlow, purchasePrice, principle, closingCosts, initialRenovation);
}
}

function isValid(num){
    let string = num.id + "Invalid";
    if (num.value >= 0){
        valid = true;
        document.getElementById(string).style.display="none";
    }else{
    valid = false
    document.getElementById(string).style.display="inline";
    }
}

function monthlyMortgagePayment(principle, annualInterestRate, loanTermInYears){
    let loanTermInMonths = loanTermInYears * 12;
    var monthlyInterestRate = annualInterestRate / 12;
    monthlyInterestRate /= 100;
    mortgagePayment = principle * (monthlyInterestRate * (1 + monthlyInterestRate) ** loanTermInMonths) / ((1 + monthlyInterestRate) ** loanTermInMonths - 1);
    document.getElementById("mortgagePayment").value = mortgagePayment.toFixed(2);
}

function monthlyCashFlow(rent, mortgagePayment, vacancy, repairs, propManagement, taxes, insurance){
    vacancy /= 100;
    repairs /= 100;
    propManagement /= 100;
    taxes /= 12;
    insurance /= 12;
    cashFlow = rent * (1 - (vacancy + repairs + propManagement)) - mortgagePayment - taxes - insurance;
    document.getElementById("cashFlow").value = cashFlow.toFixed(2);
}

function capRate(purchasePrice, closingCosts, initialRenovation, rent, taxes, insurance, repairs, propManagement, vacancy){
    rent *= 12; 
    repairs /= 100;
    propManagement /= 100;
    vacancy /= 100; 
    let initialInvestment = purchasePrice + closingCosts + initialRenovation
    let netOpIncome = rent * (1 - (repairs + propManagement + vacancy)) - (taxes + insurance);
    let capRate = (netOpIncome / initialInvestment) * 100;
    document.getElementById("capRate").value = capRate.toFixed(2);
}

function cashOnCash(cashFlow, purchasePrice, loanAmount, closingCosts, initialRenovation){
    cashFlow *= 12;
    let initialInvestment = purchasePrice + closingCosts + initialRenovation - loanAmount
    document.getElementById("initialInvestment").value = "$" + initialInvestment.toLocaleString();
    document.getElementById("cashOnCash").value = ((cashFlow / initialInvestment) * 100).toFixed(2) + "%";
}
document.addEventListener("DOMContentLoaded", first());