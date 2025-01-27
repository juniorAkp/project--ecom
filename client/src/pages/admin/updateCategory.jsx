import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateCategory = () => {
  const { id } = useParams(); // Get the category ID from the URL params
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // State for success message
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch category data when the component mounts
    const fetchCategory = async () => {
      try {
        const { data } = await axios.get(`/admin/category/${id}`);
        if (data.success) {
          setName(data.category.name);
        } else {
          setError('Category not found');
        }
      } catch (err) {
        setError('Error fetching category details');
      }
    };
    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading spinner

    try {
      const { data } = await axios.put(`/admin/category/${id}`, { name });
      if (data.success) {
        setSuccessMessage('Category updated successfully'); // Set success message
        setError(null); // Clear previous error
        // Optionally navigate after a delay
        setTimeout(() => navigate('/admin'), 2000);
      } else {
        setError(data.error);
        setSuccessMessage(null); // Clear success message if there's an error
      }
    } catch (err) {
      setError('Error updating category');
      setSuccessMessage(null); // Clear success message if there's an error
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Update Category</h1>
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
              <span className="ml-2">Updating...</span>
            </div>
          ) : (
            'Update Category'
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateCategory;
