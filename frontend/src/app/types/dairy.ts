// types/dairy.ts
export type HealthStatus = 'CLEARED' | 'WITHDRAWAL' | 'COLOSTRUM';

export interface Cow {
  id: string;
  name: string;
  status: HealthStatus;
  avgDailyYield: number;
  withdrawalDaysLeft?: number;
}

export interface MilkEntry {
  cowTag: string;
  liters: number;
  session: 'AM' | 'NOON' | 'PM';
  isDumped: boolean;
  revenue: number;
  loss: number;
}
