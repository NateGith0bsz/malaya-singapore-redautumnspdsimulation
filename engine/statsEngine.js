// ============================================
// STATS ENGINE — Handles stat changes.
// stats: ps, os, leg, stab, fu, resources, budget
// ============================================

if (!gameState.stats) {
    gameState.stats = {
        ps: 50,
        os: 50,
        leg: 50,
        stab: 50,
        fu: 50,
        resources: 30,
        budget: 0
    };
}

function modifyStat(stat, amount) {
    if (typeof gameState.stats[stat] === "undefined") return;

    gameState.stats[stat] += amount;

    logEvent(`${stat.toUpperCase()} changed by ${amount}.`);

    // Safety clamp & checks
    runBalancePass();

    updateStatsDisplay();
}

function updateStatsDisplay() {
    for (let key in gameState.stats) {
        const el = document.getElementById(`stat-${key}`);
        if (el) el.innerText = gameState.stats[key];
    }

    // Budget only visible after 1953
    const budgetBox = document.getElementById("budget-container");
    if (gameState.turn >= 73) {
        budgetBox.style.display = "inline-block";
    }
}
