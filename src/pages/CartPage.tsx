import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/auth');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-300 mb-6" />
          <h1 className="text-2xl font-bold mb-4">Your shopping bag is empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything to your bag yet.
          </p>
          <Link
            to="/products"
            className="bg-pink-600 text-white px-6 py-3 rounded-md hover:bg-pink-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Shopping Bag</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                  {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                </h2>
                <button
                  onClick={clearCart}
                  className="text-gray-500 hover:text-red-600 text-sm flex items-center"
                >
                  <Trash2 size={16} className="mr-1" />
                  Clear All
                </button>
              </div>
            </div>

            {/* Cart Item List */}
            <div>
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="p-6 border-b border-gray-200 flex flex-col sm:flex-row">
                  {/* Product Image */}
                  <div className="sm:w-24 h-24 flex-shrink-0 mb-4 sm:mb-0">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="sm:ml-6 flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <h3 className="text-base font-medium">
                          <Link to={`/product/${item.id}`} className="hover:text-pink-600">
                            {item.name}
                          </Link>
                        </h3>
                        <p className="text-gray-500 text-sm mb-2">{item.brand}</p>
                        <p className="text-gray-500 text-sm mb-4">Size: {item.selectedSize}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{item.price}</p>
                        {item.originalPrice && (
                          <p className="text-gray-500 line-through text-sm">₹{item.originalPrice}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      {/* Quantity Selector */}
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 border border-gray-300 rounded-l-md flex items-center justify-center"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <div className="w-10 h-8 border-t border-b border-gray-300 flex items-center justify-center">
                          {item.quantity}
                        </div>
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                          className="w-8 h-8 border border-gray-300 rounded-r-md flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                        className="text-gray-500 hover:text-red-600 text-sm flex items-center"
                      >
                        <Trash2 size={16} className="mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
            <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-pink-600 text-white py-3 rounded-md hover:bg-pink-700 transition-colors"
            >
              Proceed to Checkout
            </button>

            <div className="mt-6">
              <h3 className="font-medium mb-2">Accepted Payment Methods</h3>
              <div className="flex space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=40&h=24&q=80"
                  alt="Visa"
                  className="h-6"
                />
                <img
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=40&h=24&q=80"
                  alt="Mastercard"
                  className="h-6"
                />
                <img
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=40&h=24&q=80"
                  alt="PayPal"
                  className="h-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;