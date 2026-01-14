
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useData } from '../contexts/DataContext';
import Loader from '../components/Loader';

const CheckoutPage: React.FC = () => {
  const { user } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { upiId, qrCodeImageUrl, addOrder } = useData();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'details' | 'payment'>('details');

  const [name, setName] = useState(user?.name || '');
  const [address, setAddress] = useState(user?.address || '');
  const [phone, setPhone] = useState(user?.phone || '');

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });
  
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleConfirmPayment = () => {
    if (!user) return;
    setIsLoading(true);
    // Simulate API call to create order
    setTimeout(() => {
      addOrder({
        userId: user.id,
        items: cartItems,
        totalAmount: cartTotal,
        address: address,
      });
      setIsLoading(false);
      clearCart();
      navigate('/orders'); 
    }, 2000);
  };
  
  const upiDeepLink = `upi://pay?pa=${upiId}&pn=FlipkartClone&am=${cartTotal.toFixed(2)}&cu=INR&tn=OrderPayment`;
  const generatedQrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiDeepLink)}`;


  if (step === 'details') {
    return (
      <div className="p-4 bg-white min-h-full">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Shipping Details</h2>
        <form onSubmit={handleProceedToPayment} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 p-2 border rounded-md" required />
          </div>
          <div>
            <label className="text-sm font-medium">Address</label>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="w-full mt-1 p-2 border rounded-md" rows={3} required />
          </div>
          <div>
            <label className="text-sm font-medium">Phone</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full mt-1 p-2 border rounded-md" required />
          </div>
          
          <div className="sticky bottom-16 left-0 right-0 bg-white p-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total Payable</span>
                <span className="text-xl font-bold">{formatter.format(cartTotal)}</span>
              </div>
              <button type="submit" className="w-full bg-flipkart-blue text-white p-3 rounded-md font-bold">
                Proceed to Payment
              </button>
          </div>
        </form>
      </div>
    );
  }

  if (step === 'payment') {
      return (
        <div className="p-4 bg-white min-h-full flex flex-col">
            {isLoading && <Loader text="Submitting your order..." />}
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Complete Your Payment</h2>
            <div className="flex-grow flex flex-col items-center justify-center text-center p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-700">Please send <span className="font-bold text-black">{formatter.format(cartTotal)}</span> to the UPI ID below.</p>
                
                <div className="my-6">
                    <img 
                        src={qrCodeImageUrl || generatedQrCodeUrl} 
                        alt="UPI QR Code" 
                        className="w-48 h-48 rounded-lg shadow-md border object-contain" 
                    />
                </div>
                
                <p className="text-sm text-gray-500">Or pay to:</p>
                <div className="my-2 bg-blue-100 text-blue-800 font-mono text-lg px-4 py-2 rounded-lg border-2 border-dashed border-blue-300">
                    {upiId}
                </div>
                
                <p className="text-xs text-gray-500 mt-6 max-w-sm">
                    After you complete the payment, your order will be confirmed and you will receive your package soon.
                </p>
            </div>
             <div className="sticky bottom-16 left-0 right-0 bg-white p-4 border-t">
                <button onClick={handleConfirmPayment} className="w-full bg-green-500 text-white p-3 rounded-md font-bold">
                    I Have Paid, Confirm Order
                </button>
            </div>
        </div>
      )
  }
  
  return null;
};

export default CheckoutPage;
