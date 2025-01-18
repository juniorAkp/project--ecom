import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Importing Link from react-router-dom// Sidebar component import
import Header from '../../components/Header';
import axios from 'axios';
import Footer from '../../components/Footer';

const AdminDashboard = () => {
  const [totalSales, setTotalSales] = useState(null);
  const [userCount, setUserCount] = useState(null);
  const [loadingSales, setLoadingSales] = useState(false);
  const [loadingUserCount, setLoadingUserCount] = useState(false);
  const [error, setError] = useState(null);

  // Toggling state for opening and closing sections
  const [isSalesOpen, setIsSalesOpen] = useState(false);
  const [isUserCountOpen, setIsUserCountOpen] = useState(false);

  // Fetch total sales data
  const fetchTotalSales = async () => {
    setLoadingSales(true);
    try {
      const { data } = await axios.get('/admin/total-sales');
      setTotalSales(data.totalSales);
    } catch (err) {
      setError('Failed to fetch total sales');
    } finally {
      setLoadingSales(false);
    }
  };

  // Fetch user count data
  const fetchUserCount = async () => {
    setLoadingUserCount(true);
    try {
      const { data } = await axios.get('/admin/count-users');
      setUserCount(data.users);
    } catch (err) {
      setError('Failed to fetch user count');
    } finally {
      setLoadingUserCount(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gray-100">
        {/* Main Content */}
        <div className="flex-1  p-6 mt-16">
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 rounded-lg shadow-md text-white text-center">
              <h1 className="text-4xl font-bold">Welcome to the Admin Dashboard</h1>
              <p className="mt-4 text-lg">Manage categories, products, orders, and sales easily from here.</p>
            </div>

            {/* Dashboard Sections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Categories Management */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-700">Categories</h3>
                <div className="mt-4 space-y-4">
                  <Link
                    to="/add-category"
                    className="block text-center text-white bg-green-600 hover:bg-green-700 py-3 rounded-md transition duration-300"
                  >
                    Add Category
                  </Link>
                  <Link
                    to="/display-categories"
                    className="block text-center text-white bg-blue-600 hover:bg-blue-700 py-3 rounded-md transition duration-300"
                  >
                    Display Categories
                  </Link>
                </div>
              </div>

              {/* Products Management */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-700">Products</h3>
                <div className="mt-4 space-y-4">
                  <Link
                    to="/add-product"
                    className="block text-center text-white bg-green-600 hover:bg-green-700 py-3 rounded-md transition duration-300"
                  >
                    Add Product
                  </Link>
                  <Link
                    to="/display-product"
                    className="block text-center text-white bg-blue-600 hover:bg-blue-700 py-3 rounded-md transition duration-300"
                  >
                    Display Product
                  </Link>
                </div>
              </div>

              {/* Orders Management */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-700">Orders</h3>
                <div className="mt-4 space-y-4">
                  <Link
                    to="/view-orders"
                    className="block text-center text-white bg-yellow-600 hover:bg-yellow-700 py-3 rounded-md transition duration-300"
                  >
                    View Orders
                  </Link>
                </div>
              </div>

              {/* Sales Overview */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-700">Sales Overview</h3>
                <div className="mt-4">
                  <button
                    onClick={() => {
                      setIsSalesOpen(!isSalesOpen);
                      if (!isSalesOpen && !totalSales) {
                        fetchTotalSales();
                      }
                    }}
                    className="block text-center text-white bg-purple-600 hover:bg-purple-700 py-3 rounded-md transition duration-300"
                  >
                    {isSalesOpen ? 'Hide Total Sales' : 'View Total Sales'}
                  </button>

                  {isSalesOpen && (
                    <div className="mt-4">
                      {loadingSales ? (
                        <p className="text-center text-gray-500">Loading...</p>
                      ) : totalSales !== null ? (
                        <p className="text-center text-gray-700">Total Sales: ${totalSales}</p>
                      ) : (
                        <p className="text-center text-gray-500">No sales data available.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* User Count */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-700">User Count</h3>
                <div className="mt-4">
                  <button
                    onClick={() => {
                      setIsUserCountOpen(!isUserCountOpen);
                      if (!isUserCountOpen && !userCount) {
                        fetchUserCount();
                      }
                    }}
                    className="block text-center text-white bg-teal-600 hover:bg-teal-700 py-3 rounded-md transition duration-300"
                  >
                    {isUserCountOpen ? 'Hide User Count' : 'View User Count'}
                  </button>

                  {isUserCountOpen && (
                    <div className="mt-4">
                      {loadingUserCount ? (
                        <p className="text-center text-gray-500">Loading...</p>
                      ) : userCount !== null ? (
                        <p className="text-center text-gray-700">Total Users: {userCount}</p>
                      ) : (
                        <p className="text-center text-gray-500">No user count available.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default AdminDashboard;
