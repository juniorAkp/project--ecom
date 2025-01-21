import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ViewOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/admin/get-all-orders');
        if (data.success) {
          setOrders(data.orders);
        } else {
          setError('Failed to fetch orders.');
        }
      } catch (err) {
        setError('Error fetching orders.');
      }
    };
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const { data } = await axios.put(`/admin/edit-status/${orderId}`, { status: newStatus });
      if (data.success) {
        alert(`Order status updated to ${newStatus}`);
        window.location.reload();
        // Refetch orders
        const updatedOrders = await axios.get('/admin/get-all-orders');
        setOrders(updatedOrders.data.orders);
        navigate('/admin')
        // Update the order status in the state
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        setSuccess('Updated successfully');
      }
    } catch (err) {
      setError('Error updating order status.');
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center md:text-left">
          Manage Orders
        </h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        {orders.length === 0 ? (
          <div className="text-center text-gray-500">No orders available.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-2 py-1 md:px-4 md:py-2 text-left border border-gray-300">Order ID</th>
                  <th className="px-2 py-1 md:px-4 md:py-2 text-left border border-gray-300">User</th>
                  <th className="px-2 py-1 md:px-4 md:py-2 text-left border border-gray-300">
                    Total Price
                  </th>
                  <th className="px-2 py-1 md:px-4 md:py-2 text-left border border-gray-300">Status</th>
                  <th className="px-2 py-1 md:px-4 md:py-2 text-left border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="px-2 py-1 md:px-4 md:py-2">{order.id}</td>
                    <td className="px-2 py-1 md:px-4 md:py-2">{order.user?.name || 'N/A'}</td>
                    <td className="px-2 py-1 md:px-4 md:py-2">GH¢ {order.totalPrice.toFixed(2)}</td>
                    <td className="px-2 py-1 md:px-4 md:py-2">{order.status}</td>
                    <td className="px-2 py-1 md:px-4 md:py-2 space-y-1 md:space-y-0 md:space-x-2">
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'Delivered')}
                        className="w-full md:w-auto px-2 py-1 md:px-4 md:py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none"
                      >
                        Mark as Delivered
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'Pending')}
                        className="w-full md:w-auto px-2 py-1 md:px-4 md:py-2 bg-yellow-500 text-white text-sm font-medium rounded-md hover:bg-yellow-600 focus:outline-none"
                      >
                        Mark as Pending
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'Paid')}
                        className="w-full md:w-auto px-2 py-1 md:px-4 md:py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none"
                      >
                        Mark as Paid
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>

  );
};

export default ViewOrders;
