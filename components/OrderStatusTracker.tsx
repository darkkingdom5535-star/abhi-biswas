
import React from 'react';
import { Order } from '../types';

interface OrderStatusTrackerProps {
  status: Order['status'];
}

const OrderStatusTracker: React.FC<OrderStatusTrackerProps> = ({ status }) => {
  const stages = ['Pending Confirmation', 'Placed', 'Dispatched', 'Delivered'];
  const currentStageIndex = stages.indexOf(status);

  const isCancelled = status === 'Cancelled';

  if (isCancelled) {
    return (
        <div className="flex items-center justify-center p-4 bg-red-50 rounded-lg">
            <div className="flex items-center space-x-2 text-red-600">
                <XCircleIcon />
                <span className="font-bold">Order Cancelled</span>
            </div>
        </div>
    )
  }

  const getStageName = (stage: string) => {
      if (stage === 'Pending Confirmation') return 'Awaiting Confirmation';
      return stage;
  }

  return (
    <div className="w-full py-4">
      <div className="flex items-center">
        {stages.map((stage, index) => (
          <React.Fragment key={stage}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500
                  ${index <= currentStageIndex ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'}
                  ${index === 0 && currentStageIndex === 0 ? 'animate-pulse bg-purple-500' : ''}
                `}
              >
                {index <= currentStageIndex ? <CheckIcon /> : <div className="w-2 h-2 bg-gray-500 rounded-full"></div>}
              </div>
              <span className={`mt-2 text-xs font-medium text-center ${index <= currentStageIndex ? 'text-gray-800' : 'text-gray-500'}`}>{getStageName(stage)}</span>
            </div>
            {index < stages.length - 1 && (
              <div className={`flex-1 h-1 transition-colors duration-500 ${index < currentStageIndex ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);

const XCircleIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
)

export default OrderStatusTracker;
