"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export interface AlgorithmModuleMeta {
  id: string;
  index: string;
  name: string;
  category: string;
  tagline: string;
  url: string;
  accent: string;
  chipColor: number;
  complexity: string;
  memory: string;
}

export const MODULE_SYSTEMS: AlgorithmModuleMeta[] = [
  {
    id: "arrays",
    index: "01",
    name: "Contiguous RAM & Arrays",
    category: "Linear",
    tagline: "Sequential cache lines and two-pointer convergence",
    url: "https://arrays-rho.vercel.app",
    accent: "#2563eb",
    chipColor: 0x93c5fd, // Soft pastel sky blue
    complexity: "Access O(1) · Search O(N)",
    memory: "Contiguous 64-bit Cache Lines"
  },
  {
    id: "linked-lists",
    index: "02",
    name: "Linked Lists & Pointers",
    category: "Linear",
    tagline: "Dispersed heap nodes and Floyd cycle isolation",
    url: "https://linked-lists-xi.vercel.app/",
    accent: "#7c3aed",
    chipColor: 0xd8b4fe, // Soft pastel lilac
    complexity: "Insert O(1) · Traversal O(N)",
    memory: "Heap Allocated Pointer Chain"
  },
  {
    id: "stacks-queues",
    index: "03",
    name: "Call Stacks & Buffers",
    category: "Linear",
    tagline: "LIFO execution frames and circular ring queues",
    url: "https://stacks-queues.vercel.app",
    accent: "#059669",
    chipColor: 0x86efac, // Soft pastel mint
    complexity: "Push/Pop O(1) · Enqueue O(1)",
    memory: "RSP Stack Register & Ring Buffer"
  },
  {
    id: "trees",
    index: "04",
    name: "Binary Trees & BSTs",
    category: "Hierarchical",
    tagline: "Balanced BST invariants and recursive traversals",
    url: "https://trees-eight-omega.vercel.app",
    accent: "#d97706",
    chipColor: 0xfde047, // Soft pastel warm amber
    complexity: "Balanced O(log N) · Worst O(N)",
    memory: "Recursive Node Hierarchy"
  },
  {
    id: "graphs",
    index: "05",
    name: "Graph Networks & Dijkstra",
    category: "Topological",
    tagline: "Adjacency matrix traversal and priority queue shortest paths",
    url: "https://graphs-steel.vercel.app",
    accent: "#e11d48",
    chipColor: 0xfda4af, // Soft pastel rose
    complexity: "BFS O(V+E) · Dijkstra O(E log V)",
    memory: "Sparse Adjacency Matrix & Heap"
  },
  {
    id: "dp",
    index: "06",
    name: "Dynamic Programming",
    category: "Topological",
    tagline: "DAG state lattices and 1D rolling tabulation",
    url: "https://dp-sigma-one.vercel.app",
    accent: "#4f46e5",
    chipColor: 0xc7d2fe, // Soft pastel indigo
    complexity: "Pseudo-polynomial O(N * W)",
    memory: "Contiguous DP Memoization Cache"
  }
];

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

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 4.8, 7.6);
    camera.lookAt(0, -0.2, 0);

    // Renderer with soft studio light settings
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffbf2, 2.2);
    keyLight.position.set(5, 9, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe8f0fe, 1.1);
    fillLight.position.set(-6, 5, -3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffffff, 0.8, 15);
    rimLight.position.set(0, 6, -5);
    scene.add(rimLight);

    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    // Soft Ceramic Substrate Slab
    const slabGeo = new THREE.BoxGeometry(5.2, 0.22, 3.8);
    const slabMat = new THREE.MeshPhysicalMaterial({
      color: 0xf4f5f8,
      metalness: 0.1,
      roughness: 0.45,
      clearcoat: 0.3,
      clearcoatRoughness: 0.2
    });
    const slabMesh = new THREE.Mesh(slabGeo, slabMat);
    slabMesh.position.y = -0.11;
    slabMesh.receiveShadow = true;
    stageGroup.add(slabMesh);

    // Diffuse Ground Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(12, 10);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.15 });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.23;
    shadowMesh.receiveShadow = true;
    scene.add(shadowMesh);

    // 6 Tactile Ceramic Memory Chips (2 rows x 3 columns)
    const chipMeshes: {
      id: string;
      mesh: THREE.Mesh;
      baseY: number;
      targetY: number;
      mat: THREE.MeshPhysicalMaterial;
    }[] = [];

    const chipGeo = new THREE.BoxGeometry(1.35, 0.32, 1.35);
    const cols = 3;
    const spacingX = 1.6;
    const spacingZ = 1.65;

    MODULE_SYSTEMS.forEach((mod, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);

      const x = (col - 1) * spacingX;
      const z = (row - 0.5) * spacingZ;

      const mat = new THREE.MeshPhysicalMaterial({
        color: mod.chipColor,
        metalness: 0.15,
        roughness: 0.35,
        clearcoat: 0.6,
        clearcoatRoughness: 0.2
      });

      const chip = new THREE.Mesh(chipGeo, mat);
      chip.position.set(x, 0.16, z);
      chip.castShadow = true;
      chip.receiveShadow = true;
      chip.userData = { id: mod.id };
      stageGroup.add(chip);

      // Tactile top label indicator dot
      const dotGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.04, 16);
      const dotMat = new THREE.MeshStandardMaterial({
        color: 0x18181b,
        metalness: 0.3,
        roughness: 0.2
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(0.42, 0.17, -0.42);
      chip.add(dot);

      chipMeshes.push({
        id: mod.id,
        mesh: chip,
        baseY: 0.16,
        targetY: 0.16,
        mat
      });
    });

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
      const intersects = raycaster.intersectObjects(chipMeshes.map((b) => b.mesh));

      if (intersects.length > 0) {
        hoveredId = intersects[0].object.userData.id;
        container.style.cursor = "pointer";
      } else {
        hoveredId = null;
        container.style.cursor = isDragging ? "grabbing" : "grab";
      }

      chipMeshes.forEach((item) => {
        const isActive = item.id === activeIdRef.current;
        const isHovered = item.id === hoveredId;

        item.targetY = isActive ? item.baseY + 0.38 : isHovered ? item.baseY + 0.18 : item.baseY;
        item.mesh.position.y = THREE.MathUtils.damp(item.mesh.position.y, item.targetY, 9, delta);

        const targetRoughness = isActive ? 0.18 : isHovered ? 0.25 : 0.35;
        item.mat.roughness = THREE.MathUtils.damp(item.mat.roughness, targetRoughness, 6, delta);
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

      scene.clear();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[460px] sm:h-[500px] select-none flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
}
