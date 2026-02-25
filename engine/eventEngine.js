// ============================
// EVENT ENGINE
// Handles major scripted events
// ============================

function logEvent(text) {
    let log = document.getElementById("log-content");
    let div = document.createElement("div");
    div.innerText = text;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
}

function processEventsForTurn() {
    let turnEvents = gameState.events.filter(ev => ev.turn === gameState.turn);

    turnEvents.forEach(ev => {
        logEvent(`EVENT: ${ev.name}`);

        if (ev.effects) {
            Object.keys(ev.effects).forEach(key => {
                modifyStat(key, ev.effects[key]);
            });
        }

        if (ev.trigger) {
            triggerEvent(ev.trigger);
        }
    });
}

function triggerEvent(eventId) {
    let ev = gameState.events.find(x => x.id === eventId);
    if (!ev) return;

    logEvent(`EVENT TRIGGERED: ${ev.name}`);

    if (ev.effects) {
        Object.keys(ev.effects).forEach(key => {
            modifyStat(key, ev.effects[key]);
        });
    }
}
