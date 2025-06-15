# 🎨 AI Portrait Studio

AI Portrait Studio is a modern full-stack web app that lets users generate stunning, AI-powered character portraits from natural language prompts. It uses Google Genkit with Gemini models for text-to-image generation and is built on a sleek Next.js 15 frontend styled with Tailwind CSS and ShadCN UI.

---

## 🚀 Features

- ✨ Generate portraits from simple text prompts
- 🎭 Choose from artistic styles (Anime, Fantasy, Surreal, etc.)
- 🎲 Optional seed input for reproducibility
- ⚡ Powered by Google Genkit & Gemini 2.0 models
- 💻 Built using Next.js 15 App Router, React, TypeScript
- 🎨 UI Components from ShadCN, styled with Tailwind CSS
- 🔔 Toast notifications, loading indicators, and mobile responsiveness

---

## 🧱 Tech Stack

| Layer       | Technology                     |
|------------|---------------------------------|
| Frontend   | Next.js 15, TypeScript, React   |
| Styling    | Tailwind CSS, ShadCN UI         |
| AI Engine  | Google Genkit, Gemini 2.0       |
| Forms      | React Hook Form, Zod            |
| Hosting    | Firebase App Hosting            |

---

## 📁 Project Structure

```
/src
  /app               → App routes & layout
  /components        → Reusable UI components
  /ai
    genkit.ts        → Genkit configuration
    /flows
      generate-portrait-from-prompt.ts
      suggest-portrait-ideas.ts
  /hooks             → Custom hooks
  /lib               → Utilities
```

---

## 🛠️ Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/ai-portrait-studio.git
cd ai-portrait-studio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

### 4. Start the Genkit AI flow server
```bash
npm run genkit:dev
```

---

## 📦 Scripts

| Command              | Description                        |
|----------------------|------------------------------------|
| `npm run dev`        | Starts Next.js dev server          |
| `npm run genkit:dev` | Starts Genkit AI server            |
| `npm run build`      | Builds the production app          |
| `npm run start`      | Runs the production server         |

---

## 🔐 Environment Variables

You'll need to configure environment variables for:

```
GOOGLE_API_KEY=your_key_here
NEXT_PUBLIC_GENKIT_URL=http://localhost:3000/api
```

Refer to `.env.example` for a template.

---

## 🚀 Deployment

This project is configured for Firebase App Hosting.

```bash
firebase login
firebase init
firebase deploy
```

Make sure to connect your project and configure `apphosting.yaml`.

---

## 📄 License

MIT License. Free to use and modify.

---

## 👨‍💻 Author

Made by [Neeles Gadi](https://github.com/neelesh-gadi) — contributions welcome!
