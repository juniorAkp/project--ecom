import { useEffect, useState } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import Header from '../components/Header';
import axios from 'axios';
import { useAuthStore } from '../store/AuthStore';
import { useCartStore } from '../store/CartStore';
import Footer from '../components/Footer';

const FeaturedProducts = () => {
  const { user } = useAuthStore();
  const {addItem} = useCartStore();
  const [products, setProduct] = useState([]);

  // Fetch products from the API
  const getProducts = async () => {
    const { data } = await axios.get('/api/featured');
    if (data.success) {
      setProduct(data.products);
    } else {
      console.error('An error occurred while fetching products.');
    }
  };


  useEffect(() => {
    getProducts();
  },[user]); 

  // Handle adding product to the cart
  

  return (
    <>
       <Header /> 
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product._id} className="group relative">
                <a href="#" className="group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                  />
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                </a>
                {/* Add to Cart button */}
                <button
                  onClick={() => addItem(user._id,product._id)}
                  className="absolute bottom-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 opacity-100 transition-opacity"
                >
                  <FaCartPlus />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default FeaturedProducts;
