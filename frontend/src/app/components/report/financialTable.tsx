import React from 'react';
import { FinancialReportItem } from '../../types/report';
import { format } from 'date-fns';
import { ArrowUpRight, ArrowDownLeft, ReceiptText } from 'lucide-react';

interface FinancialTableProps {
  transactions: FinancialReportItem[];
}

const FinancialTable: React.FC<FinancialTableProps> = ({ transactions }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
        <ReceiptText size={20} className="text-gray-500" />
        <h2 className="text-lg font-bold text-gray-800">Transaction Breakdown</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-gray-400 italic">
                  No transactions found for the selected period.
                </td>
              </tr>
            ) : (
              transactions.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    {format(new Date(item.date), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 capitalize">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className={`flex items-center justify-end gap-1 font-semibold ${
                      item.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.type === 'INCOME' ? (
                        <ArrowUpRight size={14} />
                      ) : (
                        <ArrowDownLeft size={14} />
                      )}
                      KES {item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialTable;