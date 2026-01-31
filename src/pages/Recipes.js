import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import RecipeList from "../components/RecipeList";
import { recipeService } from "../services/api";

const Recipes = () => {
  const [searchedQuery, setSearchedQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecipes();
  }, [searchedQuery]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await recipeService.getRecipes(searchedQuery);
      if (response.data && response.data.recipes) {
        setRecipes(response.data.recipes);
      }
    } catch (error) {
      console.error("Failed to fetch recipes", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fdfcfb] min-h-screen">
      <Search setSearchedQuery={setSearchedQuery} />
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
      ) : (
        <RecipeList recipes={recipes} searchedQuery={searchedQuery} />
      )}
    </div>
  );
};

export default Recipes;