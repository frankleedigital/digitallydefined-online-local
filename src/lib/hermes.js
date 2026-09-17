const templates = {
  retirement_gap: (p) => `
    The user just completed the Retirement Gap Calculator.
    Here are their results:
    - Gap Amount: $${p.gapAmount}
    - Monthly Needed To Close: $${p.monthlyNeededToClose}
    - Desired Monthly Income: $${p.desiredIncome}
    - Current Savings: $${p.currentSavings}
    - Years Until Retirement: ${p.yearsToRetirement}
    - Total Monthly Income: $${p.totalMonthlyIncome}

    Provide guidance on closing the retirement gap, improving savings strategy,
    and realistic next steps based on their timeline.
  `,

  freedom_number: (p) => `
    The user just completed the Freedom Number Calculator.
    Here are their results:
    - Monthly Freedom Goal: $${p.monthlyGoal}
    - Total Monthly Income: $${p.totalMonthlyIncome}
    - Asset Count: ${p.assetCount}
    - Yield Per Asset: $${p.yieldPerAsset}
    - Gap: $${p.gap}
