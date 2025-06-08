import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type EmailTemplate = "welcome" | "marketing" | "newsletter";

interface WelcomeEmailData {
  name?: string;
}

interface MarketingEmailData {
  products: Array<{
    title: string;
    price: number;
    link: string;
  }>;
}

interface NewsletterEmailData {
  content: string;
}

type EmailData = {
  welcome: WelcomeEmailData;
  marketing: MarketingEmailData;
  newsletter: NewsletterEmailData;
};

interface SendEmailParams<T extends EmailTemplate> {
  to: string;
  template: T;
  data: EmailData[T];
}

const templates = {
  welcome: {
    subject: "Welcome to Our Newsletter!",
    html: (data: WelcomeEmailData) => `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Welcome to Our Newsletter!</h1>
        <p>Hi ${data.name || "there"},</p>
        <p>Thank you for subscribing to our newsletter. We're excited to share the best deals and products with you!</p>
        <p>You'll receive updates about:</p>
        <ul>
          <li>Latest product deals</li>
          <li>Exclusive discounts</li>
          <li>Product recommendations</li>
          <li>Special offers</li>
        </ul>
        <p>Stay tuned for our next update!</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;" />
        <p style="color: #666; font-size: 12px;">
          You're receiving this email because you subscribed to our newsletter.
          <br />
          <a href="{{unsubscribeUrl}}" style="color: #666;">Unsubscribe</a>
        </p>
      </div>
    `,
  },
  marketing: {
    subject: "Special Deals Just for You!",
    html: (data: MarketingEmailData) => `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Special Deals Just for You!</h1>
        <p>Check out these amazing deals we've curated just for you:</p>
        <div style="margin: 20px 0;">
          ${data.products
            .map(
              (product) => `
            <div style="border: 1px solid #eee; padding: 15px; margin-bottom: 15px; border-radius: 5px;">
              <h3 style="margin: 0 0 10px 0;">${product.title}</h3>
              <p style="color: #e53e3e; font-weight: bold; margin: 0 0 10px 0;">
                $${product.price.toFixed(2)}
              </p>
              <a href="${product.link}" style="display: inline-block; background: #4a5568; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                View Deal
              </a>
            </div>
          `
            )
            .join("")}
        </div>
        <hr style="border: 1px solid #eee; margin: 20px 0;" />
        <p style="color: #666; font-size: 12px;">
          You're receiving this email because you subscribed to our newsletter.
          <br />
          <a href="{{unsubscribeUrl}}" style="color: #666;">Unsubscribe</a>
        </p>
      </div>
    `,
  },
  newsletter: {
    subject: "Your Weekly Deals Update",
    html: (data: NewsletterEmailData) => `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Your Weekly Deals Update</h1>
        <div style="margin: 20px 0;">
          ${data.content}
        </div>
        <hr style="border: 1px solid #eee; margin: 20px 0;" />
        <p style="color: #666; font-size: 12px;">
          You're receiving this email because you subscribed to our newsletter.
          <br />
          <a href="{{unsubscribeUrl}}" style="color: #666;">Unsubscribe</a>
        </p>
      </div>
    `,
  },
};

export async function sendEmail<T extends EmailTemplate>({
  to,
  template,
  data,
}: SendEmailParams<T>) {
  try {
    const { subject, html } = templates[template];
    const htmlContent = html(data as any).replace(
      "{{unsubscribeUrl}}",
      `${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe?email=${encodeURIComponent(
        to
      )}`
    );

    const { data: result, error } = await resend.emails.send({
      from: "Your Store <newsletter@yourdomain.com>",
      to,
      subject,
      html: htmlContent,
    });

    if (error) {
      console.error("Failed to send email:", error);
      throw error;
    }

    return result;
  } catch (error) {
    console.error("Email service error:", error);
    throw error;
  }
} 