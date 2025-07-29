# Wedding Website

This is a wedding website built with [Next.js](https://nextjs.org), TypeScript, Tailwind CSS, and [Supabase](https://supabase.com) for the backend.

## Tech Stack

- **Frontend**: Next.js 15.3.4 with App Router
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Development**: Turbopack

## Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Supabase account

## Environment Setup

1. Copy the environment file:

```bash
cp .env.local.example .env.local
```

2. Update the Supabase configuration in `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up Supabase locally (optional for development):

```bash
npm run supabase start
```

3. Run database migrations:

```bash
npm run supabase db reset
```

4. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Supabase Configuration

### Local Development

The project includes a complete Supabase configuration for local development:

- **API Server**: http://127.0.0.1:54321
- **Database**: PostgreSQL on port 54322
- **Studio**: http://127.0.0.1:54323
- **Inbucket (Email Testing)**: http://127.0.0.1:54324

### Database Schema

The wedding website uses the following database tables:

#### RSVPs Table

- `id` (UUID, Primary Key)
- `name` (TEXT) - Guest full name
- `furigana` (TEXT) - Japanese phonetic reading
- `allergies` (TEXT) - Food allergies/dietary restrictions
- `attendance` (TEXT) - Status: 参加/不参加/保留
- `message` (TEXT) - Congratulatory message
- `created_at`, `updated_at` (TIMESTAMP)

#### Companions Table

- `id` (UUID, Primary Key)
- `rsvp_id` (UUID, Foreign Key)
- `name` (TEXT) - Companion full name
- `furigana` (TEXT) - Japanese phonetic reading
- `allergies` (TEXT) - Food allergies/dietary restrictions
- `meal_option` (TEXT) - Meal preference options
- `created_at`, `updated_at` (TIMESTAMP)

### Supabase Commands

```bash
# Start local Supabase
npx supabase start

# Stop local Supabase
npx supabase stop

# Reset database with migrations
npx supabase db reset

# Generate TypeScript types
npx supabase gen types typescript --local > src/lib/database.types.ts

# Apply migrations to remote
npx supabase db push

# View logs
npx supabase logs
```

### Production Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from the dashboard
3. Update your production environment variables:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
4. Push your migrations:
   ```bash
   npx supabase link --project-ref your-project-ref
   npx supabase db push
   ```

## Project Structure

```
wedding-site/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── api/            # API routes for RSVP handling
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   └── lib/               # Utility functions and Supabase client
├── supabase/
│   ├── config.toml        # Supabase local configuration
│   ├── migrations/        # Database migration files
│   └── seed.sql          # Seed data for development
├── public/                # Static assets
└── .env.local            # Environment variables
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Learn More

**Next.js Resources:**

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial

**Supabase Resources:**

- [Supabase Documentation](https://supabase.com/docs) - learn about Supabase features
- [Supabase Local Development](https://supabase.com/docs/guides/local-development) - local setup guide

## Deployment

### Vercel + Supabase (Recommended)

1. Deploy to Vercel:

   - Connect your GitHub repository to [Vercel](https://vercel.com)
   - Set environment variables in Vercel dashboard
   - Deploy automatically on git push

2. Configure Supabase for production:
   - Create production project on [supabase.com](https://supabase.com)
   - Run migrations: `npx supabase db push`
   - Update environment variables with production URLs

### Environment Variables for Production

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
# Add all other NEXT_PUBLIC_ variables from .env.local
```

## GitHub Actions Migration Workflow

This project includes a GitHub Actions workflow for manually triggering Supabase migrations to staging or production environments.

### Setup GitHub Secrets

To use the migration workflow, add the following secrets to your GitHub repository:

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add the following repository secrets:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `SUPABASE_ACCESS_TOKEN` | Your Supabase access token | `sbp_xxxxxxxxxxxxx` |
| `SUPABASE_PROJECT_REF_STAGING` | Staging project reference | `your-staging-project-ref` |
| `SUPABASE_PROJECT_REF_PRODUCTION` | Production project reference | `your-production-project-ref` |

#### Getting Supabase Access Token

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to **Account** → **Access Tokens**
3. Create a new token with the necessary permissions
4. Copy the token and add it as `SUPABASE_ACCESS_TOKEN` secret

#### Getting Project References

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **General**
3. Copy the **Reference ID** from the project settings
4. Add as `SUPABASE_PROJECT_REF_STAGING` or `SUPABASE_PROJECT_REF_PRODUCTION`

### Running Migrations

1. Go to your GitHub repository
2. Navigate to **Actions** tab
3. Select **Supabase Migration** workflow
4. Click **Run workflow**
5. Choose your options:
   - **Environment**: staging or production
   - **Migration type**: all, schema-only, or data-only
   - **Dry run**: Check only without executing
   - **Confirm production**: Required checkbox for production deployments

### Workflow Features

- **Manual trigger**: Run migrations only when needed
- **Environment selection**: Deploy to staging or production
- **Safety checks**: Production deployments require explicit confirmation
- **Dry run mode**: Preview changes without applying them
- **Detailed logging**: View migration progress and results
