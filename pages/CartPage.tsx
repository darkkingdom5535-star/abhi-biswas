
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartSubtotal, vipDiscount } = useCart();

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <EmptyCartIcon />
        <h2 className="text-xl font-bold mt-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mt-2">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="mt-6 bg-flipkart-blue text-white px-6 py-2 rounded-md font-semibold">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-2 space-y-3">
      {cartItems.map(item => (
        <div key={item.id} className="bg-white p-3 rounded-lg shadow flex items-start gap-4">
          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
          <div className="flex-grow">
            <h3 className="font-semibold text-sm">{item.name}</h3>
            <p className="font-bold text-md mt-1">{formatter.format(item.price)}</p>
            <div className="flex items-center mt-2">
              <div className="flex items-center border rounded-md">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 text-sm">-</button>
                <span className="px-3 py-1 text-sm font-bold">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 text-sm">+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-500">
                <TrashIcon />
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {vipDiscount > 0 && (
          <div className="bg-white p-3 rounded-lg shadow text-sm">
            <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatter.format(cartSubtotal)}</span>
            </div>
            <div className="flex justify-between text-green-600 font-semibold">
                <span>VIP Discount (10%)</span>
                <span>- {formatter.format(vipDiscount)}</span>
            </div>
          </div>
      )}

      <div className="sticky bottom-16 left-0 right-0 bg-white p-4 border-t shadow-[0_-2px_5px_rgba(0,0,0,0.1)]">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-xl font-bold">{formatter.format(cartTotal)}</span>
        </div>
        <Link to="/checkout" className="w-full block text-center bg-flipkart-yellow text-gray-900 p-3 rounded-md font-bold">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

const TrashIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
);
const EmptyCartIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.16"/></svg>
)

export default CartPage;