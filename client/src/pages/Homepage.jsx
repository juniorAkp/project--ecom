import { useEffect, useState } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import Header from '../components/Header';
import axios from 'axios';
import { useAuthStore } from '../store/AuthStore';
import { useCartStore } from '../store/CartStore';
const Homepage = () => {
  const { user } = useAuthStore();
  const { addItem } = useCartStore();
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const { data } = await axios.get('/api/products');
      if (data.success) setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [user]);

  return (
    <>
      <Header setProducts={setProducts} />
      <main className="bg-gray-50 min-h-screen pt-16">
        {/* Banner Section */}
        <div className="bg-green-100 py-6 px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Grab Up to <span className="text-green-600">50% Off</span> on Selected Headphones
          </h2>
          <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition">
            Buy Now
          </button>
        </div>

        {/* Product Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Headphones For You!</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden group relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:opacity-75"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-base font-medium text-gray-700">${product.price}</p>
                </div>
                <button
                  onClick={() => addItem(user._id, product._id)}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                >
                  <FaCartPlus />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Homepage;
