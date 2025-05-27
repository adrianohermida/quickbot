import React, { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { products, ProductId } from '../../stripe-config';
import { createCheckoutSession } from '../../lib/stripe';

interface PlanSelectorProps {
  currentPlan?: string;
}

const PlanSelector: React.FC<PlanSelectorProps> = ({ currentPlan }) => {
  const [loading, setLoading] = useState<ProductId | null>(null);

  const handleSelectPlan = async (productId: ProductId) => {
    try {
      setLoading(productId);
      const product = products[productId];
      
      const checkoutUrl = await createCheckoutSession(
        product.priceId,
        product.mode,
        `${window.location.origin}/billing?success=true`,
        `${window.location.origin}/billing?success=false`
      );

      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Failed to create checkout session:', error);
      alert('Failed to start checkout process. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {(Object.entries(products) as [ProductId, typeof products[ProductId]][]).map(([id, product]) => (
        <div
          key={id}
          className={`relative rounded-lg border p-6 ${
            currentPlan === product.priceId
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200 hover:border-blue-400 hover:shadow-md'
          } transition-all duration-200`}
        >
          {currentPlan === product.priceId && (
            <div className="absolute -top-3 -right-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                <Check size={14} />
              </span>
            </div>
          )}

          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
          <p className="mt-2 text-sm text-gray-500">{product.description}</p>

          <button
            onClick={() => handleSelectPlan(id)}
            disabled={loading === id || currentPlan === product.priceId}
            className={`mt-4 w-full rounded-md px-4 py-2 text-sm font-medium ${
              currentPlan === product.priceId
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            {loading === id ? (
              <span className="flex items-center justify-center">
                <Loader2 size={16} className="mr-2 animate-spin" />
                Processing...
              </span>
            ) : currentPlan === product.priceId ? (
              'Current Plan'
            ) : (
              'Select Plan'
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PlanSelector;