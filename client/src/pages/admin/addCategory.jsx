import axios from 'axios';
import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // State for success message
  const [loading, setLoading] = useState(false); // State for loading spinner

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent to the backend
    const categoryData = {
      name,
    };

    setLoading(true); // Start loading spinner

    try {
      const { data } = await axios.post('/admin/add-category', categoryData);
      if (data.success) {
        setSuccessMessage('Category created successfully'); // Set success message
        setError(null); // Clear any previous error
        setName(''); // Reset the form
        // Optionally navigate to another page after a delay
        setTimeout(() => navigate('/admin'), 2000); 
      } else {
        setError(data.error);
        setSuccessMessage(null); // Clear any previous success message
      }
    } catch (err) {
      setError('Error creating category');
      setSuccessMessage(null); // Clear any previous success message
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6">Add Category</h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {successMessage && (
            <div className="text-green-500 mb-4">{successMessage}</div>
          )}
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
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  <span className="ml-2">Creating...</span>
                </div>
              ) : (
                'Create Category'
              )}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddCategory;
