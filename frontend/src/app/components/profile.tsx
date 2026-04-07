'use client';
import { useEffect, useState } from 'react';

import {
  Check,
  Edit3,
  Landmark,
  Leaf,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  X,
} from 'lucide-react';

import axiosInstance from '../API/axiosInstance';

interface Profile {
  email: string;
  username: string;
  farmname: string;
  phonenumber: string;
}

export default function ProfileSetting() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    email: '',
    farmname: '',
    phonenumber: '',
    password: '',
  });

  const [editingField, setEditingField] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get('/farm/farm-profile', {
          withCredentials: true,
        });
        if (!cancelled) {
          const details = res.data;
          setProfile(details);
          setFormData({
            email: details.email,
            farmname: details.farmname,
            phonenumber: details.phonenumber,
            password: '',
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchProfile();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (field: string) => {
    try {
      await axiosInstance.put(`/farm/update-${field}`, {
        [field]: formData[field as keyof typeof formData],
      });
      setEditingField(null);
    } catch (error) {
      console.error(`Error updating ${field}`, error);
    }
  };

  if (loading) {
    return (
      <p className="text-center text-gray-500 mt-10">Loading profile...</p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-2 space-y-3">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-700 to-green-500 p-5 md:p-6 rounded-[1.5rem] shadow-md shadow-green-100/50">
        <div className="absolute top-0 right-0 w-32 h-full bg-white/1 skew-x-[-20deg] translate-x-10"></div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left Side: Name & Status */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex h-10 w-10 bg-white/20 backdrop-blur-md rounded-xl items-center justify-center text-white">
              <Leaf size={20} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white leading-tight">
                {profile?.username}
              </h2>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse"></span>
                <span className="text-[10px] font-bold text-green-100 uppercase tracking-widest">
                  Digital Farm ID
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Decorative Farm Name Badge */}
          <div className="flex">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-2xl flex items-center gap-2 group hover:bg-white/20 transition-all cursor-default">
              <div className="bg-green-400/30 p-1.5 rounded-lg">
                <MapPin size={14} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-green-200 uppercase leading-none mb-0.5">
                  Established Farm
                </span>
                <span className="text-sm font-extrabold text-white tracking-wide">
                  {profile?.farmname}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* setting area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          {/* Header Area */}
          <div className="h-16 bg-gradient-to-r from-green-600 to-green-500 relative shrink-0">
            <button className="absolute right-4 top-4 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-all">
              <Edit3 size={18} />
            </button>
          </div>

          {/* Content: flex-1 makes this section grow to fill the card */}
          <div className="px-6 pb-8 flex-1 flex flex-col">
            <div className="relative -mt-10 mb-3 flex justify-center shrink-0">
              <div className="p-1 bg-white rounded-full shadow-lg">
                <div className="h-20 w-20 bg-green-50 rounded-full flex items-center justify-center text-green-600 border-2 border-green-100">
                  <User size={40} strokeWidth={1.5} />
                </div>
              </div>
              <div className="absolute bottom-1 right-1/2 translate-x-10 bg-blue-500 p-1 rounded-full border-4 border-white text-white shadow-sm">
                <ShieldCheck size={12} />
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-gray-900 leading-tight">
                {profile?.username || 'Farmer Name'}
              </h2>
              <p className="text-green-600 font-bold text-sm flex items-center justify-center gap-1">
                <MapPin size={14} />
                {profile?.farmname || 'Main Farm Location'}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 flex-1">
              <div className="p-4 bg-gray-50 rounded-2xl border border-transparent">
                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1 flex items-center gap-1">
                  <Mail size={12} /> Contact Email
                </p>
                <p className="text-sm font-semibold text-gray-800 break-all">
                  {profile?.email}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-transparent">
                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1 flex items-center gap-1">
                  <Phone size={12} /> Mobile Number
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  {profile?.phonenumber || 'Not Linked'}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <span className="text-xs font-medium text-gray-500">
                  Account Active
                </span>
              </div>
              <button className="text-xs font-bold text-red-500 hover:bg-red-100 px-5 py-2 rounded-lg transition-colors">
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Editable Settings */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <div className="p-1.5 bg-green-50 text-green-600 rounded-lg">
                <Edit3 size={18} />
              </div>
              Account Settings
            </h3>

            <div className="space-y-3">
              {['email', 'farmname', 'phonenumber', 'password'].map((field) => {
                const isEditing = editingField === field;
                const icons: any = {
                  email: <Mail size={16} />,
                  farmname: <Landmark size={16} />,
                  phonenumber: <Phone size={16} />,
                  password: <Lock size={16} />,
                };

                return (
                  <div
                    key={field}
                    className={`p-3 md:p-4 rounded-2xl border transition-all ${isEditing ? 'bg-white border-green-200 ring-4 ring-green-50' : 'bg-gray-50 border-transparent hover:bg-white hover:border-gray-200'}`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        {icons[field]} {field.replace('name', ' name')}
                      </label>
                      {!isEditing && (
                        <button
                          onClick={() => setEditingField(field)}
                          className="p-1 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <Edit3 size={14} />
                        </button>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="mt-2 space-y-2">
                        <input
                          type={field === 'password' ? 'password' : 'text'}
                          name={field}
                          autoFocus
                          value={formData[field as keyof typeof formData]}
                          onChange={handleChange}
                          className="w-full bg-white text-gray-600 border-2 border-green-100 rounded-xl px-4 py-2 text-sm font-medium focus:border-green-500 outline-none"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSave(field)}
                            className="flex-1 bg-green-600 text-white py-2 rounded-xl font-bold text-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingField(null)}
                            className="px-4 py-2 bg-red-100 text-red-500 rounded-xl font-bold text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-800 font-semibold truncate px-1">
                        {field === 'password'
                          ? '••••••••'
                          : profile?.[field as keyof Profile] || '---'}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Notifications + Subscription */}
      {/* <div className="grid md:grid-cols-2 gap-6"> */}
      {/* Notification Preferences */}
      {/* <div className="bg-green-100 p-6 rounded-xl shadow-sm border space-y-4">
          <h3 className="text-lg font-semibold text-green-700">
            Notification Preferences
          </h3>

          <div className="space-y-3 text-gray-700">
            <label className="flex items-center justify-between">
              <span>📱 WhatsApp Alerts</span>
              <input type="checkbox" className="accent-green-600" />
            </label>

            <label className="flex items-center justify-between">
              <span>📩 SMS Notifications</span>
              <input type="checkbox" className="accent-green-600" />
            </label>

            <label className="flex items-center justify-between">
              <span>📧 Email Updates</span>
              <input type="checkbox" className="accent-green-600" />
            </label>
          </div>

          <button
            onClick={async () => {
              try {
                await axiosInstance.put('/users/preferences', {
                  whatsapp: true,
                  sms: false,
                  email: true,
                });
                alert('Preferences updated');
              } catch (err) {
                console.error(err);
              }
            }}
            className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Save Preferences
          </button>
        </div> */}

      {/* Subscription Plan */}
      {/* <div className="bg-green-100 p-6 rounded-xl shadow-sm border space-y-4">
          <h3 className="text-lg font-semibold text-green-700">
            Subscription Plan
          </h3>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-gray-700">
              <strong>Plan:</strong> Basic
            </p>

            <p className="text-gray-700">
              <strong>Status:</strong>
              <span className="text-green-600 font-medium ml-1">Active</span>
            </p>

            <p className="text-gray-500 text-sm mt-2">
              Access to livestock tracking, reproduction monitoring, and basic
              analytics.
            </p>
          </div>

          <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
            Upgrade Plan
          </button>
        </div> */}
      {/* </div> */}
    </div>
  );
}
