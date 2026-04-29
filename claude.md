# 3D + AR Portfolio Website PRD

## 1. Overview

**Goal:**
Transform an existing React portfolio into an immersive **3D interactive experience** using **Three.js + WebXR**, showcasing AR/VR and Android expertise.

**Core Concept:**
A navigable **3D park world** where a **main character (mobile device avatar)** explores different zones representing projects, skills, and experience.

---

## 2. Objectives

* Showcase AR/VR + Android expertise interactively
* Replace static scrolling with exploration-based navigation
* Create a memorable portfolio experience
* Maintain performance on desktop and mobile

---

## 3. Target Users

* Recruiters (simple UX required)
* Technical interviewers (deep exploration)
* General visitors (quick overview)

---

## 4. Tech Stack

### Frontend

* React
* Three.js
* React Three Fiber (R3F)
* Drei
* WebXR API

### Optional

* Zustand (state management)
* Framer Motion / React Spring (animations)
* GLTF/GLB assets
* Blender (asset creation)
* Vite (build tool)

---

## 5. Core Features

### 5.1 3D Environment (Park)

* Open-world park scene
* Trees, grass, pathways
* Project kiosks / buildings
* Skybox (optional day/night)

**Controls:**

* Desktop: WASD + mouse
* Mobile: virtual joystick

---

### 5.2 Main Character

**Concept:** Mobile device avatar

Options:

* Walking smartphone
* Floating device
* Robot-like device

**Capabilities:**

* Movement
* Interaction with objects
* Third-person camera follow

---

### 5.3 Project Showcase

Each project appears as a **3D object**:

Examples:

* AR project → hologram/portal
* Android app → phone booth
* VR project → headset station

**Interaction:**

* Click/tap opens detail view

**Details include:**

* Title
* Description
* Tech stack
* GitHub link
* Demo media

---

### 5.4 Mobile UI System

* Virtual phone UI opens on interaction
* Mimics Android interface
* Displays project details

---

### 5.5 AR Mode (WebXR)

**Entry:**

* "View in AR" button

**Features:**

* Place project in real world
* Scale / rotate
* Inspect model

---

### 5.6 Navigation

Modes:

1. Free roam
2. Guided tour

Features:

* Directional markers
* Highlight interactable objects
* Teleport option

---

### 5.7 Sections Mapping

| Section    | 3D Representation |
| ---------- | ----------------- |
| About      | Central landmark  |
| Projects   | Kiosks            |
| Skills     | Boards            |
| Experience | Timeline path     |
| Contact    | Terminal booth    |

---

## 6. UX Requirements

### First-Time Experience

* Intro animation
* Short tutorial (movement + interaction)

### Accessibility

* 2D fallback mode
* Low graphics mode

---

## 7. Performance Requirements

* Initial load < 5 seconds
* Use lazy loading
* Use LOD (level of detail)
* Texture compression

**Targets:**

* 60 FPS (desktop)
* 30 FPS (mobile)

---

## 8. Assets

### Required Models

* Character
* Trees / environment
* Project objects

**Format:** GLB preferred

---

## 9. Architecture

```
/src
  /components
    Scene.jsx
    CharacterController.jsx
    ProjectNode.jsx
    ARViewer.jsx
    UIOverlay.jsx
  /state
    store.js
  /assets
    models/
    textures/
```

---

## 10. Interaction Flow

1. User enters site
2. Character spawns
3. User explores park
4. Interacts with project
5. UI opens
6. Optional AR launch

---

## 11. MVP Scope

### Must Have

* Basic 3D scene
* Character movement
* 3–5 project nodes
* Interaction system
* Basic AR view

### Nice to Have

* Animations
* Day/night cycle
* Advanced UI

---

## 12. Future Enhancements

* Multiplayer support
* AI guide character
* Gesture controls
* Resume terminal

---

## 13. Success Metrics

* Time on site
* Interaction rate
* Recruiter feedback
* Performance stability

---

## 14. Risks & Mitigation

| Risk                | Mitigation       |
| ------------------- | ---------------- |
| Performance issues  | Optimize assets  |
| WebXR compatibility | Provide fallback |
| Complex UX          | Guided mode      |

---

## 15. Deliverables

* Deployed website
* Source code
* README
* Asset credits

---

## 16. Instructions for Coding Agent

* Use React Three Fiber
* Keep components modular
* Prioritize performance first
* Build MVP before enhancements
* Use placeholder assets initially

