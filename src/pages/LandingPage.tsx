import React from 'react';
import { Users, ArrowRight, Star, Heart, Handshake, Award, Zap, Shield, Globe, Coins } from 'lucide-react';

export const LandingPage = ({ setCurrentPage }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
    {/* Walmart-inspired background pattern */}
    <div className="absolute inset-0">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-400/10 via-transparent to-blue-900/20"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl"></div>
    </div>

    {/* Header */}
    <header className="relative z-10 px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="bg-yellow-400 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
            <Users className="w-7 h-7 text-blue-800" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Project Harmony</h1>
            <p className="text-blue-100 text-sm font-medium">Walmart Associates Platform</p>
          </div>
        </div>
        <button
          onClick={() => setCurrentPage('login')}
          className="bg-yellow-400 text-blue-800 px-8 py-3 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Access Portal
        </button>
      </div>
    </header>

    {/* Hero Section */}
    <main className="relative z-10 px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="mb-8">
            <span className="inline-block bg-yellow-400/20 text-yellow-200 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-yellow-400/30">
              🌟 Empowering Every Associate
            </span>
          </div>
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Your Schedule,
            <span className="block text-yellow-300">Your Choice</span>
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            Experience the future of shift management with intelligent matching, 
            blockchain security, and a community that puts associates first.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => setCurrentPage('login')}
              className="bg-yellow-400 text-blue-800 px-12 py-5 rounded-2xl font-bold text-xl hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-yellow-400/25 flex items-center space-x-3"
            >
              <span>Get Started Today</span>
              <ArrowRight className="w-6 h-6" />
            </button>
            <button className="text-white border-2 border-white/30 px-12 py-5 rounded-2xl font-bold text-xl hover:bg-white/10 transition-all duration-300 flex items-center space-x-3">
              <span>Watch Demo</span>
              <Star className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Heart className="w-8 h-8 text-blue-800" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Built for You</h3>
            <p className="text-blue-100 text-lg leading-relaxed">
              Every feature designed with associate needs in mind. Fair, transparent, and respectful of your time and commitments.
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <div className="bg-gradient-to-br from-green-400 to-green-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Handshake className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Community First</h3>
            <p className="text-blue-100 text-lg leading-relaxed">
              Connect with colleagues, help each other, and build a stronger workplace community through collaborative scheduling.
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <div className="bg-gradient-to-br from-purple-400 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Rewarding Experience</h3>
            <p className="text-blue-100 text-lg leading-relaxed">
              Earn recognition and rewards for being an active, helpful member of the associate community.
            </p>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">Why Associates Love Harmony</h3>
            <p className="text-xl text-blue-100">Real benefits that make a difference in your daily life</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-yellow-400 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Zap className="w-10 h-10 text-blue-800" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Smart Matching</h4>
              <p className="text-blue-100">AI considers your preferences, commute, and work-life balance</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-400 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Secure & Fair</h4>
              <p className="text-blue-100">Blockchain technology ensures transparency and prevents favoritism</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-400 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Always Available</h4>
              <p className="text-blue-100">Access from anywhere, anytime - mobile-friendly and reliable</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-400 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Coins className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Earn Rewards</h4>
              <p className="text-blue-100">Build reputation and earn tokens for helping your team</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="text-center mb-20">
          <h3 className="text-4xl font-bold text-white mb-12">Trusted by Associates Nationwide</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-5xl font-bold text-yellow-300 mb-2">15,000+</div>
              <div className="text-blue-100 text-lg font-medium">Active Associates</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-5xl font-bold text-yellow-300 mb-2">75,000+</div>
              <div className="text-blue-100 text-lg font-medium">Successful Swaps</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-5xl font-bold text-yellow-300 mb-2">99.2%</div>
              <div className="text-blue-100 text-lg font-medium">Satisfaction Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-5xl font-bold text-yellow-300 mb-2">24/7</div>
              <div className="text-blue-100 text-lg font-medium">Platform Uptime</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-3xl p-12 shadow-2xl">
          <h3 className="text-4xl font-bold text-blue-800 mb-4">Ready to Transform Your Schedule?</h3>
          <p className="text-xl text-blue-700 mb-8 max-w-2xl mx-auto">
            Join thousands of associates who've already discovered the freedom of flexible scheduling
          </p>
          <button
            onClick={() => setCurrentPage('login')}
            className="bg-blue-800 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-blue-900 transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Start Your Journey <ArrowRight className="w-6 h-6 inline ml-2" />
          </button>
        </div>
      </div>
    </main>
  </div>
);