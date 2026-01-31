import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Request OTP, 2: Reset
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleRequestOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            await authService.forgotPassword({ email });
            setMessage({ type: 'success', text: 'OTP sent to your email!' });
            setStep(2);
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to send OTP.' });
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            await authService.resetPassword({ email, otp, newPassword });
            setMessage({ type: 'success', text: 'Password reset successful!' });
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to reset password.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fdfcfb] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl p-8 border border-orange-50">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {step === 1 ? 'Forgot Password?' : 'Reset Password'}
                    </h2>
                    <p className="text-gray-500">
                        {step === 1 
                            ? 'Enter your email to receive a reset code' 
                            : `Enter the code sent to ${email}`}
                    </p>
                </div>

                {message.text && (
                    <div className={`p-4 rounded-xl mb-6 text-sm text-center font-medium ${
                        message.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
                    }`}>
                        {message.text}
                    </div>
                )}

                {step === 1 ? (
                    <form onSubmit={handleRequestOTP} className="space-y-6">
                        <div>
                            <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                            <input
                                type="email"
                                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 transition-all shadow-sm"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 disabled:opacity-50"
                        >
                            {loading ? 'Sending...' : 'Send OTP'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleResetPassword} className="space-y-6">
                        <div>
                            <label className="text-sm font-semibold text-gray-700 ml-1">OTP Code</label>
                            <input
                                type="text"
                                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 transition-all shadow-sm text-center text-xl font-bold tracking-widest"
                                placeholder="Enter the code sent to your email"
                                maxLength="6"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-700 ml-1">New Password</label>
                            <input
                                type="password"
                                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 transition-all shadow-sm"
                                placeholder="Min 6 characters"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                minLength="6"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 disabled:opacity-50"
                        >
                            {loading ? 'Resetting...' : 'Update Password'}
                        </button>
                    </form>
                )}

                <div className="text-center mt-8">
                    <Link to="/login" className="text-orange-600 font-bold hover:underline">
                        Recall your password? Log in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;