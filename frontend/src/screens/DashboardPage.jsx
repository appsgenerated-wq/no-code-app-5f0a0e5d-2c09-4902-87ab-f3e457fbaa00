import React, { useEffect, useState } from 'react';
import config from '../constants.js';

const DashboardPage = ({ user, onLogout, onLoadRestaurants, onLoadMyOrders }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const restaurantData = await onLoadRestaurants();
        const orderData = await onLoadMyOrders();
        setRestaurants(restaurantData);
        setMyOrders(orderData);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [onLoadRestaurants, onLoadMyOrders]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            FoodFleet
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 hidden sm:block">Welcome, {user.name}!</span>
            <a
              href={`${config.BACKEND_URL}/admin`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition"
            >
              Admin
            </a>
            <button
              onClick={onLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading delicious data...</p>
        ) : (
          <div className="space-y-12">
            {/* My Orders Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Recent Orders</h2>
              {myOrders.length === 0 ? (
                <div className="bg-white p-6 rounded-lg shadow-sm text-center text-gray-500">
                  You haven't placed any orders yet.
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                  {myOrders.slice(0, 3).map(order => (
                    <div key={order.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-gray-700">Order #{order.id.substring(0, 6)}...</p>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">Total: <span className="font-medium text-gray-800">{formatCurrency(order.totalPrice)}</span></p>
                      <p className="text-sm text-gray-500">Items: {order.menuItems.map(item => item.name).join(', ')}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Restaurants Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Explore Restaurants</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map(restaurant => (
                  <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <img src={restaurant.photo?.large || 'https://placehold.co/800x400'} alt={restaurant.name} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900">{restaurant.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{restaurant.cuisine}</p>
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">{restaurant.description}</p>
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
};

export default DashboardPage;
