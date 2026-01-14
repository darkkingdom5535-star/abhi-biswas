
import React from 'react';
import StatCard from '../../components/admin/StatCard';
import { MOCK_ORDERS, MOCK_PRODUCTS, MOCK_USERS, MOCK_ACTIVITY_LOG } from '../../data/mockData';

const AdminDashboardPage: React.FC = () => {
  const totalRevenue = MOCK_ORDERS.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = MOCK_ORDERS.length;
  const totalProducts = MOCK_PRODUCTS.length;
  const totalUsers = MOCK_USERS.length; 
  const onlineUsers = Math.floor(Math.random() * (totalUsers * 2)) + 1; // Simulated online users

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={formatter.format(totalRevenue)}
          color="bg-green-100 text-green-600"
          icon={<RevenueIcon />}
        />
        <StatCard 
          title="Total Orders" 
          value={totalOrders.toString()}
          color="bg-blue-100 text-blue-600"
          icon={<OrderIcon />}
        />
        <StatCard 
          title="Total Users" 
          value={totalUsers.toString()}
          color="bg-purple-100 text-purple-600"
          icon={<UsersIcon />}
        />
         <StatCard 
          title="Online Users" 
          value={onlineUsers.toString()}
          color="bg-teal-100 text-teal-600"
          icon={<OnlineIcon />}
        />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
            {MOCK_ACTIVITY_LOG.map(activity => (
                <div key={activity.id} className="flex items-center text-sm border-b pb-2 last:border-b-0">
                    <p className="text-gray-600 flex-grow">
                        <span className="font-semibold text-gray-800">{activity.user}</span> {activity.action} <span className="font-semibold text-flipkart-blue">{activity.target}</span>
                    </p>
                    <p className="text-gray-400 text-xs flex-shrink-0">{activity.time}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

// Icons for Stat Cards
const RevenueIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
const OrderIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
const ProductIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;
const UsersIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const OnlineIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"/><path d="M12 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/></svg>

export default AdminDashboardPage;
