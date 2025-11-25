# PhotoBooth Clerk Authentication Integration

## Overview
This PhotoBooth application has been fully integrated with Clerk for user authentication. All photo strips and shared links are now associated with authenticated users, and the application is fully mobile-friendly.

## Features Implemented

### 1. User Authentication
- **Clerk Integration**: Uses Clerk for secure user authentication
- **Protected Routes**: Home page and Gallery are protected routes requiring authentication
- **Landing Page**: Public page accessible to all users
- **User Profile**: UserButton component in header for user profile management

### 2. User-Based Data Association
- All photo strips are associated with the authenticated user's ID (`userId`)
- All shared links are created by authenticated users
- Users can only see their own gallery
- API routes require authentication tokens

### 3. Mobile-Friendly Design
- Fully responsive design across all pages:
  - **Landing Page**: Mobile-optimized hero section and buttons
  - **Photo Booth**: Camera interface scales for mobile devices
  - **Customization Panel**: Compact layout on mobile
  - **Gallery**: Responsive grid layout
  - **Header**: Mobile navigation with burger menu support
- Touch-friendly buttons and controls
- Optimized font sizes and spacing for mobile

### 4. Server-Side Integration
- Added Clerk middleware in Express server
- API endpoints protected with authentication checks
- User ID extracted from Clerk tokens
- Database schema updated with userId field

## Environment Setup

### 1. Environment Variables

Create a `.env.local` file in the project root with:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_Z3VpZGVkLWxhbXByZXktODAuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_IcsPBeO4bAQnKgLguGL3hD1CyLlvJsTfyICBjLup0h
```

### 2. Netlify Environment Variables

For Netlify deployment, add these environment variables in your Netlify dashboard:

1. Go to **Site Settings** → **Build & Deploy** → **Environment**
2. Add the following environment variables:
   - `VITE_CLERK_PUBLISHABLE_KEY` - Your Clerk publishable key
   - `CLERK_SECRET_KEY` - Your Clerk secret key

## Installation & Setup

### Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables (see Environment Setup above)

3. Run development server:
   ```bash
   npm run dev
   ```

4. Application will be available at `http://localhost:5000`

### Build

```bash
npm run build
```

### Production

```bash
npm run start
```

## API Routes

All API routes now require authentication:

### Photo Strips
- **POST** `/api/photo-strips` - Create a new photo strip (requires auth)
- **GET** `/api/photo-strips` - Get user's photo strips (requires auth)

### Shared Links
- **POST** `/api/shared-links` - Create a shareable link (requires auth)
- **GET** `/api/shared-links/:id` - View shared photo strip (public, no auth required)

## Clerk Configuration

### Sign-In/Sign-Up
The application uses Clerk's modal for authentication:
- Users are redirected to sign in when accessing protected pages
- After sign-in, users can create photo strips and manage their gallery

### User Profile
Click on the user avatar in the top-right corner to:
- View profile
- Sign out
- Manage account settings

## Database Schema Updates

The following fields were added to track user ownership:

### photoStrips table
- `userId` (text, NOT NULL) - Clerk user ID

### sharedLinks table
- `userId` (text, NOT NULL) - Clerk user ID who created the link

## Mobile Optimization

### Responsive Breakpoints
- **Mobile** (< 640px): Single column layouts, compact spacing
- **Tablet** (640px - 1024px): 2-column layouts where applicable
- **Desktop** (> 1024px): Full multi-column layouts

### Mobile Features
- Touch-friendly button sizes (min 44x44px)
- Optimized font sizes for readability
- Vertical navigation on mobile, horizontal on desktop
- Responsive image handling
- Optimized form inputs for mobile keyboards

## Deployment to Netlify

1. Push code to your Git repository
2. Connect repository to Netlify
3. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist/public`
   - **Functions directory**: `netlify/functions`
4. Add environment variables in Netlify dashboard
5. Deploy

## Testing

### Test Scenarios

1. **Sign-Up / Sign-In**
   - Create new account
   - Sign in with existing account
   - Sign out

2. **Photo Booth**
   - Capture photos
   - Customize photo strip
   - Save to gallery
   - Share photo strip

3. **Gallery**
   - View saved photo strips
   - Delete photo strips
   - Verify only user's photos are visible

4. **Mobile Testing**
   - Test on various screen sizes
   - Test touch interactions
   - Verify responsive layouts

## Troubleshooting

### Issue: "Missing Clerk Publishable Key"
- Ensure `VITE_CLERK_PUBLISHABLE_KEY` is set in `.env.local`
- Restart dev server after adding environment variable

### Issue: Unauthorized on API routes
- Verify user is signed in
- Check Clerk middleware is enabled in server/index.ts
- Verify token is being sent in request headers

### Issue: Mobile layout looks broken
- Clear browser cache
- Ensure Tailwind CSS is properly compiled
- Check responsive classes are applied

## Security Considerations

- All API routes require Clerk authentication tokens
- User can only access their own data
- Shared links have expiration times
- Clerk handles secure token management

## Support

For issues related to:
- **Clerk**: Visit https://clerk.com/docs
- **PhotoBooth**: Check the GitHub repository
- **Netlify**: Visit https://docs.netlify.com
