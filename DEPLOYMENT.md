# Deployment Guide

## Backend Deployment (Render)

### 1. Configure Environment Variables on Render

In your Render dashboard, set these environment variables:

```
OPENAI_API_KEY=your-actual-openai-api-key
OPENAI_MODEL=gpt-4o-mini
FRONTEND_ORIGIN=https://your-vercel-app.vercel.app
```

**Important**: Never commit your actual API key to Git. It's already in `.gitignore`.

### 2. Build Command
```
pip install -r requirements.txt
```

### 3. Start Command
```
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

---

## Frontend Deployment (Vercel)

### 1. Configure Environment Variables on Vercel

In your Vercel project settings > Environment Variables, add:

```
NEXT_PUBLIC_API_URL=https://your-render-app.onrender.com
```

### 2. Build Settings
- **Framework Preset**: Next.js
- **Root Directory**: `frontend`
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)

---

## Deployment Workflow

1. **Push your code to GitHub** (with `.env` excluded via `.gitignore`)

2. **Deploy Backend to Render**:
   - Go to Render dashboard
   - Update environment variables (OPENAI_API_KEY, FRONTEND_ORIGIN)
   - Trigger manual deploy or it will auto-deploy from GitHub

3. **Deploy Frontend to Vercel**:
   - Go to Vercel dashboard
   - Update NEXT_PUBLIC_API_URL to your Render backend URL
   - Redeploy if needed

4. **Update CORS** (if your frontend URL changes):
   - Update `FRONTEND_ORIGIN` on Render
   - Redeploy backend

---

## Security Checklist

- [x] `.env` file is in `.gitignore`
- [ ] OPENAI_API_KEY is set as environment variable on Render (not in code)
- [ ] FRONTEND_ORIGIN is set on Render with your Vercel URL
- [ ] NEXT_PUBLIC_API_URL is set on Vercel with your Render URL
- [ ] Verify CORS allows your Vercel domain
- [ ] Never expose API keys in frontend code or commits
