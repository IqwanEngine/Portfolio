# IqwanEngine: Global AI-Integrated Trading System

IqwanEngine adalah sistem automasi dan analisis global yang direka khusus untuk pasangan XAUUSD (Gold). Dibina dengan seni bina moden menggunakan Python dan React, sistem ini menggabungkan integrasi AI, pengurusan automasi aliran kerja, dan terminal pintar untuk maklumat pasaran secara *real-time*.

## 🚀 Ciri-Ciri Utama
- **Stateless Backend Architecture:** Dioptimumkan untuk Vercel Serverless Functions.
- **AI-Integrated Chatbot:** Antaramuka interaktif (`AIRecruiter`) untuk pra-saringan (pre-screening) dan perundingan portfolio.
- **Workflow Automation:** Pengurusan data melalui Telegram Bot dan Google Apps Script (GAS) untuk aliran data yang selamat.
- **Modern UI/UX:** Reka bentuk responsif menggunakan Tailwind CSS dan Framer Motion untuk pengalaman pengguna yang dinamik.
- **Ambient Cyberpunk Ambiance:** Integrasi latar belakang video dengan kawalan masa (runtime tracking) yang efisien.

## 🛠️ Stack Teknologi
- **Frontend:** React, TypeScript, Tailwind CSS, Framer Motion.
- **Backend:** Node.js / Express (Stateless).
- **Deployment:** Vercel.
- **Database Strategy:** Disentralisasi (Google Sheets via GAS Webhooks).

## 📋 Deployment Audit Logs (May 2026)
- **Architectural Update:** Migrasi backend kepada *Stateless Configuration* bagi menyokong ekosistem Serverless Vercel.
- **Security:** Menghapuskan kebergantungan pada storan fail JSON tempatan (`portfolio_db.json`).
- **Optimization:** Memastikan tiada kebocoran kunci rahsia melalui penggunaan `.gitignore` yang ketat.
- **Audit Certification:** Semua komponen UI (`Header`, `Showcase`, `AIRecruiter`, `NetworkContact`) telah disahkan bebas daripada ralat kompilasi dan runtime.

## ⚙️ Setup & Deployment
1. **Environment Variables:** Pastikan kunci berikut ditetapkan dalam Vercel:
   - `GEMINI_API_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
   - `GAS_WEBHOOK_URL`
2. **Push Command:** `git commit -m "feat(release): complete comprehensive UI logic audit and finalize high-fidelity production build for Vercel"`
   `git push origin main`

---
*Dibina oleh: Muhammad Hairul Iqwan Bin Mohd Yaziz*
*Cyberjaya, Malaysia.*
