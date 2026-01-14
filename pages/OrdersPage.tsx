
import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import Tabs from '../components/Tabs';
import OrderStatusTracker from '../components/OrderStatusTracker';
import { Order, CartItem } from '../types';

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    });

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <div className="flex gap-4" onClick={() => setIsExpanded(!isExpanded)}>
                <img src={order.items[0].image} alt={order.items[0].name} className="w-20 h-20 object-cover rounded-md" />
                <div className="flex-grow">
                    <p className="font-bold text-sm">{order.items[0].name}</p>
                    {order.items.length > 1 && <p className="text-xs text-gray-500">+ {order.items.length - 1} more items</p>}
                    <p className="text-xs text-gray-500 mt-1">Order ID: {order.id}</p>
                    <p className="font-semibold text-md mt-2">{formatter.format(order.totalAmount)}</p>
                </div>
                <button className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDownIcon />
                </button>
            </div>
            
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-screen mt-4 pt-4 border-t' : 'max-h-0'}`}>
                <OrderStatusTracker status={order.status} />
                
                {order.status === 'Pending Confirmation' && (
                    <div className="mt-4 p-3 bg-purple-50 text-purple-800 rounded-lg text-sm text-center border border-purple-200">
                        <p className="font-semibold">Processing Payment Verification</p>
                        <p className="text-xs mt-1">Your order will be confirmed once the payment is verified by our team.</p>
                    </div>
                )}

                <div className="mt-4 space-y-2">
                    <h4 className="font-semibold">Items in this order:</h4>
                    {order.items.map((item: CartItem) => (
                        <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-gray-600">{item.name} (x{item.quantity})</span>
                            <span className="text-gray-800">{formatter.format(item.price * item.quantity)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


const OrdersPage: React.FC = () => {
  const { orders } = useData();
  const [activeTab, setActiveTab] = useState('Active Orders');
  
  const activeOrders = orders.filter(o => o.status === 'Placed' || o.status === 'Dispatched' || o.status === 'Pending Confirmation');
  const pastOrders = orders.filter(o => o.status === 'Delivered' || o.status === 'Cancelled');

  const ordersToShow = activeTab === 'Active Orders' ? activeOrders : pastOrders;

  return (
    <div className="p-2 space-y-3">
        <div className="bg-white rounded-lg shadow">
            <Tabs tabs={['Active Orders', 'Order History']} activeTab={activeTab} onTabClick={setActiveTab} />
        </div>
      
      {ordersToShow.length > 0 ? (
        ordersToShow.map(order => <OrderCard key={order.id} order={order} />)
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">No orders in this category.</p>
        </div>
      )}
    </div>
  );
};


const ChevronDownIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);


export default OrdersPage;
