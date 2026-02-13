import React, { useState, useEffect } from "react";
import { authService, recipeService } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("analytics");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }
    fetchAllData();
  }, [user, navigate]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [usersRes, recipesRes, statsRes] = await Promise.all([
        authService.getAllUsers(),
        recipeService.getAllLocalRecipes(),
        authService.getAnalytics(),
      ]);
      setUsers(usersRes.data);
      setRecipes(recipesRes.data.recipes);
      setStats(statsRes.data);
    } catch (err) {
      console.error("Error fetching admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await authService.deleteUser(userId);
      setUsers(users.filter((u) => u._id !== userId));
      // Update stats
      setStats({
        ...stats,
        stats: { ...stats.stats, totalUsers: stats.stats.totalUsers - 1 },
      });
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  const handleDeleteRecipe = async (recipeId) => {
    if (!window.confirm("Delete this recipe?")) return;
    try {
      await recipeService.deleteRecipe(recipeId);
      setRecipes(recipes.filter((r) => r._id !== recipeId));
      setStats({
        ...stats,
        stats: { ...stats.stats, totalRecipes: stats.stats.totalRecipes - 1 },
      });
    } catch (err) {
      alert("Failed to delete recipe");
    }
  };

  const handleVerifyRecipe = async (recipeId, status) => {
    try {
      await recipeService.verifyRecipe(recipeId, status);
      setRecipes(
        recipes.map((r) => (r._id === recipeId ? { ...r, status } : r)),
      );
      // Refresh stats to reflect new counts
      const statsRes = await authService.getAnalytics();
      setStats(statsRes.data);
    } catch (err) {
      console.error("Error verifying recipe:", err);
      alert("Failed to verify recipe");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-600"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col">
        <div className="p-8">
          <h2 className="text-xl font-black text-gray-900 tracking-tight">
            ADMIN <span className="text-orange-600">CONSOLE</span>
          </h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {[
            { id: "analytics", label: "Analytics", icon: "📊" },
            { id: "users", label: "Manage Users", icon: "👥" },
            { id: "recipes", label: "Manage Recipes", icon: "🍳" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-xl font-bold transition-all ${
                activeTab === item.id
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-100"
                  : "text-gray-500 hover:bg-orange-50"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-12 overflow-y-auto">
        {/* Mobile Tab Switcher */}
        <div className="lg:hidden mb-8 overflow-x-auto">
          <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm min-w-max">
            {[
              { id: "analytics", label: "Analytics", icon: "📊" },
              { id: "users", label: "Users", icon: "👥" },
              { id: "recipes", label: "Recipes", icon: "🍳" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center px-4 py-3 rounded-xl font-bold transition-all text-sm ${
                  activeTab === item.id
                    ? "bg-orange-600 text-white shadow-md"
                    : "text-gray-500 hover:text-orange-600"
                }`}
              >
                <span className="mr-2 text-lg">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <header className="mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-1">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              Welcome back, Admin
            </p>
          </div>
        </header>

        {activeTab === "analytics" && stats && (
          <div className="space-y-12 animate-in fade-in duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: "Total Users",
                  value: stats.stats.totalUsers,
                  color: "bg-blue-600",
                  icon: "👥",
                },
                {
                  label: "Total Recipes",
                  value: stats.stats.totalRecipes,
                  color: "bg-orange-600",
                  icon: "📝",
                },
                {
                  label: "Verified",
                  value: stats.stats.verifiedUsers,
                  color: "bg-green-600",
                  icon: "✅",
                },
                {
                  label: "Pending",
                  value: stats.stats.unverifiedUsers,
                  color: "bg-yellow-500",
                  icon: "⏳",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center text-center"
                >
                  <div
                    className={`w-12 h-12 ${stat.color} text-white rounded-2xl flex items-center justify-center text-xl mb-4 shadow-lg`}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-black text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Users */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8">
              <h3 className="text-xl font-bold mb-6 text-gray-900">
                Recent Signups
              </h3>
              <div className="space-y-4">
                {stats.recentUsers.map((u) => (
                  <div
                    key={u._id}
                    className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <img
                        src={u.profilePicture}
                        alt=""
                        className="w-12 h-12 rounded-full border border-gray-100 object-cover mr-4"
                      />
                      <div>
                        <div className="font-bold text-gray-900">{u.name}</div>
                        <div className="text-sm text-gray-500">{u.email}</div>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-gray-400">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-gray-100 animate-in fade-in duration-500">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead className="bg-gray-50 text-gray-400 text-xs font-black uppercase tracking-widest border-b border-gray-100">
                  <tr>
                    <th className="px-8 py-6">User</th>
                    <th className="px-8 py-6">Role</th>
                    <th className="px-8 py-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((u) => (
                    <tr
                      key={u._id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center">
                          <img
                            src={u.profilePicture}
                            alt=""
                            className="w-10 h-10 rounded-full mr-4 object-cover"
                          />
                          <div>
                            <div className="font-bold text-gray-900">
                              {u.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {u.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                            u.role === "admin"
                              ? "bg-purple-100 text-purple-600 border border-purple-200"
                              : "bg-blue-100 text-blue-600 border border-blue-200"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          className="text-red-500 hover:text-red-700 font-bold text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "recipes" && (
          <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-gray-100 animate-in fade-in duration-500">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[700px]">
                <thead className="bg-gray-50 text-gray-400 text-xs font-black uppercase tracking-widest border-b border-gray-100">
                  <tr>
                    <th className="px-8 py-6">Recipe</th>
                    <th className="px-8 py-6">Creator</th>
                    <th className="px-8 py-6">Status</th>
                    <th className="px-8 py-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recipes.map((r) => (
                    <tr
                      key={r._id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center">
                          <img
                            src={r.imageUrl}
                            alt=""
                            className="w-10 h-10 rounded-xl mr-4 object-cover border border-gray-100"
                          />
                          <div className="font-bold text-gray-900 truncate max-w-[200px]">
                            {r.title}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm text-gray-500">
                        {r.createdBy?.name || "Admin"}
                      </td>
                      <td className="px-8 py-6">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                            r.status === "approved"
                              ? "bg-green-100 text-green-600 border-green-200"
                              : r.status === "rejected"
                                ? "bg-red-100 text-red-600 border-red-200"
                                : "bg-yellow-100 text-yellow-600 border-yellow-200"
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          {r.status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  handleVerifyRecipe(r._id, "approved")
                                }
                                className="text-green-600 hover:text-green-700 font-bold text-sm"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() =>
                                  handleVerifyRecipe(r._id, "rejected")
                                }
                                className="text-orange-500 hover:text-orange-600 font-bold text-sm"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          <Link
                            to={`/edit-recipe/${r._id}`}
                            className="text-blue-500 hover:text-blue-700 font-bold text-sm"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteRecipe(r._id)}
                            className="text-red-500 hover:text-red-700 font-bold text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
