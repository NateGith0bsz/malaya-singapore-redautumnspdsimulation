let gameState = {
    turn: 1,
    year: 1947,
    monthIndex: 0,
    months: [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ],

    stats: {
        ps: 50,
        os: 50,
        leg: 50,
        stab: 50,
        fu: 50,
        resources: 30,
        budget: 50
    },

    advisors: [],
    decks: {
        party: [],
        national: [],
        advisor: []
    },
    events: []
};

// LOAD GAME DATA
async function loadGameData() {
    try {
        gameState.decks.party = await fetch("data/cards_party.json").then(r => r.json());
        gameState.decks.national = await fetch("data/cards_national.json").then(r => r.json());
        gameState.decks.advisor = await fetch("data/cards_advisor.json").then(r => r.json());
        gameState.events = await fetch("data/events.json").then(r => r.json());
    } catch (err) {
        console.error("Error loading data:", err);
    }

    renderTurn();
}

// RENDER TURN DATE
function renderTurn() {
    document.getElementById("stat-turn").innerText =
        `${gameState.months[gameState.monthIndex]} ${gameState.year}`;

    drawCards();
}

// END TURN BUTTON
document.getElementById("end-turn-btn").addEventListener("click", () => {
    endTurn();
});

// SANDBOX MENU BUTTON
document.getElementById("sandbox-btn").addEventListener("click", () => {
    let menu = document.getElementById("sandbox-menu");
    menu.style.display = (menu.style.display === "none") ? "block" : "none";
});

loadGameData();
