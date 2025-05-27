import { createClient } from 'npm:@supabase/supabase-js@2.39.3';
import { google } from 'npm:googleapis@131.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    // Parse and validate request body
    let body;
    try {
      body = await req.json();
    } catch (e) {
      console.error('Failed to parse request body:', e);
      return new Response(
        JSON.stringify({ error: 'Invalid request body' }),
        { 
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }

    const { formId, responseId } = body;

    if (!formId || !responseId) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: formId and responseId are required' }),
        { 
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Validate environment variables
    const googleServiceAccount = Deno.env.get('GOOGLE_SERVICE_ACCOUNT');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!googleServiceAccount) {
      console.error('Missing GOOGLE_SERVICE_ACCOUNT environment variable');
      throw new Error('Google service account credentials not configured');
    }

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error('Missing Supabase configuration');
      throw new Error('Supabase configuration not found');
    }

    // Parse Google service account credentials
    let credentials;
    try {
      credentials = JSON.parse(googleServiceAccount);
    } catch (e) {
      console.error('Failed to parse Google service account credentials:', e);
      throw new Error('Invalid Google service account credentials');
    }

    // Initialize Forms API
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/forms.responses.readonly'],
    });

    const forms = google.forms({
      version: 'v1',
      auth: await auth.getClient(),
    });

    // Get form response
    let formResponse;
    try {
      formResponse = await forms.forms.responses.get({
        formId,
        responseId,
      });
    } catch (e) {
      console.error('Failed to fetch form response:', e);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch form response' }),
        { 
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Process and store the response
    if (formResponse.data) {
      const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

      try {
        const { error: dbError } = await supabase.from('form_responses').insert({
          form_id: formId,
          response_id: responseId,
          data: formResponse.data,
          created_at: new Date().toISOString()
        });

        if (dbError) {
          console.error('Database error:', dbError);
          throw dbError;
        }
      } catch (e) {
        console.error('Failed to store form response:', e);
        return new Response(
          JSON.stringify({ error: 'Failed to store form response' }),
          { 
            status: 500,
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json'
            }
          }
        );
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
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
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