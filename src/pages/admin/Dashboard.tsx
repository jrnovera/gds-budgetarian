import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Package, Users, ShoppingBag, BarChart, Shield, Menu, X } from 'lucide-react';
import Products from './Products';
import Orders from './Orders';
import Customers from './Customers';
import Analytics from './Analytics';
import RoleManagement from './RoleManagement';
import AdminHeader from '../../components/AdminHeader';

export default function Dashboard() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-yellow-50 to-red-50">
      {/* Header */}
      <AdminHeader />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed bottom-6 right-6 z-50 bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-full shadow-lg hover:from-red-600 hover:to-red-700 transition-all"
      >
        {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Main content with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={closeSidebar}
          ></div>
        )}

        {/* Sidebar */}
        <div className={`
          fixed md:static inset-y-0 left-0 z-40
          w-64 bg-white border-r border-yellow-200 p-6 shadow-lg overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin Dashboard</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-yellow-400 rounded-full"></div>
        </div>
        <nav className="space-y-2">
          <Link
            to="/admin/analytics"
            onClick={closeSidebar}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 font-medium ${
              isActive('/analytics')
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md'
                : 'hover:bg-yellow-50 hover:text-red-600'
            }`}
          >
            <BarChart className="h-5 w-5" />
            <span>Analytics</span>
          </Link>
          <Link
            to="/admin/products"
            onClick={closeSidebar}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 font-medium ${
              isActive('/products')
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md'
                : 'hover:bg-yellow-50 hover:text-red-600'
            }`}
          >
            <Package className="h-5 w-5" />
            <span>Products</span>
          </Link>
          <Link
            to="/admin/orders"
            onClick={closeSidebar}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 font-medium ${
              isActive('/orders')
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md'
                : 'hover:bg-yellow-50 hover:text-red-600'
            }`}
          >
            <ShoppingBag className="h-5 w-5" />
            <span>Orders</span>
          </Link>
          <Link
            to="/admin/customers"
            onClick={closeSidebar}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 font-medium ${
              isActive('/customers')
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md'
                : 'hover:bg-yellow-50 hover:text-red-600'
            }`}
          >
            <Users className="h-5 w-5" />
            <span>Customers</span>
          </Link>
          <Link
            to="/admin/roles"
            onClick={closeSidebar}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 font-medium ${
              isActive('/roles')
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md'
                : 'hover:bg-yellow-50 hover:text-red-600'
            }`}
          >
            <Shield className="h-5 w-5" />
            <span>Role Management</span>
          </Link>
        </nav>
      </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 bg-transparent overflow-y-auto">
          <Routes>
            <Route path="/" element={<Analytics />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/products/*" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/roles" element={<RoleManagement />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}