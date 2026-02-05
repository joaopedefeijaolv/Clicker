let coins = parseInt(localStorage.getItem('coins')) || 0;
let coinsPerClick = parseInt(localStorage.getItem('coinsPerClick')) || 1;
let coinsPerSecond = parseInt(localStorage.getItem('coinsPerSecond')) || 0;
let rebirths = parseInt(localStorage.getItem('rebirths')) || 0;

const clickButton = document.getElementById('clickButton');
const coinsDisplay = document.getElementById('coins');
const rebirthBonusDisplay = document.getElementById('rebirthBonus');

const upgradeClickButton = document.getElementById('upgradeClick');
let upgradeClickCost = 10;
const upgradeAutoButton = document.getElementById('upgradeAuto');
let upgradeAutoCost = 25;

const rebirthButton = document.getElementById('rebirthButton');
const rebirthReqDisplay = document.getElementById('rebirthReq');

function updateDisplay() {
    coinsDisplay.textContent = coins;
    rebirthBonusDisplay.textContent = (1 + rebirths) + "x";
    document.getElementById('upgradeClickCost').textContent = upgradeClickCost;
    document.getElementById('upgradeAutoCost').textContent = upgradeAutoCost;
    rebirthReqDisplay.textContent = 50 * (rebirths + 1);
}

clickButton.addEventListener('click', () => {
    coins += coinsPerClick * (1 + rebirths);
    saveGame();
    updateDisplay();
});

upgradeClickButton.addEventListener('click', () => {
    if (coins >= upgradeClickCost) {
        coins -= upgradeClickCost;
        coinsPerClick += 1;
        upgradeClickCost = Math.floor(upgradeClickCost * 1.5);
        saveGame();
        updateDisplay();
    }
});

upgradeAutoButton.addEventListener('click', () => {
    if (coins >= upgradeAutoCost) {
        coins -= upgradeAutoCost;
        coinsPerSecond += 1;
        upgradeAutoCost = Math.floor(upgradeAutoCost * 1.5);
        saveGame();
        updateDisplay();
    }
});

rebirthButton.addEventListener('click', () => {
    let rebirthReq = 50 * (rebirths + 1);
    if (coins >= rebirthReq) {
        coins = 0;
        coinsPerClick = 1;
        coinsPerSecond = 0;
        rebirths += 1;
        upgradeClickCost = 10;
        upgradeAutoCost = 25;
        saveGame();
        updateDisplay();
        alert("Rebirth feito! Bônus atual: " + (1 + rebirths) + "x");
    } else {
        alert("Você precisa de mais moedas para rebirth!");
    }
});

function saveGame() {
    localStorage.setItem('coins', coins);
    localStorage.setItem('coinsPerClick', coinsPerClick);
    localStorage.setItem('coinsPerSecond', coinsPerSecond);
    localStorage.setItem('rebirths', rebirths);
}

setInterval(() => {
    coins += coinsPerSecond * (1 + rebirths);
    saveGame();
    updateDisplay();
}, 1000);

updateDisplay();
