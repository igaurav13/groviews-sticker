# Groviews Sticker — Technical Assignment


## 🧩 Project Overview

This repository contains the implementation for the **Groviews React Developer Technical Assignment**, covering:

1. **Canvas-based Sticker Designer**
2. **Real-time Customer Care Chat Widget**
3. **Foundational structure for Invoice Generation (future-ready)**

The goal was to demonstrate:
- Strong React fundamentals
- App Router–correct Next.js structure
- Real-time UI patterns
- Scalable state management
- Clean, readable, and maintainable code

---

## 🛠 Tech Stack

- **Next.js (App Router)**
- **React**
- **TypeScript**
- **Zustand** (state management)
- **HTML5 Canvas**
- **Socket.io (client-side)**
- **Tailwind CSS**
- **Firebase DB**

---

## 📁 Project Structure

The project follows **Next.js App Router best practices** with clear separation of concerns:

![Architecture of the codebase](/public/file-structure.png)


## 🎨 Part 1 — Canvas-Based Sticker Designer

### Implemented Features
- Circular sticker canvas workspace
- Image upload (PNG, JPG, SVG)
- Drag, resize, rotate, reposition elements
- Text addition
- Layer management
- Undo / Redo support
- Zoom in / out controls
- Background color picker
- Grid toggle
- Export design as PNG
- Draft persistence using local storage
- Responsive layout

### State Management
- Canvas elements, history, zoom, and background state handled via **Zustand**
- Predictable updates with undo/redo snapshots

---

## 💬 Part 2 — Customer Care Chat Widget

A floating, real-time chat widget designed like a production support tool.

### Implemented Features
- Floating chat button (bottom-right)
- Expandable / collapsible chat window
- Pre-chat form (name, email)
- Real-time messaging using Socket.io
- Optimistic UI updates
- Typing indicators
- Message timestamps
- Unread message badge
- Global availability across pages
- Keyboard-friendly & accessible UI

### Architecture Notes
- Socket connection handled inside a custom hook (`useChatSocket`)
- Chat state managed globally via Zustand
- All chat components are **client components**, App Router–safe

---

## 🧾 Part 3 — Invoice Generator (Foundation)

### Current State
- Project structure and data flow prepared
- Intended to generate invoices from design/order data

### Planned Enhancements
- PDF generation (jsPDF / React-PDF)
- Real-time preview
- Multiple invoice templates
- Print-friendly layout
- Email invoice simulation

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository
```
git clone 
cd groviews-sticker
npm install
npm run dev
http://localhost:3000
```

## 🚧 Areas of Improvement & Future Enhancements

While the current implementation focuses on core architecture, clean state management, and real-time interaction patterns, there are several areas where I believe the product can be further enhanced to fully match and exceed the assignment’s scope to a productioned App.

This section outlines **intentional trade-offs**, **planned improvements**, and **future-ready extensions**, aligned with Groviews Technologies’ evaluation criteria and delivering version 1 in the meantime.

### 🧠 To fix fully TypeScript Errors and build bugs & Stability Improvements.

---

### 🎨 Canvas-Based Sticker Designer

**Current State**
- Core canvas interactions implemented (drag, resize, rotate, zoom)
- State-driven canvas management using Zustand
- Draft persistence via local storage
- Export as image supported

**Areas of Improvement**
- Add **advanced cropping tools** (free-form / circular crop)
- Implement **grid & ruler guides** for precise alignment
- Introduce **custom font uploads**
- Add **SVG path editing** for vector-level control
- Improve **mobile canvas ergonomics** (gesture-based zoom/rotate)
- Add **cloud-based draft saving** (authenticated users)
- Implement **pre-defined design templates (3+)** more extensively

---

### 💬 Customer Care Chat Widget

**Current State**
- Floating chat widget with real-time messaging
- Optimistic UI updates
- Typing indicators
- Unread message notifications
- Global availability across pages

**Areas of Improvement**
- Implement **read receipts (sent / delivered / read)**
- Add **file & image attachments**
- Introduce **sound notifications with user toggle**
- Persist chat history using a database (Firebase / PostgreSQL)
- Add **admin dashboard** for:
  - Multi-conversation management
  - Conversation status (open / resolved)
  - Canned responses
- Add **offline & reconnection UI states**
- Improve accessibility with enhanced ARIA roles for live regions

---

### 🧾 Invoice Generator

**Current State**
- Data flow and structural foundation prepared
- Order-summary–ready architecture

**Areas of Improvement**
- Full **PDF generation using jsPDF / React-PDF**
- Real-time invoice preview
- Multiple invoice templates (at least 2)
- Print-friendly styling
- Logo & branding customization
- Email invoice simulation
- Accurate tax configuration and currency formatting

---

### ⚡ Performance & Optimization

**Current State**
- Zustand selectors minimize unnecessary re-renders
- Modular components and hooks
- Canvas updates optimized via snapshots

**Areas of Improvement**
- Code splitting for heavy canvas/editor modules
- Lazy loading of chat widget
- Memoization of expensive canvas operations
- Image optimization for large uploads
- Virtualization for long chat histories

---

### 🧪 Testing & Reliability

**Current State**
- Manual testing and controlled state flows
- Error-safe state updates

**Areas of Improvement**
- Unit tests for:
  - Utility functions
  - Calculation logic (invoice, pricing)
- Component tests using:
  - Jest
  - React Testing Library
- Mocked socket tests for chat flows
- Error boundaries for canvas & PDF generation

---

### 🧠 Developer Experience & Documentation

**Current State**
- Clean folder structure
- App Router–compliant architecture
- Well-separated concerns (UI, state, logic)

**Areas of Improvement**
- Expand inline code documentation
- Add architectural diagrams
- Add environment-based configuration examples
- Add contribution guidelines
- CI setup for linting and testing

---

### 🎯 UI / UX Enhancements

**Current State**
- Responsive layouts
- Smooth chat open/close animations
- Clear visual hierarchy

**Areas of Improvement**
- Skeleton loaders for async actions
- Toast notifications for user feedback
- Loading states for exports & uploads
- Subtle micro-interactions for canvas tools
- Improved empty states and error messages

---

## 🧩 Summary

This project was developed with a **production-first mindset**, prioritizing:
- Clean architecture
- Scalable state management
- Real-time interaction patterns
- Maintainable and extensible code
- I do believe there can be a lots of improvements we can make to make this product.

The outlined improvements represent **natural next steps**, not missing fundamentals, and demonstrate how the system can evolve into a **fully production-ready platform** aligned with Groviews Technologies’ standards.
