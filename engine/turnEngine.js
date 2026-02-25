// ============================
// TURN ENGINE
// Handles monthly turn cycles
// ============================

function endTurn() {

    // Move to next month
    gameState.monthIndex++;

    // New year rollover
    if (gameState.monthIndex >= 12) {
        gameState.monthIndex = 0;
        gameState.year++;
    }

    // Update turn counter
    gameState.turn++;

    // Update UI
    document.getElementById("stat-turn").innerText =
        `${gameState.months[gameState.monthIndex]} ${gameState.year}`;

    // Trigger scheduled events
    processEventsForTurn();

    // Draw next turn's cards
    drawCards();

    // Update stats on screen
    updateStatsDisplay();

    logEvent(`Turn ${gameState.turn} completed.`);
}
