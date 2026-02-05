// --- Variáveis do jogo ---
let coins = parseInt(localStorage.getItem('coins')) || 0;
let coinsPerClick = parseInt(localStorage.getItem('coinsPerClick')) || 1;
let coinsPerSecond = parseInt(localStorage.getItem('coinsPerSecond')) || 0;
let rebirths = parseInt(localStorage.getItem('rebirths')) || 0;

// --- Botões e displays ---
const clickButton = document.getElementById('clickButton');
const coinsDisplay = document.getElementById('coins');
const rebirthBonusDisplay = document.getElementById('rebirthBonus');

const upgradeClickButton = document.getElementById('upgradeClick');
let upgradeClickCost = parseInt(localStorage.getItem('upgradeClickCost')) || 10;

const upgradeAutoButton = document.getElementById('upgradeAuto');
let upgradeAutoCost = parseInt(localStorage.getItem('upgradeAutoCost')) || 25;

const rebirthButton = document.getElementById('rebirthButton');
const rebirthReqDisplay = document.getElementById('rebirthReq');

const petsContainer = document.getElementById('petsContainer');

// --- Pets ---
let pets = JSON.parse(localStorage.getItem('pets')) || [
    { nome: "Gato", custo: 20, cps: 1, quantidade: 0 },
    { nome: "Cachorro", custo: 50, cps: 3, quantidade: 0 },
    { nome: "Dragão", custo: 200, cps: 10, quantidade: 0 }
];

// --- Funções ---
function updateDisplay() {
    coinsDisplay.textContent = coins;
    rebirthBonusDisplay.textContent = (1 + rebirths) + "x";
    document.getElementById('upgradeClickCost').textContent = upgradeClickCost;
    document.getElementById('upgradeAutoCost').textContent = upgradeAutoCost;
    rebirthReqDisplay.textContent = 50 * (rebirths + 1);
}

function atualizarPets() {
    petsContainer.innerHTML = '';
    pets.forEach((pet, i) => {
        let btn = document.createElement('button');
        btn.textContent = `Comprar ${pet.nome} (Custo: ${pet.custo}, Quantidade: ${pet.quantidade})`;
        btn.onclick = () => {
            if (coins >= pet.custo) {
                coins -= pet.custo;
                pet.quantidade += 1;
                pet.custo = Math.floor(pet.custo * 1.5);
                saveGame();
                atualizarPets();
                updateDisplay();
            }
        };
        petsContainer.appendChild(btn);
    });
}

// --- Eventos ---
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
        pets.forEach(pet => pet.quantidade = 0); // reset pets
        saveGame();
        updateDisplay();
        atualizarPets();
        alert("Rebirth feito! Bônus atual: " + (1 + rebirths) + "x");
    } else {
        alert("Você precisa de mais moedas para rebirth!");
    }
});

// --- Coins automáticos ---
setInterval(() => {
    let totalCPS = coinsPerSecond;
    pets.forEach(pet => totalCPS += pet.cps * pet.quantidade);
    coins += totalCPS * (1 + rebirths);
    saveGame();
    updateDisplay();
}, 1000);

// --- Salvamento ---
function saveGame() {
    localStorage.setItem('coins', coins);
    localStorage.setItem('coinsPerClick', coinsPerClick);
    localStorage.setItem('coinsPerSecond', coinsPerSecond);
    localStorage.setItem('rebirths', rebirths);
    localStorage.setItem('upgradeClickCost', upgradeClickCost);
    localStorage.setItem('upgradeAutoCost', upgradeAutoCost);
    localStorage.setItem('pets', JSON.stringify(pets));
}

// --- Inicialização ---
updateDisplay();
atualizarPets();
