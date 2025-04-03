import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart({ ...product, selectedSize: 'M', quantity: 1 });
    removeFromWishlist(product.id);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <Heart size={64} className="mx-auto text-gray-300 mb-6" />
          <h1 className="text-2xl font-bold mb-4">Your wishlist is empty</h1>
          <p className="text-gray-600 mb-8">
            Save items you love to your wishlist and review them anytime.
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">My Wishlist</h1>
        <button
          onClick={clearWishlist}
          className="text-gray-500 hover:text-red-600 text-sm"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
            <div className="relative">
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                />
              </Link>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md"
              >
                <Heart size={18} className="text-pink-600 fill-pink-600" />
              </button>
            </div>
            <div className="p-4">
              <Link to={`/product/${item.id}`}>
                <h3 className="font-medium text-gray-800 mb-1 hover:text-pink-600">{item.name}</h3>
              </Link>
              <p className="text-gray-500 text-sm mb-2">{item.brand}</p>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="font-semibold">₹{item.price}</span>
                  {item.originalPrice && (
                    <span className="text-gray-500 line-through text-sm ml-2">₹{item.originalPrice}</span>
                  )}
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <button
                onClick={() => handleAddToCart(item)}
                className="w-full bg-pink-600 text-white py-2 rounded flex items-center justify-center hover:bg-pink-700 transition-colors"
              >
                <ShoppingBag size={16} className="mr-2" />
                Move to Bag
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;