"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export interface AlgorithmModuleMeta {
  id: string;
  index: string;
  name: string;
  shortTitle: string;
  category: string;
  tagline: string;
  url: string;
  accent: string;
  chipColor: string;
  complexity: string;
  memory: string;
  glyph: string;
}

export const MODULE_SYSTEMS: AlgorithmModuleMeta[] = [
  {
    id: "arrays",
    index: "01",
    name: "Contiguous RAM & Arrays",
    shortTitle: "ARRAYS",
    category: "Linear",
    tagline: "Sequential cache lines and two-pointer convergence",
    url: "https://arrays-rho.vercel.app",
    accent: "#2563eb",
    chipColor: "#bfdbfe",
    complexity: "Access O(1) · Search O(N)",
    memory: "Contiguous 64-bit Cache Lines",
    glyph: "[ 0x00 | 0x08 | 0x10 | 0x18 ]"
  },
  {
    id: "linked-lists",
    index: "02",
    name: "Linked Lists & Pointers",
    shortTitle: "LISTS",
    category: "Linear",
    tagline: "Dispersed heap nodes and Floyd cycle isolation",
    url: "https://linked-lists-xi.vercel.app/",
    accent: "#7c3aed",
    chipColor: "#e9d5ff",
    complexity: "Insert O(1) · Traversal O(N)",
    memory: "Heap Allocated Pointer Chain",
    glyph: "[ Node* ] -> [ Node* ] -> ∅"
  },
  {
    id: "stacks-queues",
    index: "03",
    name: "Call Stacks & Buffers",
    shortTitle: "STACKS",
    category: "Linear",
    tagline: "LIFO execution frames and circular ring queues",
    url: "https://stacks-queues.vercel.app",
    accent: "#059669",
    chipColor: "#bbf7d0",
    complexity: "Push/Pop O(1) · Enqueue O(1)",
    memory: "RSP Stack Register & Ring Buffer",
    glyph: "RSP -> [ Frame 3 ] [ Frame 2 ]"
  },
  {
    id: "trees",
    index: "04",
    name: "Binary Trees & BSTs",
    shortTitle: "TREES",
    category: "Hierarchical",
    tagline: "Balanced BST invariants and recursive traversals",
    url: "https://trees-eight-omega.vercel.app",
    accent: "#d97706",
    chipColor: "#fef08a",
    complexity: "Balanced O(log N) · Worst O(N)",
    memory: "Recursive Node Hierarchy",
    glyph: "( Root ) -> [ L ] / [ R ]"
  },
  {
    id: "graphs",
    index: "05",
    name: "Graph Networks & Dijkstra",
    shortTitle: "GRAPHS",
    category: "Topological",
    tagline: "Adjacency matrix traversal and priority queue shortest paths",
    url: "https://graphs-steel.vercel.app",
    accent: "#e11d48",
    chipColor: "#fecdd3",
    complexity: "BFS O(V+E) · Dijkstra O(E log V)",
    memory: "Sparse Adjacency Matrix & Heap",
    glyph: "( A ) === ( B ) --- ( C )"
  },
  {
    id: "dp",
    index: "06",
    name: "Dynamic Programming",
    shortTitle: "DP",
    category: "Topological",
    tagline: "DAG state lattices and 1D rolling tabulation",
    url: "https://dp-sigma-one.vercel.app",
    accent: "#4f46e5",
    chipColor: "#c7d2fe",
    complexity: "Pseudo-polynomial O(N * W)",
    memory: "Contiguous DP Memoization Cache",
    glyph: "dp[i][w] = max(dp[i-1], val)"
  }
];

function createTactileCardCanvas(mod: AlgorithmModuleMeta, isSelected: boolean, isHovered: boolean): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.fillStyle = mod.chipColor;
  ctx.fillRect(0, 0, 1024, 1024);

  ctx.lineWidth = isSelected ? 24 : 12;
  ctx.strokeStyle = isSelected ? "#0f172a" : isHovered ? "rgba(15, 23, 42, 0.45)" : "rgba(15, 23, 42, 0.18)";
  ctx.strokeRect(18, 18, 988, 988);

  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 60px sans-serif";
  ctx.fillText(mod.index, 70, 130);

  ctx.fillStyle = "rgba(15, 23, 42, 0.65)";
  ctx.font = "bold 32px monospace";
  ctx.fillText(mod.category.toUpperCase(), 70, 195);

  ctx.fillStyle = isSelected ? "#0f172a" : "rgba(15, 23, 42, 0.25)";
  ctx.fillRect(860, 70, 72, 36);
  ctx.fillStyle = "#d97706";
  ctx.fillRect(868, 78, 56, 20);

  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 112px sans-serif";
  ctx.fillText(mod.shortTitle, 70, 500);

  ctx.fillStyle = "rgba(15, 23, 42, 0.75)";
  ctx.font = "bold 38px monospace";
  ctx.fillText(mod.glyph, 70, 595);

  ctx.fillStyle = "rgba(15, 23, 42, 0.55)";
  ctx.font = "500 40px monospace";
  ctx.fillText(mod.complexity.split("·")[0].trim(), 70, 705);

  ctx.fillStyle = "rgba(15, 23, 42, 0.12)";
  ctx.fillRect(70, 830, 884, 4);

  ctx.fillStyle = "rgba(15, 23, 42, 0.4)";
  ctx.font = "bold 32px monospace";
  ctx.fillText("DSA · LAB SPEC 2026", 70, 910);

  return canvas;
}

interface Props {
  activeId: string;
  viewMode?: "orbit" | "focus" | "top";
  onSelectModule: (id: string) => void;
}

export default function SiliconCrucible3D({ activeId, viewMode = "orbit", onSelectModule }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeIdRef = useRef<string>(activeId);
  activeIdRef.current = activeId;

  const viewModeRef = useRef<"orbit" | "focus" | "top">(viewMode);
  viewModeRef.current = viewMode;

  const onSelectRef = useRef(onSelectModule);
  onSelectRef.current = onSelectModule;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffbf2, 2.6);
    keyLight.position.set(5, 9, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe8f0fe, 1.3);
    fillLight.position.set(-6, 5, -3);
    scene.add(fillLight);

    const activeSpotLight = new THREE.PointLight(0x2563eb, 2.2, 8);
    activeSpotLight.position.set(0, 3, 0);
    scene.add(activeSpotLight);

    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    const slabGeo = new THREE.BoxGeometry(6.4, 0.22, 4.8);
    const slabMat = new THREE.MeshPhysicalMaterial({
      color: 0xf1f3f7,
      metalness: 0.08,
      roughness: 0.45,
      clearcoat: 0.35,
      clearcoatRoughness: 0.2
    });
    const slabMesh = new THREE.Mesh(slabGeo, slabMat);
    slabMesh.position.y = -0.11;
    slabMesh.receiveShadow = true;
    stageGroup.add(slabMesh);

    const shadowGeo = new THREE.PlaneGeometry(14, 12);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.18 });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.23;
    shadowMesh.receiveShadow = true;
    scene.add(shadowMesh);

    const busGroup = new THREE.Group();
    stageGroup.add(busGroup);

    const traceMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.9,
      roughness: 0.2
    });

    const createTrace = (x1: number, z1: number, x2: number, z2: number) => {
      const dx = x2 - x1;
      const dz = z2 - z1;
      const len = Math.hypot(dx, dz);
      const traceGeo = new THREE.BoxGeometry(len, 0.015, 0.035);
      const mesh = new THREE.Mesh(traceGeo, traceMat);
      mesh.position.set((x1 + x2) / 2, 0.005, (z1 + z2) / 2);
      mesh.rotation.y = -Math.atan2(dz, dx);
      busGroup.add(mesh);
    };

    createTrace(-1.95, -0.96, 0, -0.96);
    createTrace(0, -0.96, 1.95, -0.96);
    createTrace(-1.95, 0.96, 0, 0.96);
    createTrace(0, 0.96, 1.95, 0.96);
    createTrace(-1.95, -0.96, -1.95, 0.96);
    createTrace(0, -0.96, 0, 0.96);
    createTrace(1.95, -0.96, 1.95, 0.96);

    const pulseCount = 6;
    const pulseGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const pulses: { mesh: THREE.Mesh; progress: number; p1: THREE.Vector3; p2: THREE.Vector3 }[] = [];

    const traceSegments = [
      { p1: new THREE.Vector3(-1.95, 0.02, -0.96), p2: new THREE.Vector3(0, 0.02, -0.96) },
      { p1: new THREE.Vector3(0, 0.02, -0.96), p2: new THREE.Vector3(1.95, 0.02, -0.96) },
      { p1: new THREE.Vector3(-1.95, 0.02, 0.96), p2: new THREE.Vector3(0, 0.02, 0.96) },
      { p1: new THREE.Vector3(0, 0.02, 0.96), p2: new THREE.Vector3(1.95, 0.02, 0.96) },
      { p1: new THREE.Vector3(-1.95, 0.02, -0.96), p2: new THREE.Vector3(-1.95, 0.02, 0.96) },
      { p1: new THREE.Vector3(1.95, 0.02, -0.96), p2: new THREE.Vector3(1.95, 0.02, 0.96) }
    ];

    traceSegments.forEach((seg, idx) => {
      const pMesh = new THREE.Mesh(pulseGeo, pulseMat);
      busGroup.add(pMesh);
      pulses.push({
        mesh: pMesh,
        progress: idx / pulseCount,
        p1: seg.p1,
        p2: seg.p2
      });
    });

    const cardMeshes: {
      id: string;
      mesh: THREE.Mesh;
      baseX: number;
      baseZ: number;
      baseY: number;
      targetY: number;
      topMat: THREE.MeshPhysicalMaterial;
      mod: AlgorithmModuleMeta;
      texture: THREE.CanvasTexture;
    }[] = [];

    const cardGeo = new THREE.BoxGeometry(1.68, 0.26, 1.68);
    const cols = 3;
    const spacingX = 1.95;
    const spacingZ = 1.92;

    MODULE_SYSTEMS.forEach((mod, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);

      const x = (col - 1) * spacingX;
      const z = (row - 0.5) * spacingZ;

      const isSelected = mod.id === activeIdRef.current;
      const canvas = createTactileCardCanvas(mod, isSelected, false);
      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = 16;
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;

      const sideMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(mod.chipColor).multiplyScalar(0.92),
        metalness: 0.12,
        roughness: 0.35,
        clearcoat: 0.5
      });

      const topMat = new THREE.MeshPhysicalMaterial({
        map: texture,
        metalness: 0.12,
        roughness: 0.32,
        clearcoat: 0.7,
        clearcoatRoughness: 0.18
      });

      const materials = [sideMat, sideMat, topMat, sideMat, sideMat, sideMat];
      const mesh = new THREE.Mesh(cardGeo, materials);
      mesh.position.set(x, 0.13, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { id: mod.id };
      stageGroup.add(mesh);

      cardMeshes.push({
        id: mod.id,
        mesh,
        baseX: x,
        baseZ: z,
        baseY: 0.13,
        targetY: 0.13,
        topMat,
        mod,
        texture
      });
    });

    const updateCardTextures = (activeModId: string, hoveredModId: string | null) => {
      cardMeshes.forEach((item) => {
        const isSel = item.id === activeModId;
        const isHov = item.id === hoveredModId;
        const canvas = createTactileCardCanvas(item.mod, isSel, isHov);
        item.texture.image = canvas;
        item.texture.needsUpdate = true;
      });
    };

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let hoveredId: string | null = null;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = -0.22;
    let targetRotationX = 0.38;

    let parallaxTargetX = 0;
    let parallaxTargetY = 0;

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const rawX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const rawY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.x = rawX;
      mouse.y = rawY;

      parallaxTargetX = rawX * 0.12;
      parallaxTargetY = rawY * 0.08;

      if (isDragging) {
        const dx = e.clientX - prevMouseX;
        const dy = e.clientY - prevMouseY;
        targetRotationY += dx * 0.006;
        targetRotationX = Math.max(0.12, Math.min(0.65, targetRotationX + dy * 0.005));
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onClick = () => {
      if (hoveredId) {
        onSelectRef.current(hoveredId);
        updateCardTextures(hoveredId, hoveredId);
      }
    };

    container.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);
    container.addEventListener("click", onClick);

    let animId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      animId = requestAnimationFrame(animate);
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const currentMode = viewModeRef.current;
      const activeItem = cardMeshes.find((c) => c.id === activeIdRef.current) || cardMeshes[0];

      let camTargetX = 0;
      let camTargetY = 4.5;
      let camTargetZ = 7.5;
      let lookTargetX = 0;
      let lookTargetY = -0.15;
      let lookTargetZ = 0;

      if (currentMode === "focus") {
        camTargetX = activeItem.baseX * 0.45;
        camTargetY = 3.2;
        camTargetZ = 5.2;
        lookTargetX = activeItem.baseX * 0.55;
        lookTargetZ = activeItem.baseZ * 0.55;
      } else if (currentMode === "top") {
        camTargetX = 0;
        camTargetY = 8.5;
        camTargetZ = 0.5;
        lookTargetX = 0;
        lookTargetY = 0;
        lookTargetZ = 0;
      }

      camera.position.x = THREE.MathUtils.damp(camera.position.x, camTargetX, 4, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, camTargetY, 4, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, camTargetZ, 4, delta);
      camera.lookAt(lookTargetX, lookTargetY, lookTargetZ);

      if (!isDragging && currentMode === "orbit") {
        targetRotationY += 0.0012;
      }

      const combinedTargetY = targetRotationY + parallaxTargetX;
      const combinedTargetX = targetRotationX - parallaxTargetY;

      stageGroup.rotation.y = THREE.MathUtils.damp(stageGroup.rotation.y, combinedTargetY, 4, delta);
      stageGroup.rotation.x = THREE.MathUtils.damp(stageGroup.rotation.x, combinedTargetX, 4, delta);

      pulses.forEach((pulse) => {
        pulse.progress = (pulse.progress + delta * 0.6) % 1.0;
        pulse.mesh.position.lerpVectors(pulse.p1, pulse.p2, pulse.progress);
      });

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cardMeshes.map((b) => b.mesh));

      let newlyHovered: string | null = null;
      if (intersects.length > 0) {
        newlyHovered = intersects[0].object.userData.id;
        container.style.cursor = "pointer";
      } else {
        newlyHovered = null;
        container.style.cursor = isDragging ? "grabbing" : "grab";
      }

      if (newlyHovered !== hoveredId) {
        hoveredId = newlyHovered;
        updateCardTextures(activeIdRef.current, hoveredId);
      }

      activeSpotLight.position.x = THREE.MathUtils.damp(activeSpotLight.position.x, activeItem.mesh.position.x, 6, delta);
      activeSpotLight.position.z = THREE.MathUtils.damp(activeSpotLight.position.z, activeItem.mesh.position.z, 6, delta);

      cardMeshes.forEach((item) => {
        const isActive = item.id === activeIdRef.current;
        const isHovered = item.id === hoveredId;

        item.targetY = isActive ? item.baseY + 0.38 : isHovered ? item.baseY + 0.18 : item.baseY;
        item.mesh.position.y = THREE.MathUtils.damp(item.mesh.position.y, item.targetY, 9, delta);
      });

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      container.removeEventListener("click", onClick);

      cardMeshes.forEach((item) => {
        item.texture.dispose();
      });

      scene.clear();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[520px] sm:min-h-[600px] lg:min-h-[680px] select-none flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full absolute inset-0" />
    </div>
  );
}
