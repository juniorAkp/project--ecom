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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Products</h1>
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
                
                {/* Add to Cart Button */}
                <button
                  onClick={() => addItem(user._id, product._id)}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
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
