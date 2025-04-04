import { Navigate, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './pages/auth/login.jsx';
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Register from './pages/auth/register.jsx';
import Homepage from './pages/Homepage.jsx';
import CartPage from './pages/CartPage.jsx';
import { useAuthStore } from './store/AuthStore.jsx';
import ForgotPasswordPage from './pages/ForgotPassword.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx'
import AddProduct from './pages/admin/addProduct.jsx';
import UserEditDetails from './pages/Edit.jsx';
import OrderPage from './pages/OrderPage.jsx';
import FeaturedProducts from './pages/FeaturedProducts.jsx';
import AdminDashboard from './pages/admin/adminPanel.jsx';
import UpdateProduct from './pages/admin/updateProduct.jsx';
import DisplayAllProducts from './pages/admin/displayAllproducts.jsx';
import AddCategory from './pages/admin/addCategory.jsx';
import ManageCategories from './pages/admin/displayCategories.jsx';
import UpdateCategory from './pages/admin/updateCategory.jsx';
import ViewOrders from './pages/admin/viewOrders.jsx';
import UpdateOrderStatus from './pages/admin/updateOrder.jsx';
import TermsAndConditions from './pages/static/TermsAndConditions.jsx';
import PrivacyPolicy from './pages/static/PrivacyPolicy.jsx';
import ContactUs from './pages/static/ContactUs.jsx';
import AboutUs from './pages/static/AboutUs.jsx';
import ReviewsPage from './pages/static/ReviewsPage.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import AddLocation from './pages/admin/createlocation.jsx';
import UpdateLocation from './pages/admin/UpdateLocation.jsx';
import ManageLocations from './pages/admin/displayLocations.jsx';

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL
axios.defaults.withCredentials = true;


const App = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.dataset.adClient = "ca-pub-9584960445775344"; // Your AdSense Publisher ID
    document.head.appendChild(script);
  }, []);
  const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) {
      return <Navigate to='/login' replace />;
    }
    if (!user) {
      return <Navigate to='/' replace></Navigate>
    }
    return children;
  };

  const AdminRoute = ({ children }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user } = useAuthStore()
    if (!user.isAdmin) {
      return <Navigate to='/' replace></Navigate>
    }
    return children
  }

  // redirect authenticated users to the home page
  const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (isAuthenticated && user.isVerified) {
      return <Navigate to='/' replace />;
    }

    return children;
  };
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;
  return (

    <>
      <ToastContainer />
      <Routes>
        {/* Add routes here */}

        <Route path="/" element={
          <Homepage />

        } />
        <Route path="/featured" element={
          <FeaturedProducts />

        } />
        <Route path="/login" element={
          <RedirectAuthenticatedUser>
            <Login />
          </RedirectAuthenticatedUser>

        } />
        <Route path='/register' element={
          <RedirectAuthenticatedUser>
            <Register />
          </RedirectAuthenticatedUser>

        } />
        <Route path='/forgot-password' element={
          <RedirectAuthenticatedUser>
            <ForgotPasswordPage />
          </RedirectAuthenticatedUser>

        } />
        <Route path='/reset-password/:token' element={
          <RedirectAuthenticatedUser>
            <ResetPasswordPage />
          </RedirectAuthenticatedUser>

        } />

        <Route path="/user-edit" element={
          <ProtectedRoute>
            <UserEditDetails />
          </ProtectedRoute>

        } />
        <Route path="/order-page" element={
          <ProtectedRoute>
            <OrderPage />
          </ProtectedRoute>

        } />
        <Route path="/admin" element={
          <AdminRoute>
            < AdminDashboard />
          </AdminRoute>

        } />
        <Route path="/add-product" element={
          <AdminRoute>
            < AddProduct />
          </AdminRoute>

        } />
        <Route path="/display-product" element={
          <AdminRoute>
            < DisplayAllProducts />
          </AdminRoute>

        } />
        <Route path="/update-product/:id" element={
          <AdminRoute>
            < UpdateProduct />
          </AdminRoute>

        } />
        <Route path="/add-category" element={
          <AdminRoute>
            < AddCategory />
          </AdminRoute>

        } />
        <Route path="/display-categories" element={
          <AdminRoute>
            < ManageCategories />
          </AdminRoute>

        } />

        <Route path="/update-category/:id" element={
          <AdminRoute>
            < UpdateCategory />
          </AdminRoute>
        } />

        <Route path="/add-location" element={
          <AdminRoute>
            < AddLocation />
          </AdminRoute>
        } />
        <Route path="/display-locations" element={
          <AdminRoute>
            < ManageLocations />
          </AdminRoute>

        } />
        <Route path="/update-location/:id" element={
          <AdminRoute>
            < UpdateLocation />
          </AdminRoute>

        } />
        <Route path="/view-orders" element={
          <AdminRoute>
            < ViewOrders />
          </AdminRoute>

        } />
        <Route path="/update-order/:id" element={
          <AdminRoute>
            < UpdateOrderStatus />
          </AdminRoute>

        } />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path='/cart-page' element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>

        } />
        <Route path='/terms-and-conditions' element={
          <TermsAndConditions />
        } />
        <Route path='/privacy-policy' element={
          <PrivacyPolicy />
        } />
        <Route path='/contact-us' element={
          <ContactUs />
        } />
        <Route path='/about' element={
          <AboutUs />
        } />
        <Route path='/reviews' element={
          <ReviewsPage />
        } />


        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </>
  );
};

export default App;