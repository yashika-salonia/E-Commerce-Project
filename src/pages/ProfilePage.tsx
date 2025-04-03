import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, ShoppingBag, User } from 'lucide-react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  if (!isAuthenticated) {
    navigate('/auth');
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    navigate('/auth');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-pink-100 p-3 rounded-full">
              <User className="h-8 w-8 text-pink-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{currentUser.name || 'User'}</h1>
              <p className="text-gray-600">{currentUser.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">My Orders</h2>
          {(!currentUser.orders || currentUser.orders.length === 0) ? (
            <div className="text-center py-8">
              <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No orders yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {currentUser.orders.map((order: any) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                      {order.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item: any) => (
                      <div key={`${item.id}-${item.selectedSize}`} className="flex items-center">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="ml-4">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            Size: {item.selectedSize}, Qty: {item.quantity}
                          </p>
                          <p className="text-sm">₹{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-right font-medium">Total: ₹{order.total}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 flex items-center text-red-600 hover:text-red-700"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;