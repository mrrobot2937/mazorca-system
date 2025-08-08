# 🚀 Vercel Deployment Guide for Mazorca

## Environment Variables Required in Vercel

Set these environment variables in your Vercel project settings:

### Required Variables

1. **NEXT_PUBLIC_GRAPHQL_URL**
   - Value: `https://choripam-backend-real.vercel.app/graphql`
   - Description: GraphQL backend endpoint

2. **NEXT_PUBLIC_RESTAURANT_ID** (optional)
   - Value: `mazorca`
   - Description: Default restaurant ID

3. **NODE_ENV** (usually auto-set)
   - Value: `production`

## How to Set Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Click on "Settings" tab
3. Click on "Environment Variables" in the left sidebar
4. Add each variable with:
   - Name: `NEXT_PUBLIC_GRAPHQL_URL`
   - Value: `https://choripam-backend-real.vercel.app/graphql`
   - Environments: Production, Preview, Development (check all)

## Troubleshooting 404 Errors

If you get a 404 error after deployment:

1. **Check Environment Variables**: Ensure `NEXT_PUBLIC_GRAPHQL_URL` is set
2. **Check Build Logs**: Look for any build errors in Vercel dashboard
3. **Test GraphQL Endpoint**: Verify the GraphQL endpoint is accessible
4. **Clear Build Cache**: Redeploy with fresh build cache

## Local Development

For local development, create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_GRAPHQL_URL=https://choripam-backend-real.vercel.app/graphql
NEXT_PUBLIC_RESTAURANT_ID=mazorca
NODE_ENV=development
NEXT_PUBLIC_DEBUG=true
```

## Verification

After deployment, the app should:
- Show "Mazorca" as the restaurant name
- Load products from the 'mazorca' restaurant
- Connect to the GraphQL backend successfully 