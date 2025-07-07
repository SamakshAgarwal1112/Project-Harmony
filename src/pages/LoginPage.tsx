import React from 'react';
import { Users, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export const LoginPage = ({ loginForm, setLoginForm, showPassword, setShowPassword, loginError, setLoginError, setCurrentPage, handleLogin }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md border border-gray-100">
      <div className="text-center mb-10">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Users className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Welcome Back</h1>
        <p className="text-gray-600 text-lg">Sign in to Project Harmony</p>
      </div>
      
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-4" />
            <input
              type="email"
              value={loginForm.email}
              onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
              placeholder="your.email@walmart.com"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Password
          </label>
          <div className="relative">
            <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-4" />
            <input
              type={showPassword ? "text" : "password"}
              value={loginForm.password}
              onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
              className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        {loginError && (
          <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200">
            {loginError}
          </div>
        )}
        
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          Sign In to Harmony
        </button>
      </form>
      
      <div className="mt-8 text-center">
        <button className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
          Create New Associate Profile
        </button>
      </div>
      
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-yellow-50 rounded-2xl border border-blue-100">
        <p className="text-sm font-semibold text-gray-700 mb-3">Demo Credentials:</p>
        <div className="text-sm text-gray-600 space-y-2">
          <div className="flex justify-between">
            <span>Maria (PT, Grocery):</span>
            <span className="font-mono">maria123</span>
          </div>
          <div className="flex justify-between">
            <span>James (FT, Electronics):</span>
            <span className="font-mono">james123</span>
          </div>
          <div className="flex justify-between">
            <span>Sarah (FT, Apparel):</span>
            <span className="font-mono">sarah123</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <button
          onClick={() => setCurrentPage('landing')}
          className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  </div>
);