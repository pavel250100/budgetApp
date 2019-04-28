'use strict';

let startBtn = document.getElementById("start"),
	budgetValue = document.getElementsByClassName('budget-value')[0],
	dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
	levelValue = document.getElementsByClassName('level-value')[0],
	expensesValue = document.getElementsByClassName('expenses-value')[0],
	optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
	incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],


	expensesItem = document.getElementsByClassName('expenses-item'),
	expensesBtn = document.getElementsByTagName('button')[0],
	optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
	incomeItem = document.querySelector('.choose-income'),
	checkSavings = document.querySelector('#savings'),
	sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value'),

    btnState = false;

let money, time;
    
startBtn.addEventListener('click', function() {
    btnState = true;
    time = prompt ("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt ("Ваш бюджет на месяц?", "");

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt ("Ваш бюджет на месяц?", ""); 
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDay();
});

expensesBtn.addEventListener('click', function() {
    if(btnState){
        let sum = 0;
        for (let i = 0; i < expensesItem.length; i++) {
            let a = expensesItem[i].value,
                b = expensesItem[++i].value;
        
            if ( typeof(a)==='string' && typeof(a) != null && typeof(b) != null && a != "" && b != "" && a.length < 50) {
                console.log ("done");
                appData.expenses[a] = b;
                sum += +b;
            } else {
                console.log ("bad result");
                i--;
            }
        }
        expensesValue.textContent = sum;
    }   
});

optionalExpensesBtn.addEventListener('click', function(){
    if(btnState){
            for (let i = 0; i < optionalExpensesItem.length; i++) {
            let opt = optionalExpensesItem[i].value;
            appData.optionalExpenses[i] = opt;
            optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
        }
    }
});

countBtn.addEventListener('click', function(){
    if(btnState){
        if(appData.budget != undefined) {
            appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed(1);
            dayBudgetValue.textContent = +appData.moneyPerDay;
            if (appData.moneyPerDay < 100) {
                levelValue.textContent = "Малый";
            } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
                levelValue.textContent = "Средний";
            } else if (appData.moneyPerDay > 2000) {
                levelValue.textContent = "Высокий";
            } else {
                levelValue.textContent = "Ошибочка...!";
            }
        }
        else {
            dayBudgetValue.textContent = 'Error';
        }
    }
});

incomeItem.addEventListener('input', function(){
    if(btnState){
        let items = incomeItem.value;
        appData.income = items.split(", ");
        incomeValue.textContent = appData.income;
    }
});

checkSavings.addEventListener('click', function(){
    if(btnState){
        if(appData.savings == false) {
            appData.savings = true;
        } else {
            appData.savings = false;
        }
    }
});

sumValue.addEventListener('click', function(){
    if(btnState){
        if(appData.savings == true){
            let sum = +sumValue.value,
                percent = +percentValue.value;
            appData.monthIncome = sum/100/12*percent;
            appData.yearIncome = sum/100*percent;

            monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
            yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
        }
    }
});

percentValue.addEventListener('input', function(){
    if(btnState){
        if(appData.savings == true){
            let sum = +sumValue.value,
                percent = +percentValue.value;
            appData.monthIncome = sum/100/12*percent;
            appData.yearIncome = sum/100*percent;

            monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
            yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
        }
    }
});


let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};

for (let key in appData) {
    console.log("Наша программа включает в себя данные: " + key + " - " + appData[key]);
}



