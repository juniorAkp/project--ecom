import { useEffect, useState } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import Header from '../components/Header';
import axios from 'axios';
import { useAuthStore } from '../store/AuthStore';
import { useCartStore } from '../store/CartStore';
import Footer from '../components/Footer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Homepage = () => {
  const { user } = useAuthStore();
  const { addItem } = useCartStore();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Static banners
  const staticBanners = [
    {
      id: 'banner1',
      type: 'banner',
      title: 'Get 50% Off Products!',
      description: 'Hurry! Limited Time Offer on Select Items.',
      image: '/images/image1.avif', // Replace with actual banner image URL
    },
    {
      id: 'banner2',
      type: 'banner',
      title: 'Free Shipping on Orders Over GH¢100',
      description: 'Shop more and save on shipping costs!',
      image: '/images/image2.jpg',
    },
    {
      id: 'banner3',
      type: 'banner',
      title: 'Get latest candles',
      description: 'Browse latest candle collections!',
      image: '/images/image3.jpg',
    },
  ];

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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleAddToCart = async (productId) => {
    setLoading(true);
    try {
      await addItem(user._id, productId);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const sliderContent = [...staticBanners]; 

  return (
    <>
      <Header setProducts={setProducts} />
      <main className="bg-gray-50 min-h-screen pt-16">
        {/* Image Slider Section */}
        <div className="bg-white py-6 px-4">
          <Slider {...sliderSettings}>
            {sliderContent.map((item) =>
              item.type === 'banner' ? (
                // Render static banners
                <div key={item.id} className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-black bg-opacity-40 p-4">
                    <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                    <p className="text-lg text-white">{item.description}</p>
                  </div>
                </div>
              ) : (
                // Render product images
                <div key={item._id} className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-black bg-opacity-40 p-4">
                    <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                    <p className="text-base font-medium text-white">GH¢ {item.price}</p>
                  </div>
                </div>
              )
            )}
          </Slider>
        </div>

        {/* Product Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Products For You!</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden relative group"
              >
                {/* Image Section */}
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover transition group-hover:blur-md"
                  />
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="text-white text-xl">Adding...</span>
                    ) : (
                      <FaCartPlus className="text-white text-2xl" />
                    )}
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-base font-medium text-gray-700">GH¢ {product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Homepage;
