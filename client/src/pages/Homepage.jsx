import { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { useAuthStore } from '../store/AuthStore';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BannerSection from '../components/BannerSection';
import WelcomeSection from '../components/CategoriesSection';
import ContactSection from '../components/ContactSection';

const Homepage = () => {
  const { user } = useAuthStore();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Static banners
  const staticBanners = [
    {
      id: 'banner1',
      type: 'banner',
      title: 'Get 50% Off Products!',
      description: 'Hurry! Limited Time Offer on Select Items.',
      image: '/images/image1.avif',
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

  const getCategories = async () => {
    try {
      const { data } = await axios.get('/api/categories');
      setCategories(data.category);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const getProducts = async () => {
    try {
      const { data } = await axios.get('/api/products', {
        params: { searchQuery },
      });
      if (data.success) setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getCategories();
    getProducts();
  }, [user, searchQuery]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <Header setProducts={setProducts} />
      <main className="bg-gray-50 min-h-screen pt-16 pb-8">
        {/* Banner, Categories, and Contact in a Flex Layout */}
        {!searchQuery && (
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 px-4 pt-16">
            {/* Left Column - Categories */}
            <div className="w-full md:w-1/4">
              <WelcomeSection />
            </div>

            {/* Center Column - Banner */}
            <div className="w-full md:w-2/4">
              <Slider {...sliderSettings}>
                {staticBanners.map((item) => (
                  <BannerSection
                    key={item.id}
                    image={item.image}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </Slider>
            </div>

            {/* Right Column - Contact */}
            <div className="w-full md:w-1/4">
              <ContactSection />
            </div>
          </div>
        )}

        {/* Product Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Products For You!</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden relative group hover:shadow-xl transition-all duration-300"
              >
                <Link to={`/product/${product._id}`}>
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="p-4 flex flex-col gap-2">
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
