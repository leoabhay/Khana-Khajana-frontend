import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Landing = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-[#fdfcfb]">
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gray-900">
                    <img 
                        src="https://images.unsplash.com/photo-1543353071-873f17a7a088?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                        alt="Background" 
                        className="w-full h-full object-cover opacity-60"
                        id="landing-bg-img"
                    />
                </div>
                
                <div className="relative z-10 text-center px-4 space-y-6">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-2">
                        Welcome, <span className="text-orange-400">{user?.name || 'Chef'}</span>!
                    </h1>
                    <p className="text-xl text-orange-50 max-w-2xl mx-auto font-medium">
                        What's on the menu today? Explore thousands of recipes or share your own creation with the world.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Link 
                            to="/recipes" 
                            className="bg-orange-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-2xl shadow-orange-900/20"
                        >
                            Search Recipes
                        </Link>
                        <Link 
                            to="/add-recipe" 
                            className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all"
                        >
                            Add New Recipe
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-orange-50 space-y-4">
                        <div className="text-3xl">📚</div>
                        <h3 className="text-xl font-bold text-gray-900">Browse Categories</h3>
                        <p className="text-gray-500 text-sm">Explore recipes by cuisine, diet, or meal type.</p>
                        <Link to="/recipes" className="text-orange-600 font-bold text-sm inline-block hover:underline">Explore now &rarr;</Link>
                    </div>
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-orange-50 space-y-4">
                        <div className="text-3xl">⭐</div>
                        <h3 className="text-xl font-bold text-gray-900">Your Collection</h3>
                        <p className="text-gray-500 text-sm">Quickly access the recipes you've saved for later.</p>
                        <Link to="/recipe-data" className="text-orange-600 font-bold text-sm inline-block hover:underline">View collection &rarr;</Link>
                    </div>
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-orange-50 space-y-4">
                        <div className="text-3xl">👨‍🍳</div>
                        <h3 className="text-xl font-bold text-gray-900">Community</h3>
                        <p className="text-gray-500 text-sm">See what other chefs in Nepal are cooking today.</p>
                        <span className="text-gray-400 font-bold text-sm inline-block italic">Coming soon...</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;