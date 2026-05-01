import React, { useState, useEffect } from "react";
import FinancialTable from "./financialTable";
import ReportCard from "./ReportCard";
import DateRangePicker from "./DateRangePicker";
import { reportApi } from "../../actions/reportApi";
import { FinancialReportResponse, ReportRecord } from "../../types/report";
import { toast } from "react-hot-toast"; // Or your preferred toast library
import FinancialSummary from "./financialSummary";

export default function ReportsDashboard() {
  // 1. State Management
  const [dates, setDates] = useState({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [reportData, setReportData] = useState<FinancialReportResponse | null>(null);
  const [reportsList, setReportsList] = useState<ReportRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // 2. Fetch Dashboard Data (Ledger Preview)
  const loadDashboard = async () => {
    setLoading(true);
    try {
      const data = await reportApi.getFinancialSummary(dates.start, dates.end);
      setReportData(data);
    } catch (error) {
      toast.error("Failed to load financial summary");
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Report Creation & Payment
  const handleRequestReport = async () => {
    try {
      setIsProcessingPayment(true);
      const newReport = await reportApi.requestReport({
        report_type: "FINANCIAL_SUMMARY",
        start_date: dates.start,
        end_date: dates.end
      });
      
      setReportsList(prev => [newReport, ...prev]);
      toast.success("STK Push sent! Please enter your PIN.");
  
      // Start Polling for Success
      const pollInterval = setInterval(async () => {
        try {
          const updatedReport = await reportApi.getReportStatus(newReport.id);
          
          if (updatedReport.status === 'PAID') {
            clearInterval(pollInterval);
            setIsProcessingPayment(false);
            toast.success("Payment Received! Your report is ready.");
            
            // Update the list with the new status
            setReportsList(prev => 
              prev.map(r => r.id === newReport.id ? { ...r, status: 'PAID' } : r)
            );
          } else if (updatedReport.status === 'FAILED') {
            clearInterval(pollInterval);
            setIsProcessingPayment(false);
            toast.error("Payment failed or timed out.");
          }
        } catch (err) {
          console.error("Polling error", err);
        }
      }, 3000); // Check every 3 seconds
  
      // Stop polling after 60 seconds (timeout)
      setTimeout(() => {
        clearInterval(pollInterval);
        setIsProcessingPayment(false);
      }, 60000);
  
    } catch (error) {
      toast.error("Failed to initiate payment");
      setIsProcessingPayment(false);
    }
  };

  const handleDownload = async (id: string) => {
    try {
      await reportApi.downloadReport(id);
      toast.success("Download started");
    } catch (error) {
      toast.error("Could not download PDF. Ensure payment is complete.");
    }
  };

  // Initial Load
  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Farm Analytics</h1>
            <p className="text-gray-500">Monitor your livestock financial performance</p>
          </div>
          {/* <button 
            onClick={handleRequestReport}
            disabled={isProcessingPayment}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-green-200 transition-all disabled:bg-gray-400"
          >
            {isProcessingPayment ? "Processing M-Pesa..." : "Generate Official Report"}
          </button> */}
        </div>

        {/* Filters */}
        <DateRangePicker 
          startDate={dates.start} 
          endDate={dates.end} 
          onDateChange={(start, end) => setDates({ start, end })}
          onApply={loadDashboard}
          isLoading={loading}
        />

        {/* Financial Summary Cards (derived from reportData) */}
        {reportData && (
          // <FinancialSummary reportData={reportData} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-sm font-medium text-gray-500 uppercase">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">KES {reportData.total_income.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-sm font-medium text-gray-500 uppercase">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">KES {reportData.total_expense.toLocaleString()}</p>
            </div>
            {/* <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-sm font-medium text-gray-500 uppercase">Net Profit</p>
              <p className="text-2xl font-bold text-blue-600">KES {reportData.net_profit.toLocaleString()}</p>
            </div> */}
          </div>
        )}

        {/* Ledger Table */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Recent Transactions</h2>
          {reportData ? (
            <FinancialTable transactions={reportData.transactions} />
          ) : (
            <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />
          )}
        </div>

        {/* Archived/Generated Reports Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Available PDF Downloads</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportsList.map((report) => (
              <ReportCard 
                key={report.id} 
                report={report} 
                onDownload={handleDownload} 
                onPay={handleRequestReport} 
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}