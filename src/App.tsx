import React, { useState } from 'react';
import { Calendar, Clock, Users, Shield, AlertCircle, CheckCircle, XCircle, User, LogOut, Home, Coins, TrendingUp, MapPin } from 'lucide-react';
import { associates } from './data/associates';
import { initialShifts } from './data/initialShifts';
import { calculateFairness } from './utils/calculateFairness';
import { calculateTokenReward } from './utils/calculateTokenReward';
import { fakeTxHash } from './utils/hash';
import { ProgressBar } from './components/ProgressBar';
import { TokenPopup } from './components/TokenPopup';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [shifts, setShifts] = useState(initialShifts);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [swapRequests, setSwapRequests] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing', 'login', 'app'
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [tokenPopup, setTokenPopup] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    
    const user = associates.find(a => 
      a.email === loginForm.email && a.password === loginForm.password
    );
    
    if (user) {
      setCurrentUser(user);
      setCurrentPage('app');
      setActiveTab('dashboard');
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('landing');
    setLoginForm({ email: '', password: '' });
    setActiveTab('dashboard');
  };

  const handleSwapRequest = async (shift) => {
    setProcessing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const fairness = calculateFairness(currentUser, shift);
    const isRejected = Math.random() < 0.08; // 8% random rejection
    
    // Determine approval based on fairness score
    let status;
    if (isRejected) {
      status = 'REJECTED';
    } else if (fairness.score >= 70) {
      status = 'APPROVED';
    } else if (fairness.score >= 45) {
      status = Math.random() < 0.7 ? 'APPROVED' : 'PENDING'; // 70% approval for medium scores
    } else {
      status = Math.random() < 0.3 ? 'APPROVED' : 'REJECTED'; // 30% approval for low scores
    }
    
    const request = {
      id: `REQ-${Date.now()}`,
      shiftId: shift.id,
      requesterId: currentUser.id,
      timestamp: new Date().toLocaleString(),
      fairnessScore: fairness.score,
      flags: fairness.flags,
      status: status,
      txHash: fakeTxHash(),
      blockNumber: Math.floor(Math.random() * 1000000) + 500000,
      originalShift: currentUser.currentShift,
      newShift: shift
    };
    
    setSwapRequests(prev => [...prev, request]);
    
    // Calculate token reward if approved
    let tokenReward = null;
    if (request.status === 'APPROVED') {
      tokenReward = calculateTokenReward(currentUser, shift, fairness.score);
      
      // Remove the requested shift from available shifts
      setShifts(prev => prev.filter(s => s.id !== shift.id));
      
      // Add user's current shift to available shifts
      setShifts(prev => [...prev, {
        ...currentUser.currentShift,
        postedBy: currentUser.id,
        status: 'OPEN'
      }]);
      
      // Update user's current shift and token balance
      setCurrentUser(prev => ({
        ...prev,
        tokenBalance: prev.tokenBalance + tokenReward.total,
        currentShift: {
          id: shift.id,
          date: shift.date,
          time: shift.time,
          type: shift.type,
          department: shift.department,
          priority: shift.priority,
          distance: shift.distance
        }
      }));
      
      // Show token popup
      setTokenPopup({
        tokens: tokenReward.total,
        bonuses: tokenReward.bonuses,
        shift: shift
      });
    } else {
      // Update shift status for pending/rejected
      setShifts(prev => prev.map(s => 
        s.id === shift.id 
          ? { ...s, status: request.status === 'REJECTED' ? 'OPEN' : 'PENDING' }
          : s
      ));
    }
    
    setProcessing(false);
    
    // Add notification
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: request.status === 'APPROVED' ? 'success' : request.status === 'REJECTED' ? 'error' : 'info',
      message: request.status === 'APPROVED' 
        ? `Swap approved! Your new shift is ${shift.date} ${shift.time}${tokenReward ? ` (+${tokenReward.total} tokens)` : ''}`
        : `Swap request ${request.status.toLowerCase()} for ${shift.date} shift`,
      timestamp: new Date().toLocaleString()
    }]);
  };

  // Landing Page
  if (currentPage === 'landing') {
    return <LandingPage setCurrentPage={setCurrentPage} />;
  }

  // Login Page
  if (currentPage === 'login') {
    return (
      <LoginPage
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        loginError={loginError}
        setLoginError={setLoginError}
        setCurrentPage={setCurrentPage}
        handleLogin={handleLogin}
      />
    );
  }

  // Main App
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Token Popup */}
      {tokenPopup && (
        <TokenPopup 
          tokenData={tokenPopup} 
          onClose={() => setTokenPopup(null)} 
        />
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Project Harmony</h1>
                <p className="text-sm text-gray-600">Shift Swapping Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-yellow-200 px-4 py-2 rounded-lg border border-yellow-300">
                <Coins className="w-5 h-5 text-yellow-600" />
                <span className="text-lg font-bold text-yellow-800">{currentUser.tokenBalance}</span>
                <span className="text-sm font-medium text-yellow-700">tokens</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {currentUser.avatar}
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">{currentUser.name}</p>
                  <p className="text-gray-600">{currentUser.id}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Home },
              { id: 'shifts', label: 'Available Shifts', icon: Calendar },
              { id: 'requests', label: 'My Requests', icon: Clock },
              { id: 'verification', label: 'Blockchain Verification', icon: Shield }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-4 border-b-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="mb-6 space-y-2">
            {notifications.slice(-3).map(notification => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border-l-4 ${
                  notification.type === 'success' ? 'bg-green-50 border-green-400' :
                  notification.type === 'error' ? 'bg-red-50 border-red-400' :
                  'bg-blue-50 border-blue-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Profile Overview</h3>
                <User className="w-5 h-5 text-gray-500" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{currentUser.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Seniority:</span>
                  <span className="font-medium">{currentUser.seniority} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Night Shifts:</span>
                  <span className="font-medium">{currentUser.nightShifts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Department:</span>
                  <span className="font-medium">{currentUser.department}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Current Shift</h3>
                <Calendar className="w-5 h-5 text-blue-500" />
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-900">{currentUser.currentShift.date}</div>
                <div className="text-lg text-gray-600">{currentUser.currentShift.time}</div>
                <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  currentUser.currentShift.type === 'NIGHT' ? 'bg-purple-100 text-purple-800' :
                  currentUser.currentShift.type === 'EVENING' ? 'bg-orange-100 text-orange-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {currentUser.currentShift.type}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  {currentUser.currentShift.department}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Token Balance</h3>
                <Coins className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{currentUser.tokenBalance}</div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+{Math.floor(Math.random() * 25) + 10} this week</span>
              </div>
            </div>
          </div>
        )}

        {/* Available Shifts */}
        {activeTab === 'shifts' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Available Shifts</h2>
              <div className="text-sm text-gray-600">
                {shifts.filter(s => s.status === 'OPEN').length} shifts available
              </div>
            </div>
            
            <div className="grid gap-4">
              {shifts.filter(shift => shift.status === 'OPEN').map(shift => {
                const fairness = calculateFairness(currentUser, shift);
                const poster = associates.find(a => a.id === shift.postedBy);
                const hasRequested = swapRequests.some(req => req.shiftId === shift.id && req.status === 'PENDING');
                
                return (
                  <div key={shift.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{shift.date}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            shift.priority === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                            shift.priority === 'PRIME' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {shift.priority}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{shift.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{shift.distance}mi</span>
                          </div>
                          <span>{shift.department}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600 mb-1">Posted by {poster?.name}</div>
                        <div className="text-xs text-gray-500">{shift.id}</div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Compatibility Score</span>
                        <span className={`text-sm font-bold ${
                          fairness.score >= 80 ? 'text-green-600' :
                          fairness.score >= 65 ? 'text-blue-600' :
                          fairness.score >= 50 ? 'text-yellow-600' :
                          fairness.score >= 35 ? 'text-orange-600' :
                          'text-red-600'
                        }`}>
                          {fairness.score}%
                        </span>
                      </div>
                      <ProgressBar value={fairness.score} />
                      
                      {fairness.flags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {fairness.flags.map(flag => (
                            <span key={flag} className={`px-2 py-1 text-xs rounded ${
                              flag.includes('BONUS') ? 'bg-green-100 text-green-800' :
                              flag.includes('RESTRICTION') || flag.includes('INSUFFICIENT') ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {flag.replace(/_/g, ' ').toLowerCase()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => handleSwapRequest(shift)}
                      disabled={processing || fairness.score < 25 || hasRequested}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                        hasRequested
                          ? 'bg-yellow-100 text-yellow-800 cursor-not-allowed'
                          : fairness.score < 25 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : processing
                          ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {hasRequested ? 'Request Pending' : processing ? 'Processing...' : fairness.score < 25 ? 'Not Eligible' : 'Request Swap'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* My Requests */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">My Swap Requests</h2>
            
            {swapRequests.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No swap requests yet</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {swapRequests.map(request => {
                  const shift = shifts.find(s => s.id === request.shiftId) || request.newShift;
                  return (
                    <div key={request.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">Swap Request</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              request.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                              request.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {request.status}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div>Request ID: {request.id}</div>
                            <div>Submitted: {request.timestamp}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {request.status === 'APPROVED' && <CheckCircle className="w-5 h-5 text-green-600" />}
                          {request.status === 'REJECTED' && <XCircle className="w-5 h-5 text-red-600" />}
                          {request.status === 'PENDING' && <AlertCircle className="w-5 h-5 text-yellow-600" />}
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-red-50 p-3 rounded-lg">
                          <div className="text-sm font-medium text-gray-700 mb-1">Original Shift</div>
                          <div className="text-sm text-gray-600">
                            {request.originalShift.date} • {request.originalShift.time}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {request.originalShift.department}
                          </div>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="text-sm font-medium text-gray-700 mb-1">Requested Shift</div>
                          <div className="text-sm text-gray-600">
                            {shift?.date} • {shift?.time}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {shift?.department}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Compatibility Score</span>
                          <span className={`text-sm font-bold ${
                            request.fairnessScore >= 80 ? 'text-green-600' :
                            request.fairnessScore >= 65 ? 'text-blue-600' :
                            request.fairnessScore >= 50 ? 'text-yellow-600' :
                            request.fairnessScore >= 35 ? 'text-orange-600' :
                            'text-red-600'
                          }`}>
                            {request.fairnessScore}%
                          </span>
                        </div>
                        <ProgressBar value={request.fairnessScore} />
                      </div>
                      
                      <div className="text-xs text-gray-500 font-mono">
                        TX: {request.txHash} | Block: #{request.blockNumber}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Blockchain Verification */}
        {activeTab === 'verification' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-900">Blockchain Verification</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Verification Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium">Network Connected</span>
                      </div>
                      <span className="text-xs text-green-600">Harmony Chain</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium">Identity Verified</span>
                      </div>
                      <span className="text-xs text-green-600">{currentUser.id}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium">Smart Contract Active</span>
                      </div>
                      <span className="text-xs text-green-600">v2.1.0</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">QR Code Verification</h3>
                  <div className="bg-gray-100 rounded-lg p-6 text-center">
                    <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center border-2 border-gray-300">
                      <div className="text-xs text-gray-500">QR Code</div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Scan to verify your identity</p>
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      Generate New Code
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Transactions</h3>
              <div className="space-y-3">
                {swapRequests.slice(-5).map(request => (
                  <div key={request.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-sm font-medium text-gray-900">Swap Request</div>
                        <div className="text-xs text-gray-500"> {request.timestamp}</div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        request.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                        request.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {request.status}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 font-mono">
                      {request.txHash}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;