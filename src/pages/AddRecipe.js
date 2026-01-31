import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { recipeService } from '../services/api';

const AddRecipe = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    cookTime: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', recipe.title);
      formData.append('ingredients', recipe.ingredients);
      formData.append('instructions', recipe.instructions);
      formData.append('cookTime', recipe.cookTime);
      if (imageFile) {
          formData.append('image', imageFile);
      }

      await recipeService.createRecipe(formData);
      alert('Recipe submitted successfully! It will be visible after admin approval.');
      navigate('/recipe-data');
    } catch (err) {
      console.error('Error creating recipe', err);
      alert(err.response?.data?.message || 'Failed to add recipe. Make sure you are logged in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fdfcfb] min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 flex items-center justify-between">
            <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Share your creation</h1>
                <p className="text-gray-500">Inspire others with your unique recipe</p>
            </div>
            <div className="hidden md:block text-5xl">🍳</div>
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

          <div className="space-y-4">
            <label className="text-sm font-bold text-gray-700 ml-1">Image</label>
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div 
                    className="w-full md:w-48 h-48 rounded-[2rem] bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden cursor-pointer hover:border-orange-200 transition-colors"
                    onClick={() => document.getElementById('recipeImage').click()}
                >
                    {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-center p-4">
                            <span className="text-3xl mb-2 block">📸</span>
                            <span className="text-xs text-gray-400 font-medium">Click to upload</span>
                        </div>
                    )}
                </div>
                <div className="flex-1 space-y-2">
                    <input
                        type="file"
                        id="recipeImage"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <p className="text-xs text-gray-400">Max size: 5MB.</p>
                </div>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Publishing...
                </>
              ) : "Publish Recipe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;