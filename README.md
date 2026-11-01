# DSA Universe &middot; Monorepo Architecture

> **Cinematic, Hardware-Level Visualizations for Data Structures &amp; Algorithms.**  
> Stop staring at dry syntax and static charts. Learn computer science through reactive 3D animations, silicon-level memory allocation, and real-time execution pipelines.

---

## 🏛 Architecture &amp; Monorepo Topology

DSA Universe is built as a **decoupled micro-frontend monorepo**. Each algorithmic discipline is housed within an independent Next.js application inside the `apps/` directory, sharing a cohesive design language, GSAP animation system, and unified navigation protocol.

```
dsa-universe/
├── apps/
│   ├── home/           # Central Gateway & Curriculum Roadmap Hub
│   ├── arrays/         # Module 01 · Contiguous Memory & Pointer Arithmetic
│   ├── linked-lists/   # Module 02 · Dynamic Nodes & Pointer Chains
│   └── stacks-queues/  # Module 03 · Call Stack & Circular Ring Buffers
├── scripts/            # Build automation & verification helpers
└── package.json        # Workspace configuration
```

### Key Architectural Tenets

1. **Independent Micro-Frontends**  
   Each service operates as an autonomous, zero-bleed application. An upgrade or refactor in one algorithm domain never destabilizes sibling modules.
2. **Standard Masked Routing Gateway**  
   The primary entry point acts as a central hub dispatching traffic across modular visualizers using clean, masked path mappings rather than exposed cloud-provider domain strings.
3. **Continuous Scroll Storytelling**  
   Rather than fragmenting lessons across disconnected subroutes, each topic unfolds as a continuous, pinned GSAP `ScrollTrigger` narrative:
   `Hero` &rarr; `Real-World Metaphor` &rarr; `Hardware & Memory` &rarr; `Operations & Complexity` &rarr; `Algorithmic Patterns` &rarr; `Interactive Lab` &rarr; `Knowledge Check` &rarr; `Next Chapter Bridge`.
4. **Standard Navigation Standard**  
   - **Disappearing Breadcrumb Header**: Compact top-left breadcrumb (`DSA Universe / <Topic>`) that smoothly dismisses on scroll down and reveals on scroll up.
   - **Tactile Floating Dock**: Bottom-anchored control bar with chapter shortcuts and fullscreen mode.
   - **Seamless Chapter Bridge**: Atmospheric `NextSection` card at the conclusion of every page passing learners directly to the next topic.

---

## 📦 Curriculum Modules

| Step | Topic | Masked Identifier | Core Concepts Visualized |
| :---: | :--- | :--- | :--- |
| **00** | **Central Hub** | `[Gateway]` | Curriculum grid, on-demand interactive onboarding tour, progress state |
| **01** | **Arrays** | `[Module: Arrays]` | Contiguous RAM indexing, memory math `base + (i × 4)`, Two Pointers, Sliding Window |
| **02** | **Linked Lists** | `[Module: Linked-Lists]` | Disjointed heap nodes, pointer rewiring, reversal, Floyd's cycle detection |
| **03** | **Stacks &amp; Queues** | `[Module: Stacks-Queues]` | CPU call stack frames, stack overflow, circular ring buffers with modulo arithmetic |

---

## 🎨 Design System &amp; Motion Philosophy

- **Canvas**: Pure deep dark theme (`#050505`) with ambient radial color meshes tailored per module (Emerald, Indigo, Cyan, Purple).
- **Glassmorphism**: High-performance backdrop blur layers (`backdrop-blur-xl`), hairline borders (`border-white/10`), and inset specular highlights.
- **Scroll Synchronization**: 60fps scrubbing with Lenis smooth scroll and debounced scroll listeners using React refs to eliminate layout recalculation churn.
- **Hydration Resilient**: Global extension attribute protection (`suppressHydrationWarning`) preventing third-party script attribute mismatches.

---

## 🛠 Local Development

### Prerequisites

- Node.js >= 20.x
- npm >= 10.x

### Running Any Service

Navigate into the desired application directory and launch the Turbopack development server:

```bash
# 1. Central Hub
cd apps/home
npm run dev

# 2. Arrays Visualizer
cd apps/arrays
npm run dev

# 3. Linked Lists Visualizer
cd apps/linked-lists
npm run dev

# 4. Stacks & Queues Visualizer
cd apps/stacks-queues
npm run dev
```

### Production Build Verification

Verify that all TypeScript types, page data, and static prerender pipelines compile cleanly:

```bash
cd apps/<service-name>
npm run build
```

---

## 📄 License

Proprietary educational platform &middot; Built for Next-Generation Computer Science Education.
