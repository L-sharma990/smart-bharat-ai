# 🇮🇳 Smart Bharat — AI-Powered Civic Companion
### *Transforming Governance into an Accessible, Multilingual, and Interactive AI Experience*

[![Hackathon: Devengers Promptwars 2026](https://img.shields.io/badge/Hackathon-Devengers%20Promptwars%202026-orange?style=for-the-badge&logo=google)](https://github.com/)
[![Powered by Google Gemini](https://img.shields.io/badge/Powered%20by-Google%20Gemini%20Flash-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![React 19 & Tailwind 4](https://img.shields.io/badge/Built%20with-React%2019%20%7C%20Tailwind%204-06B6D4?style=for-the-badge&logo=react)](https://react.dev/)

---

## 🌟 Overview & Problem Statement

For over 1.4 billion Indian citizens, navigating government schemes, understanding eligibility criteria, and filing municipal grievances can be complex, bureaucratic, and language-barrier heavy. **Smart Bharat** bridges this gap by acting as a 24/7 intelligent, empathetic civic companion.

Powered by **Google's Gemini AI (`gemini-flash-latest`)**, Smart Bharat simplifies government document requirements, automatically translates governance terminology into native languages (Hindi, Punjabi, English, Hinglish), provides hands-free voice recognition, and generates instant grievance tracking tickets.

---

## ✨ Key Features & Innovation

1. 🌐 **Zero-Config Multilingual Intelligence**
   - Automatically detects the exact language or dialect input by the user (Hindi, Punjabi, Hinglish, English, or regional languages).
   - Enforces strict adherence to replying *only* in the user's native tongue without breaking context.

2. 🗣️ **Hands-Free Voice Input (Speech-to-Text)**
   - Integrated with native browser Web Speech Recognition (`webkitSpeechRecognition`).
   - Citizens can simply tap the microphone icon and speak their problems in Hindi, Punjabi, or English—democratizing digital access for non-typing users.

3. 🔊 **Native Text-to-Speech (TTS) Audio Synthesis**
   - Every AI response bubble features an interactive speaker button.
   - Utilizes browser native `SpeechSynthesis` with automatic voice accent selection (`hi-IN`, `pa-IN`, `en-IN`) to read civic advice aloud.

4. ⚡ **Interactive One-Stop Civic Workspace**
   - Seamlessly connects dashboard cards (*Explore Schemes*, *Report an Issue*, *Track Complaints*, *Required Documents*) with the active AI chatbot.
   - Clicking any workspace card auto-populates and fires localized queries directly into Gemini.

5. 🎟️ **Automated Grievance Ticket Generation**
   - When a citizen reports an infrastructure or civic issue (e.g., broken streetlight, waterlogging), Gemini classifies it as a complaint, assigns the relevant municipal department, and generates a tracking ID (e.g., `SB-IND-9824`).

6. 🎨 **Patriotic Glassmorphism UI/UX**
   - Designed with modern aesthetics: vibrant tri-color accent bars (Saffron, White, Bharat Green), floating glowing background orbs, smooth hover-lifts, and responsive layouts.

---

## 🧠 Prompt Workflow & Gemini Architecture

Smart Bharat leverages advanced **Prompt Engineering** and structured output schemas via the `@google/generative-ai` SDK.

### 1. System Instruction & JSON Structured Output
We utilize `gemini-flash-latest` with `responseMimeType: "application/json"` to guarantee deterministic, machine-readable civic data for the frontend UI.

```json
{
  "conversational_reply": "Polite 2-3 sentence reply addressing the user in their EXACT language.",
  "actionable_steps": [
    "Step 1: Specific action to take (in user's language)",
    "Step 2: Where to apply or contact (in user's language)"
  ],
  "documents_required": ["Aadhaar Card", "Income Proof", "Domicile Certificate"],
  "complaint_details": {
    "is_complaint": true,
    "department": "Municipal Corporation (Grievance Redressal)",
    "ticket_id": "SB-IND-9824"
  }
}
```

### 2. Critical Language Adherence Rule
To prevent language hallucination, the system prompt explicitly commands:
> *"CRITICAL LANGUAGE RULE: You MUST detect the EXACT language the user typed in and respond in that SAME language. If user writes in Hindi (हिंदी), reply fully in Hindi. If Punjabi (ਪੰਜਾਬੀ), reply fully in Punjabi. If Hinglish, reply in Hinglish. NEVER switch languages."*

### 3. Graceful Demo / Fallback Simulator
If API quota limits are hit on free-tier cloud projects, the architecture includes a localized offline fallback simulator (`getMockCivicResponse`) that mimics Gemini's structured JSON output across all supported languages—ensuring 100% reliability during live hackathon demos.

---

## 📂 Codebase & File Structure

```text
smartBharat_project/
├── .env                     # API Key Configuration (VITE_GEMINI_API_KEY)
├── index.html               # Main HTML entry point with Google Fonts
├── package.json             # Project dependencies (React 19, Tailwind 4, Gemini SDK)
├── vite.config.ts           # Vite bundler configuration
└── src/
    ├── main.tsx             # React root mount
    ├── App.tsx              # Application layout & state orchestrator
    ├── i18n.ts              # Multilingual dictionary (English, Hindi, Punjabi)
    ├── types.ts             # TypeScript interfaces for translations & messages
    ├── index.css            # Custom CSS tokens, tri-color bars, and animations
    ├── utils/
    │   └── gemini.ts        # Standalone Gemini API utility & helper functions
    └── components/
        ├── Navbar.tsx       # Glassmorphism header with language dropdown & profile
        ├── Hero.tsx         # Landing hero with glowing orbs & verified stats
        ├── Dashboard.tsx    # Interactive workspace connecting QuickLinks to Chatbot
        ├── Chatbot.tsx      # Core Gemini AI interface (Speech-to-Text, TTS, JSON parsing)
        ├── QuickLinks.tsx   # Interactive cards that trigger automated AI prompts
        └── Footer.tsx       # Emergency helpline numbers & hackathon credits
```

---

## 🛠️ Installation & Setup Guide

### Prerequisites
- **Node.js** (v18 or higher)
- **Git**
- A free Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### Step 1: Clone the Repository
```bash
git clone https://github.com/<your-username>/smart-bharat.git
cd smart-bharat
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a `.env` file in the root directory and add your Gemini API Key:
```env
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
```
*(Note: If left empty or set to placeholder, the app automatically runs in interactive offline Demo Mode).*

### Step 4: Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to **`http://localhost:5173`** to experience Smart Bharat!

---

## 🏆 Hackathon Submission Checklist (Devengers Promptwars 2026)
- [x] Repository size is under 10 MB.
- [x] Repository contains only a single public branch (`main` / `master`).
- [x] Deep integration with Google Gemini API (`@google/generative-ai`).
- [x] Multilingual support (Hindi, Punjabi, English) and Voice Accessibility.
- [x] Comprehensive Prompt Workflow and architectural documentation.

---

### *Made with ❤️ for Devengers Promptwars 2026*
