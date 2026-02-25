// ============================================
// BALANCE ENGINE — Safety systems
// ============================================

function clampStats() {
    const caps = ["ps", "os", "leg", "stab", "fu", "resources", "budget"];

    caps.forEach(stat => {
        gameState.stats[stat] = Math.min(100, Math.max(0, gameState.stats[stat]));
    });
}

function preventDuplicateEvents(eventId) {
    if (!gameState.firedEvents) gameState.firedEvents = [];
    if (gameState.firedEvents.includes(eventId)) return false;

    gameState.firedEvents.push(eventId);
    return true;
}

function stabilizeCrisisOutput() {
    if (gameState.stats.stab < 10 && gameState.stats.leg < 10) {
        gameState.crisisProtected = true;
        return true;
    }

    if (gameState.crisisProtected &&
        gameState.stats.stab + gameState.stats.leg > 20) {
        gameState.crisisProtected = false;
    }
}

function ensureBudgetSafety() {
    if (gameState.stats.budget < 0) {
        gameState.stats.budget = 0;
    }
}

function oppositionAISanity() {
    gameState.oppositionDanger = Math.min(200, gameState.oppositionDanger || 0);
}

function projectSafetyCheck() {
    return gameState.stats.budget > 0;
}

function transformationLock() {
    if (gameState.transformed) return false;
    gameState.transformed = true;
    return true;
}

function victorySanityCheck() {
    if (gameState.gameEnded) return false;
    return true;
}

function runBalancePass() {
    clampStats();
    ensureBudgetSafety();
    oppositionAISanity();
}
