// ============================================
// CARD ENGINE — Draw 3 cards per turn.
// Action cards are located in /data/cards/*.json
// ============================================

let allCards = [];

function loadCards() {
    // Load all card files
    return Promise.all([
        fetch("data/cards/government.json").then(r => r.json()),
        fetch("data/cards/opposition.json").then(r => r.json())
    ]).then(values => {
        allCards = values.flat();
    });
}

function drawCards() {
    const container = document.getElementById("card-container");
    container.innerHTML = "";

    // Pick 3 random cards
    let choices = [];
    for (let i = 0; i < 3; i++) {
        choices.push(allCards[Math.floor(Math.random() * allCards.length)]);
    }

    choices.forEach(card => createCardElement(card));
}

function createCardElement(card) {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<strong>${card.name}</strong><br>${card.text}<br><br><em>Cost: ${card.cost}</em>`;

    div.onclick = () => playCard(card);

    document.getElementById("card-container").appendChild(div);
}

function playCard(card) {
    // Check cost
    if (gameState.stats.resources < card.cost) {
        logEvent("Not enough resources!");
        return;
    }

    // Apply cost
    gameState.stats.resources -= card.cost;

    // Apply card effects
    if (card.effects) {
        for (let stat in card.effects) {
            modifyStat(stat, card.effects[stat]);
        }
    }

    logEvent(`Played card: ${card.name}`);
    updateStatsDisplay();
}
