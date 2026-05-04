import { useEffect, useState } from "react";
import { Search, UserX, UserCheck, ShieldCheck, Loader2 } from "lucide-react";
import axiosInstance from "../api/axiosInstance";

interface Farmer {
  id: string;
  username: string;
  email: string;
  farmname: string;
  is_verified: boolean;
  is_active: boolean;
  joined_at: string;
}

export default function Farmers() {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const res = await axiosInstance.get("/admin/auth/farmers");
      setFarmers(res.data);
    } catch {
      console.error("Error fetching farmers");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await axiosInstance.patch(`/admin/auth/farmers/${id}/status`, {
        is_active: !currentStatus
      });
      // Optimistic update
      setFarmers(farmers.map(f => f.id === id ? { ...f, is_active: !currentStatus } : f));
    } catch {
      alert("Failed to update user status");
    }
  };

  const filteredFarmers = farmers.filter(f => 
    f.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.farmname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-green-600" /></div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Farmer Directory</h2>
          <p className="text-sm text-gray-500">Manage access and verify accounts for your platform members.</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or farm..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Farmer</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Farm Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Verification</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredFarmers.map((farmer) => (
                <tr key={farmer.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">
                        {farmer.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{farmer.username}</p>
                        <p className="text-xs text-gray-500">{farmer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{farmer.farmname}</td>
                  <td className="px-6 py-4">
                    {farmer.is_verified ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                        <ShieldCheck size={12} /> Verified
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400 italic">Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      farmer.is_active 
                        ? 'bg-green-50 text-green-700 border-green-100' 
                        : 'bg-red-50 text-red-700 border-red-100'
                    }`}>
                      {farmer.is_active ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => toggleStatus(farmer.id, farmer.is_active)}
                      className={`p-2 rounded-lg transition ${
                        farmer.is_active 
                          ? 'text-red-500 hover:bg-red-50' 
                          : 'text-green-600 hover:bg-green-50'
                      }`}
                      title={farmer.is_active ? "Disable User" : "Enable User"}
                    >
                      {farmer.is_active ? <UserX size={18} /> : <UserCheck size={18} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredFarmers.length === 0 && (
          <div className="p-20 text-center">
            <div className="inline-flex p-4 bg-gray-50 rounded-full mb-4">
              <UserX className="text-gray-300" size={32} />
            </div>
            <p className="text-gray-500 font-medium">No farmers found matches your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}