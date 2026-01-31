import React from 'react';
import RecipeListItem from './RecipeListItem';

const RecipeList = ({ recipes, searchedQuery }) => {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
        <div className="text-6xl mb-6">🍳</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {searchedQuery ? `No recipes found for "${searchedQuery}"` : "No recipes discovered yet"}
        </h3>
        <p className="text-gray-500">Try searching for something else or explore our categories.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
        {recipes.map((recipe) => (
          <RecipeListItem key={recipe._id || recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
