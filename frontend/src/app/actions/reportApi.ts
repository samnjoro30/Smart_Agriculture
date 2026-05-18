import axiosInstance from "../API/axiosInstance";

export const reportApi = {
    // 1. Fetch JSON data for the dashboard preview
    getFinancialSummary: async (startDate: string, endDate: string) => {
      const { data } = await axiosInstance.get('/reports/financial', {
        params: { start_date: startDate, end_date: endDate },
      });
      return data;
    },

    // 2. Initiate Report Request & STK Push
    requestReport: async (payload: { report_type: string; start_date: string; end_date: string }) => {
      const { data } = await axiosInstance.post('/reports/request', payload);
      return data;
    },

    // 3. Check status (used for polling after STK Push)
    getReportStatus: async (reportId: string) => {
      const { data } = await axiosInstance.get(`/reports/status/${reportId}`);
      return data; 
    },
  
    // 4. Trigger the PDF download
    downloadReport: async (reportId: string) => {
      const response = await axiosInstance.get(`/reports/download/${reportId}`, {
        responseType: 'blob', 
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Farm_Report_${new Date().getTime()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url); // Clean up memory
    }
  };