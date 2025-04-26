# 🚀 EchoVault

> **Speak. Feel. Preserve.**  
> Your voice becomes your story in the vault of emotions.

---

## 🧠 About EchoVault

**EchoVault** is a futuristic voice-based journaling web app.  
Instead of writing manually, you simply **talk** — like you're chatting with a friend.  
Our AI **analyzes your emotions**, **detects your mood**, and **auto-generates journal entries** capturing your real feelings.

✅ Talk naturally  
✅ Capture emotions  
✅ Create journals automatically

---

## ✨ Features

- 🎤 **Voice-Based Journaling** — Talk, don't type.
- 💬 **Emotion Detection** — Identify your mood based on voice and text.
- 🧠 **AI Summarized Journals** — Get smart emotional summaries.
- 🎨 **Futuristic UI** — Neon lights, glassy panels, smooth animations.
- 🚀 **Instant Access** — Speak and save.

---

## ⚙️ Tech Stack

| Frontend | Backend | AI/ML |
|:--------:|:-------:|:-----:|
| React | FastAPI | Hugging Face Sentiment Models |
| Next.js | Python | Speech-to-Text (Whisper) |
| Tailwind CSS | DjangoRes | Custom Mood Analysis |

---

## 🛠 Architecture Overview

1. **Frontend (React + Tailwind)**  
   - Record voice  
   - Send audio to backend  
   - Display mood + journal summary beautifully

2. **Backend (FastAPI)**  
   - Receive and process audio  
   - Transcribe voice using Whisper  
   - Detect emotions with lightweight AI models  
   - Generate structured journal

3. **AI Layer**  
   - **Speech Recognition** — Converts audio to text  
   - **Sentiment Analysis** — Detects primary mood (Happy, Sad, Excited, Calm)  
   - **Summarization** — Creates short emotional journal entries

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/EchoVault.git

# Frontend setup
cd frontend
npm install
npm run dev

# Backend setup
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## 📦 Project Structure

```
EchoVault/
├── frontend/        # React + Next.js app
├── backend/         # FastAPI server
├── README.md        # You're here
└── assets/          # Images, icons, branding
```

---

## 🎨 Design Inspiration

- **Dark Mode** — deep navy/black backgrounds
- **Neon Accents** — bright cyan, pink, purple glows
- **Minimalist Layout** — focus on voice and emotions
- **Glassmorphism** — blurred glass effect on panels
- **Cyberpunk Fonts** — Orbitron / Space Grotesk / Poppins

---

## 🚀 Deployment

- Frontend: [Vercel](https://vercel.com/)
- Backend: [Render](https://render.com/) or [Railway](https://railway.app/)

---

## 🌟 Future Scope (Post Hackathon)

- 🎯 Emotion Timeline Visualization
- 🎯 Download Journal as PDF
- 🎯 Account System (Optional)
- 🎯 Deeper Voice Tone Analysis
- 🎯 Multi-language Support

---

## 🙌 Team EchoVault

| Name | Role |
|:----:|:----:|
| P1 | Frontend, React Developer |
| P2 | Frontend, React Developer |Backend, FastAPI, Speech-to-Text |
| P3 | AI/ML Engineer (Sentiment Analysis) |
| P4 | Frontend, Next Developer |

---

## 💬 Tagline (for Submission)

> **"EchoVault — Your Voice, Your Emotions, Forever Preserved."**

---

## 📷 Screenshots

_(Add screenshots here after UI is ready — Landing page, Mood detection result, Final Journal page.)_

---

# 🌟 Final Words

**"Every conversation leaves an echo. EchoVault captures them into timeless memories."**

---
