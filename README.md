# FinanceAI 📊

FinanceAI is an AI-powered financial chart and PDF analysis platform designed to simplify complex financial data through clear visualizations and natural language explanations.

It helps users understand trends, performance, and financial health without needing deep finance expertise.

---

## ✨ Key Features

- 📄 Upload and analyze financial PDFs
- 📊 Interactive charts for financial data
- 🧠 AI-generated explanations for charts and metrics
- 📈 Trend detection and insights
- 🎓 Beginner-friendly and analyst-level explanations
- ⚡ Built using Next.js App Router

---

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **UI:** React 18, Tailwind CSS
- **Charts:** Recharts / Chart.js
- **AI:** LLM-based financial analysis
- **Package Manager:** pnpm

---

## 📂 Folder Structure

financeai/
│
├── app/                         # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   ├── globals.css              # Global styles
│   │
│   ├── dashboard/               # User dashboard
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── error.tsx
│   │
│   ├── upload/                  # PDF upload & processing
│   │   └── page.tsx
│   │
│   ├── analysis/                # Charts & AI insights
│   │   └── page.tsx
│   │
│   └── api/                     # API routes
│       ├── analyze-pdf/
│       │   └── route.ts         # PDF analysis endpoint
│       ├── generate-insights/
│       │   └── route.ts         # AI explanations
│       └── extract-data/
│           └── route.ts         # Financial data extraction
│
├── components/                  # Reusable UI components
│   ├── charts/
│   │   ├── RevenueChart.tsx
│   │   ├── ProfitChart.tsx
│   │   └── CashFlowChart.tsx
│   │
│   ├── ui/                      # Buttons, cards, modals
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Loader.tsx
│   │
│   └── FileUpload.tsx
│
├── lib/                         # Core logic & helpers
│   ├── pdf-parser.ts            # PDF parsing logic
│   ├── ai-analyzer.ts           # AI prompt & response logic
│   ├── financial-metrics.ts     # KPI calculations
│   └── chart-transform.ts       # Data → chart format
│
├── hooks/                       # Custom React hooks
│   ├── usePDFUpload.ts
│   └── useFinancialAnalysis.ts
│
├── types/                       # TypeScript types
│   ├── financial.ts
│   ├── chart.ts
│   └── api.ts
│
├── public/                      # Static assets
│   └── images/
│
├── .env.example                 # Environment variables
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── package.json
└── README.md



