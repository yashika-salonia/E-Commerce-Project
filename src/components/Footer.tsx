import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Online Shopping */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">ONLINE SHOPPING</h3>
            <ul className="space-y-2">
              {['Men', 'Women', 'Kids', 'Home & Living', 'Beauty', 'Gift Cards'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-600 hover:text-pink-600 text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Policies */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">CUSTOMER POLICIES</h3>
            <ul className="space-y-2">
              {[
                'Contact Us',
                'FAQ',
                'T&C',
                'Terms Of Use',
                'Track Orders',
                'Shipping',
                'Cancellation',
                'Returns',
                'Privacy Policy',
              ].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-600 hover:text-pink-600 text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Experience Trivanya App */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">EXPERIENCE TRIVANYA APP</h3>
            <div className="flex space-x-2 mb-4">
              <Link to="#">
                <img
                  src="https://images.unsplash.com/photo-1511075675422-c8e008f749d7?auto=format&fit=crop&w=138&h=42&q=80"
                  alt="Google Play"
                  className="h-10 rounded"
                />
              </Link>
              <Link to="#">
                <img
                  src="https://images.unsplash.com/photo-1511075675422-c8e008f749d7?auto=format&fit=crop&w=138&h=42&q=80"
                  alt="App Store"
                  className="h-10 rounded"
                />
              </Link>
            </div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">KEEP IN TOUCH</h3>
            <div className="flex space-x-4">
              <Link to="#" className="text-gray-600 hover:text-pink-600">
                <Facebook size={20} />
              </Link>
              <Link to="#" className="text-gray-600 hover:text-pink-600">
                <Twitter size={20} />
              </Link>
              <Link to="#" className="text-gray-600 hover:text-pink-600">
                <Instagram size={20} />
              </Link>
              <Link to="#" className="text-gray-600 hover:text-pink-600">
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">CONTACT US</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-gray-600 mt-1" />
                <span className="text-gray-600 text-sm">
                  Trivanya Fashion Pvt Ltd, Building 42, Fashion Street, Designer Hub, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-gray-600" />
                <span className="text-gray-600 text-sm">+91 1234567890</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-gray-600" />
                <span className="text-gray-600 text-sm">help@trivanya.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 md:mb-0">
              © 2025 www.trivanya.com. All rights reserved.
            </p>
            <div className="flex space-x-4">
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
              <img
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=40&h=24&q=80"
                alt="American Express"
                className="h-6"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;