// ============================================
// UI ENGINE — Updates project box, crisis warnings, etc.
// ============================================

function updateProjectUI() {
    const box = document.getElementById("project-box");

    if (!gameState.activeProject) {
        box.style.display = "none";
        return;
    }

    box.style.display = "block";
    document.getElementById("project-name").innerText =
        gameState.activeProject.id;
    document.getElementById("project-progress").innerText =
        `Turns Left: ${gameState.activeProject.ticksRemaining}`;
}

function updateCrisisUI() {
    const warn = document.getElementById("crisis-warning");
    warn.style.display =
        (gameState.stats.stab < 25 || gameState.stats.leg < 20)
        ? "block" : "none";
}

function updateOppositionHeatUI() {
    const heat = document.getElementById("heat-value");
    heat.innerText = `${gameState.oppositionDanger || 0}%`;
}

function updateNSSWPBanner() {
    const banner = document.getElementById("nsswp-banner");
    banner.style.display = (gameState.turn >= 73) ? "block" : "none";
}
