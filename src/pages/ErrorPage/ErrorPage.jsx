import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full mx-auto text-center">
        
        <motion.div
          className="mx-auto mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-6xl text-red-500">⚠️</span>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-xs">!</span>
            </div>
          </div>
        </motion.div>

        {/* Error Title */}
        <motion.h1
          className="text-6xl font-bold text-gray-800 mb-2 tracking-tight"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Oops!
        </motion.h1>

        {/* Error Code */}
        <motion.p
          className="text-2xl text-gray-600 mb-4 font-light"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          404 - Page Not Found
        </motion.p>

        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full shadow-lg"
          >
            <Link to="/">Go Home</Link>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-outline btn-secondary border-indigo-500 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-full"
          >
            <Link to="/allvehicles">Browse Vehicles</Link>
          </motion.button>
        </div>

      
        <motion.svg
          className="w-64 h-64 mx-auto opacity-20"
          viewBox="0 0 200 200"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M100,10 Q150,50 100,90 T50,130 Q10,170 50,190"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            color="indigo"
          />
        </motion.svg>

        <p className="text-xs text-gray-400 mt-8">
          © 2025 Travel Ease. Lost? Contact support.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;