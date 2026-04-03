# Kologic AI - Enterprise AI SaaS Platform

## 🚀 Project Overview
**Kologic AI** is a premium Next-Generation Enterprise B2B SaaS website. It serves as the digital front door for an advanced AI platform that offers conversational AI, agentic automation, and intelligent digital platforms for modern enterprises.
The application presents a highly interactive, animated, and visually immersive experience to establish authority and trust among corporate clients, executives, and enterprise developers. 

**Target Audience:** Enterprise decision-makers, CTOs, and developers looking for enterprise-grade AI integration solutions.

---

## 🧱 Tech Stack
* **Framework:** Next.js 16.1.6 (App Router paradigm)
* **View Layer:** React 19.2.3 with React DOM
* **Language:** TypeScript
* **Styling Method:** Tailwind CSS v4 (with PostCSS) custom global CSS rules for selection and styling variables.
* **Component Animations:** Framer Motion (v12)
* **3D Rendering:** Three.js, `@react-three/fiber`, `@react-three/drei`
* **Icons:** `lucide-react`
* **Particle Effects:** `react-tsparticles`, `tsparticles-engine`, `tsparticles-slim`
* **Utilities:** `clsx`, `tailwind-merge` (standard utility class merging patterns)

---

## 📂 Folder Structure Analysis

The project follows a scalable Next.js app directory structure combined with atomic design principles for components.

```text
kologic-website/
├── public/                 # Static assets (images, fonts, JSON data)
├── src/
│   ├── app/                # Next.js App Router definitions (Pages & Layouts)
│   │   ├── about/          # About Us page route
│   │   ├── solutions/      # Core Solutions directory
│   │   ├── layout.tsx      # Root Layout containing Navbar, Footer, GlobalSplash
│   │   ├── page.tsx        # Landing Page (Home)
│   │   ├── globals.css     # Global CSS, Tailwind entry point, CSS Variables
│   │   └── ...             # Other route segments (contact, developers, etc.)
│   ├── components/         # Reusable React components
│   │   ├── 3d/             # Three.js / R3F Canvas components (RobotAssistant)
│   │   ├── layout/         # Structural components (Navbar, Footer)
│   │   └── ui/             # Core UI components (Buttons, GlassCards, Animations)
│   └── lib/                # Shared utilities and helper functions (utils.ts)
├── package.json            # Project dependencies and npm scripts
├── next.config.ts          # Next.js configuration
├── tailwind.config.*       # Tailwind V4/PostCSS configs
└── tsconfig.json           # TypeScript configuration
```

---

## 📄 Page-by-Page Analysis

### 🔹 Home Page (`/src/app/page.tsx`)
* **Purpose:** The main landing page designed to "Wow" the user and introduce Kologic's core value proposition.
* **Layout Structure:** Multi-section long-scroll layout consisting of:
  * Hero Section (Particle Background + Text + 3D Robot)
  * Trusted Companies banner
  * Platform Architecture (Animated Timeline)
  * Core Capabilities (Grid Layout)
  * Solutions Ecosystem Showcase
  * CTA section
* **UI Features Implemented:**
  * **Dynamic Interaction:** 3D `RobotAssistant` that tracks the user's cursor and reacts to hover states (`onMouseEnter` triggers `hoverState` props).
  * **Animations:** Orchestrated staggered entrance animations via `framer-motion` variants (`STAGGER_CONTAINER`, `STAGGER_CHILD`).
  * **Backgrounds:** `ParticleBackground` and `GradientBlob` components strategically placed to create depth without relying on static images.
  * **Responsive Design:** Extensive use of `max-w-7xl`, `md:grid-cols-2`, `lg:grid-cols-3` to ensure perfect rendering across mobile, tablet, and desktop.
* **State Handling:** `useState` tracks `isHoveringCTA` to pass interactive state down to the 3D Robot component, making the 3D model "look" at the button when the user intends to click.

### 🔹 Solutions Page (`/src/app/solutions/page.tsx`)
* **Purpose:** Details the distinct AI offerings (Custom Solutions, Industry Products, Kore-Led CX).
* **Layout Structure:** Text-heavy introduction followed by an immersive 3D-perspective Card Grid.
* **UI Features Implemented:**
  * **Advanced Framer Motion:** Custom `ThreeDCard` component utilizing `useMotionValue`, `useTransform`, and `useSpring` to manipulate `rotateX` and `rotateY` based on raw MouseEvent tracking.
  * **Micro-interactions:** "Shine effect" created by an absolute overlaid div that transitions opacity on hover, giving a glass-like reflective feel to the cards.
* **Styling Approach:** Heavy use of Tailwind's `backdrop-blur-xl`, `bg-white/60`, and `shadow-xl` to implement a modern "Glassmorphism" aesthetic.

### 🔹 About Page (`/src/app/about/page.tsx`)
* **Purpose:** Communicates the company's mission, facts, and leadership team.
* **Layout Structure:** Standard two-column split on desktop (Text left, Stats Grid right), reverting to single column on mobile.
* **UI Features Implemented:**
  * **Sequential Entrances:** Simple `initial`/`animate` framer-motion props to slide content in upon mounting.
  * **Component Reuse:** Recycles the `GlassCard` and `GradientBlob` components to maintain visual consistency.

*(Note: Other routes like `/contact`, `/developers`, etc., follow similar architectural paradigms).*

---

## 🧩 Component-Level Breakdown

#### `RobotAssistant` (`/src/components/3d/RobotAssistant.tsx`)
* **Purpose:** Renders an interactive 3D procedural robot inside a `@react-three/fiber` `<Canvas>`.
* **Behavior:** Uses `useFrame` to calculate delta time and mathematically interpolate tracking mouse coordinates. The robot "breathes," floats, blinks, and tilts its head/eyes towards the user's cursor or explicitly hovered interactive elements. It also reacts to scroll position (`window.scrollY`) by tilting.
* **Reusability:** High (takes `hoverState` and `chatbotOpen` props to adapt behavior globally).

#### `ArchitectureTimeline` (`/src/components/ui/ArchitectureTimeline.tsx`)
* **Purpose:** Visualizes the tech stack flow (Data -> Models -> Agents -> Automation -> Outcomes).
* **Behavior:** On desktop, renders a curved SVG path that draws itself using `framer-motion` `useInView` and `pathLength` animation. "Floating nodes" bob up and down, and reveal interactive tooltips on hover. Uses different layouts (vertical list) on mobile endpoints.
* **Reusability:** Medium (highly specific to the content but abstracts the layout mechanism).

#### `GlobalSplash` (`/src/components/ui/GlobalSplash.tsx`)
* **Purpose:** Initial loading screen overlay masking the hydration and 3D rendering bootup.
* **Behavior:** Runs once per session utilizing `sessionStorage`. Displays a complex SVGs animation combined with CSS filters (`drop-shadow/glow`) and morphing paths using `framer-motion`. Auto-dismounts after 5 seconds via `AnimatePresence`.

#### `Navbar` (`/src/components/layout/Navbar.tsx`)
* **Purpose:** Global navigation.
* **Behavior:** Implements a scroll-listener to toggle `isScrolled` state, transitioning from transparent to a solid blur-backdrop. Features `framer-motion` layout animations (`layoutId="navbar-indicator"`) for the active route underline, ensuring smooth transitions when navigating.

---

## 🎨 UI/UX Design Analysis

* **Design System:** Utility-first via Tailwind CSS V4. Does not rely on pre-built libraries like MUI or Bootstrap; completely customized UI.
* **Aesthetics:** "Glassmorphism" mixed with "Modern Sci-Fi Enterprise."
* **Color Palette:**
  * **Primary:** `#4F46E5` (Indigo/Purple blend)
  * **Secondary:** `#6EE7B7` (Mint Green)
  * **Accent / Backgrounds:** Gradients leveraging the above, paired with off-whites (`bg-gray-50/50`) and dark slate text.
* **Typography:** `Inter` (mapped to `--font-inter` via `next/font/google`). Crisp, modern sans-serif.
* **UX Patterns:**
  * Continuous feedback loops (hovering over CTA highlights the 3D robot).
  * Layered depths (Z-index management between gradient blobs, particles, and foreground cards).
  * Smooth transitions between route changes and sticky headers preserving user context.

---

## 📦 Dependencies Analysis

### Core
* `next (16.1.6)`: React framework for SSR, routing, and optimizing builds.
* `react / react-dom (19.2.3)`: Core view library.
* `typescript (^5)`: Static typing.

### UI & Animations
* `framer-motion (^12.35.0)`: Powers all complex 2D animations, enter/exit transitions, and scroll-linked animations.
* `lucide-react (^0.577.0)`: Clean, consistent SVG icon set.

### 3D Execution
* `three (^0.183.2)`: Core WebGL 3D engine.
* `@react-three/fiber (^9.5.0)`: React wrapper for Three.js, manages the render loop and canvas.
* `@react-three/drei (^10.7.7)`: Useful helpers for R3F (Environment maps, Floats, preloading).

### Visual Effects
* `react-tsparticles`, `tsparticles-engine`, `tsparticles-slim`: Lightweight engine to render the interactive background node/particle nets.

### Utilities
* `clsx` & `tailwind-merge`: Safely constructs className strings dynamically without Tailwind class conflicts.
* `eslint`, `tailwindcss`, `@tailwindcss/postcss`: Code linting and CSS bundle compilation.

---

## 🔁 Data Flow & Architecture

1. **Server-to-Client Paradigm:** The app leverages Next.js App Router, combining Server Components (default) with strict boundary explicitly marked `"use client"` Components where interactivity (Framer Motion, `useState`, Three.js) is required.
2. **Prop Drilling vs Context:** Global stats (like the chatbot toggle) use Custom Web Events (`window.dispatchEvent(new CustomEvent('chatbot-toggled'))`) to allow sibling/distant components (like the 3D Robot) to react without setting up heavy React Context wrappers at the root.
3. **Session Management:** Lightweight browser API (`sessionStorage`) dictates whether to show the `GlobalSplash` to prevent repetitive loading screens on internal navigation.

---






clone the repository and npm install and then run the command

 npm run dev || npm start