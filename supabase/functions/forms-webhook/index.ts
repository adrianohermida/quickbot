import { createClient } from 'npm:@supabase/supabase-js@2.39.3';
import { google } from 'npm:googleapis@131.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Max-Age': '86400',
};

Deno.serve(async (req) => {
  try {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }

    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }

    const { formId, responseId } = await req.json();

    if (!formId || !responseId) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Initialize Forms API
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(Deno.env.get('GOOGLE_SERVICE_ACCOUNT') ?? '{}'),
      scopes: ['https://www.googleapis.com/auth/forms.responses.readonly'],
    });

    const forms = google.forms({
      version: 'v1',
      auth: await auth.getClient(),
    });

    // Get form response
    const response = await forms.forms.responses.get({
      formId,
      responseId,
    });

    // Process and store the response
    if (response.data) {
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      );

      const { error } = await supabase.from('form_responses').insert({
        form_id: formId,
        response_id: responseId,
        data: response.data,
        created_at: new Date().toISOString()
      });

      if (error) {
        console.error('Database error:', error);
        throw error;
      }
    }

    return new Response(
      JSON.stringify({ success: true }), 
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    );
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    );
  }
});