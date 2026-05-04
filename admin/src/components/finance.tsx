import { useEffect, useState } from "react";
import { 
  Wallet, 
  ArrowUpRight, 
  CheckCircle2, 
  XCircle, 
  Search,
  Loader2,
  FileText
} from "lucide-react";
import axiosInstance from "../api/axiosInstance";

interface Transaction {
  id: string;
  username: string;
  amount: number;
  category: string;
  reference: string;
  date: string;
}

interface FinanceData {
  total_revenue: number;
  currency: string;
  transaction_stats: {
    success: number;
    failed: number;
    pending: number;
  };
  recent_transactions: Transaction[];
}

export default function Finance() {
  const [data, setData] = useState<FinanceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFinance = async () => {
      try {
        const res = await axiosInstance.get("/admin/auth/finance-stats");
        setData(res.data);
      } catch (err) {
        console.error("Finance fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFinance();
  }, []);

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-green-600" /></div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Financial Oversight</h2>
          <p className="text-sm text-gray-500">Monitor revenue and payment gateway performance.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">
          <FileText size={16} /> Export CSV
        </button>
      </div>

      {/* 🔹 Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-600 p-6 rounded-2xl text-white shadow-lg shadow-green-200">
          <div className="flex justify-between items-center opacity-80">
            <p className="text-sm font-medium">Total Revenue</p>
            <Wallet size={20} />
          </div>
          <h3 className="text-3xl font-bold mt-2">
            {data?.currency} {data?.total_revenue.toLocaleString()}
          </h3>
          <p className="text-xs mt-4 flex items-center gap-1 opacity-90">
            <ArrowUpRight size={14} /> +12.5% from last month
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Payment Success Rate</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {data ? ((data.transaction_stats.success / (data.transaction_stats.success + data.transaction_stats.failed || 1)) * 100).toFixed(1) : 0}%
            </h3>
          </div>
          <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Failed Attempts</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{data?.transaction_stats.failed}</h3>
          </div>
          <div className="h-12 w-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
            <XCircle size={24} />
          </div>
        </div>
      </div>

      {/* 🔹 Detailed Ledger */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Recent Transactions</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input 
              type="text" 
              placeholder="Ref number..." 
              className="pl-9 pr-4 py-1.5 bg-gray-50 border-none rounded-lg text-xs outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-[10px] uppercase text-gray-400 font-bold">
              <tr>
                <th className="px-6 py-3">Farmer</th>
                <th className="px-6 py-3">Reference</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {data?.recent_transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">{tx.username}</td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">{tx.reference}</td>
                  <td className="px-6 py-4 text-gray-600">
                    <span className="px-2 py-0.5 rounded-md bg-gray-100 text-[11px] font-medium uppercase">
                      {tx.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(tx.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-gray-900">
                    {data.currency} {tx.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}