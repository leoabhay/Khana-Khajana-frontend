import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const RecipeListItem = ({ recipe }) => {
  const { user, favorites, setFavorites } = useAuth();
  const recipeId = recipe._id || recipe.id;
  const isFavorite = favorites && favorites.some(f => (f._id || f) === (recipe._id || recipe.id));
  const [loading, setLoading] = useState(false);

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    if (!user) {
        alert('Please login to favorite recipes');
        return;
    }
    try {
        setLoading(true);
        const response = await authService.toggleFavorite(recipeId);
        setFavorites(response.data.favorites);
    } catch (err) {
        console.error('Error toggling favorite:', err);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-orange-50 flex flex-col h-full">
      <div className="relative overflow-hidden h-48">
        {recipe.imageUrl ? (
          <img 
            src={recipe.imageUrl} 
            alt={recipe.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
        ) : (
          <div className="w-full h-full bg-orange-100 flex items-center justify-center text-orange-300">
             <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
        )}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-orange-600 shadow-sm">
          {recipe.isExternal ? 'API' : 'User'}
        </div>
        <button 
          onClick={handleToggleFavorite}
          disabled={loading}
          className={`absolute top-4 right-4 h-10 w-10 rounded-full flex items-center justify-center transition-all ${
            isFavorite ? 'bg-red-500 text-white shadow-red-200' : 'bg-white/90 text-gray-400 hover:text-red-500'
          } backdrop-blur shadow-lg active:scale-95`}
        >
          <svg className={`w-6 h-6 ${isFavorite ? 'fill-current' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </button>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {recipe.title}
        </h3>
        
        <p className="text-sm text-gray-500 mb-6 italic">
          By {recipe.publisher || 'KhanaKhajana Chef'}
        </p>
        
        <div className="mt-auto flex gap-3">
          <Link
            to={`/recipes/${recipeId}`}
            className="flex-1 text-center bg-orange-50 text-orange-700 font-bold py-2.5 rounded-xl hover:bg-orange-600 hover:text-white transition-all text-sm"
          >
            Full Recipe
          </Link>
          {recipe.sourceUrl && (
            <a
              href={recipe.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 bg-gray-50 text-gray-600 py-2.5 rounded-xl hover:bg-gray-100 transition-all"
              title="Official Link"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeListItem;