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
    updateGameInfo();
    highlightCurrentCity();
});

function randomPrice() {
    return Math.floor(Math.random() * 450) + 50;
}

function updateGameInfo() {
    document.getElementById('cash').textContent = `Cash: $${cash}`;
    document.getElementById('debt').textContent = `Debt: $${debt}`;
    document.getElementById('daysLeft').textContent = `${daysLeft} Days Left`;
    updateDrugsChart();
}

function updateDrugsChart() {
    const chart = document.getElementById('drugsChart');
    chart.innerHTML = '<tr><th>Drug</th><th>Price /lb</th><th>Qty Held</th><th>Buy/Sell</th></tr>';
    drugs.forEach(drug => {
        const row = chart.insertRow(-1);
        row.innerHTML = `<td>${drug.name}</td>
                         <td>$${drug.price}</td>
                         <td>${drug.quantity}</td>
                         <td>
                            <input type='number' value='1' min='1' id='quantity-${drug.name}' style='width: 50px;'>
                            <button onclick='buyGoods("${drug.name}", document.getElementById("quantity-${drug.name}").value)'>Buy</button>
                            <button onclick='sellGoods("${drug.name}", document.getElementById("quantity-${drug.name}").value)'>Sell</button>
                         </td>`;
    });
}

function buyGoods(drugName, quantity) {
    const drug = drugs.find(d => d.name === drugName);
    const totalCost = drug.price * quantity;
    if (cash >= totalCost && quantity > 0) {
        cash -= totalCost;
        drug.quantity += parseInt(quantity, 10);
        updateGameInfo();
    } else {
        alert("Not enough cash or invalid amount.");
    }
}

function sellGoods(drugName, quantity) {
    const drug = drugs.find(d => d.name === drugName);
    if (drug.quantity >= quantity && quantity > 0) {
        cash += drug.price * quantity;
        drug.quantity -= parseInt(quantity, 10);
        updateGameInfo();
    } else {
        alert("Not enough stock or invalid amount.");
    }
}

function nextDay() {
    daysLeft--;
    if (daysLeft <= 0) {
        endGame();
        return;
    }
    currentLocation = locations[Math.floor(Math.random() * locations.length)];
    drugs.forEach(drug => drug.price = randomPrice());
    highlightCurrentCity();
    updateGameInfo();
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

function endGame() {
    document.getElementById('endGame').style.display = 'block';
    document.getElementById('finalScore').textContent = `Final Score: $${cash - debt}`;
}

// Add a restartGame function if you plan on allowing the user to restart the game without refreshing the page.
function restartGame() {
    // Reset game state
    cash = 1000;
    debt = 0;
    daysLeft = 45;
    currentLocation = 'Brooklyn';
    drugs.forEach(drug => {
        drug.price = randomPrice();
        drug.quantity = 0;
    });

    // Hide the end game message and show the main game actions
    document.getElementById('endGame').style.display = 'none';
    document.getElementById('actions').style.display = 'block';
    document.getElementById('loanOptions').style.display = 'none'; // Ensure loan options are hidden

    updateGameInfo(); // Refresh the game information display
    highlightCurrentCity(); // Ensure the correct city is highlighted
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    restartGame(); // Use restartGame to set the initial state, ensuring consistency
});

// Optional: Add additional functionalities as needed
