# PhotoBooth Netlify Deployment Guide

## Prerequisites

- Clerk account with API keys
- GitHub repository connected to Netlify
- Node.js 18+ installed locally

## Step 1: Prepare Your Repository

1. Ensure your repository has all the latest changes committed:
   ```bash
   git add .
   git commit -m "Add Clerk authentication and mobile optimization"
   git push origin main
   ```

## Step 2: Configure Clerk Account

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Sign in or create an account
3. Create or select your application
4. Go to **API Keys** and copy:
   - **Publishable Key** (starts with `pk_test_` or `pk_live_`)
   - **Secret Key** (starts with `sk_test_` or `sk_live_`)
5. Save these keys - you'll need them for Netlify

## Step 3: Set Up Netlify

### Connect Repository
1. Go to [Netlify](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Select your Git provider and repository
4. Netlify will auto-detect the build settings

### Configure Build Settings

1. Under "Build settings":
   - **Build command**: `npm run build`
   - **Publish directory**: `dist/public`
   - **Functions directory**: `netlify/functions` (optional)

2. Click "Deploy site"

## Step 4: Add Environment Variables

### Via Netlify Dashboard

1. Go to your site's **Settings**
2. Navigate to **Build & Deploy** → **Environment**
3. Click **Edit variables**
4. Add the following variables:

   | Key | Value |
   |-----|-------|
   | `VITE_CLERK_PUBLISHABLE_KEY` | `pk_test_...` (your publishable key) |
   | `CLERK_SECRET_KEY` | `sk_test_...` (your secret key) |

5. Click **Save**

### Redeploy After Adding Variables

1. Go to **Deploys**
2. Click the three-dot menu on the latest deployment
3. Select **Retry deploy** or push a new commit to trigger a redeploy

## Step 5: Configure Clerk for Your Domain

1. Go back to Clerk Dashboard
2. Navigate to **Settings** → **Domains**
3. Add your Netlify domain (e.g., `your-site.netlify.app`)
4. Configure **Allowed Redirect URLs**:
   - `https://your-site.netlify.app/`
   - `https://your-site.netlify.app/home`
   - `https://your-site.netlify.app/gallery`

## Step 6: Test Your Deployment

1. Visit your deployed site: `https://your-site.netlify.app`
2. Try to access the Photo Booth (you should be redirected to sign in)
3. Sign up or sign in with Clerk
4. Verify you can:
   - Access the photo booth
   - Create photo strips
   - Save to gallery
   - Share photos

## Step 7: Custom Domain (Optional)

1. In Netlify, go to **Domain settings**
2. Click **Add custom domain**
3. Follow the instructions to configure DNS records
4. Update Clerk's **Allowed Domains** with your custom domain

## Troubleshooting

### Issue: "Missing Clerk Publishable Key" error
**Solution:**
1. Verify environment variables are set in Netlify
2. Redeploy the site after adding environment variables
3. Check variable names match exactly: `VITE_CLERK_PUBLISHABLE_KEY`

### Note: Friendly runtime guard in development
The app now displays a friendly, non-crashing notice in the browser when the
publishable key is missing instead of throwing an uncaught error. This helps
debug locally, but in production you must still set the environment variables
in Netlify. Ensure the following are set in your Netlify site settings before
you deploy:

- `VITE_CLERK_PUBLISHABLE_KEY` — the client-side publishable key (required for Clerk UI)
- `CLERK_SECRET_KEY` — the server-side secret key (required for token verification)

After adding those variables, trigger a redeploy so the variables are baked
into the build environment.

### Issue: Authentication doesn't work
**Solution:**
1. Verify your Netlify domain is added in Clerk settings
2. Check redirect URLs in Clerk match your domain
3. Ensure `CLERK_SECRET_KEY` is set in environment variables

### Issue: Mobile layout is broken
**Solution:**
1. Clear browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
2. Check viewport meta tag is present in HTML
3. Test in different browsers

### Issue: Photos won't upload/save
**Solution:**
1. Check browser console for errors (F12)
2. Verify authentication is working
3. Check local storage quota hasn't been exceeded
4. Try in a different browser

## Performance Optimization

### Enable Gzip Compression
Netlify automatically enables gzip compression for text files.

### Enable Caching
1. Go to **Settings** → **Build & Deploy** → **Cache**
2. Set cache expiration for static assets

### Optimize Images
Consider adding image optimization middleware:
1. Configure in `_redirects` or `netlify.toml`
2. Use Netlify Image CDN for automatic optimization

## Monitoring & Maintenance

### Check Deployment Status
1. Go to **Deploys** to see build history
2. Click on a deployment to see build logs
3. Check for any build warnings or errors

### Monitor Function Logs
1. Go to **Functions** (if using Netlify Functions)
2. View real-time function execution logs

### Analytics
1. Enable Netlify Analytics in **Settings**
2. View traffic patterns and performance metrics

## Version Control

### Keep Environment Variables Secure
1. **Never** commit `.env.local` to Git
2. Add `.env.local` to `.gitignore`
3. Always set environment variables via Netlify dashboard

### Deployment Previews
1. Create a branch for feature development
2. Open a pull request on GitHub
3. Netlify automatically creates a preview deployment
4. Share the preview URL for testing

## Advanced Configuration

### Custom Redirects
Edit `netlify.toml` to add custom redirect rules:
```toml
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200
  force = true

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Build Plugins
1. Go to **Integrations** in Netlify
2. Browse available build plugins
3. Add plugins to enhance your deployment

## Rollback to Previous Deployment

1. Go to **Deploys**
2. Find the deployment you want to restore
3. Click the three-dot menu
4. Select **Set as published** to rollback

## Support Resources

- [Netlify Documentation](https://docs.netlify.com)
- [Clerk Documentation](https://clerk.com/docs)
- [Netlify Support](https://support.netlify.com)
- [Clerk Support](https://clerk.com/support)

## Next Steps

1. ✅ Deploy to Netlify
2. ✅ Test authentication flow
3. ✅ Verify mobile responsiveness
4. ✅ Set up custom domain (optional)
5. 📊 Monitor analytics and performance
6. 🔄 Plan regular backups

## Quick Checklist

- [ ] Repository connected to Netlify
- [ ] Build settings configured
- [ ] Environment variables added (VITE_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY)
- [ ] Site successfully deployed
- [ ] Domain added to Clerk settings
- [ ] Authentication works on deployed site
- [ ] Mobile layout tested on various devices
- [ ] Photo booth functionality tested
- [ ] Gallery functionality tested
- [ ] Sharing feature tested

Once all items are checked, your PhotoBooth application is ready for production use!
