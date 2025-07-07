import React from 'react';
import { Coins } from 'lucide-react';

export const TokenPopup = ({ tokenData, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform animate-pulse">
      <div className="text-center mb-6">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Coins className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Swap Approved!</h3>
        <p className="text-gray-600">You've earned tokens for this swap</p>
      </div>
      
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6">
        <div className="text-center mb-4">
          <div className="text-4xl font-bold text-green-600 mb-2">+{tokenData.tokens}</div>
          <div className="text-lg font-semibold text-gray-700">Tokens Earned</div>
        </div>
        
        <div className="space-y-2">
          <div className="text-smскільки font-semibold text-gray-700 mb-2">Breakdown:</div>
          {tokenData.bonuses.map((bonus, index) => (
            <div key={index} className="flex justify-between text-sm text-gray-600">
              <span>{bonus.split(':')[0]}:</span>
              <span className="font-medium text-green-600">{bonus.split(':')[1]}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="text-sm font-semibold text-gray-700 mb-2">New Shift Details:</div>
        <div className="text-sm text-gray-600">
          <div>{tokenData.shift.date} • {tokenData.shift.time}</div>
          <div>{tokenData.shift.department} • {tokenData.shift.priority}</div>
        </div>
      </div>
      
      <button
        onClick={onClose}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
      >
        Continue
      </button>
    </div>
  </div>
);