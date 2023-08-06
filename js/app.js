const incomeInput = document.getElementById('income');
const foodInput = document.getElementById('food');
const rentInput = document.getElementById('rent');
const clothInput = document.getElementById('cloths');
const savingPercentageInput = document.getElementById('saving-input');
const saveBtn = document.getElementById('save-btn');
const calculateBtn = document.getElementById('calculate-expense');
const totalExpense = document.getElementById('total-expense');
const afterExpenseBalance = document.getElementById('after-expense-balance');
const savingAmount = document.getElementById('saving-amount');
const remainingBalance = document.getElementById('remaining-balance');

// handle error
function errorMessage(errorId, isError) {
  const error = document.getElementById(errorId);
  if (isError) {
    error.style.display = 'block';
  } else if (typeof error == 'string') {
    error.style.display = 'block';
  } else {
    const error = document.getElementById(errorId);
    error.style.display = 'none';
  }
}

// check input validation
function checkInputValidation(inputId, errorId) {
  if (parseFloat(inputId.value) > 0) {
    // if condition is true error message will be gone
    errorMessage(errorId, false);
  } else {
    // if condition is false error message will be appear
    errorMessage(errorId, true);
    return 0;
  }
  const value = parseFloat(inputId.value);
  return value;
}

// calculate total expense
function expenseMoney() {
  let food = checkInputValidation(foodInput, 'food-error');
  let rent = checkInputValidation(rentInput, 'rent-error');
  let cloth = checkInputValidation(clothInput, 'cloth-error');
  let expense = food + rent + cloth;

  return parseFloat(expense);
}

// calculate balance after expense and set it.
function calculateExpenseAndCurrentBalance(income, expense) {
  totalExpense.innerText = expense;
  let currentBalance = income - expense;
  afterExpenseBalance.innerText = currentBalance;
}

// calculate button for calculation expenses
calculateBtn.addEventListener('click', function () {
  let income = checkInputValidation(incomeInput, 'income-error');
  let expense = expenseMoney();

  // if income amount more than expenses
  if (income > expense && income > 0 && expense > 0) {
    calculateExpenseAndCurrentBalance(income, expense);
    errorMessage('balance-expense-error', false);
  } else if (expense == 0 || income == 0) {
    errorMessage('balance-expense-error', false);
  } else {
    errorMessage('balance-expense-error', true);
  }
});

//  saving button
saveBtn.addEventListener('click', function () {
  const savingInput = checkInputValidation(
    savingPercentageInput,
    'saving-error'
  );
  // calculate percentage
  const totalSavingAmount = (parseFloat(incomeInput.value) * savingInput) / 100;
  // checking saving money getter than current balance or not
  if (parseFloat(afterExpenseBalance.innerText) < totalSavingAmount) {
    document.getElementById('saving-error').innerText =
      'your saving is too much than your current balance';
    errorMessage('saving-error', true);
  } else {
    savingAmount.innerText = totalSavingAmount;
    remainingBalance.innerText =
      parseFloat(afterExpenseBalance.innerText) - totalSavingAmount;
    errorMessage('saving-error', false);
  }
});
