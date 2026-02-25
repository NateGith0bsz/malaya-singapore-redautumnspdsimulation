// ============================================
// TURN ENGINE — Complete Final Version
// Handles time progression, card refresh,
// events, budgets, AI, crises, projects, UI.
// ============================================

if (typeof gameState === "undefined") {
    var gameState = {};
}

// Initialize defaults if not present
gameState.monthIndex = gameState.monthIndex ?? 0;
gameState.year       = gameState.year ?? 1947;
gameState.turn       = gameState.turn ?? 1;

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

    // → Advance month & year
    gameState.monthIndex++;
    if (gameState.monthIndex >= 12) {
        gameState.monthIndex = 0;
        gameState.year++;
    }

    // Increase turn counter
    gameState.turn++;

    // → Update date display
    document.getElementById("stat-turn").innerText =
        `${gameState.months[gameState.monthIndex]} ${gameState.year}`;

    // → Execute scheduled events (timeline)
    processEventsForTurn();

    // → Draw new cards
    drawCards();

    // → Update stat display
    updateStatsDisplay();

    // ============================================
    // CORE GAME SYSTEMS
    // ============================================

    checkForTransformation();   // Labour Front → NSSWP
    runOppositionAI();          // Opposition sabotage
    runCrisisChecks();          // Critical conditions
    runBudgetCycle();           // NSRS monthly economy
    runProjectTick();           // Government megaprojects

    // ============================================
    // WIN / LOSS CHECKS
    // ============================================

    if (victorySanityCheck()) {
        checkVictoryConditions();
        checkDefeatConditions();
    }

    // ============================================
    // UI Updates
    // ============================================

    updateProjectUI();
    updateCrisisUI();
    updateOppositionHeatUI();
    updateNSSWPBanner();

    // ============================================
    // FINAL SAFETY PASS
    // ============================================
    runBalancePass();

    logEvent(`Turn ${gameState.turn} completed.`);
}
