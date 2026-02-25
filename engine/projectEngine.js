// =======================================
// PROJECT ENGINE
// Multi-turn mega-projects
// =======================================

function startProject(projectId) {
    if (gameState.activeProject) {
        logEvent("A project is already active!");
        return;
    }

    fetch(`data/projects.json`)
        .then(r => r.json())
        .then(projects => {
            const proj = projects.find(p => p.id === projectId);
            if (!proj) return;

            // Check starting cost
            if (gameState.stats.budget < proj.start_cost) {
                logEvent("Not enough budget to start this project.");
                return;
            }

            gameState.stats.budget -= proj.start_cost;
            gameState.activeProject = {
                id: proj.id,
                ticksRemaining: proj.duration
            };

            logEvent(`${proj.name} has started. Duration: ${proj.duration} turns.`);
        });
}

function runProjectTick() {
    if (!gameState.activeProject) return;

    fetch(`data/projects.json`)
        .then(r => r.json())
        .then(projects => {
            const proj = projects.find(p => p.id === gameState.activeProject.id);
            if (!proj) return;

            // Pay tick cost
            gameState.stats.budget -= proj.tick_cost;
            gameState.activeProject.ticksRemaining--;

            logEvent(`Project Tick: ${proj.name} consumes ${proj.tick_cost} Budget.`);

            // Complete project
            if (gameState.activeProject.ticksRemaining <= 0) {
                completeProject(proj);
            }
        });
}

function completeProject(project) {
    logEvent(`${project.name} has been completed!`);

    // Apply completion effects
    Object.keys(project.completion_effects).forEach(stat => {
        modifyStat(stat, project.completion_effects[stat]);
    });

    gameState.activeProject = null;
}
