// ============================
// SANDBOX CHEAT ENGINE (Option A)
// Simple button-based cheats
// ============================

document.addEventListener("DOMContentLoaded", () => {
    let cheats = document.querySelectorAll(".sandbox-btn");

    cheats.forEach(btn => {
        btn.addEventListener("click", () => {
            runCheat(btn.dataset.cheat);
        });
    });
});

function runCheat(code) {
    switch(code) {
        case "ps10": modifyStat("ps", 10); break;
        case "os10": modifyStat("os", 10); break;
        case "leg10": modifyStat("leg", 10); break;
        case "stab10": modifyStat("stab", 10); break;
        case "fu10": modifyStat("fu", 10); break;

        case "res10": modifyResources(10); break;
        case "bud10": modifyBudget(10); break;

        case "skip": endTurn(); break;

        case "year":
            for (let i=0; i<12; i++) endTurn();
            break;
    }
}
