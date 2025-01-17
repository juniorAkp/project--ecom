import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { useAuthStore } from '../store/AuthStore';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCartStore } from '../store/CartStore';

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
    <header className="bg-gray-800 text-white fixed w-full z-20 top-0">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold">ShopLogo</a>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Categories & Links for Larger Screens */}
        <div className={`hidden md:flex space-x-6 items-center ${isMenuOpen ? 'block' : 'hidden'}`}>
          <a href="/featured" className="text-white hover:text-gray-400">Featured</a>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="px-3 py-2 bg-white text-gray-800 rounded-lg border border-gray-300"
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
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <div className="relative">
                <a href="/cart-page">
                  <FaShoppingCart className="text-2xl" />
                </a>
                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                    {totalQuantity}
                  </span>
                )}
              </div>
              <a href={user.isAdmin ? "/admin" : "/user-edit"}>
                <FaUserCircle className="text-2xl" />
              </a>
              <button
                onClick={logout}
                className="text-sm font-medium hover:underline"
              >
                Logout, {user.name}
              </button>
            </>
          ) : (
            <a href="/login" className="text-sm font-medium hover:underline">
              Log in
            </a>
          )}
        </div>
      </nav>

      {/* Mobile Menu (when menu is open) */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white py-4">
          <a href="/feature" className="block px-4 py-2 hover:bg-gray-700">Featured</a>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="block px-4 py-2 bg-white text-gray-800 rounded-lg border border-gray-300 mt-2 w-full"
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
