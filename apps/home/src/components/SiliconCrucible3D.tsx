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
  accentHex: number;
  complexity: string;
  memory: string;
  schematic: string;
  codeSnippet: string;
}

export const MODULE_SYSTEMS: AlgorithmModuleMeta[] = [
  {
    id: "arrays",
    index: "01",
    name: "Contiguous RAM & Arrays",
    shortTitle: "Contiguous Arrays",
    category: "Linear",
    tagline: "Sequential cache lines and two-pointer convergence",
    url: "https://arrays-rho.vercel.app",
    accent: "#38bdf8",
    accentHex: 0x38bdf8,
    complexity: "Access O(1) · Search O(N)",
    memory: "Contiguous 64-bit Cache Lines",
    schematic: "[ 0x00 | 0x08 | 0x10 | 0x18 ]",
    codeSnippet: "arr[i] = *(base + i * 8)"
  },
  {
    id: "linked-lists",
    index: "02",
    name: "Linked Lists & Pointers",
    shortTitle: "Linked Lists",
    category: "Linear",
    tagline: "Dispersed heap nodes and Floyd cycle isolation",
    url: "https://linked-lists-xi.vercel.app/",
    accent: "#c084fc",
    accentHex: 0xc084fc,
    complexity: "Insert O(1) · Traversal O(N)",
    memory: "Heap Allocated Pointer Chain",
    schematic: "[ Node* ] -> [ Node* ] -> NULL",
    codeSnippet: "curr = curr->next"
  },
  {
    id: "stacks-queues",
    index: "03",
    name: "Call Stacks & Buffers",
    shortTitle: "Call Stacks",
    category: "Linear",
    tagline: "LIFO execution frames and circular ring queues",
    url: "https://stacks-queues.vercel.app",
    accent: "#34d399",
    accentHex: 0x34d399,
    complexity: "Push/Pop O(1) · Enqueue O(1)",
    memory: "RSP Stack Register & Ring Buffer",
    schematic: "RSP -> [ Frame 3 ] [ Frame 2 ]",
    codeSnippet: "push(rbp); mov(rsp, rbp)"
  },
  {
    id: "trees",
    index: "04",
    name: "Binary Trees & BSTs",
    shortTitle: "Binary Trees",
    category: "Hierarchical",
    tagline: "Balanced BST invariants and recursive traversals",
    url: "https://trees-eight-omega.vercel.app",
    accent: "#fbbf24",
    accentHex: 0xfbbf24,
    complexity: "Balanced O(log N) · Worst O(N)",
    memory: "Recursive Node Hierarchy",
    schematic: "( Root ) -> [ Left ] / [ Right ]",
    codeSnippet: "left < node.val <= right"
  },
  {
    id: "graphs",
    index: "05",
    name: "Graph Networks & Dijkstra",
    shortTitle: "Graph Networks",
    category: "Topological",
    tagline: "Adjacency matrix traversal and priority queue shortest paths",
    url: "https://graphs-steel.vercel.app",
    accent: "#fb7185",
    accentHex: 0xfb7185,
    complexity: "BFS O(V+E) · Dijkstra O(E log V)",
    memory: "Sparse Adjacency Matrix & Heap",
    schematic: "( A ) === ( B ) --- ( C )",
    codeSnippet: "dist[v] = min(dist[v], d+w)"
  },
  {
    id: "dp",
    index: "06",
    name: "Dynamic Programming",
    shortTitle: "Dynamic Prog.",
    category: "Topological",
    tagline: "DAG state lattices and 1D rolling tabulation",
    url: "https://dp-sigma-one.vercel.app",
    accent: "#818cf8",
    accentHex: 0x818cf8,
    complexity: "Pseudo-polynomial O(N * W)",
    memory: "Contiguous DP Memoization Cache",
    schematic: "dp[i][w] = max(dp[i-1], val)",
    codeSnippet: "memo[k] ??= solve(sub)"
  }
];

function createTopicCardCanvas(mod: AlgorithmModuleMeta, isSelected: boolean, isHovered: boolean): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 768;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  // Background gradient (rich dark slate with subtle depth)
  const bgGrad = ctx.createLinearGradient(0, 0, 1024, 768);
  if (isSelected) {
    bgGrad.addColorStop(0, "#131926");
    bgGrad.addColorStop(1, "#0c1018");
  } else if (isHovered) {
    bgGrad.addColorStop(0, "#161b26");
    bgGrad.addColorStop(1, "#0e121a");
  } else {
    bgGrad.addColorStop(0, "#10141d");
    bgGrad.addColorStop(1, "#0a0c12");
  }

  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 768);

  // Outer border
  ctx.lineWidth = isSelected ? 12 : 6;
  ctx.strokeStyle = isSelected ? mod.accent : isHovered ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)";
  ctx.strokeRect(20, 20, 984, 728);

  // Top accent bar
  ctx.fillStyle = mod.accent;
  ctx.fillRect(20, 20, 984, 18);

  // Header: Index & Category Pill
  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  ctx.beginPath();
  ctx.roundRect(60, 75, 220, 56, 28);
  ctx.fill();

  ctx.fillStyle = mod.accent;
  ctx.font = "bold 26px sans-serif";
  ctx.fillText(`${mod.index} · ${mod.category.toUpperCase()}`, 82, 112);

  // Status LED dot
  ctx.beginPath();
  ctx.arc(930, 102, 14, 0, Math.PI * 2);
  ctx.fillStyle = isSelected ? mod.accent : "rgba(255,255,255,0.3)";
  ctx.fill();
  if (isSelected) {
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
  }

  // Topic Title
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 64px sans-serif";
  ctx.fillText(mod.shortTitle, 60, 220);

  // Complexity & Memory Tag
  ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
  ctx.font = "500 32px monospace";
  ctx.fillText(mod.complexity, 60, 285);

  // Schematic / Code Box
  ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
  ctx.beginPath();
  ctx.roundRect(60, 340, 904, 250, 20);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.stroke();

  // Box Header
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.font = "bold 22px monospace";
  ctx.fillText("HARDWARE TOPOLOGY / INVARIANT", 90, 385);

  // Schematic content
  ctx.fillStyle = mod.accent;
  ctx.font = "bold 38px monospace";
  ctx.fillText(mod.schematic, 90, 460);

  // Code snippet
  ctx.fillStyle = "#e2e8f0";
  ctx.font = "32px monospace";
  ctx.fillText(mod.codeSnippet, 90, 535);

  // Footer Tagline
  ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
  ctx.font = "400 28px sans-serif";
  ctx.fillText(mod.tagline, 60, 660);

  // Corner grid marks
  ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
  ctx.font = "bold 20px monospace";
  ctx.fillText("DSA-UNIVERSE · CORE-SYS", 710, 660);

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
    camera.position.set(0, 5.2, 7.8);
    camera.lookAt(0, -0.3, 0);

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
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x181e2b, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(5, 9, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    fillLight.position.set(-6, 5, -3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffffff, 0.9, 15);
    rimLight.position.set(0, 6, -5);
    scene.add(rimLight);

    // Active Accent Point Light
    const activePointLight = new THREE.PointLight(0x38bdf8, 2.5, 8);
    activePointLight.position.set(0, 2.5, 0);
    scene.add(activePointLight);

    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    // Dark Titanium Substrate Base Slab
    const slabGeo = new THREE.BoxGeometry(6.4, 0.22, 4.4);
    const slabMat = new THREE.MeshPhysicalMaterial({
      color: 0x0e1118,
      metalness: 0.85,
      roughness: 0.35,
      clearcoat: 0.4,
      clearcoatRoughness: 0.2
    });
    const slabMesh = new THREE.Mesh(slabGeo, slabMat);
    slabMesh.position.y = -0.11;
    slabMesh.receiveShadow = true;
    stageGroup.add(slabMesh);

    // Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(14, 12);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.35 });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.23;
    shadowMesh.receiveShadow = true;
    scene.add(shadowMesh);

    // 6 Topic Card Meshes (2 rows x 3 columns)
    const cardMeshes: {
      id: string;
      mesh: THREE.Mesh;
      baseY: number;
      targetY: number;
      topMat: THREE.MeshPhysicalMaterial;
      sideMat: THREE.MeshPhysicalMaterial;
      mod: AlgorithmModuleMeta;
      texture: THREE.CanvasTexture;
    }[] = [];

    const cardGeo = new THREE.BoxGeometry(1.82, 0.22, 1.38);
    const cols = 3;
    const spacingX = 2.0;
    const spacingZ = 1.62;

    MODULE_SYSTEMS.forEach((mod, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);

      const x = (col - 1) * spacingX;
      const z = (row - 0.5) * spacingZ;

      const isSelected = mod.id === activeIdRef.current;
      const canvas = createTopicCardCanvas(mod, isSelected, false);
      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = 8;

      const sideMat = new THREE.MeshPhysicalMaterial({
        color: 0x141824,
        metalness: 0.8,
        roughness: 0.3,
        clearcoat: 0.4
      });

      const topMat = new THREE.MeshPhysicalMaterial({
        map: texture,
        metalness: 0.2,
        roughness: 0.35,
        clearcoat: 0.6,
        clearcoatRoughness: 0.2
      });

      // BoxGeometry material array: [right, left, top, bottom, front, back]
      const materials = [sideMat, sideMat, topMat, sideMat, sideMat, sideMat];
      const mesh = new THREE.Mesh(cardGeo, materials);
      mesh.position.set(x, 0.11, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { id: mod.id };
      stageGroup.add(mesh);

      cardMeshes.push({
        id: mod.id,
        mesh,
        baseY: 0.11,
        targetY: 0.11,
        topMat,
        sideMat,
        mod,
        texture
      });
    });

    const updateCardTextures = (activeModId: string, hoveredModId: string | null) => {
      cardMeshes.forEach((item) => {
        const isSel = item.id === activeModId;
        const isHov = item.id === hoveredModId;
        const canvas = createTopicCardCanvas(item.mod, isSel, isHov);
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

      const activeMod = MODULE_SYSTEMS.find((m) => m.id === activeIdRef.current);
      if (activeMod) {
        activePointLight.color.setHex(activeMod.accentHex);
      }

      cardMeshes.forEach((item) => {
        const isActive = item.id === activeIdRef.current;
        const isHovered = item.id === hoveredId;

        item.targetY = isActive ? item.baseY + 0.38 : isHovered ? item.baseY + 0.18 : item.baseY;
        item.mesh.position.y = THREE.MathUtils.damp(item.mesh.position.y, item.targetY, 9, delta);

        if (isActive) {
          activePointLight.position.x = THREE.MathUtils.damp(activePointLight.position.x, item.mesh.position.x, 8, delta);
          activePointLight.position.z = THREE.MathUtils.damp(activePointLight.position.z, item.mesh.position.z, 8, delta);
        }
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
    <div className="relative w-full h-[480px] sm:h-[520px] select-none flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
}
