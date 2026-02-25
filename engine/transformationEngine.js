// =======================================
// TRANSFORMATION ENGINE
// Labour Front → NSSWP (1953)
// =======================================

function checkForTransformation() {
    // Trigger at turn 73 (1953)
    if (gameState.turn === 73) {
        transformLabourFrontToNSSWP();
    }
}

function transformLabourFrontToNSSWP() {
    logEvent("The Labour Front has been reconstituted into the NSSWP.");

    // Replace deck with NSSWP-specific cards
    loadNSSWPDeck();

    // Advisors shift to government roles
    gameState.advisors.forEach(a => {
        a.mode = "state";
    });

    // Government budget becomes active (handled in stats display)
    gameState.stats.budget += 10;

    // Unlock opposition AI
    gameState.oppositionActive = true;
}

function loadNSSWPDeck() {
    fetch("data/cards_nsswp.json")
        .then(r => r.json())
        .then(deck => {
            gameState.decks.party = deck;
            logEvent("NSSWP governing deck loaded.");
        });
}
