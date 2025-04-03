import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CreditCard, Truck, MapPin, Check } from 'lucide-react';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [deliveryType, setDeliveryType] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = deliveryType === 'express' ? 199 : (subtotal > 999 ? 0 : 99);
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < (paymentMethod === 'cod' ? 2 : 3)) {
      setStep(step + 1);
    } else {
      // Get current user and all users
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Create new order
      const newOrder = {
        id: Date.now(),
        items: cartItems,
        total,
        date: new Date().toISOString(),
        status: 'Placed',
        shipping: formData,
        paymentMethod,
      };

      // Find and update current user's orders
      const updatedUsers = users.map((user: any) => {
        if (user.id === currentUser.id) {
          return {
            ...user,
            orders: [...(user.orders || []), newOrder]
          };
        }
        return user;
      });

      // Update localStorage
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      localStorage.setItem('currentUser', JSON.stringify({
        ...currentUser,
        orders: [...(currentUser.orders || []), newOrder]
      }));
      
      setShowOrderSuccess(true);
      
      setTimeout(() => {
        clearCart();
        navigate('/profile');
      }, 2000);
    }
  };

  if (showOrderSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-4">Thank you for shopping with us.</p>
          <p className="text-sm text-gray-500">Redirecting to your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, ...(paymentMethod === 'cod' ? [] : [3])].map((i) => (
            <React.Fragment key={i}>
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  step >= i ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {i}
              </div>
              {i < (paymentMethod === 'cod' ? 2 : 3) && (
                <div
                  className={`w-20 h-1 ${step > i ? 'bg-pink-600' : 'bg-gray-200'}`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Shipping Information */}
          {step === 1 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <MapPin className="mr-2" /> Shipping Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Delivery and Payment Options */}
          {step === 2 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Truck className="mr-2" /> Delivery & Payment Options
              </h2>
              <div className="space-y-6">
                {/* Delivery Options */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium mb-2">Delivery Options</h3>
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-pink-500">
                    <input
                      type="radio"
                      name="delivery"
                      value="standard"
                      checked={deliveryType === 'standard'}
                      onChange={(e) => setDeliveryType(e.target.value)}
                      className="text-pink-600"
                    />
                    <div className="ml-4">
                      <div className="font-medium">Standard Delivery</div>
                      <div className="text-sm text-gray-500">3-5 business days</div>
                    </div>
                    <div className="ml-auto font-medium">
                      {subtotal > 999 ? 'FREE' : `₹${99}`}
                    </div>
                  </label>
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-pink-500">
                    <input
                      type="radio"
                      name="delivery"
                      value="express"
                      checked={deliveryType === 'express'}
                      onChange={(e) => setDeliveryType(e.target.value)}
                      className="text-pink-600"
                    />
                    <div className="ml-4">
                      <div className="font-medium">Express Delivery</div>
                      <div className="text-sm text-gray-500">1-2 business days</div>
                    </div>
                    <div className="ml-auto font-medium">₹199</div>
                  </label>
                </div>

                {/* Payment Method */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium mb-2">Payment Method</h3>
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-pink-500">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-pink-600"
                    />
                    <div className="ml-4">
                      <div className="font-medium">Credit/Debit Card</div>
                      <div className="text-sm text-gray-500">Secure payment via card</div>
                    </div>
                    <CreditCard className="ml-auto text-gray-400" />
                  </label>
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-pink-500">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-pink-600"
                    />
                    <div className="ml-4">
                      <div className="font-medium">Cash on Delivery</div>
                      <div className="text-sm text-gray-500">Pay when you receive</div>
                    </div>
                    <div className="ml-auto font-medium">₹49 extra</div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Payment (Only for card payment) */}
          {step === 3 && paymentMethod === 'card' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <CreditCard className="mr-2" /> Payment Information
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    required
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      required
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      required
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              {paymentMethod === 'cod' && (
                <div className="flex justify-between">
                  <span>COD Charges</span>
                  <span>₹49</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-lg border-t pt-4">
                <span>Total</span>
                <span>₹{(total + (paymentMethod === 'cod' ? 49 : 0)).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="ml-auto px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
            >
              {step === (paymentMethod === 'cod' ? 2 : 3) ? 'Place Order' : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;