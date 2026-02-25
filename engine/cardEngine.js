// ============================
// CARD ENGINE
// Draws and resolves cards
// ============================

function drawCards() {
    let container = document.getElementById("card-container");
    container.innerHTML = "";

    // Select 3 cards: 1 party, 1 national, 1 advisor (if available)
    let partyCard = randomFrom(gameState.decks.party);
    let nationalCard = randomFrom(gameState.decks.national);
    let advisorCard = randomFrom(gameState.decks.advisor);

    let cards = [partyCard, nationalCard, advisorCard].filter(c => c);

    cards.forEach(card => {
        let el = document.createElement("div");
        el.classList.add("card");
        el.innerHTML = `
            <h4>${card.name}</h4>
            <p>${card.text}</p>
        `;
        el.addEventListener("click", () => resolveCard(card));
        container.appendChild(el);
    });
}

function randomFrom(deck) {
    if (!deck || deck.length === 0) return null;
    return deck[Math.floor(Math.random() * deck.length)];
}

// CARD RESOLUTION
function resolveCard(card) {
    logEvent(`Played: ${card.name}`);

    // Apply stat effects
    if (card.effects) {
        Object.keys(card.effects).forEach(key => {
            modifyStat(key, card.effects[key]);
        });
    }

    // Consume resources if required
    if (card.cost) modifyResources(-card.cost);

    // Apply events triggered by card
    if (card.triggerEvent) {
        triggerEvent(card.triggerEvent);
    }

    // Refresh card list
    drawCards();
}
