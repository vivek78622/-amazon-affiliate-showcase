# Amazon Affiliate Product Showcase

A modern web application built with Next.js for showcasing and managing Amazon affiliate products. This platform allows administrators to curate and display products while tracking affiliate performance.

## Features

- 🛍️ Product catalog with Amazon affiliate integration
- 📊 Analytics dashboard for tracking performance
- 👤 Admin authentication and management
- 📱 Responsive design with modern UI
- 🔍 SEO optimized product pages
- 📧 Newsletter subscription system
- 📈 Click tracking and revenue analytics

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js
- **State Management:** Zustand
- **Form Validation:** Zod
- **Email:** Resend
- **File Upload:** UploadThing
- **Charts:** Recharts

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"

# Amazon Associates
AMAZON_AFFILIATE_ID=""

# Email (Resend)
RESEND_API_KEY=""

# UploadThing
UPLOADTHING_SECRET=""
UPLOADTHING_APP_ID=""
```

## License

MIT

## Author

Vivek Gawali
