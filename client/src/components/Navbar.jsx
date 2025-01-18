import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleSidebar = () => setIsActive(!isActive);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden ${
          isActive ? "block" : "hidden"
        }`}
        onClick={toggleSidebar}
      ></div>

      <div
        className={`lg:flex lg:w-64 fixed inset-y-0 left-0 bg-gray-800 text-white p-4 space-y-6 transform ${
          isActive ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="text-center">
          <a href="#" className="text-2xl font-semibold">
            Admin Dashboard
          </a>
        </div>

        <ul className="space-y-4">
          <li>
            <Link
              to="/products"
              className="flex items-center p-2 text-lg rounded hover:bg-gray-700"
            >
              <span className="material-icons text-lg mr-4">store</span>
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/categories"
              className="flex items-center p-2 text-lg rounded hover:bg-gray-700"
            >
              <span className="material-icons text-lg mr-4">category</span>
              Categories
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              className="flex items-center p-2 text-lg rounded hover:bg-gray-700"
            >
              <span className="material-icons text-lg mr-4">shopping_cart</span>
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/sales"
              className="flex items-center p-2 text-lg rounded hover:bg-gray-700"
            >
              <span className="material-icons text-lg mr-4">attach_money</span>
              Total Sales
            </Link>
          </li>
          <li>
            <Link
              to="/user-count"
              className="flex items-center p-2 text-lg rounded hover:bg-gray-700"
            >
              <span className="material-icons text-lg mr-4">person</span>
              User Count
            </Link>
          </li>
        </ul>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <button
            className="lg:hidden bg-gray-700 p-2 rounded-full text-white"
            onClick={toggleSidebar}
          >
            <span className="material-icons">close</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
