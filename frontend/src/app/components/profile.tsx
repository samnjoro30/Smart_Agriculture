'use client';
import { useEffect, useState } from 'react';

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
      await axiosInstance.put(`/users/update-${field}`, {
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
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="bg-green-100 p-6 rounded-2xl shadow-sm">
        <h2 className="text-3xl font-bold text-gray-800">
          {profile?.username}
        </h2>
        <p className="text-green-700">{profile?.farmname}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Profile Info */}
        <div className="bg-green-100 p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-green-700 mb-4">
            Profile Details
          </h3>

          <ul className="space-y-3 text-gray-700">
            <li>
              <strong>Username:</strong> {profile?.username}
            </li>
            <li>
              <strong>Email:</strong> {profile?.email}
            </li>
            <li>
              <strong>Farm:</strong> {profile?.farmname}
            </li>
            <li>
              <strong>Phone:</strong> {profile?.phonenumber}
            </li>
          </ul>
        </div>

        {/* Editable Settings */}
        <div className="bg-green-100 p-6 rounded-xl shadow-sm border space-y-5">
          <h3 className="text-lg font-semibold text-green-700">
            Edit Settings
          </h3>

          {/* Reusable Field */}
          {['email', 'farmname', 'phonenumber', 'password'].map((field) => (
            <div key={field}>
              <label className="text-sm font-medium text-gray-600 capitalize">
                {field}
              </label>

              {editingField === field ? (
                <div className="flex gap-2 mt-1">
                  <input
                    type={field === 'password' ? 'password' : 'text'}
                    name={field}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleChange}
                    className="flex-1 border rounded-lg px-3 py-2"
                  />

                  <button
                    onClick={() => handleSave(field)}
                    className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditingField(null)}
                    className="bg-gray-200 px-3 py-2 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center mt-1">
                  <span className="text-gray-700">
                    {field === 'password'
                      ? '••••••••'
                      : profile?.[field as keyof Profile]}
                  </span>

                  <button
                    onClick={() => setEditingField(field)}
                    className="text-green-600 text-sm font-medium hover:underline"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Notifications + Subscription */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Notification Preferences */}
        <div className="bg-green-100 p-6 rounded-xl shadow-sm border space-y-4">
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
        </div>

        {/* Subscription Plan */}
        <div className="bg-green-100 p-6 rounded-xl shadow-sm border space-y-4">
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
        </div>
      </div>
    </div>
  );
}
