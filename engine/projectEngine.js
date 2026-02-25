// ============================================
// PROJECT ENGINE — Multi-turn NSRS megaprojects
// Located in data/projects.json
// ============================================

function startProject(projectId) {
    if (gameState.activeProject) {
        logEvent("A project is already underway.");
        return;
    }

    fetch("data/projects.json")
        .then(r => r.json())
        .then(projects => {
            const proj = projects.find(p => p.id === projectId);
            if (!proj) return;

            // Check start cost
            if (gameState.stats.budget < proj.start_cost) {
                logEvent("Not enough budget to launch project.");
                return;
            }

            gameState.stats.budget -= proj.start_cost;

            gameState.activeProject = {
                id: proj.id,
                ticksRemaining: proj.duration
            };

            logEvent(`${proj.name} has begun.`);
        });
}

function runProjectTick() {
    if (!gameState.activeProject) return;

    fetch("data/projects.json")
        .then(r => r.json())
        .then(projects => {
            const proj = projects.find(p => p.id === gameState.activeProject.id);

            if (!proj) return;

            // Prevent negative budget crash
            if (!projectSafetyCheck()) return;

            // Tick cost
            gameState.stats.budget -= proj.tick_cost;
            gameState.activeProject.ticksRemaining--;

            logEvent(`Project Tick: ${proj.name} uses ${proj.tick_cost} budget.`);

            // Completion
            if (gameState.activeProject.ticksRemaining <= 0) {
                completeProject(proj);
            }
        });
}

function completeProject(project) {
    logEvent(`${project.name} completed!`);

    for (let stat in project.completion_effects) {
        modifyStat(stat, project.completion_effects[stat]);
    }

    gameState.activeProject = null;
}
