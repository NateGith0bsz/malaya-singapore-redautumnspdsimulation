// ============================================
// BALANCE ENGINE — PART 13
// Prevents stat overflows, duplicate events,
// broken AI behavior, and game softlocks.
// ============================================


// CAP STATS BETWEEN 0 AND 100
function clampStats() {
    const caps = ["ps", "os", "leg", "stab", "fu", "resources", "budget"];

    caps.forEach(stat => {
        if (gameState.stats[stat] < 0) gameState.stats[stat] = 0;
        if (gameState.stats[stat] > 100) gameState.stats[stat] = 100;
    });
}


// PREVENT EVENTS FROM FIRING TWICE
function preventDuplicateEvents(eventId) {
    if (!gameState.firedEvents) gameState.firedEvents = [];

    if (gameState.firedEvents.includes(eventId)) {
        return false; // block repeat
    }

    gameState.firedEvents.push(eventId);
    return true; // allow event
}


// CRISIS ENGINE SANITY CHECK
function stabilizeCrisisOutput() {
    // If both STAB and LEG are <10, hard-cap crisis decay to avoid instant collapse
    if (gameState.stats.stab < 10 && gameState.stats.leg < 10) {
        if (!gameState.crisisProtected) {
            logEvent("⚠ Crisis protection activated to prevent collapse cascade.");
            gameState.crisisProtected = true;
        }
        return true; // crisis protection ON
    }

    // Crisis protection ends when STAB+LEG > 20
    if (gameState.crisisProtected && 
        gameState.stats.stab + gameState.stats.leg > 20) {

        logEvent("Crisis protection lifted.");
        gameState.crisisProtected = false;
    }

    return false;
}


// PREVENT NEGATIVE BUDGET FROM BREAKING GAME
function ensureBudgetSafety() {
    if (gameState.stats.budget < 0) {
        logEvent("⚠ Budget safety mode: budget cannot go below 0.");
        gameState.stats.budget = 0;
    }
}


// OPPOSITION AI SAFETY CHECK
function oppositionAISanity() {
    if (!gameState.oppositionDanger) gameState.oppositionDanger = 0;

    // Cap total hostility accumulation
    if (gameState.oppositionDanger > 200) {
        gameState.oppositionDanger = 200;
        logEvent("Opposition agitation capped at maximum safe threshold.");
    }
}


// ENSURE PROJECTS DO NOT BREAK IF BUDGET FAILS
function projectSafetyCheck() {
    if (!gameState.activeProject) return;

    const proj = gameState.activeProject;

    if (gameState.stats.budget <= 0) {
        logEvent(`⚠ ${proj.id} stalled due to insufficient budget.`);
        return false;
    }

    return true;
}


// HARD-LOCK TRANSFORMATION (Prevent double-trigger)
function transformationLock() {
    if (gameState.transformed) return false;
    gameState.transformed = true;
    return true;
}


// VICTORY / DEFEAT SANITY CHECK
function victorySanityCheck() {
    // Prevent both victory and defeat from triggering in same turn
    if (gameState.gameEnded) return false;

    return true;
}


// UNIVERSAL BALANCE CALL (RUN EVERY TURN)
function runBalancePass() {
    clampStats();
    ensureBudgetSafety();
    oppositionAISanity();
}
