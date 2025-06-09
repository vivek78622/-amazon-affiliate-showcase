const { Resend } = require('resend');

// Use the provided API key
const resend = new Resend('re_BHGv2oAH_HVX2qg2rPR38jyWTJg7gKD7y');

async function sendTestEmail() {
  try {
    console.log('🚀 Sending test email...');
    
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'gawalivivek216@gmail.com',
      subject: 'Hello World - SameWeb Test',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; text-align: center;">🎉 Welcome to SameWeb!</h1>
          <p>Hi there,</p>
          <p>Congrats on sending your <strong>first email</strong> from your SameWeb affiliate marketing platform!</p>
          <p>This email confirms that your email integration is working perfectly. You can now:</p>
          <ul>
            <li>Send welcome emails to new subscribers</li>
            <li>Send marketing emails with product deals</li>
            <li>Send newsletter updates</li>
            <li>Track email performance</li>
          </ul>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your SameWeb Platform Features:</h3>
            <ul style="margin-bottom: 0;">
              <li>✅ Amazon affiliate product catalog</li>
              <li>✅ Click tracking and analytics</li>
              <li>✅ Admin dashboard</li>
              <li>✅ Email marketing system</li>
              <li>✅ Newsletter signup</li>
            </ul>
          </div>
          <p>Best regards,<br>The SameWeb Team</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #666; font-size: 12px; text-align: center;">
            This is a test email from your SameWeb platform
          </p>
        </div>
      `
    });

    if (error) {
      console.error('❌ Error sending email:', error);
      return;
    }

    console.log('✅ Email sent successfully!');
    console.log('📧 Email ID:', data.id);
    console.log('📬 Sent to: gawalivivek216@gmail.com');
    
  } catch (error) {
    console.error('❌ Failed to send email:', error);
  }
}

// Run the test
sendTestEmail(); 