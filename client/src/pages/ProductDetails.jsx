import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCartPlus } from 'react-icons/fa';
import { useCartStore } from '../store/CartStore';
import { useAuthStore } from '../store/AuthStore';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const { addItem } = useCartStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState('Add to Cart');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        if (data.success) {
          setProduct(data.product);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      // If the user is not logged in, navigate to the login page
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      await addItem(user._id, product._id);
      setButtonText('Added Successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-16 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-800 mb-4 flex items-center gap-2"
          >
            ← Back to Products
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Product Image */}
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-2xl text-indigo-600 font-semibold">GH¢ {product.price}</p>
              <p className="text-gray-700 leading-relaxed">{product.richDescription}</p>
              <div className="flex items-center gap-4">
                <span className="text-gray-500 text-sm">Stock Available:</span>
                <span
                  className={`text-lg font-medium ${
                    product.countInStock > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {product.countInStock > 0 ? `${product.countInStock} in stock` : 'Out of stock'}
                </span>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={
                  loading || product.countInStock === 0 || buttonText === 'Added Successfully!'
                }
                className={`px-6 py-3 rounded-md font-medium text-white transition-all ${
                  product.countInStock > 0 && buttonText !== 'Added Successfully!'
                    ? 'bg-indigo-600 hover:bg-indigo-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {loading ? 'Adding...' : <><FaCartPlus className="inline-block mr-2" /> {buttonText}</>}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
