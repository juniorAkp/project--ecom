import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateOrderStatus = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get order ID from route params
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`/admin/get-order/${id}`);
        setOrder(data.order);
        setStatus(data.order.status);
      } catch (err) {
        setError('Failed to fetch order details');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/admin/edit-status/${id}`, { status });
      if (data.success) {
        setSuccessMessage('Order status updated successfully');
        navigate('/admin')
      }
    } catch (err) {
      setError('Failed to update order status');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Update Order Status</h1>
      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Order Details</h2>
        <p>Order ID: {order.id}</p>
        <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
        <p>Status: {order.status}</p>
      </div>
      <form onSubmit={handleStatusUpdate}>
        <label htmlFor="status" className="block text-sm font-medium">Update Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="Delivered">Delivered</option>
        </select>
        <button
          type="submit"
          className="mt-4 w-full px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none"
        >
          Update Status
        </button>
      </form>
    </div>
  );
};

export default UpdateOrderStatus;
