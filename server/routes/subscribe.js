import brevo from '@getbrevo/brevo';

/**
 * POST /api/subscribe
 * Handles email subscription and sends email via Brevo
 */
export async function subscribeHandler(req, res) {
  try {
    const { email, freebieId, freebieTitle } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      });
    }

    if (!freebieId) {
      return res.status(400).json({
        success: false,
        error: 'Freebie ID is required'
      });
    }

    if (!freebieTitle) {
      return res.status(400).json({
        success: false,
        error: 'Freebie title is required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Check for required environment variables
    const apiKey = process.env.BREVO_API_KEY?.trim();
    
    if (!apiKey || apiKey === 'your_brevo_api_key_here') {
      console.error('BREVO_API_KEY is not set or is a placeholder');
      return res.status(500).json({
        success: false,
        error: 'Email service configuration error: Please set a valid BREVO_API_KEY in your .env file'
      });
    }
    
    // Validate API key format (Brevo API keys typically start with 'xkeysib-' and are 70-80 chars)
    // SMTP keys are longer (around 90+ chars) and won't work with the REST API
    if (apiKey.length > 85) {
      console.warn(`API key length is ${apiKey.length} characters. This might be an SMTP key instead of an API key.`);
      console.warn('Brevo API keys are typically 70-80 characters and start with "xkeysib-".');
      console.warn('SMTP keys are longer and won\'t work with the REST API. Please use an API key from the "API keys & MCP" tab.');
    }

    if (!process.env.BREVO_SENDER_EMAIL) {
      console.error('BREVO_SENDER_EMAIL is not set');
      return res.status(500).json({
        success: false,
        error: 'Email service configuration error'
      });
    }

    if (!process.env.BREVO_TEMPLATE_ID) {
      console.error('BREVO_TEMPLATE_ID is not set');
      return res.status(500).json({
        success: false,
        error: 'Email service configuration error'
      });
    }

    // Initialize Brevo API
    // Set API key using ApiClient instance
    const defaultClient = brevo.ApiClient.instance;
    defaultClient.authentications['api-key'].apiKey = apiKey;
    
    const apiInstance = new brevo.TransactionalEmailsApi();

    // Construct download link
    const baseUrl = process.env.BASE_URL || 'https://epoch-tools.com';
    const downloadLink = `${baseUrl}/download/${freebieId}`;

    // Prepare email
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.sender = {
      name: process.env.BREVO_SENDER_NAME || 'Epoch Converter',
      email: process.env.BREVO_SENDER_EMAIL
    };
    sendSmtpEmail.to = [{ email }];
    sendSmtpEmail.templateId = parseInt(process.env.BREVO_TEMPLATE_ID, 10);
    
    // Set subject line (can be overridden by template, but this ensures it's set)
    sendSmtpEmail.subject = `Your Freebie Download: ${freebieTitle}`;
    
    sendSmtpEmail.params = {
      freebieTitle,
      downloadLink,
      userEmail: email,
      currentYear: new Date().getFullYear().toString(),
      unsubscribeLink: `${baseUrl}/unsubscribe?email=${encodeURIComponent(email)}`
    };

    // Send email via Brevo
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log('Email sent successfully:', {
      messageId: response.messageId,
      email,
      freebieId,
      freebieTitle
    });

    // Return success response
    res.json({
      success: true,
      message: 'Email sent successfully'
    });
  } catch (error) {
    console.error('Error sending email:', error);

    // Handle Brevo API errors
    if (error.response) {
      const statusCode = error.response.statusCode || error.response.status || 500;
      const errorBody = error.response.body || {};
      const errorMessage = errorBody.message || error.response.text || 'Failed to send email';
      
      // Provide helpful error messages
      if (statusCode === 401) {
        // Check if API key is set (but don't log the actual key for security)
        const hasApiKey = !!process.env.BREVO_API_KEY;
        const apiKeyLength = process.env.BREVO_API_KEY?.length || 0;
        console.error(`API Key validation failed. Key present: ${hasApiKey}, Length: ${apiKeyLength}`);
        return res.status(401).json({
          success: false,
          error: 'Invalid API key. Please check your BREVO_API_KEY in the .env file. Make sure you are using an API key (not SMTP key) from: https://app.brevo.com/settings/keys/api'
        });
      }
      
      return res.status(statusCode < 500 ? statusCode : 400).json({
        success: false,
        error: errorMessage
      });
    }

    // Handle other errors
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to send email'
    });
  }
}

