# Vercel Blob Storage Setup

This project uses Vercel Blob for storing media files (images, documents, etc.).

## Local Development

For local development, you don't need to set up Vercel Blob. Files will be stored locally in the `media/` directory.

## Production Setup (Vercel)

### 1. Get Vercel Blob Token

1. Go to your Vercel project dashboard
2. Navigate to **Storage** tab
3. Click **Create Database** → **Blob**
4. Once created, click on your Blob store
5. Go to **.env.local** tab
6. Copy the `BLOB_READ_WRITE_TOKEN` value

### 2. Add Environment Variable to Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variable:
   ```
   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx
   ```
4. Select environments: **Production**, **Preview**, **Development**
5. Click **Save**

### 3. Redeploy

After adding the environment variable, redeploy your project for changes to take effect.

## How It Works

- **Local**: Files stored in `media/` directory
- **Vercel**: Files stored in Vercel Blob (serverless storage)
- **Database**: Neon Postgres stores file metadata (filename, size, URL)
- **CDN**: Vercel Blob automatically serves files via CDN

## Image URLs

Production image URLs will look like:
```
https://xxxxx.public.blob.vercel-storage.com/your-image-abc123.jpg
```

## Pricing

Vercel Blob pricing:
- **Hobby**: 1 GB storage included
- **Pro**: 100 GB storage included
- Additional: $0.15/GB/month

See: https://vercel.com/docs/storage/vercel-blob/usage-and-pricing
