// /types/feed.ts

export type Feed = {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
  supplier?: string;
};
