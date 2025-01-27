import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ManageLocations = () => {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all locations from the backend
    const fetchLocations = async () => {
      try {
        const { data } = await axios.get('/api/get-locations');
        if (data.success) {
          setLocations(data.locations); 
        } else {
          setError('Error fetching locations');
        }
      } catch (err) {
        setError('Error fetching locations');
      }
    };
    fetchLocations();
  }, []);

  const handleDelete = async (locationId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this location?');
    if (confirmDelete) {
      try {
        const { data } = await axios.delete(`/admin/delete-location/${locationId}`);
        if (data.success) {
          // Remove the deleted location from the list
          setLocations(locations.filter((location) => location.id !== locationId));
        } else {
          setError('Error deleting location');
        }
      } catch (err) {
        setError('Error deleting location');
      }
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6">Manage Locations</h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}

          {locations.length === 0 ? (
            <div>No locations available.</div>
          ) : (
            <table className="min-w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left">Location Name</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {locations.map((location) => (
                  <tr key={location.id} className="border-b">
                    <td className="px-4 py-2">{location.name}</td>
                    <td className="px-4 py-2">
                      <Link
                        to={`/update-location/${location._id}`}
                        className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(location._id)}
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

export default ManageLocations;
