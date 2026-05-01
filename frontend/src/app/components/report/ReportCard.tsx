import React from 'react';
import { FileText, Download, Lock, Calendar, ChevronRight, Clock } from 'lucide-react';
import { ReportRecord } from '../../types/report';
import { format } from 'date-fns';

interface ReportCardProps {
  report: ReportRecord;
  onDownload: (id: string) => void;
  onPay: (id: string) => void;
  isProcessing?: boolean;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, onDownload, onPay, isProcessing }) => {
  const isPaid = report.status === 'PAID' || report.status === 'GENERATED';
  const isPending = report.status === 'PENDING';

  return (
    <div className="group relative bg-white border border-gray-100 rounded-2xl p-5 transition-all duration-300 hover:border-green-200 hover:shadow-xl hover:shadow-green-900/5 overflow-hidden">
      
      {/* Decorative Background Accent */}
      <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-[0.03] transition-transform group-hover:scale-150 ${
        isPaid ? 'bg-green-600' : 'bg-amber-600'
      }`} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <div className={`p-2.5 rounded-xl ${
            isPaid ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
          }`}>
            <FileText size={22} />
          </div>
          
          <div className="flex flex-col items-end">
            <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${
              isPaid 
                ? 'bg-green-100/50 text-green-700' 
                : 'bg-amber-100/50 text-amber-700 animate-pulse'
            }`}>
              {isPending && <Clock size={10} />}
              {report.status}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-gray-900 font-bold text-base capitalize mb-1 flex items-center gap-2">
            {report.report_type.toLowerCase().replace('_', ' ')}
            {isPaid && <div className="w-1.5 h-1.5 rounded-full bg-green-500" />}
          </h3>
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar size={14} />
              <span className="text-xs font-medium">
                {format(new Date(report.created_at), 'MMM dd, yyyy')}
              </span>
            </div>
            {/* Displaying the period covered by the report */}
            <div className="flex items-center gap-2 text-gray-400">
              <Clock size={14} />
              <span className="text-[11px] font-medium italic">
                {report.parameters?.start_date} → {report.parameters?.end_date}
              </span>
            </div>
          </div>
        </div>

        {isPaid ? (
          <button
            onClick={() => onDownload(report.id)}
            className="w-full group/btn flex items-center justify-between bg-gray-900 hover:bg-green-600 text-white py-3 px-5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-gray-200 hover:shadow-green-200"
          >
            <div className="flex items-center gap-2">
              <Download size={18} className="group-hover/btn:-translate-y-0.5 transition-transform" />
              <span>Download Report</span>
            </div>
            <ChevronRight size={16} className="opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
          </button>
        ) : (
          <button
            onClick={() => onPay(report.id)}
            disabled={isProcessing}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white py-2.5 px-4 rounded-xl font-bold text-sm transition-all active:scale-95"
          >
            {isProcessing ? (
              <div className="h-5 w-5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Lock size={18} />
                <span>Unlock for KES 50.00</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default ReportCard;