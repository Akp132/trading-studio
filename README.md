# 📊 Trading Studio – Strategy Builder

This is a frontend application built using **Next.js**, **TypeScript**, and **Tailwind CSS** as part of a programming assignment. It allows users to **create, edit, review, and save trading strategies** using a multi-step form with a visual rule builder and persistent storage.

> 🔗 **Assignment Document:** See [`Next.js + TypeScript Assignment.pdf`](./Next.js%20+%20TypeScript%20Assignment.pdf) in the root for complete specifications.

---

## 🚀 Features

- Multi-step strategy creation (Scanner → Buy → Sell → Review)
- Recursive rule builder with AND/OR logic
- Save & load strategies using localStorage
- Export strategy as `.json` file
- Responsive UI with Tailwind CSS
- Animated particle background and smooth transitions using Framer Motion
- Step validation to ensure required fields are filled

---

## 📦 Tech Stack

- Next.js (Pages Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- React TSParticles
- LocalStorage + UUID

---

## 🛠️ Running Locally

```bash
git clone https://github.com/your-username/trading-studio.git
cd trading-studio
npm install
npm run dev
