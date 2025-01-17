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

  // Fetch products
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
        {/* Hero Section */}
        <section className="bg-orange-100 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Grab Up to 50% Off on Selected Headphones
          </h1>
          <button className="bg-green-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-700">
            Buy Now
          </button>
        </section>

        {/* Product Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Headphones For You!</h2>
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">Headphone Type</button>
              <button className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">Price</button>
              <button className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">Review</button>
            </div>
            <button className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">Sort by</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden group relative">
                <a href="#" className="block">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:opacity-75"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
                    <p className="text-gray-600">${product.price}</p>
                  </div>
                </a>
                <button
                  onClick={() => addItem(user._id, product._id)}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition"
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
