import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Landing from './pages/Landing'; 
import NavBar from './components/common/NavBar';
import Footer from './components/common/Footer';
import { RecipeProvider } from './context/RecipeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';
import RecipeData from './pages/RecipeData';
import IngredientSearch from './pages/IngredientSearch';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';

const AppRoutes = () => {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={user ? <Landing /> : <Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
      <Route path="/edit-recipe/:id" element={<EditRecipe />} />
      <Route path="/ingredient-search" element={<IngredientSearch />} />
      <Route path="/add-recipe" element={<AddRecipe />} />
      <Route path="/recipe-data" element={<RecipeData />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <RecipeProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <NavBar />
            <div className="flex-grow">
              <AppRoutes />
            </div>
            <Footer />
          </div>
        </Router>
      </RecipeProvider>
    </AuthProvider>
  );
};

export default App;
