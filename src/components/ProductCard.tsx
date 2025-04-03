import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Toast } from './Toast';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    images: string[];
    rating: number;
    category: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      setToastMessage('Removed from wishlist');
    } else {
      addToWishlist(product);
      setToastMessage('Added to wishlist');
    }
    setShowToast(true);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isInCart(product.id)) {
      addToCart({ ...product, selectedSize: 'M', quantity: 1 });
      setToastMessage('Added to cart');
      setShowToast(true);
    }
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden group">
      <Link to={`/product/${product.id}`} className="block relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded">
            {discount}% OFF
          </div>
        )}
        <div className="absolute top-2 right-2">
          <button
            onClick={handleWishlist}
            className="bg-white p-1.5 rounded-full shadow-md"
          >
            <Heart
              size={18}
              className={isInWishlist(product.id) ? 'text-pink-600 fill-pink-600' : 'text-gray-600'}
            />
          </button>
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 h-full transition-all duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
          <button
            onClick={handleAddToCart}
            className={`${
              isInCart(product.id)
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-800 hover:bg-gray-100'
            } px-4 py-2 rounded-full shadow-md flex items-center transition-colors`}
          >
            {isInCart(product.id) ? (
              <>
                <Check size={16} className="mr-2" />
                Added to Bag
              </>
            ) : (
              <>
                <ShoppingBag size={16} className="mr-2" />
                Add to Bag
              </>
            )}
          </button>
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-800 mb-1 hover:text-pink-600">{product.name}</h3>
        </Link>
        <p className="text-gray-500 text-sm mb-2">{product.brand}</p>
        <div className="flex justify-between items-center">
          <div>
            <span className="font-semibold">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through text-sm ml-2">₹{product.originalPrice}</span>
            )}
          </div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-yellow-400 fill-yellow-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
          </div>
        </div>
      </div>
      {showToast && (
        <Toast 
          message={toastMessage} 
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  );
};

export default ProductCard;