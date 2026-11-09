"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export interface AlgorithmFacetMeta {
  id: string;
  index: string;
  name: string;
  symbol: string;
  category: string;
  tagline: string;
  url: string;
  accent: string;
  accentHex: number;
  complexity: string;
}

export const ALGORITHM_FACETS: AlgorithmFacetMeta[] = [
  {
    id: "arrays",
    index: "01",
    name: "Contiguous RAM & Arrays",
    symbol: "[ ]",
    category: "Linear Memory",
    tagline: "Sequential cache lines and two-pointer convergence across flat memory buffers.",
    url: "https://arrays-rho.vercel.app",
    accent: "#38bdf8",
    accentHex: 0x38bdf8,
    complexity: "Access O(1) · Search O(N)"
  },
  {
    id: "linked-lists",
    index: "02",
    name: "Linked Lists & Pointers",
    symbol: "*->",
    category: "Heap Pointers",
    tagline: "Dispersed node allocation and Floyd cycle detection across heap addresses.",
    url: "https://linked-lists-xi.vercel.app/",
    accent: "#a855f7",
    accentHex: 0xa855f7,
    complexity: "Insert O(1) · Traversal O(N)"
  },
  {
    id: "stacks-queues",
    index: "03",
    name: "Call Stacks & Buffers",
    symbol: "▲▼",
    category: "Execution Frames",
    tagline: "LIFO execution frame registers and circular FIFO ring buffers.",
    url: "https://stacks-queues.vercel.app",
    accent: "#10b981",
    accentHex: 0x10b981,
    complexity: "Push/Pop O(1) · Enqueue O(1)"
  },
  {
    id: "trees",
    index: "04",
    name: "Binary Trees & BSTs",
    symbol: "⑂",
    category: "Hierarchical",
    tagline: "Balanced BST invariants, recursive traversals, and lowest common ancestors.",
    url: "https://trees-eight-omega.vercel.app",
    accent: "#f59e0b",
    accentHex: 0xf59e0b,
    complexity: "Balanced O(log N) · Worst O(N)"
  },
  {
    id: "graphs",
    index: "05",
    name: "Graph Networks & Dijkstra",
    symbol: "☊",
    category: "Topological",
    tagline: "Adjacency matrix graph traversal and priority-queue shortest path solving.",
    url: "https://graphs-steel.vercel.app",
    accent: "#f43f5e",
    accentHex: 0xf43f5e,
    complexity: "BFS O(V+E) · Dijkstra O(E log V)"
  },
  {
    id: "dp",
    index: "06",
    name: "Dynamic Programming",
    symbol: "⊞",
    category: "State Matrix",
    tagline: "DAG subproblem state lattices and 1D rolling memory tabulation.",
    url: "https://dp-sigma-one.vercel.app",
    accent: "#6366f1",
    accentHex: 0x6366f1,
    complexity: "Pseudo-polynomial O(N * W)"
  }
];

interface Props {
  activeId: string;
  onSelectFacet: (id: string) => void;
}

export default function AlgorithmPrism3D({ activeId, onSelectFacet }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeIdRef = useRef(activeId);
  activeIdRef.current = activeId;
  const onSelectRef = useRef(onSelectFacet);
  onSelectRef.current = onSelectFacet;

  const targetYawRef = useRef(0);
  const targetPitchRef = useRef(0.2);

  useEffect(() => {
    const idx = ALGORITHM_FACETS.findIndex((f) => f.id === activeId);
    if (idx >= 0) {
      const angle = (idx * (2 * Math.PI)) / ALGORITHM_FACETS.length;
      targetYawRef.current = -angle;
      targetPitchRef.current = 0.15;
    }
  }, [activeId]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);
    camera.lookAt(0, 0, 0);

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
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Studio Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8ee, 2.4);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xecf2fe, 1.2);
    fillLight.position.set(-6, -3, 4);
    scene.add(fillLight);

    const prismGroup = new THREE.Group();
    scene.add(prismGroup);

    // Central Frosted Crystalline Hexagonal Core
    const coreGeo = new THREE.CylinderGeometry(2.1, 2.1, 2.3, 6);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.75,
      opacity: 1,
      transparent: true,
      roughness: 0.18,
      ior: 1.5,
      thickness: 1.2,
      specularIntensity: 0.9,
      clearcoat: 0.8
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    prismGroup.add(coreMesh);

    // Ground shadow
    const groundGeo = new THREE.PlaneGeometry(10, 10);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.12 });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -2.1;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // 6 Facet Plates mounted on the hexagonal faces
    const facetMeshes: {
      id: string;
      mesh: THREE.Mesh;
      baseRadius: number;
      targetOffset: number;
      currentOffset: number;
      mat: THREE.MeshPhysicalMaterial;
      angle: number;
    }[] = [];

    const plateGeo = new THREE.BoxGeometry(1.6, 1.8, 0.14);
    const radius = 1.88;

    ALGORITHM_FACETS.forEach((facet, idx) => {
      const angle = (idx * (2 * Math.PI)) / ALGORITHM_FACETS.length;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      const plateMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.05,
        roughness: 0.22,
        clearcoat: 0.9,
        clearcoatRoughness: 0.1
      });

      const plate = new THREE.Mesh(plateGeo, plateMat);
      plate.position.set(x, 0, z);
      plate.rotation.y = angle;
      plate.userData = { id: facet.id, angle };
      prismGroup.add(plate);

      // Accent border outline
      const borderGeo = new THREE.BoxGeometry(1.68, 1.88, 0.04);
      const borderMat = new THREE.MeshStandardMaterial({
        color: facet.accentHex,
        metalness: 0.4,
        roughness: 0.3
      });
      const border = new THREE.Mesh(borderGeo, borderMat);
      border.position.z = -0.06;
      plate.add(border);

      // Embedded LED dot
      const ledGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.06, 16);
      const ledMat = new THREE.MeshBasicMaterial({ color: facet.accentHex });
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.rotation.x = Math.PI / 2;
      led.position.set(0.55, 0.65, 0.08);
      plate.add(led);

      facetMeshes.push({
        id: facet.id,
        mesh: plate,
        baseRadius: radius,
        targetOffset: 0,
        currentOffset: 0,
        mat: plateMat,
        angle
      });
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let hoveredId: string | null = null;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let velocityY = 0;
    let velocityX = 0;

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      velocityY = 0;
      velocityX = 0;
    };

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const dx = e.clientX - prevMouseX;
        const dy = e.clientY - prevMouseY;
        targetYawRef.current += dx * 0.007;
        targetPitchRef.current = Math.max(-0.4, Math.min(0.5, targetPitchRef.current - dy * 0.005));
        velocityY = dx * 0.003;
        velocityX = -dy * 0.002;
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
        velocityY *= 0.94;
        velocityX *= 0.94;
        targetYawRef.current += velocityY;
        targetPitchRef.current = Math.max(-0.4, Math.min(0.5, targetPitchRef.current + velocityX));

        if (Math.abs(velocityY) < 0.0005) {
          targetYawRef.current += 0.0015;
        }
      }

      prismGroup.rotation.y = THREE.MathUtils.damp(prismGroup.rotation.y, targetYawRef.current, 5, delta);
      prismGroup.rotation.x = THREE.MathUtils.damp(prismGroup.rotation.x, targetPitchRef.current, 5, delta);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(facetMeshes.map((f) => f.mesh));

      if (intersects.length > 0) {
        hoveredId = intersects[0].object.userData.id;
        container.style.cursor = "pointer";
      } else {
        hoveredId = null;
        container.style.cursor = isDragging ? "grabbing" : "grab";
      }

      facetMeshes.forEach((item) => {
        const isActive = item.id === activeIdRef.current;
        const isHovered = item.id === hoveredId;

        item.targetOffset = isActive ? 0.32 : isHovered ? 0.16 : 0;
        item.currentOffset = THREE.MathUtils.damp(item.currentOffset, item.targetOffset, 8, delta);

        const currentR = item.baseRadius + item.currentOffset;
        item.mesh.position.x = Math.sin(item.angle) * currentR;
        item.mesh.position.z = Math.cos(item.angle) * currentR;

        if (isActive) {
          item.mat.color.setHex(0xfbfcfe);
          item.mat.roughness = 0.12;
        } else {
          item.mat.color.setHex(0xf4f5f8);
          item.mat.roughness = 0.22;
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

      scene.clear();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[480px] sm:h-[540px] select-none flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
}
