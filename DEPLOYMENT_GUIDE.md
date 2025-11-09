# UNED Group Links - Vercel Deployment Guide

## Overview

Your app now uses **Vercel Environment Variables** as a "database" for persistent storage. When you update cards through the admin panel, they are saved to Vercel env variables and trigger automatic redeployment.

---

## How It Works

```
Admin Panel → Serverless API → Vercel API → Update Env Var → Auto Deploy → Changes Live
```

1. Admin edits cards in dashboard
2. Dashboard calls `/api/update-cards` with new data
3. Serverless function updates `REACT_APP_CARDS_DATA` environment variable
4. Vercel automatically triggers a new deployment
5. After ~60-120 seconds, changes are live
6. HomePage reads from the updated environment variable

---

## Prerequisites

- GitHub account
- Vercel account (free tier is fine)
- Git repository with your code

---

## Step 1: Push Code to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Complete UNED green theme with Vercel env variable storage"

# Create GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/uned-group-links.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect React settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`
5. **DON'T DEPLOY YET** - Click "Environment Variables" first

---

## Step 3: Configure Environment Variables

Add these variables in Vercel **before** first deployment:

### Required for App Functionality

| Variable | Value | Description |
|----------|-------|-------------|
| `REACT_APP_ADMIN_EMAIL` | `your-email@example.com` | Admin login email |
| `REACT_APP_ADMIN_PASSWORD` | `YourSecurePassword123!` | Admin login password |
| `REACT_APP_ADMIN_SECRET` | `generate-random-string-here` | API authentication secret |
| `ADMIN_SECRET` | `same-as-above` | Server-side copy (must match!) |

### Required for Vercel API Integration

| Variable | Value | How to Get |
|----------|-------|------------|
| `VERCEL_TOKEN` | `vercel_token_...` | [Create Token](https://vercel.com/account/tokens) |
| `VERCEL_PROJECT_ID` | `prj_...` | Project Settings → General |
| `VERCEL_PROJECT_NAME` | `uned-group-links` | Your project name |
| `VERCEL_GIT_COMMIT_REF` | `main` | Your git branch |

### Optional (for team accounts)

| Variable | Value | How to Get |
|----------|-------|------------|
| `VERCEL_TEAM_ID` | `team_...` | Team Settings (if using team account) |

---

## Step 4: Get Your Vercel Token

1. Go to [https://vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Name: `UNED Admin API`
4. Scope: **Full Access** (required for env variable updates)
5. Expiration: Choose based on your security preference
6. Click "Create"
7. **Copy the token immediately** (you won't see it again!)
8. Paste into `VERCEL_TOKEN` environment variable in Vercel

---

## Step 5: Get Your Project ID

1. Go to your Vercel project
2. Click "Settings"
3. Go to "General" tab
4. Find "Project ID" (looks like `prj_xxxxxxxxxxxx`)
5. Copy and paste into `VERCEL_PROJECT_ID` environment variable

---

## Step 6: Generate Admin Secret

Generate a strong random string for `ADMIN_SECRET`:

**Option A - Using Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option B - Using OpenSSL:**
```bash
openssl rand -hex 32
```

**Option C - Using a Password Manager:**
- Use 1Password, Bitwarden, etc. to generate a strong password

⚠️ **Important**: Use the **SAME value** for both:
- `REACT_APP_ADMIN_SECRET`
- `ADMIN_SECRET`

---

## Step 7: Set Environment Variable Targets

For each environment variable, set the target environments:

- ✅ **Production**
- ✅ **Preview**
- ✅ **Development**

This ensures the variables work everywhere.

---

## Step 8: Deploy!

1. Click "Deploy" in Vercel
2. Wait ~2-3 minutes for build to complete
3. Your app will be live at `https://your-project.vercel.app`

---

## Step 9: Test the Admin Panel

1. Go to `https://your-project.vercel.app/super-admin`
2. Login with your `REACT_APP_ADMIN_EMAIL` and `REACT_APP_ADMIN_PASSWORD`
3. Try adding/editing/deleting a card
4. You should see:
   - "Deploying Changes..." message
   - Blue alert with spinner
   - After ~90 seconds, page auto-reloads
   - Your changes are visible!

---

## Troubleshooting

### Login doesn't work
- Check `REACT_APP_ADMIN_EMAIL` and `REACT_APP_ADMIN_PASSWORD` are set correctly
- Clear browser cache and try again
- Check browser console for errors

### "Deployment Started" but changes don't appear
- Wait at least 2 minutes before checking
- Do a hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
- Check Vercel dashboard → Deployments to see if deployment succeeded
- Verify `REACT_APP_CARDS_DATA` was updated in environment variables

### API returns "Unauthorized" error
- Verify `ADMIN_SECRET` and `REACT_APP_ADMIN_SECRET` match exactly
- No extra spaces or quotes in environment variable values
- Redeploy if you just changed these values

### API returns "Failed to update env variable"
- Check `VERCEL_TOKEN` is valid and not expired
- Verify token has "Full Access" permissions
- Check `VERCEL_PROJECT_ID` matches your project

### Deployment triggers but fails
- Check `VERCEL_GIT_COMMIT_REF` matches your branch name (`main` or `master`)
- Ensure your git repository is connected to Vercel
- Check Vercel deployment logs for build errors

---

## How to Update Cards

1. Login to admin panel: `https://your-project.vercel.app/super-admin`
2. Click "Add New Card" or edit existing ones
3. Fill in the form and click save
4. Wait for deployment message: **"Deployment started! Changes will be live in 1-2 minutes."**
5. Page will auto-reload after ~90 seconds
6. Your changes are now live!

---

## Security Notes

### ⚠️ Important Security Considerations

1. **Admin credentials are still visible in source code** (but now configurable via env vars)
   - Anyone with access to your git repo can see default values
   - Always set custom values in Vercel environment variables

2. **Client-side authentication is not truly secure**
   - Users with DevTools can bypass login
   - This is acceptable for low-risk internal tools
   - For production with sensitive data, consider adding proper backend auth

3. **Protect your Vercel token**
   - Never commit it to git
   - Rotate it periodically
   - If leaked, revoke and create a new one immediately

4. **Use strong passwords**
   - Make `REACT_APP_ADMIN_PASSWORD` complex
   - Make `ADMIN_SECRET` a long random string
   - Don't reuse passwords from other services

---

## Cost

### Vercel Free Tier Includes:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Serverless Functions

**This project should stay within free tier limits for typical usage.**

---

## Workflow Summary

### One-Time Setup (30 minutes)
1. Push code to GitHub
2. Connect to Vercel
3. Configure environment variables
4. Deploy

### Daily Usage (2 minutes per update)
1. Login to admin panel
2. Edit cards
3. Wait for auto-deployment
4. Changes are live!

---

## Alternative: Local .env File

For local development, create `.env.local`:

```bash
# Copy .env.example
cp .env.example .env.local

# Edit with your values
nano .env.local
```

Add:
```
REACT_APP_ADMIN_EMAIL=admin@example.com
REACT_APP_ADMIN_PASSWORD=test123
REACT_APP_ADMIN_SECRET=local-dev-secret

# Vercel variables not needed for local development
```

Then run locally:
```bash
npm start
```

⚠️ **Note**: Updating cards locally won't trigger Vercel deployments (you need the production API for that).

---

## Next Steps

After deployment, consider:

1. **Custom Domain**: Add your own domain in Vercel settings
2. **Analytics**: Enable Vercel Analytics to track usage
3. **Monitoring**: Set up Vercel monitoring for deployment notifications
4. **Backups**: Periodically export `REACT_APP_CARDS_DATA` from Vercel as backup

---

## Support

If you encounter issues:

1. Check the [Vercel documentation](https://vercel.com/docs)
2. Review environment variables in Vercel dashboard
3. Check deployment logs in Vercel
4. Verify all environment variables are set correctly
5. Try redeploying manually: Vercel Dashboard → Deployments → Redeploy

---

**You're all set! Your UNED Group Links app is now ready for deployment with persistent storage via Vercel environment variables.** 🎉
