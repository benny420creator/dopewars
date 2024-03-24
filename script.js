// script.js
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
let selectedDrug = drugs[0];
let goodsOwned = 0;

function randomPrice() {
    return Math.floor(Math.random() * 500) + 100;
}

function updateGameInfo() {
    document.getElementById('cash').textContent = `Cash: $${cash}`;
    document.getElementById('location').textContent = `Location: ${currentLocation}`;
    document.getElementById('price').textContent = `Price: $${selectedDrug.price}`;
}

function populateDrugs() {
    const select = document.getElementById('drugSelect');
    select.innerHTML = '';
    drugs.forEach(drug => {
        let option = document.createElement('option');
        option.text = drug.name;
        option.value = drug.name;
        select.appendChild(option);
    });
    select.addEventListener('change', function() {
        selectedDrug = drugs.find(drug => drug.name === this.value);
        updateGameInfo();
    });
}

function buyGoods() {
    let quantity = Math.floor(cash / selectedDrug.price);
    if (quantity > 0) {
        cash -= selectedDrug.price;
        goodsOwned += 1;
        updateGameInfo();
    } else {
        alert("Not enough cash to buy goods!");
    }
}

function sellGoods() {
    if (goodsOwned > 0) {
        cash += selectedDrug.price;
        goodsOwned -= 1;
        updateGameInfo();
    } else {
        alert("You don't own any goods to sell!");
    }
}

function moveLocation() {
    const locations = ['Brooklyn', 'Queens', 'Manhattan', 'Bronx', 'Staten Island'];
    currentLocation = locations[Math.floor(Math.random() * locations.length)];
    drugs.forEach(drug => {
        drug.price = randomPrice(); // Update price for new location
    });
    updateGameInfo();
}

populateDrugs();
updateGameInfo();
