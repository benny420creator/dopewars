let cash = 1000;
let debt = 0;
let daysLeft = 45;
let currentLocation = 'Brooklyn';
const locations = ['Brooklyn', 'Queens', 'Manhattan', 'Bronx', 'StatenIsland'];
let drugs = [
    { name: 'Weed', price: randomPrice(), quantity: 0 },
    { name: 'Cocaine', price: randomPrice(), quantity: 0 },
    { name: 'Heroin', price: randomPrice(), quantity: 0 },
    { name: 'LSD', price: randomPrice(), quantity: 0 },
    { name: 'Mushrooms', price: randomPrice(), quantity: 0 },
    { name: 'MDMA', price: randomPrice(), quantity: 0 },
    { name: 'Meth', price: randomPrice(), quantity: 0 },
    { name: 'Opium', price: randomPrice(), quantity: 0 },
    { name: 'Ketamine', price: randomPrice(), quantity: 0 },
    { name: 'PCP', price: randomPrice(), quantity: 0 },
    { name: 'Crack', price: randomPrice(), quantity: 0 },
    { name: 'Ecstasy', price: randomPrice(), quantity: 0 }
];

document.addEventListener('DOMContentLoaded', () => {
    highlightCurrentCity();
    updateGameInfo();
});

function randomPrice() {
    return Math.floor(Math.random() * 450) + 50; // Prices range from 50 to 500
}

function updateGameInfo() {
    document.getElementById('cash').textContent = `Cash: $${cash}`;
    document.getElementById('debt').textContent = `Debt: $${debt}`;
    document.getElementById('daysLeft').textContent = `${daysLeft} Days Left`;
    updateDrugsChart();
}

function updateDrugsChart() {
    const chart = document.getElementById('drugsChart');
    chart.innerHTML = '<tr><th>Drug</th><th>Price /lb</th><th>Quantity Held</th><th>Actions</th></tr>';
    drugs.forEach((drug, index) => {
        let row = chart.insertRow(-1);
        row.innerHTML = `
            <td>${drug.name}</td>
            <td>$${drug.price}</td>
            <td>${drug.quantity}</td>
            <td>
                <input type="number" value="1" min="1" id="buyAmount-${index}">
                <button onclick="buyGoods('${drug.name}', document.getElementById('buyAmount-${index}').value)">Buy</button>
                <input type="number" value="1" min="1" id="sellAmount-${index}">
                <button onclick="sellGoods('${drug.name}', document.getElementById('sellAmount-${index}').value)">Sell</button>
            </td>`;
    });
}

function buyGoods(drugName, amount) {
    const drug = drugs.find(d => d.name === drugName);
    const totalCost = drug.price * amount;
    if (cash >= totalCost && amount > 0) {
        cash -= totalCost;
        drug.quantity += parseInt(amount, 10);
        updateGameInfo();
    } else {
        alert("Not enough cash or invalid amount.");
    }
}

function sellGoods(drugName, amount) {
    const drug = drugs.find(d => d.name === drugName);
    if (drug.quantity >= amount && amount > 0) {
        cash += drug.price * amount;
        drug.quantity -= parseInt(amount, 10);
        updateGameInfo();
    } else {
        alert("Not enough drugs to sell or invalid amount.");
    }
}

function nextDay() {
    daysLeft--;
    if (daysLeft <= 0) {
        endGame();
        return;
    }
    currentLocation = locations[Math.floor(Math.random() * locations.length)]; // Change location randomly
    drugs.forEach(drug => drug.price = randomPrice());
    highlightCurrentCity();
    updateGameInfo();
}

function showLoanSharkOptions() {
    document.getElementById('loanOptions').style.display = 'block';
}

function borrowFromLoanShark(amount) {
    cash += amount;
    debt += amount * 1.1; // 10% interest
    updateGameInfo();
}

function repayDebt() {
    if (cash >= debt) {
        cash -= debt;
        debt = 0;
        updateGameInfo();
    } else {
        alert("Not enough cash to repay the debt.");
    }
}

function hideLoanSharkOptions() {
    document.getElementById('loanOptions').style.display = 'none';
}

function highlightCurrentCity() {
    locations.forEach(location => {
        const element = document.getElementById(location);
        if (location === currentLocation) {
            element.classList.add('activeCity');
        } else {
            element.classList.remove('activeCity');
        }
    });
}

function endGame() {
    document.getElementById('endGame').style.display = 'block';
    document.getElementById('finalScore').textContent = `Final Score: $${cash - debt}`;
}
