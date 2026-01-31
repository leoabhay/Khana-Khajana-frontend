import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NavBar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 glass bg-white/80 border-b border-orange-100 px-4 py-3">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2">
                    <img src="/images/logo-no-background.png" alt="KhanaKhajana" className="h-10 w-auto" />
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Home</Link>
                    <Link to="/recipes" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Recipes</Link>
                    <Link to="/ingredient-search" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Ingredient Search</Link>
                    {user && (
                        <>
                            <Link to="/add-recipe" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Add Recipe</Link>
                            <Link to="/recipe-data" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">My Collection</Link>
                        </>
                    )}
                    {user?.role === 'admin' && (
                        <Link to="/admin" className="text-purple-600 hover:text-purple-700 font-bold transition-colors">Admin</Link>
                    )}
                </div>

                <div className="flex items-center space-x-4">
                    {user ? (
                        <div className="flex items-center space-x-6">
                            <Link to="/profile" className="flex items-center space-x-2 group">
                                <img 
                                    src={user.profilePicture || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'} 
                                    alt="Profile" 
                                    className="h-9 w-9 rounded-full border border-orange-100 group-hover:border-orange-500 transition-all object-cover" 
                                />
                                <span className="text-gray-600 text-sm font-bold group-hover:text-orange-600 transition-colors hidden sm:inline">{user.name}</span>
                            </Link>
                            <button 
                                onClick={handleLogout}
                                className="bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-orange-700 transition-all shadow-md hover:shadow-orange-200"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <Link to="/login" className="text-gray-700 hover:text-orange-600 font-medium px-4">Login</Link>
                            <Link 
                                to="/signup" 
                                className="bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-orange-700 transition-all shadow-md hover:shadow-orange-200"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;