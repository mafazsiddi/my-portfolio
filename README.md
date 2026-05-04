# Mafaz Siddiqua | Premium Creative Portfolio

An Awwwards-level personal portfolio website designed with a focus on immersive interactions, high-end motion design, and a modern glassmorphism aesthetic. Built for performance and scalability using the latest web technologies.

## ✨ Key Features

-   **Momentum Smooth Scrolling:** Integrated **Lenis** for buttery-smooth, weighted scrolling.
-   **Physics-Based Experience:** Interactive **Matter.js** loading screen and draggable skills playground.
-   **Advanced GSAP Motion:** Multi-layer parallax, scroll-triggered reveal animations, and 3D tilting project cards.
-   **Interactive Magnet System:** Intelligent magnetic attraction on navigation links and primary call-to-actions.
-   **High-End Visuals:** 
    -   Animated **Mesh Gradient** background for depth.
    -   **Filmic Grain** texture for a premium physical feel.
    -   **Border Beam** light effects orbiting project cards.
    -   **Velocity-Based Cursor:** Custom cursor that stretches and morphs based on movement speed.
-   **Functional Contact Form:** Powered by **EmailJS** with real-time validation and custom HTML email templates.
-   **Fully Responsive:** Pixel-perfect optimization across mobile, tablet, and ultra-wide screens.

## 🛠️ Tech Stack

-   **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
-   **Animations:** [GSAP](https://greensock.com/gsap/) (ScrollTrigger, Flip, Observer)
-   **Physics:** [Matter.js](https://brm.io/matter-js/)
-   **Smooth Scroll:** [Lenis](https://lenis.darkroom.engineering/)
-   **Email Service:** [EmailJS](https://www.emailjs.com/)
-   **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites
-   Node.js (v18.17 or later)
-   npm, yarn, or pnpm

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/mafazsiddi/portfolio.git
    cd portfolio
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up EmailJS (optional):
    Replace the placeholders in `src/components/Contact.tsx` with your credentials from the [EmailJS Dashboard](https://dashboard.emailjs.com/).

### Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deployment

### Vercel (Recommended)
This project is optimized for Vercel. 
1.  Push your code to GitHub.
2.  Import the project in [Vercel Dashboard](https://vercel.com/new).
3.  Vercel will handle the rest!

## 📂 Project Structure

```text
src/
├── app/             # App Router pages and global styles
├── components/      # Reusable UI & Interactive sections
├── lib/             # Utility functions (cn, etc.)
└── public/          # Static assets and grain textures
```

---

Built with ❤️ by **Mafaz Siddiqua**.
