import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { recipeService } from "../services/api";
import { useAuth } from "../context/AuthContext";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { recipeId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const result = await recipeService.getRecipeById(recipeId);
        if (result.data && result.data.recipe) {
          setRecipe(result.data.recipe);
        }
      } catch (error) {
        console.error("Error fetching recipe details", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [recipeId]);

  const handleSaveRecipe = async () => {
    if (!user) {
        navigate('/login');
        return;
    }
    try {
        setSaving(true);
        const saveData = {
            title: recipe.title,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            imageUrl: recipe.imageUrl,
            cookTime: recipe.cookTime,
            sourceUrl: recipe.sourceUrl,
            originalId: recipe.id,
            isExternal: recipe.isExternal
        };
        await recipeService.saveRecipe(saveData);
        alert("Recipe saved to your collection!");
    } catch (error) {
        console.error("Error saving recipe", error);
        alert("Failed to save recipe. Maybe it's already in your collection?");
    } finally {
        setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
    </div>
  );

  if (!recipe) return (
    <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Recipe not found</h2>
        <Link to="/recipes" className="text-orange-600 mt-4 inline-block">Back to search</Link>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-12">
            <Link to="/recipes" className="inline-flex items-center text-orange-600 font-medium mb-8 hover:text-orange-700 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Back to Recipes
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <div className="rounded-3xl overflow-hidden shadow-2xl">
                        {recipe.imageUrl ? (
                            <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-auto object-cover" />
                        ) : (
                            <div className="aspect-video bg-orange-100 flex items-center justify-center text-orange-400">
                                No Image Available
                            </div>
                        )}
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                        {recipe.cookTime && (
                           <div className="bg-orange-50 px-4 py-2 rounded-2xl flex items-center text-orange-700 font-medium">
                               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                               {recipe.cookTime} mins
                           </div>
                        )}
                        <div className="bg-orange-50 px-4 py-2 rounded-2xl flex items-center text-orange-700 font-medium">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            Serves 2-4
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
                        <p className="text-lg text-gray-500 italic">By {recipe.publisher || 'KhanaKhajana'}</p>
                    </div>

                    <div className="flex gap-4">
                        {recipe.sourceUrl && (
                            <a
                                href={recipe.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-gray-800 transition-all"
                            >
                                Source URL
                            </a>
                        )}
                        {recipe.isExternal && (
                            <button
                                onClick={handleSaveRecipe}
                                disabled={saving}
                                className="bg-orange-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-orange-700 transition-all disabled:opacity-50 shadow-lg shadow-orange-200"
                            >
                                {saving ? "Saving..." : "Save to Collection"}
                            </button>
                        )}
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-4 border-orange-100 pb-2 inline-block">Ingredients</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {recipe.ingredients && recipe.ingredients.map((ing, idx) => (
                                <li key={idx} className="flex items-start space-x-3 bg-gray-50 p-3 rounded-xl">
                                    <svg className="w-5 h-5 text-orange-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                    <span className="text-gray-700">{ing}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {recipe.instructions && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-4 border-orange-100 pb-2 inline-block">Instructions</h2>
                            <div className="prose prose-orange max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                                {recipe.instructions.replace(/<[^>]*>?/gm, '')}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default RecipeDetails;