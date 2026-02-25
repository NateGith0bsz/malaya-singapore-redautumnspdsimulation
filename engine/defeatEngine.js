// =======================================
// DEFEAT ENGINE
// Checks lose conditions
// =======================================

function checkDefeatConditions() {

    // Loss A — Stability collapse
    if (gameState.stats.stab <= 0) {
        return gameOver("NSRS collapses into Emergency Rule.");
    }

    // Loss B — Legitimacy failure
    if (gameState.stats.leg < 10) {
        gameState.legFailCounter = (gameState.legFailCounter || 0) + 1;
        if (gameState.legFailCounter >= 8) {
            return gameOver("Public legitimacy collapses.");
        }
    }

    // Loss C — Resource bankruptcy
    if (gameState.stats.resources < -20) {
        return gameOver("Party bankruptcy destroys your movement.");
    }

    // Loss D — Budget collapse
    if (gameState.stats.budget < -20) {
        gameState.budgetFailCounter = (gameState.budgetFailCounter || 0) + 1;
        if (gameState.budgetFailCounter >= 12) {
            return gameOver("NSRS government collapses under debt.");
        }
    }
}

function gameOver(message) {
    alert("GAME OVER: " + message);
}
