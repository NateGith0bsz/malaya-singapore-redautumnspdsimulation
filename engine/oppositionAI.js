// =======================================
// OPPOSITION AI ENGINE
// Zionists, Trotskyites, Left-Communists,
// Ultra-Populists, Capitalists, Liberals
// =======================================

const oppositionFactions = [
    { id: "zionist", turn: 80, hostility: 0.25, effects: { leg: -1 } },
    { id: "trotskyite", turn: 82, hostility: 0.40, effects: { stab: -2, fu: -1 } },
    { id: "leftcomm", turn: 85, hostility: 0.50, effects: { stab: -3 } },
    { id: "ultrapop", turn: 88, hostility: 0.35, effects: { stab: -3, ps: -2 } },
    { id: "capitalist", turn: 92, hostility: 0.30, effects: { leg: -1, budget: -2 } },
    { id: "liberal", turn: 78, hostility: 0.30, effects: { leg: -1, fu: -1 } }
];

function runOppositionAI() {
    if (!gameState.oppositionActive) return;

    oppositionFactions.forEach(faction => {
        if (gameState.turn >= faction.turn) {
            if (Math.random() < faction.hostility) {
                applyOppositionEffects(faction);
            }
        }
    });
}

function applyOppositionEffects(faction) {
    logEvent(`Opposition agitation from ${faction.id} faction!`);

    Object.keys(faction.effects).forEach(key => {
        modifyStat(key, faction.effects[key]);
    });
}
