// =======================================
// CRISIS ENGINE
// Stability, Legitimacy, Resources, Budget decay
// =======================================

function runCrisisChecks() {

    // STABILITY crisis
    if (gameState.stats.stab < 25) {
        modifyStat("stab", -1);
        modifyStat("leg", -1);
        logEvent("Crisis Warning: Stability dangerously low!");
    }

    // LEGITIMACY collapse
    if (gameState.stats.leg < 20) {
        modifyStat("ps", -1);
        modifyStat("fu", -1);
        logEvent("Legitimacy Crisis: Public confidence dropping.");
    }

    // RESOURCE starvation (Party-level)
    if (gameState.stats.resources < 10) {
        modifyStat("os", -1);
        logEvent("Resource Shortage: Organizational strength weakening.");
    }

    // BUDGET deficit (State-level)
    if (gameState.stats.budget < 0) {
        modifyStat("stab", -2);
        modifyStat("leg", -1);
        logEvent("Budget Deficit: State finances hurting stability.");
    }
}
