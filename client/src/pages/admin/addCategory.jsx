import axios from 'axios';
import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent to the backend
    const categoryData = {
      name,
      color,
    };

    try {
      const { data } = await axios.post('/admin/add-category', categoryData);
      if (data.success) {
        alert('Category created successfully');
        // Reset the form after successful submission
        setName('');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Error creating category');
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6">Add Category</h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">Category Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 w-full px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none"
            >
              Create Category
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
};

export default AddCategory;
