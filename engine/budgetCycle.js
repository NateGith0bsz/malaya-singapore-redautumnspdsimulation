// =======================================
// BUDGET CYCLE ENGINE
// Monthly revenue + expenditure
// =======================================

function runBudgetCycle() {
    if (gameState.year < 1953) return;

    // Base monthly income
    let income = 5;

    // Economic fluctuation
    let fluctuation = Math.floor(Math.random() * 5) - 1; 
    income += fluctuation;

    // Add to budget
    modifyBudget(income);

    logEvent(`Budget updated: +${income} revenue this month.`);
}
