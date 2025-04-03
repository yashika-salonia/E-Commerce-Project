import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface SearchResult {
  id: number;
  name: string;
  brand: string;
  price: number;
  images: string[];
}

interface SearchResultsProps {
  results: SearchResult[];
  onClose: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onClose }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: SearchResult) => {
    addToCart({ ...product, selectedSize: 'M', quantity: 1 });
  };

  if (results.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg mt-1 p-4 z-50">
        <p className="text-gray-500 text-center">No products found</p>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg mt-1 max-h-96 overflow-y-auto z-50">
      {results.map((product) => (
        <div
          key={product.id}
          className="p-4 border-b last:border-b-0 hover:bg-gray-50 flex items-center"
        >
          <Link
            to={`/product/${product.id}`}
            className="flex-1 flex items-center"
            onClick={onClose}
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.brand}</p>
              <p className="text-sm font-medium text-gray-900">₹{product.price}</p>
            </div>
          </Link>
          <button
            onClick={() => handleAddToCart(product)}
            className="ml-4 p-2 text-pink-600 hover:bg-pink-50 rounded-full"
          >
            <ShoppingBag size={20} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;