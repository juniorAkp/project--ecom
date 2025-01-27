import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';  // To capture the product ID from the URL

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();  // Get the product ID from the URL params
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
  const [product, setProduct] = useState(null);  // State to hold the fetched product data
  const [loading, setLoading] = useState(false);  // State for loading
  const [successMessage, setSuccessMessage] = useState(''); // Success message state

  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
      const { data } = await axios.get('/admin/category');
      setCategories(data.categories);
    };
    fetchCategories();

    // Fetch the product data when the component mounts
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/admin/products/${id}`);
        setProduct(data.product)
        if (data.success) {
          const { product } = data;
          setName(product.name);
          setDescription(product.description);
          setRichDescription(product.richDescription);
          setPrice(product.price);
          setCategory(product.category);
          setIsFeatured(product.isFeatured);
          setCountInStock(product.countInStock);
          setRating(product.rating);
          setReviews(product.reviews);
          setImage(product.image)
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Error fetching product details');
      }
    };
    fetchProduct();
  }, [id]);  // Fetch product when the ID changes

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting

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
      const { data } = await axios.put(`/admin/product-update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false); // Set loading to false after the request
      if (data.success) {
        setSuccessMessage('Product updated successfully');
        setTimeout(() => navigate('/admin'), 2000); // Redirect after success message
      } else {
        setError(data.error);
      }
    } catch (err) {
      setLoading(false); // Set loading to false if there's an error
      setError('Error updating product');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Update Product</h1>
      
      {/* Display success message */}
      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
      
      {/* Display error message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {product ? (
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
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 w-full px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Updating Product...' : 'Update Product'}
          </button>
        </form>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default UpdateProduct;
