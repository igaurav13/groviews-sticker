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