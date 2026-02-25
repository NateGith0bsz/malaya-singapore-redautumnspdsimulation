function endTurn() {

    // Advance month
    gameState.monthIndex++;

    if (gameState.monthIndex >= 12) {
        gameState.monthIndex = 0;
        gameState.year++;
    }

    gameState.turn++;

    // Update the date display
    document.getElementById("stat-turn").innerText =
        `${gameState.months[gameState.monthIndex]} ${gameState.year}`;

    // Trigger scheduled events
    processEventsForTurn();

    // Draw next cards
    drawCards();

    // Update stats display
    updateStatsDisplay();

    // ⭐⭐ NEW ENGINE SYSTEMS ⭐⭐
    checkForTransformation();  // Labour Front → NSSWP
    runOppositionAI();         // AI agitation system
    runCrisisChecks();         // Crisis penalties
    runBudgetCycle();          // NSRS monthly budget
    runProjectTick();          // PROJECT TICK (ONLY ONCE!)
    checkVictoryConditions();  // Win conditions
    checkDefeatConditions();   // Lose conditions

    logEvent(`Turn ${gameState.turn} completed.`);
}
