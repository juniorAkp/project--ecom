import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const AddProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [richDescription, setRichDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [countInStock, setCountInStock] = useState('');
  const [rating, setRating] = useState('');
  const [reviews, setReviews] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    // Fetch categories from the backend to populate the category dropdown
    const fetchCategories = async () => {
      const { data } = await axios.get('/admin/category')
      setCategories(data.categories)
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('richDescription', richDescription);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('isFeatured', isFeatured);
    formData.append('countInStock', countInStock);
    formData.append('rating', rating);
    formData.append('reviews', reviews);
    formData.append('image', image);

    try {
      const { data } = await axios.post('/admin/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      if (data.success) {
        alert('Product created successfully');
        // Reset the form after successful submission
        setName('');
        setDescription('');
        setRichDescription('');
        setPrice('');
        setCategory('');
        setIsFeatured(false);
        setCountInStock('');
        setRating('');
        setReviews('');
        setImage(null);
        navigate('/admin')
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Error creating product');
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Add Product</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">Product Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium">Price</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="description" className="block text-sm font-medium">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="richDescription" className="block text-sm font-medium">Rich Description</label>
              <textarea
                id="richDescription"
                value={richDescription}
                onChange={(e) => setRichDescription(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="isFeatured" className="block text-sm font-medium">Featured Product</label>
              <input
                type="checkbox"
                id="isFeatured"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="countInStock" className="block text-sm font-medium">Count In Stock</label>
              <input
                type="number"
                id="countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="rating" className="block text-sm font-medium">Rating</label>
              <input
                type="number"
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="reviews" className="block text-sm font-medium">Reviews</label>
              <input
                type="number"
                id="reviews"
                value={reviews}
                onChange={(e) => setReviews(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="image" className="block text-sm font-medium">Product Image</label>
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                className="mt-1 block w-full"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 w-full px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            Create Product
          </button>
        </form>
      </div>
      <Footer />
    </>


  );
};

export default AddProduct;


