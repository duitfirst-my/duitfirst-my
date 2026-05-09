import type { Card } from '../types';

export interface IncomeRange {
  id: string;
  min: number;
  max: number;
  label: string;
}

function formatAmount(amount: number) {
  return `RM${new Intl.NumberFormat('en-MY').format(amount)}`;
}

export function getIncomeRanges(cards: Card[]): IncomeRange[] {
  const incomes = Array.from(
    new Set(cards.map((card) => card.annualIncomeRequirementRM).filter((value): value is number => Boolean(value)))
  ).sort((a, b) => a - b);

  return incomes.map((max, index) => {
    const previousMax = incomes[index - 1];
    const min = previousMax ? previousMax + 1 : 0;
    const label = previousMax
      ? `${formatAmount(min)} - ${formatAmount(max)}`
      : `Up to ${formatAmount(max)}`;

    return {
      id: `income-${max}`,
      min,
      max,
      label
    };
  });
}

export function getIncomeRangeIdForAmount(amount: number | undefined, ranges: IncomeRange[]) {
  if (!amount) {
    return '';
  }

  return ranges.find((range) => amount >= range.min && amount <= range.max)?.id || '';
}
