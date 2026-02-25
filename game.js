// ======================================================
// GAME BOOTSTRAP (FINAL VERSION)
// Loads events, cards, initializes UI, and starts game.
// ======================================================

// Initialize the base game state container if not present
if (typeof gameState === "undefined") {
    var gameState = {};
}

// Basic defaults (only used on first load)
gameState.turn       = gameState.turn ?? 1;
gameState.year       = gameState.year ?? 1947;
gameState.monthIndex = gameState.monthIndex ?? 0;

gameState.months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
];

// This will be filled by statsEngine.js if not present
gameState.stats = gameState.stats || {};


// ======================================================
// LOAD ALL GAME DATA
// ======================================================

async function loadGameData() {
    try {
        // Timeline events
        await loadEvents();

        // Card decks
        await loadCards();

        logEvent("Game data loaded.");

        // Render UI after everything is loaded
        drawCards();
        updateStatsDisplay();
        renderTurnDate();

    } catch (err) {
        console.error("Error loading game data:", err);
    }
}


// ======================================================
// TURN DATE RENDERER
// ======================================================

function renderTurnDate() {
    const turnText = `${gameState.months[gameState.monthIndex]} ${gameState.year}`;
    document.getElementById("stat-turn").innerText = turnText;
}


// ======================================================
// UI BUTTON HOOKS
// ======================================================

// END TURN BUTTON
document.getElementById("end-turn-btn").onclick = () => {
    endTurn();
};

// SANDBOX MENU OPEN/CLOSE
document.getElementById("sandbox-btn").onclick = () => {
    const menu = document.getElementById("sandbox-menu");
    menu.style.display = (menu.style.display === "none") ? "block" : "none";
};


// ======================================================
// BOOTSTRAP GAME START
// ======================================================

window.onload = () => {
    logEvent("Loading game...");
    loadGameData();
};
