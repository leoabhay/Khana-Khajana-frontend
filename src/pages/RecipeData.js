import React, { useEffect, useState } from 'react';
import { recipeService, authService } from '../services/api';
import RecipeListItem from '../components/RecipeListItem';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const RecipeData = () => {
  const [createdRecipes, setCreatedRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab ] = useState('created'); // 'created' or 'favorites'
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [createdRes, favoriteRes] = await Promise.all([
            recipeService.getMyRecipes(),
            authService.getFavorites()
        ]);

        if (createdRes.data && createdRes.data.recipes) {
          setCreatedRecipes(createdRes.data.recipes);
        }
        if (favoriteRes.data && favoriteRes.data.favorites) {
            setFavoriteRecipes(favoriteRes.data.favorites);
        }
      } catch (error) {
        console.error("Error fetching collection data", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
        fetchData();
    } else {
        setLoading(false);
    }
  }, [user]);

  const handleDeleteCreated = async (recipeId) => {
    if(window.confirm("Are you sure you want to delete this recipe from your creations?")) {
        try {
            await recipeService.deleteRecipe(recipeId);
            setCreatedRecipes(createdRecipes.filter(r => r._id !== recipeId));
            alert('Recipe deleted successfully');
        } catch (err) {
            console.error('Delete error', err);
            alert('Failed to delete recipe');
        }
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-600"></div>
    </div>
  );

  if (!user) return (
     <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto bg-white p-10 rounded-[2.5rem] shadow-xl border border-orange-50">
            <div className="text-6xl mb-6">🔒</div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Your Collection is Private</h2>
            <p className="text-gray-500 mb-8">Please login to view your saved recipes and culinary creations.</p>
            <Link to="/login" className="w-full bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 inline-block">
                Login to Access
            </Link>
        </div>
    </div>
  );

  return (
    <div className="bg-[#fdfcfb] min-h-screen py-12">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">My Culinary Collection</h1>
                    <p className="text-gray-500">Manage your recipes and saved favorites in one place.</p>
                </div>
                
                <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-orange-50 w-fit">
                    <button 
                        onClick={() => setActiveTab('created')}
                        className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                            activeTab === 'created' 
                            ? 'bg-orange-600 text-white shadow-md' 
                            : 'text-gray-500 hover:text-orange-600'
                        }`}
                    >
                        Created By Me
                    </button>
                    <button 
                        onClick={() => setActiveTab('favorites')}
                        className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                            activeTab === 'favorites' 
                            ? 'bg-orange-600 text-white shadow-md' 
                            : 'text-gray-500 hover:text-orange-600'
                        }`}
                    >
                        My Favorites
                    </button>
                </div>
            </div>
            
            {(activeTab === 'created' ? createdRecipes : favoriteRecipes).length === 0 ? (
                <div className="text-center py-24 bg-white rounded-[3rem] shadow-sm border border-orange-100 px-6">
                    <div className="mb-8 flex justify-center">
                        <div className="h-24 w-24 bg-orange-50 rounded-full flex items-center justify-center text-orange-200">
                             <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                             </svg>
                        </div>
                    </div>
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
                        {activeTab === 'created' ? "You haven't added any recipes yet" : "No favorite recipes found"}
                    </h2>
                    <p className="text-gray-500 mb-10 max-w-sm mx-auto">
                        {activeTab === 'created' 
                            ? "Share your special culinary secrets with the world by adding your first recipe." 
                            : "Browse our collection and tap the heart icon to save recipes you love!"}
                    </p>
                    <Link to={activeTab === 'created' ? "/add-recipe" : "/recipes"} className="bg-orange-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 inline-block">
                        {activeTab === 'created' ? "Create My First Recipe" : "Explore Recipes"}
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {(activeTab === 'created' ? createdRecipes : favoriteRecipes).map((recipe, index) => (
                        <div key={recipe._id || index} className="relative group animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                             <RecipeListItem recipe={recipe} />
                             {activeTab === 'created' && (
                                <div className="absolute top-4 left-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all z-20">
                                    <button 
                                        onClick={() => handleDeleteCreated(recipe._id)}
                                        className="h-10 w-10 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 active:scale-95"
                                        title="Delete Recipe"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>
                                    <Link 
                                        to={`/edit-recipe/${recipe._id}`}
                                        className="h-10 w-10 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 active:scale-95"
                                        title="Edit Recipe"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                    </Link>
                                </div>
                             )}
                             {activeTab === 'created' && (
                                <div className="absolute top-4 right-4 z-20">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border shadow-sm ${
                                        recipe.status === 'approved' ? 'bg-green-500 text-white border-green-600' : 
                                        recipe.status === 'rejected' ? 'bg-red-500 text-white border-red-600' : 
                                        'bg-yellow-400 text-white border-yellow-500'
                                    }`}>
                                        {recipe.status}
                                    </span>
                                </div>
                             )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
};

export default RecipeData;