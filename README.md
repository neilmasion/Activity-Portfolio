# Neil Masion — Front-End Developer & UI Engineer Portfolio

A modern, responsive, and animated portfolio web application built precisely according to the design specifications.

---

## 🚀 Live Servers

- **Frontend (Vite + React + Tailwind + Framer Motion):** [http://localhost:5173](http://localhost:5173)
- **Admin Portal & Analytics Dashboard:** [http://localhost:5173/admin](http://localhost:5173/admin)
- **Backend API (Node.js + Express):** [http://localhost:5000/api](http://localhost:5000/api)

---

## 🎨 Design & Feature Highlights

1. **Pixel-Accurate Typography**:
   - **Default Body**: `Inter` (Google Fonts)
   - **Big Text / Headlines**: `Anton` (Google Fonts)
   - **"Hey, I'm"**: `Reenie Beanie` (Google Fonts, handwriting style)
   - **Small Text / Code / Tags**: `IBM Plex Mono` (Google Fonts, monospace)

2. **Loading Screen**:
   - High-end developer preloader with animated progress counter (0% → 100%), live status compilation messages, and smooth curtain exit.

3. **Smooth Scroll Animations & Scroll Zoom**:
   - Real-time scroll physics via Framer Motion.
   - Developer cutout image smoothly scales with subtle zoom on scroll.

4. **Rich Interactivity**:
   - **Custom Admin Analytics Dashboard (`/admin`)**:
     - Accessible via `http://localhost:5173/admin` or discrete `ADMIN` button in the footer.
     - Protected with username & password authentication and HMAC-SHA256 signed session tokens.
     - **Default Credentials:** Username: `admin` | Password: `admin12345` (customizable in `Backend/.env`).
     - **Visitor Analytics:** Total views, unique visitors, today's views, 14-day traffic trend chart, device breakdown (Desktop/Mobile/Tablet), top traffic sources/referrers, and live visitor log stream.
     - **Email / Inquiries Inbox:** Full view of every contact message sent (sender, email, project type, budget, message body, date/time), search filter, read/unread status toggle, and one-click direct email reply.
   - **Real-Time Manila Clock**: Updates live in the navigation bar.
   - **Selected Works**: Category filtering (`ALL PROJECTS`, `WEB APPS`, `CREATIVE & APP`, `INTERACTIVE`) + interactive Project Details Modal with live demos & source code links.
   - **Capabilities**: Interactive accordions for Rapid Builds, Frontend Architecture, and Frontend Direction.
   - **Code Standards**: Dual-tab code terminal (`Engine.tsx` / `Vitals.json`) with performance metrics.
   - **Skills Group**: Sleek collapsible drawer with "Show More" / "Show Less" toggle and "slightly disappearing" gradient fade overlay.
   - **FAQ Accordions**: Interactive expand/collapse for client inquiries.
   - **Contact Modal**: Form validation, confetti burst on submission, and connection to the backend `/api/contact` endpoint.
   - **Toast Notifications**: Feedback for email copied to clipboard and form dispatch.

5. **Environment Configuration (`.env`)**:
   - Configured in both `Frontend/.env` and `Backend/.env` (with `.env.example` templates included).

---

## 🛠 Project Structure

```
Activity Portfolio/
├── Frontend/                 # React 19 + Vite + Tailwind CSS + Framer Motion
│   ├── public/
│   │   ├── assets/
│   │   │   ├── hero-developer.png   # Cutout photo of Neil Masion
│   │   │   └── design-reference.png # Original design mockup
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/       # Navbar, Hero, Projects, Capabilities, About, FAQ, etc.
│   │   ├── data/             # Portfolio structured content & project details
│   │   ├── App.jsx
│   │   └── index.css
│   ├── .env                  # Frontend credentials & environment variables
│   └── .env.example
├── Backend/                  # Express.js REST API
│   ├── data/                 # Stores received contact inquiries (messages.json)
│   ├── server.js             # API routes (/api/health, /api/contact)
│   ├── .env                  # Backend credentials, port, SMTP configuration
│   └── .env.example
└── README.md
```

---

## ⚡ Quick Start Commands

### Frontend:
```bash
cd Frontend
npm install
npm run dev
```

### Backend:
```bash
cd Backend
npm install
npm run dev
```
