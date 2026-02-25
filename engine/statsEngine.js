// ============================
// STAT ENGINE
// Handles all stat changes
// ============================

function updateStatsDisplay() {
    document.getElementById("stat-ps").innerText = gameState.stats.ps;
    document.getElementById("stat-os").innerText = gameState.stats.os;
    document.getElementById("stat-leg").innerText = gameState.stats.leg;
    document.getElementById("stat-stab").innerText = gameState.stats.stab;
    document.getElementById("stat-fu").innerText = gameState.stats.fu;
    document.getElementById("stat-resources").innerText = gameState.stats.resources;

    // Budget only appears after 1953
    if (gameState.year >= 1953) {
        document.getElementById("budget-container").style.display = "block";
        document.getElementById("stat-budget").innerText = gameState.stats.budget;
    }
}

// Generic stat modification
function modifyStat(stat, amount) {
    gameState.stats[stat] += amount;

    // Prevent negative collapse
    if (gameState.stats[stat] < 0) gameState.stats[stat] = 0;

    // Hard cap at 999 for sanity
    if (gameState.stats[stat] > 999) gameState.stats[stat] = 999;

    updateStatsDisplay();
}

function modifyResources(amount) {
    modifyStat("resources", amount);
}

function modifyBudget(amount) {
    modifyStat("budget", amount);
}
