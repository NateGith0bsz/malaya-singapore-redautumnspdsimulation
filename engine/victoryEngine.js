// =======================================
// VICTORY ENGINE
// Checks for win conditions
// =======================================

function checkVictoryConditions() {

    // Victory A — Survive to 1965 (turn ~150)
    if (gameState.turn >= 150) {
        declareVictory("NSRS survives to 1965!");
    }

    // Victory B — Golden Age
    if (gameState.stats.stab > 80 &&
        gameState.stats.leg > 80 &&
        gameState.stats.ps > 70) {
        gameState.victoryCounter = (gameState.victoryCounter || 0) + 1;
        if (gameState.victoryCounter >= 12) {
            declareVictory("Golden Age of Singapore achieved!");
        }
    } else {
        gameState.victoryCounter = 0;
    }
}

function declareVictory(message) {
    alert("VICTORY: " + message);
}
