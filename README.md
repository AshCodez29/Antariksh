# ✦ ANTARIKSH

Website for **Antariksh** Astronomy Club of Vishwakarma Institute of Technology (VIT), Pune.

---

## 🛠️ Architecture & Tech Stack

- **Client Runtime**: React.js with Vite
- **Routing Engine**: React Router v6
- **Styling**: Tailwind CSS
- **Data Layer & Storage**: PostgreSQL managed via Supabase (PostgREST, Row-Level Security, Object Storage)
- **ORM / Schema Management**: Prisma

---

## 📐 System Modules

- **Crew Registry**: Active team roster, role hierarchy, and alumni directories powered by relational constraints and manual display indexing.
- **Observatory Logs & Events**: Real-time event tracking, registration quotas, and session itineraries[cite: 1].
- **Archives & Research**: Digital publication registry for technical whitepapers, session minutes, and club project contributions[cite: 1].
- **Media Vault**: Cloudflare- and Supabase-backed asset storage for stargazing sessions, observation galleries, and astrophotography[cite: 1].

---

## ⚙️ Local Development Setup

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm / pnpm / yarn
- A configured Supabase project instance

### 1. Clone & Install
```bash
git clone [https://github.com/Antariksh-Club/Antariksh.git](https://github.com/Antariksh-Club/Antariksh.git)
cd Antariksh
npm install
