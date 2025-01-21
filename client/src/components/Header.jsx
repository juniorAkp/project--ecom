import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { useAuthStore } from '../store/AuthStore';
import { useCartStore } from '../store/CartStore';
import axios from 'axios';

const Header = ({ setProducts }) => {
  const { fetchCart, totalQuantity } = useCartStore();
  const { user, logout } = useAuthStore();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('/api/categories');
      setCategories(data.category);
    } catch {
      console.error('Failed to fetch categories.');
    }
  };

  const handleCategoryChange = async (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category) {
      try {
        const { data } = await axios.get(`/api/filter?category=${category}`);
        setProducts(data.categorizedProducts);
      } catch (error) {
        console.error('Error filtering products by category:', error);
      }
    }
  };

  useEffect(() => {
    fetchCategories();
    if (user) fetchCart(user._id);
  }, [user]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-gray-900 text-white fixed w-full z-20 top-0 shadow-lg">
      <nav className="container mx-auto px-4 sm:px-8 lg:px-12 py-3 flex justify-between items-center">
        {/* Logo */}
        <a
          href="/"
          className="text-2xl md:text-3xl font-bold tracking-wide text-indigo-500"
        >
          Luminaria
        </a>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-xl sm:text-2xl focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Links for Larger Screens */}
        <div className="hidden md:flex space-x-4 items-center">
          <a
            href="/featured"
            className="text-sm sm:text-base hover:text-indigo-500 transition duration-300"
          >
            Featured
          </a>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="bg-gray-800 text-sm sm:text-base text-gray-200 rounded-lg px-2 sm:px-3 py-1 sm:py-2 focus:outline-none focus:ring focus:ring-indigo-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* User and Cart */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="relative">
                <a href="/cart-page" aria-label="Cart">
                  <FaShoppingCart className="text-xl sm:text-2xl" />
                </a>
                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 sm:px-2">
                    {totalQuantity}
                  </span>
                )}
              </div>
              <a
                href={user.isAdmin ? '/admin' : '/user-edit'}
                aria-label="User Profile"
              >
                <FaUserCircle className="text-xl sm:text-2xl" />
              </a>
              <button
                onClick={logout}
                className="text-xs sm:text-sm font-medium hover:underline focus:outline-none"
              >
                Logout, {user.name}
              </button>
            </>
          ) : (
            <a
              href="/login"
              className="text-xs sm:text-sm font-medium hover:underline focus:outline-none"
            >
              Log in
            </a>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 text-white py-4 px-4">
          <a
            href="/featured"
            className="block py-2 px-3 text-sm hover:bg-gray-800 rounded transition"
          >
            Featured
          </a>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="block py-2 px-3 text-sm bg-gray-800 text-white rounded-lg border border-gray-600 mt-2 w-full focus:ring focus:ring-indigo-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </header>
  );
};

export default Header;
