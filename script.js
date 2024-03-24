let cash = 1000;
let debt = 0;
let currentLocation = 'Brooklyn';
let daysLeft = 45;
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
let locations = ['Brooklyn', 'Queens', 'Manhattan', 'Bronx', 'Staten Island'];
let inventory = {};

function randomPrice() {
    return Math.floor(Math.random() * 500) + 50;
}

function updateGameInfo() {
    document.getElementById('cash').textContent = `Cash: $${cash}`;
    document.getElementById('debt').textContent = `Debt: $${debt}`;
    document.getElementById('daysLeft').textContent = `${daysLeft} Days Left`;
    updateDrugsChart();
    updateCities();
    if (daysLeft <= 0) {
        endGame();
    }
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

function updateCities() {
    const citiesContainer = document.getElementById('cities');
    citiesContainer.innerHTML = '';
    locations.forEach(location => {
        let cityDiv = document.createElement('div');
        cityDiv.textContent = location;
        cityDiv.className = location === currentLocation ? 'active' : '';
        cityDiv.onclick = function() { moveLocation(location); };
        citiesContainer.appendChild(cityDiv);
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
    if (inventory[drugName] > 0) {
        const drug = drugs.find(d => d.name === drugName);
        cash += drug.price;
        inventory[drugName] -= 1;
        updateGameInfo();
    } else {
        alert("You don't have any " + drugName + " to sell!");
    }
}

function moveLocation(newLocation) {
    if (currentLocation !== newLocation) {
        currentLocation = newLocation;
        updateGameInfo();
    }
}

function nextDay() {
    daysLeft--;
    drugs.forEach(drug => drug.price = randomPrice());
    updateGameInfo();
}

function showLoanSharkOptions() {
    document.getElementById('loanOptions').style.display = 'block';
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
    document.getElementById('finalScore').textContent = `Final Score: $${finalScore}`;
    document.getElementById('endGame').style.display = 'block';
}

updateGameInfo();
