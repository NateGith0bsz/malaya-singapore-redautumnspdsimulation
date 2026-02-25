// ============================================
// EVENT ENGINE — Timeline events trigger on exact turns.
// Events are located in /data/events.json
// ============================================

let cachedEvents = null;

function loadEvents() {
    return fetch("data/events.json")
        .then(r => r.json())
        .then(json => cachedEvents = json);
}

function processEventsForTurn() {
    if (!cachedEvents) return;

    cachedEvents.forEach(evt => {

        if (evt.turn === gameState.turn) {

            // Prevent double-trigger
            if (!preventDuplicateEvents(evt.id)) return;

            logEvent(`EVENT: ${evt.name}`);

            // Apply stat effects
            if (evt.effects) {
                for (let stat in evt.effects) {
                    modifyStat(stat, evt.effects[stat]);
                }
            }
        }
    });
}
