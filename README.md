# Renewed Minds International — Website

**Build. Inspire. Influence.**

Full-stack Next.js landing page and admin platform for Renewed Minds International (A.K.A Impact Team), a youth-focused Christian organization based at Federal University Wukari.

## 🚀 Tech Stack
- **Frontend:** Next.js 14 (App Router) + Tailwind CSS
- **Backend:** Next.js API Routes + JWT Auth (jose)
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage (PDFs + photos)
- **Deploy:** Render

## ⚡ Local Setup

```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

## 🗄️ Supabase Setup (One-Time)

1. Go to your Supabase project → **SQL Editor** → **New Query**
2. Paste the entire contents of `supabase-schema.sql` and click **Run**
3. Go to **Storage** and confirm two buckets exist: `rmi-resources` and `rmi-logos`
4. Go to **Project Settings → API** and copy the **service_role** key
5. Add it to `.env.local`:
   ```
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

## 🔐 Admin Access

Navigate to `/admin` and log in with the password from `.env.local`.

Default: `RMI@2025secure` (**change before deploying!**)

## 🌐 Deploy to Render

1. Push to GitHub (`git add . && git commit -m "initial" && git push`)
2. Go to [render.com](https://render.com) → **New Web Service** → connect GitHub repo
3. Settings:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Node Version:** 18+
4. Add Environment Variables in Render dashboard:

| Key | Value |
|-----|-------|
| `ADMIN_PASSWORD` | your secure password |
| `JWT_SECRET` | a long random string |
| `NEXT_PUBLIC_SUPABASE_URL` | your Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | your service role key |
| `NEXT_PUBLIC_APP_URL` | your Render URL |

## 📁 Structure
```
├── app/                   # Next.js App Router
│   ├── page.tsx           # Landing page
│   ├── admin/             # Admin login + dashboard
│   └── api/               # API routes
├── components/landing/    # Landing page sections
├── lib/
│   ├── auth.ts            # JWT auth
│   └── supabase.ts        # Supabase client
├── supabase-schema.sql    # DB + storage setup
└── public/logo/           # Brand images
```

## 📧 Contact
- **Email:** feedbackrmi39@gmail.com
- **Phone:** +234-810-267-2966
- **Location:** Federal University Wukari, Taraba State, Nigeria
