
import React, { useState, useRef } from 'react';
import { useData } from '../../contexts/DataContext';
import Loader from '../../components/Loader';

const AdminSettingsPage: React.FC = () => {
  const { upiId, updateUpiId, qrCodeImageUrl, updateQrCodeImageUrl } = useData();
  const [currentUpiId, setCurrentUpiId] = useState(upiId);
  const [currentQrCode, setCurrentQrCode] = useState(qrCodeImageUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
        updateUpiId(currentUpiId);
        updateQrCodeImageUrl(currentQrCode);
        setIsLoading(false);
        setNotification('Settings updated successfully!');
        setTimeout(() => setNotification(''), 3000);
    }, 1000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setCurrentQrCode(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {isLoading && <Loader text="Saving..." />}
       <div className={`fixed top-20 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-lg shadow-lg z-[101] transform transition-all duration-300 ${notification ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
        {notification}
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Site Settings</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Payment Settings</h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="upiId" className="text-sm font-medium text-gray-700">Business UPI ID</label>
            <p className="text-xs text-gray-500 mb-2">This UPI ID will be shown to customers at checkout.</p>
            <input 
              id="upiId"
              type="text" 
              value={currentUpiId} 
              onChange={(e) => setCurrentUpiId(e.target.value)} 
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-flipkart-blue"
              placeholder="your-name@oksbi"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Custom QR Code Image (Optional)</label>
            <p className="text-xs text-gray-500 mb-2">Upload your own QR code. If not provided, one will be auto-generated.</p>
            <div className="flex items-center gap-4 mt-2">
                {currentQrCode ? (
                    <div className="relative">
                        <img src={currentQrCode} alt="QR Code Preview" className="w-32 h-32 border rounded-md object-contain" />
                        <button 
                            onClick={() => setCurrentQrCode('')}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg"
                            aria-label="Remove Image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                ) : (
                    <div className="w-32 h-32 border-2 border-dashed rounded-md flex items-center justify-center text-gray-400">
                        No Image
                    </div>
                )}
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-semibold hover:bg-gray-300"
                >
                    Upload Image
                </button>
            </div>
          </div>
          <div className="flex justify-end border-t pt-4">
            <button 
              onClick={handleSave} 
              className="bg-flipkart-blue text-white px-5 py-2 rounded-md hover:bg-blue-700 font-semibold"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
