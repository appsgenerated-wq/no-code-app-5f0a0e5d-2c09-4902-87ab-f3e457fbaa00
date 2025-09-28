import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import { testBackendConnection } from './services/apiService.js';
import config from './constants.js';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [backendConnected, setBackendConnected] = useState(false);
  const manifest = new Manifest({ appId: config.APP_ID, baseURL: config.BACKEND_URL });

  useEffect(() => {
    const checkConnectionAndSession = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const result = await testBackendConnection();
      setBackendConnected(result.success);

      if (result.success) {
        console.log('✅ [APP] Backend connection successful.');
        try {
          const currentUser = await manifest.from('User').me();
          if (currentUser) {
            setUser(currentUser);
            setCurrentScreen('dashboard');
            console.log('✅ [APP] User session found:', currentUser.email);
          }
        } catch (err) {
          console.log('ℹ️ [APP] No active user session.');
          setUser(null);
          setCurrentScreen('landing');
        }
      } else {
        console.error('❌ [APP] Backend connection failed:', result.error);
      }
    };

    checkConnectionAndSession();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await manifest.login(email, password);
      const loggedInUser = await manifest.from('User').me();
      setUser(loggedInUser);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    await manifest.logout();
    setUser(null);
    setCurrentScreen('landing');
  };

  const loadRestaurants = async () => {
    const response = await manifest.from('Restaurant').find({ include: ['menuItems'] });
    return response.data;
  };

  const loadMyOrders = async () => {
    if (!user) return [];
    const response = await manifest.from('Order').find({
      filter: { customer: user.id },
      include: ['menuItems'],
      sort: { createdAt: 'desc' }
    });
    return response.data;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className={`text-xs font-medium ${backendConnected ? 'text-gray-700' : 'text-red-700'}`}>
          {backendConnected ? 'Backend Connected' : 'Connection Failed'}
        </span>
      </div>

      {user ? (
        <DashboardPage
          user={user}
          onLogout={handleLogout}
          onLoadRestaurants={loadRestaurants}
          onLoadMyOrders={loadMyOrders}
        />
      ) : (
        <LandingPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
