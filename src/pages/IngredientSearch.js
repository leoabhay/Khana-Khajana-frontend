import React, { useState } from 'react';
import { recipeService } from '../services/api';
import RecipeListItem from '../components/RecipeListItem';

const IngredientSearch = () => {
    const [ingredients, setIngredients] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!ingredients.trim()) return;

        setLoading(true);
        setError('');
        try {
            const response = await recipeService.getRecipesByIngredients(ingredients);
            setRecipes(response.data.recipes || []);
        } catch (err) {
            console.error('Ingredient search error:', err);
            setError('Failed to fetch recipes. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        Search by <span className="text-orange-600">Ingredients</span>
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        Enter the ingredients you have, and we'll find the best recipes for you.
                    </p>
                </div>

                <div className="max-w-xl mx-auto mb-16">
                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="e.g. tomato, cheese, onion"
                            className="text-black flex-1 px-6 py-4 rounded-full border-gray-200 focus:border-orange-500 focus:ring-orange-500 shadow-sm text-lg"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg active:scale-95 disabled:opacity-50"
                        >
                            {loading ? 'Searching...' : 'Find Recipes'}
                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-400 mt-4 italic">
                        Separate ingredients with commas
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-center mb-8 font-medium border border-red-100 italic">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {recipes.map((recipe, index) => (
                            <RecipeListItem key={recipe.id || index} recipe={recipe} />
                        ))}
                    </div>
                )}

                {!loading && recipes.length === 0 && ingredients && (
                    <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm border border-gray-100">
                        <div className="text-6xl mb-4">🍳</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No reciprocal recipes found</h3>
                        <p className="text-gray-500">Try adding different ingredients or fewer items.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IngredientSearch;