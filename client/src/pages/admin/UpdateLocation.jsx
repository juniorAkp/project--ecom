import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateLocation = () => {
  const { id } = useParams(); // Get the location ID from the URL params
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading spinner

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { data } = await axios.get(`/api/get-location/${id}`);
        if (data.success) {
          setName(data.location.name);
          setCity(data.location.city);
          setCountry(data.location.country);
        } else {
          setError('Location not found');
        }
      } catch (err) {
        setError('Error fetching location details');
      }
    };
    fetchLocation();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading spinner

    try {
      const { data } = await axios.put(`/admin/edit-locations/${id}`, { name, city, country });
      if (data.success) {
        alert('Location updated successfully');
        navigate('/admin');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Error updating location');
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Update Location</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Location Name</label>
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
            <label htmlFor="city" className="block text-sm font-medium">City</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium">Country</label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
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
            'Update Location'
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateLocation;
