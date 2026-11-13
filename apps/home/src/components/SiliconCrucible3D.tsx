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
    chipColor: "#bfdbfe", // Soft sky blue ceramic
    complexity: "Access O(1) · Search O(N)",
    memory: "Contiguous 64-bit Cache Lines"
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
    chipColor: "#e9d5ff", // Soft lilac ceramic
    complexity: "Insert O(1) · Traversal O(N)",
    memory: "Heap Allocated Pointer Chain"
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
    chipColor: "#bbf7d0", // Soft mint ceramic
    complexity: "Push/Pop O(1) · Enqueue O(1)",
    memory: "RSP Stack Register & Ring Buffer"
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
    chipColor: "#fef08a", // Soft amber ceramic
    complexity: "Balanced O(log N) · Worst O(N)",
    memory: "Recursive Node Hierarchy"
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
    chipColor: "#fecdd3", // Soft rose ceramic
    complexity: "BFS O(V+E) · Dijkstra O(E log V)",
    memory: "Sparse Adjacency Matrix & Heap"
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
    chipColor: "#c7d2fe", // Soft indigo ceramic
    complexity: "Pseudo-polynomial O(N * W)",
    memory: "Contiguous DP Memoization Cache"
  }
];

function createCleanCardCanvas(mod: AlgorithmModuleMeta, isSelected: boolean, isHovered: boolean): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  // Solid clean pastel background
  ctx.fillStyle = mod.chipColor;
  ctx.fillRect(0, 0, 512, 512);

  // Subtle clean border
  ctx.lineWidth = isSelected ? 16 : 8;
  ctx.strokeStyle = isSelected ? "#0f172a" : isHovered ? "rgba(15, 23, 42, 0.4)" : "rgba(15, 23, 42, 0.15)";
  ctx.strokeRect(8, 8, 496, 496);

  // Top Index Badge
  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 32px sans-serif";
  ctx.fillText(mod.index, 40, 72);

  // Category Tag
  ctx.fillStyle = "rgba(15, 23, 42, 0.65)";
  ctx.font = "bold 20px monospace";
  ctx.fillText(mod.category.toUpperCase(), 40, 108);

  // Status indicator dot
  ctx.beginPath();
  ctx.arc(460, 64, 14, 0, Math.PI * 2);
  ctx.fillStyle = isSelected ? "#0f172a" : "rgba(15, 23, 42, 0.25)";
  ctx.fill();

  // Primary Bold Short Title (e.g. ARRAYS, LISTS, STACKS)
  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 64px sans-serif";
  ctx.fillText(mod.shortTitle, 40, 280);

  // Subtitle / category indicator
  ctx.fillStyle = "rgba(15, 23, 42, 0.6)";
  ctx.font = "500 24px monospace";
  ctx.fillText(mod.complexity.split("·")[0].trim(), 40, 330);

  // Bottom corner branding
  ctx.fillStyle = "rgba(15, 23, 42, 0.35)";
  ctx.font = "bold 18px monospace";
  ctx.fillText("DSA · 2026", 40, 460);

  return canvas;
}

interface Props {
  activeId: string;
  onSelectModule: (id: string) => void;
}

export default function SiliconCrucible3D({ activeId, onSelectModule }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeIdRef = useRef<string>(activeId);
  activeIdRef.current = activeId;

  const onSelectRef = useRef(onSelectModule);
  onSelectRef.current = onSelectModule;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 4.8, 7.6);
    camera.lookAt(0, -0.2, 0);

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

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffbf2, 2.4);
    keyLight.position.set(5, 9, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe8f0fe, 1.2);
    fillLight.position.set(-6, 5, -3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffffff, 0.8, 15);
    rimLight.position.set(0, 6, -5);
    scene.add(rimLight);

    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    // Soft Ceramic Substrate Base Slab
    const slabGeo = new THREE.BoxGeometry(5.8, 0.22, 4.2);
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

    // Diffuse Ground Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(14, 12);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.16 });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.23;
    shadowMesh.receiveShadow = true;
    scene.add(shadowMesh);

    // 6 Tactile Ceramic Cards (2 rows x 3 columns)
    const cardMeshes: {
      id: string;
      mesh: THREE.Mesh;
      baseY: number;
      targetY: number;
      topMat: THREE.MeshPhysicalMaterial;
      mod: AlgorithmModuleMeta;
      texture: THREE.CanvasTexture;
    }[] = [];

    const cardGeo = new THREE.BoxGeometry(1.58, 0.26, 1.58);
    const cols = 3;
    const spacingX = 1.82;
    const spacingZ = 1.78;

    MODULE_SYSTEMS.forEach((mod, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);

      const x = (col - 1) * spacingX;
      const z = (row - 0.5) * spacingZ;

      const isSelected = mod.id === activeIdRef.current;
      const canvas = createCleanCardCanvas(mod, isSelected, false);
      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = 8;

      const sideMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(mod.chipColor).multiplyScalar(0.92),
        metalness: 0.1,
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
        const canvas = createCleanCardCanvas(item.mod, isSel, isHov);
        item.texture.image = canvas;
        item.texture.needsUpdate = true;
      });
    };

    // Raycasting & Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let hoveredId: string | null = null;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = -0.22;
    let targetRotationX = 0.38;

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

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

      if (!isDragging) {
        targetRotationY += 0.0012;
      }

      stageGroup.rotation.y = THREE.MathUtils.damp(stageGroup.rotation.y, targetRotationY, 4, delta);
      stageGroup.rotation.x = THREE.MathUtils.damp(stageGroup.rotation.x, targetRotationX, 4, delta);

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
    <div className="relative w-full h-[480px] sm:h-[560px] select-none flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
}
