import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';

const Signup = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [step, setStep] = useState(1); // 1: Signup, 2: OTP
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    React.useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || !email || !password) {
            setError('Please fill all fields');
            return;
        }

        try {
            setLoading(true);
            await authService.signup({ name, email, password });
            setStep(2);
        } catch (err) {
            console.error('Signup error', err);
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setError('');

        if (!otp) {
            setError('Please enter the OTP');
            return;
        }

        try {
            setLoading(true);
            await authService.verifyOTP({ email, otp });
            alert('Email verified successfully! You can now login.');
            navigate('/login');
        } catch (err) {
            console.error('OTP Verification error', err);
            setError(err.response?.data?.message || 'Invalid or expired OTP.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#fdfcfb] flex items-center justify-center p-4 relative overflow-hidden">
            <img src="/images/food1.png" className="hidden xl:block absolute -top-20 -left-20 w-64 h-64 opacity-20 rotate-12" alt="" />
            <img src="/images/food2.png" className="hidden xl:block absolute -bottom-20 -right-20 w-80 h-80 opacity-20 -rotate-12" alt="" />
            <img src="/images/food3.png" className="hidden xl:block absolute top-1/2 -right-20 w-48 h-48 opacity-10" alt="" />

            <div className="max-w-4xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-orange-50 relative z-10">
                <div className="md:w-5/12 bg-orange-600 p-8 md:p-12 text-white flex flex-col justify-center">
                    <img src="/images/logo-no-background.png" alt="logo" className="h-10 w-auto mb-10 brightness-200" />
                    <h2 className="text-3xl font-bold mb-6">Join our culinary community</h2>
                    <ul className="space-y-4">
                        {[
                            "Manage your recipes the easy way",
                            "Share and discover new ideas",
                            "Access 15,000+ recipes instantly",
                            "Save your favorites forever"
                        ].map((text, i) => (
                            <li key={i} className="flex items-start space-x-3">
                                <svg className="w-6 h-6 text-orange-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                <span className="text-orange-50 font-medium">{text}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="md:w-7/12 p-8 md:p-12">
                    {step === 1 ? (
                        <>
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                                <p className="text-gray-500">Get started with your free kitchen assistant</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-600 ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="your full name"
                                        className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 transition-all text-gray-900 shadow-sm"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-600 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="your email address"
                                        className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 transition-all text-gray-900 shadow-sm"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-600 ml-1">Password</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 transition-all text-gray-900 shadow-sm"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                {error && (
                                    <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-xl border border-red-100 italic">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 disabled:opacity-50 mt-4"
                                >
                                    {loading ? "Creating Account..." : "Sign Up"}
                                </button>

                                <p className="text-center text-gray-500 text-sm mt-6">
                                    Already have an account? <Link to="/login" className="text-orange-600 font-bold hover:underline">Log in</Link>
                                </p>
                            </form>
                        </>
                    ) : (
                        <>
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Email</h1>
                                <p className="text-gray-500">We've sent a 6-digit OTP to <span className="text-orange-600 font-bold">{email}</span></p>
                            </div>

                            <form onSubmit={handleVerifyOTP} className="space-y-6">
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-600 ml-1">Enter OTP</label>
                                    <input
                                        type="text"
                                        placeholder="Enter the OTP sent to your email"
                                        maxLength="6"
                                        className="w-full px-5 py-4 text-center text-3xl tracking-[1rem] rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 transition-all text-gray-900 shadow-sm font-bold"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                    />
                                </div>

                                {error && (
                                    <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-xl border border-red-100 italic">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 disabled:opacity-50 mt-4"
                                >
                                    {loading ? "Verifying..." : "Verify OTP"}
                                </button>

                                <button 
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="w-full text-gray-500 text-sm font-medium hover:text-orange-600 transition-colors"
                                >
                                    &larr; Back to Signup
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Signup;