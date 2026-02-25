// ============================================
// TURN ENGINE
// Handles month progression, year progression,
// event processing, card drawing, and integration
// with all other engine systems.
// ============================================

// Ensure gameState exists
if (typeof gameState === "undefined") {
    var gameState = {};
}

// Initialize defaults if missing
gameState.monthIndex = gameState.monthIndex || 0;
gameState.year = gameState.year || 1947;
gameState.turn = gameState.turn || 1;

// Month names for display
gameState.months = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
];

// ============================================
// MAIN TURN FUNCTION
// ============================================

function endTurn() {

    // --------------------------------------------
    // Advance month & year
    // --------------------------------------------
    gameState.monthIndex++;

    if (gameState.monthIndex >= 12) {
        gameState.monthIndex = 0;
        gameState.year++;
    }

    gameState.turn++;

    // --------------------------------------------
    // Update date display
    // --------------------------------------------
    document.getElementById("stat-turn").innerText =
        `${gameState.months[gameState.monthIndex]} ${gameState.year}`;

    // --------------------------------------------
    // Process timeline events
    // --------------------------------------------
    processEventsForTurn();

    // --------------------------------------------
    // Draw new cards
    // --------------------------------------------
    drawCards();

    // --------------------------------------------
    // Update stat UI
    // --------------------------------------------
    updateStatsDisplay();

    // ============================================
    // ⭐⭐ NEW ENGINE SYSTEMS ⭐⭐ (Part 6 & 11)
    // ============================================

    checkForTransformation();  // Labour Front → NSSWP
    runOppositionAI();         // AI agitation system
    runCrisisChecks();         // Stability/legitimacy decay
    runBudgetCycle();          // NSRS economy engine
    runProjectTick();          // Multi-turn megaprojects

    // --------------------------------------------
    // Win / Lose Conditions
    // --------------------------------------------
    checkVictoryConditions();
    checkDefeatConditions();

    // --------------------------------------------
    // UI Updates (Part 12)
    // --------------------------------------------
    updateProjectUI();
    updateCrisisUI();
    updateOppositionHeatUI();
    updateNSSWPBanner();

    // --------------------------------------------
    // Logging
    // --------------------------------------------
    logEvent(`Turn ${gameState.turn} completed.`);
}
