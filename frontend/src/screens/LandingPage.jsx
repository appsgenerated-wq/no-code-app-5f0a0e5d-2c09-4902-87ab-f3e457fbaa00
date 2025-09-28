import React from 'react';
import config from '../constants.js';

const LandingPage = ({ onLogin }) => {
  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt="Food background" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 max-w-2xl mx-auto text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
          Welcome to <span className="text-blue-400">FoodFleet</span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-200">
          Your next favorite meal, delivered. Explore local restaurants and dishes with ease.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onLogin('customer@manifest.build', 'password')}
            className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Try Demo
          </button>
          <a
            href={`${config.BACKEND_URL}/admin`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Admin Panel
          </a>
        </div>
         <p className="mt-8 text-sm text-gray-300">
          Admin: admin@manifest.build / admin <br/>
          Demo User: customer@manifest.build / password
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
