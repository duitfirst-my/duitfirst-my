export interface CardTableColumn {
  key: string;
  label: string;
}

export interface CardTableRow {
  [key: string]: string;
}

export interface CardTable {
  title: string;
  columns: CardTableColumn[];
  rows: CardTableRow[];
}

export interface CardLink {
  provider: string;
  url: string;
}

export interface Card {
  lastUpdateDate: number;
  localPageUrl: string;
  name: string;
  description: string;
  imageUrl: string;
  recommended?: boolean;
  annualIncomeRequirementRM?: number;
  tables?: CardTable[];
  highlights?: string[];
  referral?: CardLink;
  original?: CardLink;
  provider: string;
  slug: string;
}
