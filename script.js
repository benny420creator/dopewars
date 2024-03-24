// Define initial game state variables
let cash = 1000;
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
let locations = ['Brooklyn', 'Queens', 'Manhattan', 'Bronx', 'Staten Island'];
let inventory = {}; // Tracks the player's drug inventory

// Generate a random price for drugs
function randomPrice() {
    return Math.floor(Math.random() * 500) + 100; // Random price between 100 and 600
}

// Update the UI to reflect the current game state
function updateGameInfo() {
    document.getElementById('cash').textContent = `Cash: $${cash}`;
    updateDrugsChart();
    updateCities();
}

// Populate the cities on the UI and highlight the current location
function updateCities() {
    const citiesContainer = document.getElementById('cities');
    citiesContainer.innerHTML = '';
    locations.forEach(location => {
        let cityDiv = document.createElement('div');
        cityDiv.textContent = location;
        cityDiv.className = location === currentLocation ? 'active' : '';
        cityDiv.onclick = function() { moveLocation(location); }; // Allow clicking on cities to move
        citiesContainer.appendChild(cityDiv);
    });
}

// Dynamically generate the drug chart based on the current game state
function updateDrugsChart() {
    const chart = document.getElementById('drugsChart');
    chart.innerHTML = '<tr><th>Drug</th><th>Price</th><th>Your Stock</th><th>Buy / Sell</th></tr>'; // Clear and add header

    drugs.forEach(drug => {
        let row = chart.insertRow(-1);
        let nameCell = row.insertCell(0);
        let priceCell = row.insertCell(1);
        let stockCell = row.insertCell(2);
        let actionCell = row.insertCell(3);

        nameCell.textContent = drug.name;
        priceCell.textContent = `$${drug.price}`;
        stockCell.textContent = inventory[drug.name] || 0;

        // Create buy and sell buttons
        let buyBtn = document.createElement('button');
        buyBtn.textContent = 'Buy';
        buyBtn.onclick = function() { buyGoods(drug.name); };
        let sellBtn = document.createElement('button');
        sellBtn.textContent = 'Sell';
        sellBtn.onclick = function() { sellGoods(drug.name); };
        
        actionCell.appendChild(buyBtn);
        actionCell.appendChild(sellBtn);
    });
}

// Handle buying goods
function buyGoods(drugName) {
    let drug = drugs.find(d => d.name === drugName);
    if (cash >= drug.price) {
        cash -= drug.price;
        inventory[drugName] = (inventory[drugName] || 0) + 1;
        updateGameInfo();
    } else {
        alert("Not enough cash to buy " + drugName + "!");
    }
}

// Handle selling goods
function sellGoods(drugName) {
    if (inventory[drugName] > 0) {
        let drug = drugs.find(d => d.name === drugName);
        cash += drug.price;
        inventory[drugName] -= 1;
        updateGameInfo();
    } else {
        alert("You don't have any " + drugName + " to sell!");
    }
}

// Move to a new location
function moveLocation(newLocation) {
    currentLocation = newLocation;
    // Simulate market fluctuation
    drugs.forEach(drug => {
        drug.price = randomPrice();
    });
    updateGameInfo();
}

// Initialize the game
updateGameInfo();
