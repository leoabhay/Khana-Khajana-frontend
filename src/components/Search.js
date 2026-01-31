import React, { useState } from 'react';

const Search = ({ setSearchedQuery }) => {
    const [value, setValue] = useState("");

    const onFormSubmit = (e) => {
        e.preventDefault();
        setSearchedQuery(value);
    }

    return (
        <div className="py-16 hero-gradient px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                    Find your next <span className="text-orange-600">signature dish</span>
                </h1>
                <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
                    Search through thousands of curated recipes or explore our community favorites. 
                    Input ingredients separated by commas for better results.
                </p>
                
                <form onSubmit={onFormSubmit} className="relative max-w-2xl mx-auto">
                    <div className="relative group">
                        <input 
                            type="text"
                            placeholder="Try 'pasta, garlic, chicken'..."
                            className="w-full px-6 py-4 rounded-2xl bg-white shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 border-none text-gray-700 transition-all group-hover:shadow-2xl"
                            onChange={(e) => setValue(e.target.value)}
                            value={value}
                        />
                        <button 
                            type="submit"
                            className="absolute right-3 top-2 bottom-2 bg-orange-600 text-white px-8 rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200"
                        >
                            Search
                        </button>
                    </div>
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                        {['Italian', 'Dessert', 'Healthy', 'Breakfast', 'Pizza'].map(tag => (
                            <button 
                                key={tag}
                                type="button"
                                onClick={() => { setValue(tag); setSearchedQuery(tag); }}
                                className="px-4 py-1.5 rounded-full bg-white/50 text-gray-600 text-sm hover:bg-orange-100 hover:text-orange-700 transition-all border border-orange-50 border-solid"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Search;