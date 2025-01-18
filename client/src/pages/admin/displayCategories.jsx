import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all categories from the backend
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/categories');
        if (data.success) {
          setCategories(data.category);
        } else {
          setError('Error fetching categories');
        }
      } catch (err) {
        setError('Error fetching categories');
      }
    };
    fetchCategories();
  }, []);

  const handleDelete = async (categoryId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this category?');
    if (confirmDelete) {
      try {
        const { data } = await axios.delete(`/admin/category/${categoryId}`);
        if (data.success) {
          // Remove the deleted category from the list
          setCategories(categories.filter((category) => category.id !== categoryId));
        } else {
          setError('Error deleting category');
        }
      } catch (err) {
        setError('Error deleting category');
      }
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6">Manage Categories</h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}

          {categories.length === 0 ? (
            <div>No categories available.</div>
          ) : (
            <table className="min-w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left">Category Name</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-b">
                    <td className="px-4 py-2">{category.name}</td>
                    <td className="px-4 py-2">
                      <Link
                        to={`/update-category/${category.id}`}
                        className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="ml-4 px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Footer />
    </>

  );
};

export default ManageCategories;
