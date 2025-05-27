/*
  # Add subscription indexes and views

  1. New Indexes
    - Add index on subscription status for better query performance
    - Add index on customer_id for faster joins

  2. Changes
    - Add indexes to improve query performance
    - Update views with better security
*/

-- Add index for subscription status
CREATE INDEX IF NOT EXISTS idx_subscription_status 
ON stripe_subscriptions(status);

-- Add index for customer lookups
CREATE INDEX IF NOT EXISTS idx_subscription_customer 
ON stripe_subscriptions(customer_id);

-- Add index for order customer lookups
CREATE INDEX IF NOT EXISTS idx_order_customer 
ON stripe_orders(customer_id);

-- Update views with better security
DROP VIEW IF EXISTS stripe_user_subscriptions;
CREATE VIEW stripe_user_subscriptions WITH (security_invoker = true) AS
SELECT
    c.customer_id,
    s.subscription_id,
    s.status as subscription_status,
    s.price_id,
    s.current_period_start,
    s.current_period_end,
    s.cancel_at_period_end,
    s.payment_method_brand,
    s.payment_method_last4
FROM stripe_customers c
LEFT JOIN stripe_subscriptions s ON c.customer_id = s.customer_id
WHERE c.user_id = auth.uid()
AND c.deleted_at IS NULL
AND s.deleted_at IS NULL;

DROP VIEW IF EXISTS stripe_user_orders;
CREATE VIEW stripe_user_orders WITH (security_invoker = true) AS
SELECT
    c.customer_id,
    o.id as order_id,
    o.checkout_session_id,
    o.payment_intent_id,
    o.amount_subtotal,
    o.amount_total,
    o.currency,
    o.payment_status,
    o.status as order_status,
    o.created_at as order_date
FROM stripe_customers c
LEFT JOIN stripe_orders o ON c.customer_id = o.customer_id
WHERE c.user_id = auth.uid()
AND c.deleted_at IS NULL
AND o.deleted_at IS NULL
ORDER BY o.created_at DESC;

-- Re-grant permissions
GRANT SELECT ON stripe_user_subscriptions TO authenticated;
GRANT SELECT ON stripe_user_orders TO authenticated;