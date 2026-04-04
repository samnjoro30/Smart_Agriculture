'use client';

import { useState } from 'react';

import axiosInstance from '../API/axiosInstance';

export default function SupportCenter() {
  const [formData, setFormData] = useState({
    type: 'feedback',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post('/support/message', formData);
      alert('Message sent successfully ✅');

      setFormData({
        type: 'feedback',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error(error);
      alert('Failed to send message ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="bg-green-100 p-6 rounded-2xl shadow-sm">
        <h2 className="text-3xl font-bold text-gray-800">Support Center</h2>
        <p className="text-green-700">
          Need help? Send feedback, report issues, or contact our support team.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
          <h3 className="text-lg font-semibold text-green-700">Contact Us</h3>

          <div className="space-y-3 text-gray-700">
            <p>📧 Email: support@smartfarm.com</p>
            <p>📞 Phone: +254 700 000 000</p>
            <p>💬 WhatsApp: +254 700 000 000</p>
          </div>

          <div className="bg-green-50 p-3 rounded-lg text-sm text-gray-600">
            Our team typically responds within 24 hours.
          </div>
        </div>

        {/* Feedback / Complaint Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-sm border space-y-4"
        >
          <h3 className="text-lg font-semibold text-green-700">
            Send a Message
          </h3>

          {/* Type */}
          <div>
            <label className="text-sm text-gray-600">Message Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            >
              <option value="feedback">Feedback</option>
              <option value="complaint">Complaint</option>
              <option value="support">Support Request</option>
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="text-sm text-gray-600">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              className="w-full border rounded-lg px-3 py-2 mt-1"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="text-sm text-gray-600">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe your issue or feedback..."
              className="w-full border rounded-lg px-3 py-2 mt-1 h-32"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}
