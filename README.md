# New Portfolio

This is a Next.js portfolio project with an admin panel that saves content to Supabase.

## What Is Included

- Cloud-backed portfolio content state via API routes
- Admin upload for project/certificate images and CV PDF
- Public site sections reading the saved cloud data

## Supabase Setup (Required)

1. Create a Supabase project.
2. Open SQL Editor and run the SQL from `supabase/schema.sql`.
3. In Storage, create a bucket named `portfolio-assets`.
4. Create local env file from template:
   - Copy `.env.example` to `.env.local`
   - Fill values with your Supabase credentials

Environment variables used by the app:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_STORAGE_BUCKET` (optional, defaults to `portfolio-assets`)

## Run Locally

Install dependencies:

```bash
pnpm install
```

Start development server:

```bash
pnpm run dev
```

If port 3000 is already in use, run on another port:

```bash
pnpm run dev -- --port 3001
```

Open:

- Main site: `http://localhost:3000` (or your custom port)
- Admin panel: `http://localhost:3000`

## Build

```bash
pnpm build
```

If build fails on Google Fonts fetch in restricted networks, allow internet access for build time or switch fonts to local/system fonts in `app/layout.tsx`.

## Validate Admin Upload Flows


1. Add/Edit a project and upload project image.
2. Add/Edit a certificate and upload certificate image.
3. Upload profile photo and CV PDF.

Uploads are handled by:

- `app/api/uploads/route.ts`

Portfolio state persistence is handled by:

- `app/api/portfolio-state/route.ts`

## Deployment Checklist

Set the same environment variables in your hosting provider:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_STORAGE_BUCKET` (if not default)

- here is my deployement  **[ bekamgenene.vercel.app](https://bekamgenene.vercel.app)**

