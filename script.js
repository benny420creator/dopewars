let cash = 1000;
let debt = 0;
let daysLeft = 45;
let currentLocation = 'Brooklyn';
let drugs = [
    { name: 'Weed', price: randomPrice() },
    { name: 'Cocaine', price: randomPrice() },
    { name: 'Heroin', price: randomPrice() },
    { name: 'LSD', price: randomPrice() },
    { name: 'Mushrooms', price: randomPrice() },
    { name: 'MDMA', price: randomPrice() },
    { name: 'Meth', price: randomPrice() },
    { name: 'Opium', price: randomPrice() },
    { name: 'Ketamine', price: randomPrice() },
    { name: 'PCP', price: randomPrice() },
    { name: 'Crack', price: randomPrice() },
    { name: 'Ecstasy', price: randomPrice() }
];
let inventory = {};

document.addEventListener('DOMContentLoaded', () => {
    updateGameInfo();
});

function randomPrice() {
    return Math.floor(Math.random() * 500) + 50;
}

function updateGameInfo() {
    document.getElementById('cash').textContent = `Cash: $${cash}`;
    document.getElementById('debt').textContent = `Debt: $${debt}`;
    document.getElementById('daysLeft').textContent = `${daysLeft} Days Left`;
    document.getElementById('currentLocation').textContent = currentLocation;
    updateDrugsChart();
}

function updateDrugsChart() {
    const chart = document.getElementById('drugsChart');
    chart.innerHTML = '<tr><th>Drug</th><th>Price</th><th>Action</th></tr>';
    drugs.forEach(drug => {
        let row = chart.insertRow(-1);
        let nameCell = row.insertCell(0);
        let priceCell = row.insertCell(1);
        let actionCell = row.insertCell(2);
        nameCell.textContent = drug.name;
        priceCell.textContent = `$${drug.price}`;
        actionCell.innerHTML = `<button onclick="buyGoods('${drug.name}')">Buy</button> <button onclick="sellGoods('${drug.name}')">Sell</button>`;
    });
}

function buyGoods(drugName) {
    const drug = drugs.find(d => d.name === drugName);
    if (cash >= drug.price) {
        cash -= drug.price;
        inventory[drugName] = (inventory[drugName] || 0) + 1;
        updateGameInfo();
    } else {
        alert("Not enough cash!");
    }
}

function sellGoods(drugName) {
    if (inventory[drugName] && inventory[drugName] > 0) {
        const drug = drugs.find(d => d.name === drugName);
        cash += drug.price;
        inventory[drugName] -= 1;
        updateGameInfo();
    } else {
        alert(`You don't have any ${drugName} to sell!`);
    }
}

function nextDay() {
    daysLeft--;
    drugs.forEach(drug => drug.price = randomPrice());
    if (daysLeft <= 0) {
        endGame();
    } else {
        updateGameInfo();
    }
}

function showLoanSharkOptions() {
    const loanOptions = document.getElementById('loanOptions');
    loanOptions.style.display = loanOptions.style.display === 'block' ? 'none' : 'block';
}

function borrowFromLoanShark(amount) {
    cash += amount;
    debt += amount * 1.1; // 10% interest rate
    updateGameInfo();
}

function repayDebt() {
    if (cash >= debt) {
        cash -= debt;
        debt = 0;
        updateGameInfo();
    } else {
        alert("Not enough cash to repay the debt!");
    }
}

function endGame() {
    let finalScore = cash - debt;
    document.getElementById('endGame').style.display = 'block';
    document.getElementById('finalScore').textContent = `Final Score: $${finalScore}`;
    document.getElementById('actions').style.display = 'none';
    document.getElementById('loanOptions').style.display = 'none';
}

function hideLoanSharkOptions() {
    document.getElementById('loanOptions').style.display = 'none';
}

function restartGame() {
    // Reset game state for a new game and update UI accordingly
    // This function needs to be filled out based on how you want to reset the game state
}
