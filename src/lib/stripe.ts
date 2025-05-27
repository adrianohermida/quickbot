import { createClient } from '@supabase/supabase-js';
import { products } from '../stripe-config';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function createCheckoutSession(
  priceId: string,
  mode: 'payment' | 'subscription',
  successUrl: string,
  cancelUrl: string,
) {
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      price_id: priceId,
      mode,
      success_url: successUrl,
      cancel_url: cancelUrl,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const { url } = await response.json();
  return url;
}

export function getProductByPriceId(priceId: string) {
  return Object.values(products).find((product) => product.priceId === priceId);
}

export async function getUserSubscription() {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    throw new Error('No active session');
  }

  const { data: subscription, error } = await supabase
    .from('stripe_user_subscriptions')
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return subscription;
}

export async function getSubscriptionHistory() {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    throw new Error('No active session');
  }

  const { data: orders, error } = await supabase
    .from('stripe_user_orders')
    .select('*')
    .order('order_date', { ascending: false });

  if (error) {
    throw error;
  }

  return orders;
}