import { screen } from '@testing-library/react';
export interface FinancialReportItem {
    date: string;
    category: string;
    description: string;
    type: 'INCOME' | 'EXPENSE';
    amount: number;
  }
  
  export interface FinancialReportResponse {
    total_income: number;
    total_expense: number;
    net_profit: number;
    transactions: FinancialReportItem[];
  }
  
  export interface ReportRecord {
    id: string;
    status: 'PENDING' | 'PAID' | 'GENERATED';
    report_type: string;
    parameters?:{
      start_date: string;
      end_date: string;
    };
    
    created_at: string;
  }