import { Navigate, Route, Routes } from 'react-router-dom';
import AuthLayout from '../components/layouts/AuthLayout';
import MainLayout from '../components/layouts/MainLayout';
import B2BLayout from '../components/layouts/B2BLayout';
import Welcome from '../pages/Welcome';
import Catalog from '../pages/Catalog';
import EcoImpact from '../pages/EcoImpact';
import Constructor from '../pages/Constructor';
import B2BPortal from '../pages/B2BPortal';
import Login from '../pages/LoginPage';
import Register from '../pages/RegisterPage';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Welcome />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/eco-impact" element={<EcoImpact />} />
        <Route path="/constructor" element={<Constructor />} />
      </Route>

      <Route element={<B2BLayout />}>
        <Route path="/b2b-portal" element={<B2BPortal />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
