export function formatAnnualIncomeRequirement(amount?: number) {
  if (!amount) {
    return '';
  }

  const annualAmount = new Intl.NumberFormat('en-MY').format(amount);
  const monthlyAmount = new Intl.NumberFormat('en-MY', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount / 12);

  return `Min. Annual Income RM${annualAmount} (RM${monthlyAmount}/month)`;
}
