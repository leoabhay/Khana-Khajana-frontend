import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-[#fdfcfb] min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-40 px-4">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left space-y-8 animate-slide-up">
            <div className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-bold text-sm tracking-wide uppercase">
              Best Recipe Finder App in Nepal
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
              Unlock Your <br />
              <span className="text-orange-600">Inner Chef</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Khana Khajana helps you discover thousands of recipes, organize your favorites, 
              and cook like a pro. Start your culinary journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/recipes" className="bg-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-xl shadow-orange-200 hover:-translate-y-1">
                Explore Recipes
              </Link>
              <Link to="/signup" className="bg-white text-gray-900 border-2 border-orange-100 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-orange-50 transition-all hover:-translate-y-1">
                Join Community
              </Link>
            </div>
            
            <div className="pt-8 flex items-center justify-center lg:justify-start gap-4">
               <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <img 
                      key={i} 
                      src={`/images/user${i}.png`} 
                      className="w-12 h-12 rounded-full border-4 border-white object-cover bg-orange-100" 
                      alt={`User ${i}`}
                    />
                  ))}
               </div>
               <p className="text-sm text-gray-500 font-medium">500+ home chefs already using Khana Khajana</p>
            </div>
          </div>
          
          <div className="flex-1 relative">
             <div className="absolute inset-0 bg-orange-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
             <img 
               src="/images/food1.png" 
               alt="Gourmet Food" 
               className="relative z-10 w-full max-w-lg mx-auto drop-shadow-[0_35px_35px_rgba(234,88,12,0.15)] animate-float" 
             />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
           <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">Why choose Khana Khajana?</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Discover the features that make us the best companion for your kitchen adventures.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Personalized Lists", desc: "Find recipes that suit your specific taste and dietary needs.", icon: "🎯" },
                { title: "Saved Collection", desc: "Keep all your favorite recipes in one secure, accessible place.", icon: "📂" },
                { title: "API Integration", desc: "Search through 15,000+ global recipes.", icon: "🌐" },
                { title: "Easy Search", desc: "Find recipes by ingredients you already have in your kitchen.", icon: "🔍" }
              ].map((feat, i) => (
                <div key={i} className="p-8 rounded-[2rem] bg-orange-50 hover:bg-orange-100 transition-colors group">
                    <div className="text-4xl mb-4 group-hover:scale-125 transition-transform inline-block">{feat.icon}</div>
                    <h3 className="text-gray-600 text-xl font-bold mb-2">{feat.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;