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
import AddProduct from './pages/admin/adminPanel.jsx';
import UserEditDetails from './pages/Edit.jsx';
import OrderPage from './pages/OrderPage.jsx';
import FeaturedProducts from './pages/FeaturedProducts.jsx';

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL
axios.defaults.withCredentials = true;


const App = () => {
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

  const AdminRoute = ({ children })=>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {user} = useAuthStore()
    if(!user.isAdmin){
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
            < AddProduct />
          </AdminRoute>

        } />


        <Route path='/cart-page' element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>

        } />


        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </>
  );
};

export default App;
