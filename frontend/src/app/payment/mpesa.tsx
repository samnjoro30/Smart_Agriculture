import React, { useState } from 'react';
import { Smartphone, ShieldCheck, Loader2, Lock, CheckCircle2 } from 'lucide-react';
import axiosInstance from '../API/axiosInstance';

const packages = [
  { id: 'starter', name: 'Starter', price: 1, animals: 8 },
  { id: 'standard', name: 'Standard', price: 450, animals: 15 },
  { id: 'premium', name: 'Premium', price: 950, animals: 32 },
];

const MpesaPayment: React.FC = () => {
  const [selectedPkg, setSelectedPkg] = useState(packages[0]); 
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pushing' | 'awaiting-pin' | 'success' | 'error'>('idle');

  const checkPaymentStatus = async (checkoutRequestID: string) => {
    let attempts = 0;
    const maxAttempts = 20; // 20 attempts * 3 seconds = 60 seconds total
  
    const interval = setInterval(async () => {
      try {
        attempts++;
        // Endpoint that checks your DB/Redis for the Callback result
        const res = await axiosInstance.get(`/payments/mpesa/status/${checkoutRequestID}`);
  
        if (res.data.status === 'COMPLETED' && res.data.resultCode === 0) {
          clearInterval(interval);
          setPaymentStatus('success');
          setIsLoading(false);
          // Optional: refresh user profile to show new animal limits
          // window.location.reload(); 
        } else if (res.data.status === 'FAILED' || res.data.resultCode !== undefined) {
          // ResultCode 1032 is User Cancelled, for example
          clearInterval(interval);
          setPaymentStatus('error');
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
  
      if (attempts >= maxAttempts) {
        clearInterval(interval);
        setPaymentStatus('error');
        setIsLoading(false);
        alert("Payment timeout. If you paid, your account will update shortly.");
      }
    }, 3000); // Poll every 3 seconds
  };

  const handlePayment = async () => {
    const cleanPhone = phoneNumber.startsWith('0') ? phoneNumber.substring(1) : phoneNumber;
    const fullPhone = `254${cleanPhone}`;
  
    setIsLoading(true);
    setPaymentStatus('pushing');
  
    try {
      const res = await axiosInstance.post('/payments/mpesa/stk-push', {
        phone_number: fullPhone,
        amount: selectedPkg.price,
        package_id: selectedPkg.id 
      });
  
      if (res.status === 200 || res.status === 201) {
        setPaymentStatus('awaiting-pin');
        
        // TRIGGER POLLING HERE
        // Assuming your backend returns the Safaricom CheckoutRequestID
        if (res.data.CheckoutRequestID) {
          checkPaymentStatus(res.data.CheckoutRequestID);
        }
      } else {
        throw new Error('Failed');
      }
    } catch (err) {
      setPaymentStatus('error');
      setTimeout(() => {
        setPaymentStatus('idle');
        setIsLoading(false);
      }, 3000);
    }
  };

  return (
  <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 h-full flex flex-col justify-between">
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-2xl transition-colors ${
            paymentStatus === 'awaiting-pin' ? 'bg-amber-100 text-amber-600 animate-pulse' : 
            paymentStatus === 'success' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
          }`}>
            <Smartphone size={24} />
          </div>
          <div>
            <h3 className="text-lg font-black text-gray-900 leading-none">Lipa na M-Pesa</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest">Daraja Secured</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-gray-400 uppercase">Total</p>
          <p className={`text-xl font-black transition-colors ${
            paymentStatus === 'success' ? 'text-blue-600' : 'text-green-600'
          }`}>
            Ksh {selectedPkg.price}
          </p>
        </div>
      </div>

      {/* Package Selector Grid */}
      <label className="text-[10px] font-black uppercase text-gray-400 block mb-3 ml-1 tracking-widest">
        Select Package
      </label>
      <div className="grid grid-cols-3 gap-2 mb-6">
        {packages.map((pkg) => (
          <button
            key={pkg.id}
            disabled={isLoading || paymentStatus === 'success'}
            onClick={() => setSelectedPkg(pkg)}
            className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 ${
              selectedPkg.id === pkg.id
                ? 'border-green-500 bg-green-50'
                : 'border-gray-50 bg-gray-50 hover:border-gray-200'
            } ${paymentStatus === 'success' ? 'opacity-50' : ''}`}
          >
            <span className={`text-[10px] font-black uppercase ${
              selectedPkg.id === pkg.id ? 'text-green-600' : 'text-gray-400'
            }`}>
              {pkg.name}
            </span>
            <span className="text-xs font-bold text-gray-800">Ksh {pkg.price}</span>
          </button>
        ))}
      </div>

      {/* Phone Input */}
      <div className="relative group mb-4">
        <label className="text-[10px] font-black uppercase text-gray-400 block mb-2 ml-1 tracking-widest">
          Phone Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-gray-700 font-bold text-xs">+254</span>
          </div>
          <input
            type="tel"
            disabled={isLoading || paymentStatus === 'success'}
            placeholder="712345678"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 9))}
            className="w-full bg-gray-50 border-2 border-transparent focus:border-green-500 focus:bg-white rounded-2xl py-3.5 pl-12 pr-4 text-sm text-gray-700 font-bold tracking-[0.1em] outline-none transition-all disabled:opacity-50"
          />
        </div>
      </div>
    </div>

    {/* Button & Footer */}
    <div className="space-y-3">
      <button
        onClick={handlePayment}
        disabled={phoneNumber.length < 9 || isLoading || paymentStatus === 'success'}
        className={`w-full py-4 rounded-2xl font-black text-sm flex flex-col items-center justify-center gap-1 transition-all active:scale-95 shadow-lg ${
          paymentStatus === 'success' ? 'bg-blue-600 text-white shadow-blue-100' :
          paymentStatus === 'error' ? 'bg-red-500 text-white' :
          paymentStatus === 'awaiting-pin' ? 'bg-amber-500 text-white' :
          phoneNumber.length >= 9 && !isLoading ? 'bg-green-600 text-white shadow-green-100' : 
          'bg-gray-100 text-gray-300'
        }`}
      >
        <div className="flex items-center gap-2">
          {isLoading && paymentStatus !== 'success' ? (
            <Loader2 className="animate-spin" size={18} /> 
          ) : (
            <ShieldCheck size={18} />
          )}
          
          <span className="uppercase tracking-tight">
            {paymentStatus === 'pushing' && 'Sending...'}
            {paymentStatus === 'awaiting-pin' && 'Check Your Phone'}
            {paymentStatus === 'success' && 'Upgrade Complete!'}
            {paymentStatus === 'error' && 'Try Again'}
            {paymentStatus === 'idle' && `Confirm Upgrade`}
          </span>
        </div>
        
        {paymentStatus === 'awaiting-pin' && (
          <span className="text-[10px] font-medium animate-pulse">Enter PIN on your Safaricom line</span>
        )}
      </button>
      
      <div className="flex items-center justify-center gap-2 opacity-30">
        <Lock size={10} />
        <span className="text-[9px] font-black uppercase tracking-tighter text-gray-900">
          {paymentStatus === 'success' ? 'Transaction Verified' : 'End-to-End Encrypted'}
        </span>
      </div>
    </div>
  </div>
);
};

export default MpesaPayment;