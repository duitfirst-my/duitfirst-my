export function formatAnnualIncomeRequirement(amount?: number) {
  if (!amount) {
    return '';
  }

  return `Min. Annual Income RM${new Intl.NumberFormat('en-MY').format(amount)}`;
}
