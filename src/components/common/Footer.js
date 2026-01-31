import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

const socialLinks = [
    { name: 'twitter', icon: faTwitter, url: 'https://x.com/leo_abhay10' },
    { name: 'facebook', icon: faFacebook, url: 'https://www.facebook.com/abhaychaudhary1303' },
    { name: 'instagram', icon: faInstagram, url: 'https://www.instagram.com/leo_abhay/' },
    { name: 'youtube', icon: faYoutube, url: 'https://youtube.com/' },
];

const Footer = () => {
    return (
        <footer className="bg-white border-t border-orange-100 pt-16 pb-8 px-4 mt-20">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                {/* Brand Section */}
                <div className="md:col-span-1">
                    <Link to="/" className="inline-block mb-6">
                        <img src="/images/logo-no-background.png" alt="KhanaKhajana" className="h-10 w-auto" />
                    </Link>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        KhanaKhajana is your ultimate kitchen assistant. Discover, save, and share your favorite recipes with our growing community.
                    </p>
                    <div className="flex space-x-4">
                        {socialLinks.map((social) => (
                            <a 
                                key={social.name} 
                                href={social.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-orange-600 hover:text-white transition-all transform hover:scale-110"
                            >
                                <span className="sr-only">{social.name}</span>
                                <FontAwesomeIcon icon={social.icon} className="text-lg" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-gray-900 font-bold mb-6">Quick Links</h4>
                    <ul className="space-y-4">
                        <li><Link to="/" className="text-gray-500 hover:text-orange-600 text-sm transition-colors">Home</Link></li>
                        <li><Link to="/recipes" className="text-gray-500 hover:text-orange-600 text-sm transition-colors">Recipes</Link></li>
                        <li><Link to="/ingredient-search" className="text-gray-500 hover:text-orange-600 text-sm transition-colors">Search by Ingredients</Link></li>
                        <li><Link to="/add-recipe" className="text-gray-500 hover:text-orange-600 text-sm transition-colors">Add New Recipe</Link></li>
                    </ul>
                </div>

                {/* Categories */}
                <div>
                    <h4 className="text-gray-900 font-bold mb-6">Categories</h4>
                    <ul className="space-y-4">
                        {['Breakfast', 'Main Course', 'Desserts', 'Healthy Foods'].map((cat) => (
                            <li key={cat}>
                                <Link to={`/recipes?q=${cat}`} className="text-gray-500 hover:text-orange-600 text-sm transition-colors">
                                    {cat}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="text-gray-900 font-bold mb-6">Join our Newsletter</h4>
                    <p className="text-gray-500 text-sm mb-4 italic">Get the latest recipes straight to your inbox.</p>
                    <form className="relative">
                        <input 
                            type="email" 
                            placeholder="Email address"
                            className="w-full px-5 py-3 rounded-full bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 transition-all text-sm pr-12 shadow-sm"
                        />
                        <button 
                            type="button"
                            className="absolute right-1 top-1 h-9 w-9 rounded-full bg-orange-600 text-white flex items-center justify-center hover:bg-orange-700 transition-colors shadow-md"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>

            {/* Copyright */}
            <div className="container mx-auto pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                <p>&copy; {new Date().getFullYear()} KhanaKhajana. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-orange-600">Privacy Policy</a>
                    <a href="#" className="hover:text-orange-600">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;