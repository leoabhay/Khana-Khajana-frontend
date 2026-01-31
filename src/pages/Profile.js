import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';

const Profile = () => {
    const { user, setUser } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [profilePicture, setProfilePicture] = useState(user?.profilePicture || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const fileInputRef = useRef(null);

    const handlePhotoClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            // Show preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const formData = new FormData();
            formData.append('name', name);
            if (currentPassword) formData.append('currentPassword', currentPassword);
            if (newPassword) formData.append('newPassword', newPassword);
            
            if (imageFile) {
                formData.append('profilePicture', imageFile);
            }

            const response = await authService.updateMe(formData);
            setUser(response.data.user);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setCurrentPassword('');
            setNewPassword('');
        } catch (err) {
            console.error('Update profile error', err);
            setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update profile.' });
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-orange-50">
                    <div className="bg-orange-600 h-32 relative">
                        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                            <div 
                                onClick={handlePhotoClick}
                                className="relative group cursor-pointer"
                            >
                                <img 
                                    src={profilePicture || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'} 
                                    alt="Profile" 
                                    className="h-32 w-32 rounded-full border-4 border-white shadow-lg object-cover bg-white transition-opacity group-hover:opacity-80"
                                />
                                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                </div>
                                <input 
                                    type="file" 
                                    className="hidden" 
                                    ref={fileInputRef} 
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="pt-20 pb-12 px-8 md:px-12">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                            <p className="text-gray-500">{user.email}</p>
                        </div>

                        {message.text && (
                            <div className={`p-4 rounded-2xl mb-8 text-center font-medium ${
                                message.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
                            }`}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Display Name</label>
                                <input 
                                    type="text" 
                                    className="w-full text-gray-700 px-5 py-3 rounded-2xl border border-gray-200 focus:border-orange-500 focus:ring-orange-500 transition-all shadow-sm"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            <div className="border-t border-gray-100 pt-8 mt-12">
                                <h3 className="text-lg font-bold text-gray-900 mb-6">Security Settings</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 ml-1">Current Password</label>
                                        <input
                                            type="password"
                                            className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 transition-all text-gray-900 shadow-sm"
                                            placeholder="Your current password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 ml-1">New Password</label>
                                        <input
                                            type="password"
                                            className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 transition-all text-gray-900 shadow-sm"
                                            placeholder="New secure password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 mt-4 italic">Leave blank if you don't want to change your password</p>
                            </div>

                            <div className="pt-4">
                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 disabled:opacity-50"
                                >
                                    {loading ? 'Saving Changes...' : 'Update Profile'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
