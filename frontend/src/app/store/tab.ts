// store/tabs.ts

export type TabItem = {
    id: string;
    label: string;
  };
  
  // 🔹 FARM TABS
  export const FARM_TABS: TabItem[] = [
    { id: 'register', label: 'Register Animal' },
    { id: 'milk', label: 'Milk Production' },
    { id: 'categories', label: 'Categories' },
    { id: 'feed', label: 'Feed Stock' },
    { id: 'animals', label: 'All Animals' },
  ];
  
  // 🔹 REPORT TABS
  export const REPORT_TABS: TabItem[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'milk', label: 'Milk Reports' },
    { id: 'finance', label: 'Financial Reports' },
    { id: 'livestock', label: 'Livestock Reports' },
  ];

  // store/tabs.ts

export type FarmTabId =
  | 'register'
  | 'milk'
  | 'categories'
  | 'feed'
  | 'animals';

export type ReportTabId =
  | 'overview'
  | 'milk'
  | 'finance'
  | 'livestock';