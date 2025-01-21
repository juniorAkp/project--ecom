import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const DisplayAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all products from the backend
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        console.log(data.products)
        if (data.success) {
          setProducts(data.products);
        } else {
          setError('Error fetching products');
        }
      } catch (err) {
        setError('Error fetching products');
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      try {
        const { data } = await axios.delete(`/admin/delete-product/${id}`);
        if (data.success) {
          alert('Product deleted successfully');
          // Remove deleted product from state to update UI
          setProducts(products.filter(product => product.id !== id));
        } else {
          setError('Error deleting product');
        }
      } catch (err) {
        setError('Error deleting product');
      }
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md w-full">
          <h1 className="text-3xl font-bold mb-6">All Products</h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}

          {products.length === 0 ? (
            <div>No products available.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">Product Name</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-left">Stock</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="px-4 py-2">{product.name}</td>
                      <td className="px-4 py-2">GH¢ {product.price}</td>
                      <td className="px-4 py-2">{product.category.name}</td>
                      <td className="px-4 py-2">{product.countInStock}</td>
                      <td className="px-4 py-2 flex flex-wrap space-x-2 justify-start">
                        <Link
                          to={`/update-product/${product.id}`}
                          className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none"
                        >
                          Update
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DisplayAllProducts;
