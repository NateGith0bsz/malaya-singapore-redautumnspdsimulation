function updateProjectUI() {
    const box = document.getElementById("project-box");

    if (!gameState.activeProject) {
        box.style.display = "none";
        return;
    }

    box.style.display = "block";
    document.getElementById("project-name").innerText =
        `Project: ${gameState.activeProject.id}`;

    document.getElementById("project-progress").innerText =
        `Turns Remaining: ${gameState.activeProject.ticksRemaining}`;
}

function updateCrisisUI() {
    const warn = document.getElementById("crisis-warning");
    if (gameState.stats.stab < 25 || gameState.stats.leg < 20) {
        warn.style.display = "block";
    } else {
        warn.style.display = "none";
    }
}

function updateOppositionHeatUI() {
    const heat = document.getElementById("heat-value");

    let hostilityScore = 0;
    oppositionFactions.forEach(f => {
        if (gameState.turn >= f.turn) hostilityScore += f.hostility * 100;
    });

    heat.innerText = `${Math.floor(hostilityScore)}%`;
}

function updateNSSWPBanner() {
    const banner = document.getElementById("nsswp-banner");
    if (gameState.turn >= 73) banner.style.display = "block";
}
