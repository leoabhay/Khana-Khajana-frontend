import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { recipeService } from '../services/api';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    cookTime: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await recipeService.getRecipeById(id);
        const data = response.data.recipe;
        setRecipe({
          title: data.title || '',
          ingredients: Array.isArray(data.ingredients) ? data.ingredients.join('\n') : data.ingredients || '',
          instructions: data.instructions || '',
          cookTime: data.cookTime || '',
          imageUrl: data.imageUrl || '',
        });
      } catch (err) {
        console.error('Error fetching recipe', err);
        alert('Failed to load recipe data');
        navigate('/recipe-data');
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await recipeService.updateRecipe(id, recipe);
      alert('Recipe updated successfully!');
      navigate('/recipe-data');
    } catch (err) {
      console.error('Error updating recipe', err);
      alert('Failed to update recipe.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-600"></div>
    </div>
  );

  return (
    <div className="bg-[#fdfcfb] min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 flex items-center justify-between">
            <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Recipe</h1>
                <p className="text-gray-500">Update your culinary masterpiece</p>
            </div>
            <div className="hidden md:block text-5xl">✍️</div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-orange-50 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Recipe Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Grandma's Secret Pasta"
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 transition-all text-gray-900"
                value={recipe.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Cook Time (min)</label>
              <input
                type="number"
                name="cookTime"
                placeholder="45"
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 transition-all text-gray-900"
                value={recipe.cookTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Ingredients</label>
            <textarea
              name="ingredients"
              rows="4"
              placeholder="e.g. 2 cups flour, 3 eggs, pinch of salt (one per line)"
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 transition-all text-gray-900"
              value={recipe.ingredients}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Instructions</label>
            <textarea
              name="instructions"
              rows="6"
              placeholder="Step 1: Boils water... Step 2: Add salt..."
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 transition-all text-gray-900"
              value={recipe.instructions}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              placeholder="https://images.unsplash.com/..."
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 transition-all text-gray-900"
              value={recipe.imageUrl}
              onChange={handleChange}
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              disabled={saving}
              className="w-full bg-orange-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 disabled:opacity-50 flex items-center justify-center"
            >
              {saving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Updating...
                </>
              ) : "Update Recipe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecipe;