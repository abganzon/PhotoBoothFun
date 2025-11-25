# 🚀 Quick Start Guide - PhotoBooth with Clerk Authentication

## Getting Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create `.env.local` in the project root:
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_Z3VpZGVkLWxhbXByZXktODAuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_IcsPBeO4bAQnKgLguGL3hD1CyLlvJsTfyICBjLup0h
```

### 3. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5000` in your browser

## What's New? 🎉

### ✅ Clerk Authentication
- User sign-up and sign-in
- Secure token management
- User profile management
- Protected routes

### ✅ Mobile-Friendly Design
- Responsive layouts
- Touch-friendly controls
- Optimized for all screen sizes
- Works perfectly on phones, tablets, and desktops

### ✅ User-Based Data
- Each user has their own photo gallery
- Photos are private to the user
- Sharing creates temporary public links
- All events are tracked by user ID

## Quick Commands

```bash
# Development
npm run dev              # Start dev server on :5000

# Build & Run
npm run build           # Build for production
npm run start           # Run production build

# Validation
npm run check           # TypeScript type checking

# Database
npm run db:push         # Sync database schema
```

## Testing the App

1. **Sign Up**
   - Click "Sign In" button
   - Create new account with email
   - Verify email (if required)

2. **Create Photo Strip**
   - Click "Photo Booth" after signing in
   - Capture 4 photos
   - Customize colors and layout
   - Share or save to gallery

3. **Share Photos**
   - Click "Share" button
   - Copy generated link or scan QR code
   - Others can view without signing in

4. **Mobile Test**
   - Open on phone at `localhost:5000`
   - Test touch interactions
   - Verify responsive layout

## 📱 Mobile-Friendly Features

- **Responsive Design** - Works on all screen sizes
- **Touch Optimized** - Large buttons for easy tapping
- **Fast Loading** - Optimized for mobile networks
- **Offline Ready** - Most features work offline (photos stored locally)

## File Structure Overview

```
PhotoBoothFun/
├── client/src/
│   ├── App.tsx                 # Main app with ClerkProvider
│   ├── components/
│   │   ├── Header.tsx          # Auth header with UserButton
│   │   ├── ProtectedRoute.tsx  # Protected route wrapper
│   │   └── photo-booth/        # Photo booth components
│   └── pages/
│       ├── landing.tsx         # Public landing page
│       ├── home.tsx            # Photo booth (protected)
│       └── gallery.tsx         # User's gallery (protected)
├── server/
│   ├── index.ts                # Express server with Clerk middleware
│   ├── routes.ts               # API routes with auth
│   └── storage.ts              # Data storage layer
├── shared/
│   └── schema.ts               # Database schema with userId
├── .env.local                  # Environment variables (not in git)
├── vite.config.ts              # Vite config with env variables
└── netlify.toml                # Netlify deployment config
```

## Environment Variables Explained

| Variable | Purpose | Where to Use |
|----------|---------|--------------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Frontend authentication | Browser (safe to expose) |
| `CLERK_SECRET_KEY` | Backend authentication | Server only (kept secret) |

**Important:** Never commit `.env.local` to Git. It's already in `.gitignore`.

## Deployment Quick Links

- **Netlify**: Follow [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md)
- **Environment Setup**: See [CLERK_INTEGRATION.md](./CLERK_INTEGRATION.md)

## Common Issues & Solutions

### "Missing Clerk Publishable Key"
- Restart dev server after adding `.env.local`
- Ensure file name is exactly `.env.local` (not `.env`)
- Check variable name: `VITE_CLERK_PUBLISHABLE_KEY`

### "Cannot access Photo Booth"
- Sign in first (click Sign In button)
- Check if user is authenticated
- Try signing out and back in

### Mobile layout looks broken
- Clear browser cache (Ctrl+Shift+Delete)
- Refresh page completely (Ctrl+F5)
- Try a different browser

## API Endpoints (For Developers)

```
Protected (Requires Authentication):
POST   /api/photo-strips          Create new photo strip
GET    /api/photo-strips          Get user's photo strips
POST   /api/shared-links          Create shareable link

Public (No Authentication Needed):
GET    /api/shared-links/:id      View shared photo strip
```

## Performance Tips

- Photos are stored locally in browser
- No cloud upload required (privacy-focused)
- Sharing creates temporary links (10-minute expiry)
- Use browser DevTools to monitor performance

## Need Help?

1. **Clerk Issues**: Visit https://clerk.com/docs
2. **Netlify Issues**: Visit https://docs.netlify.com
3. **Code Issues**: Check comments in source files
4. **TypeScript Issues**: Run `npm run check`

## Next Steps

- [ ] Read CLERK_INTEGRATION.md for detailed auth docs
- [ ] Read NETLIFY_DEPLOYMENT.md for deployment instructions
- [ ] Test on mobile devices
- [ ] Deploy to production
- [ ] Share with users! 🎉

---

**Happy coding!** 🚀

Built with ❤️ using React, Express, Clerk, and Tailwind CSS
