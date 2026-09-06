# Glam Aura

A **Next.js** web app that analyzes facial features and provides personalized recommendations for makeup, outfits, and skincare.

---

##  Features
- Real‑time face detection and landmark extraction using **face‑api.js**
- AI‑generated insights powered by **Google Generative AI**
- User authentication with **Better Auth**
- Lemon Squeezy integration for paid plans
- 3D visualisation with **react‑three‑fiber**
- Component library built on **Radix UI** and **Tailwind CSS**

---

## Tech Stack
| Layer | Technology |
|-------|------------|
| Framework | **Next.js 16** |
| Language | **TypeScript 5** |
| UI | **React 19**, **Tailwind CSS**, **Radix UI**, **Framer Motion** |
| Face detection | **face‑api.js** |
| AI generation | **@google/generative‑ai** |
| Auth | **better-auth** |
| Payments | **Lemon Squeezy** |
| Database | **Prisma** (PostgreSQL) |
| 3D | **@react‑three/fiber**, **@react‑three/drei** |
| Misc | **AOS**, **lucide‑react**, **clsx**, **class‑variance‑authority**, **tailwind‑merge**, **tailwindcss‑animate** |

---

## Installation
1. **Clone the repo**
   ```bash
   git clone https://github.com/your‑org/facial‑analyst.git
   cd facial‑analyst
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Create a `.env.local` file**
   ```dotenv
   BETTER_AUTH_SECRET=<your-random-secret>
   BETTER_AUTH_URL=http://localhost:3000

   GEMINI_API_KEY_1=<google‑gemini‑key‑1>
   GEMINI_API_KEY_2=<google‑gemini‑key‑2>
   GEMINI_API_KEY_3=<google‑gemini‑key‑3>
   GEMINI_API_KEY_4=<google‑gemini‑key‑4>

   NEXT_PUBLIC_BASE_URL=http://localhost:3000

   DATABASE_URL=postgres://<user>:<pass>@<host>:<port>/<db>?sslmode=require

   LEMONSQUEEZY_API_KEY=<lemonsqueezy‑api‑key>
   LEMONSQUEEZY_STORE_ID=<store‑id>
   LEMONSQUEEZY_PRO_VARIANT_ID=<variant‑id>
   LEMONSQUEEZY_WEBHOOK_SECRET=<webhook‑secret>
   ```
4. **Set up the database**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

---

## 🚀 Running the app
- **Development**
  ```bash
  npm run dev   # http://localhost:3000
  ```
- **Production build**
  ```bash
  npm run build
  npm start
  ```
- **Linting**
  ```bash
  npm run lint
  ```

---

## 📦 Packages
- `better-auth` – auth & session management
- `@google/generative-ai` – Gemini AI integration
- `@prisma/client` – Prisma ORM client
- `@radix-ui/*` – UI primitives (slider, slot, tabs, toast)
- `@react-three/*` – 3D rendering
- `@lemonsqueezy/lemonsqueezy.js` – Lemon Squeezy client SDK
- `aos` – scroll animations
- `face-api.js` – face detection & landmarks
- `framer-motion` – animation library
- `lucide-react` – icon set
- `next` – React framework
- `react`, `react-dom` – UI library
- `react-icons` – additional icons
- `tailwind-merge`, `tailwindcss-animate` – Tailwind utilities

---

##  Deploying
The app is ready to be deployed on **Vercel**, **Netlify**, or any platform that supports Next.js.
```bash
vercel
```
Make sure the required environment variables are set in the hosting dashboard.

---

## 📖 Additional Resources
- Next.js documentation – https://nextjs.org/docs
- Better Auth docs – https://www.better-auth.com
- Prisma docs – https://www.prisma.io/docs
- Lemon Squeezy docs – https://docs.lemonsqueezy.com
- Gemini AI docs – https://ai.google.dev/gemini-api
