"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Grip } from "lucide-react";

export interface AlgorithmRealmMeta {
  id: string;
  index: string;
  name: string;
  category: string;
  tagline: string;
  url: string;
  accent: string;
  colorHex: number;
  complexity: string;
  spaceComplexity: string;
  topology: string;
  overview: string;
}

export const REALM_SYSTEMS: AlgorithmRealmMeta[] = [
  {
    id: "arrays",
    index: "01",
    name: "Contiguous RAM & Arrays",
    category: "Linear Memory",
    tagline: "Sequential cache lines and two-pointer binary convergence",
    url: "https://arrays-rho.vercel.app",
    accent: "#2563eb",
    colorHex: 0x3b82f6,
    complexity: "Access O(1) · Search O(log N)",
    spaceComplexity: "O(1) Auxiliary",
    topology: "Contiguous 64-Byte Cache Lines",
    overview: "Hardware-level memory modeling exploring CPU cache locality, sequential prefetching, and two-pointer array partitions."
  },
  {
    id: "linked-lists",
    index: "02",
    name: "Linked Lists & Pointers",
    category: "Heap Pointers",
    tagline: "Dispersed heap nodes and Floyd cycle isolation algorithm",
    url: "https://linked-lists-xi.vercel.app/",
    accent: "#7c3aed",
    colorHex: 0x8b5cf6,
    complexity: "Insert O(1) · Traversal O(N)",
    spaceComplexity: "O(N) Pointer Overhead",
    topology: "Dispersed Heap Node Chain",
    overview: "Dynamic pointer traversal across scattered heap addresses, pointer mutation safety, and fast/slow runner cycle traps."
  },
  {
    id: "stacks-queues",
    index: "03",
    name: "Call Stacks & Buffers",
    category: "Execution Registers",
    tagline: "LIFO activation records and circular ring queue buffers",
    url: "https://stacks-queues.vercel.app",
    accent: "#059669",
    colorHex: 0x10b981,
    complexity: "Push O(1) · Pop O(1)",
    spaceComplexity: "O(K) Frame Depth",
    topology: "RSP Stack Register / Ring Array",
    overview: "CPU execution frame mechanics, stack overflow safety bounds, and amortized circular queue ring buffers."
  },
  {
    id: "trees",
    index: "04",
    name: "Binary Trees & BSTs",
    category: "Hierarchical",
    tagline: "Balanced BST invariants and recursive logarithmic pathfinding",
    url: "https://trees-eight-omega.vercel.app",
    accent: "#d97706",
    colorHex: 0xf59e0b,
    complexity: "Search O(log N) · Insert O(log N)",
    spaceComplexity: "O(H) Recursion Stack",
    topology: "Balanced Hierarchical Tree",
    overview: "Logarithmic search invariants, AVL self-balancing rotations, and recursive depth-first tree traversals."
  },
  {
    id: "graphs",
    index: "05",
    name: "Graph Networks & Dijkstra",
    category: "Topological",
    tagline: "Adjacency matrix traversal and min-heap shortest paths",
    url: "https://graphs-steel.vercel.app",
    accent: "#e11d48",
    colorHex: 0xf43f5e,
    complexity: "Dijkstra O((V + E) log V)",
    spaceComplexity: "O(V + E) Adjacency Storage",
    topology: "Topological Constellation",
    overview: "Weighted graph edge relaxation, priority queue wavefronts, and cycle isolation across sparse networks."
  },
  {
    id: "dp",
    index: "06",
    name: "Dynamic Programming",
    category: "State Matrix",
    tagline: "DAG state lattices and 1D rolling tabulation memoization",
    url: "https://dp-sigma-one.vercel.app",
    accent: "#4f46e5",
    colorHex: 0x6366f1,
    complexity: "Pseudo-polynomial O(N * W)",
    spaceComplexity: "O(W) Rolling State Buffer",
    topology: "2D State Tabulation Matrix",
    overview: "Optimal substructure analysis, memoization cache hits, and rolling space-optimized dynamic programming tables."
  }
];

interface Props {
  activeId: string;
  onSelectRealm: (id: string) => void;
}

export default function SpatialLattice3D({ activeId, onSelectRealm }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeIdRef = useRef<string>(activeId);
  activeIdRef.current = activeId;

  const onSelectRef = useRef(onSelectRealm);
  onSelectRef.current = onSelectRealm;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 7.8);
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
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffbf2, 2.4);
    keyLight.position.set(6, 8, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe8f0fe, 1.2);
    fillLight.position.set(-6, 4, -4);
    scene.add(fillLight);

    const constellationGroup = new THREE.Group();
    scene.add(constellationGroup);

    // Central Core Orb (Frosted Titanium Nucleus)
    const nucleusGeo = new THREE.IcosahedronGeometry(0.72, 3);
    const nucleusMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e2230,
      metalness: 0.85,
      roughness: 0.2,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    nucleusMesh.castShadow = true;
    nucleusMesh.receiveShadow = true;
    constellationGroup.add(nucleusMesh);

    // Inner Core Accent Ring
    const innerTorusGeo = new THREE.TorusGeometry(0.95, 0.02, 16, 64);
    const innerTorusMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });
    const innerTorus = new THREE.Mesh(innerTorusGeo, innerTorusMat);
    innerTorus.rotation.x = Math.PI / 3;
    constellationGroup.add(innerTorus);

    // Diffuse Ground Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(12, 12);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.12 });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -2.1;
    shadowMesh.receiveShadow = true;
    scene.add(shadowMesh);

    // 6 Spatial Realm Nodes arranged around the nucleus
    const nodeMeshes: {
      id: string;
      mesh: THREE.Group;
      sphereMesh: THREE.Mesh;
      basePos: THREE.Vector3;
      targetPos: THREE.Vector3;
      mat: THREE.MeshPhysicalMaterial;
      ringMat: THREE.MeshBasicMaterial;
    }[] = [];

    const nodePositions: THREE.Vector3[] = [
      new THREE.Vector3(2.2, 0.5, 0.6),    // 01 Arrays
      new THREE.Vector3(1.1, 1.7, -1.2),   // 02 Linked Lists
      new THREE.Vector3(-1.3, 1.6, 0.9),   // 03 Stacks
      new THREE.Vector3(-2.2, -0.4, -0.5), // 04 Trees
      new THREE.Vector3(-0.9, -1.7, 1.1),  // 05 Graphs
      new THREE.Vector3(1.4, -1.5, -1.0)   // 06 DP
    ];

    const sphereGeo = new THREE.SphereGeometry(0.38, 32, 32);
    const orbitRingGeo = new THREE.TorusGeometry(0.48, 0.015, 16, 32);

    REALM_SYSTEMS.forEach((realm, idx) => {
      const pos = nodePositions[idx];
      const nodeGroup = new THREE.Group();
      nodeGroup.position.copy(pos);
      nodeGroup.userData = { id: realm.id };

      const mat = new THREE.MeshPhysicalMaterial({
        color: realm.colorHex,
        metalness: 0.3,
        roughness: 0.25,
        clearcoat: 0.9,
        clearcoatRoughness: 0.1,
        emissive: new THREE.Color(realm.colorHex),
        emissiveIntensity: 0.15
      });

      const sphere = new THREE.Mesh(sphereGeo, mat);
      sphere.castShadow = true;
      sphere.receiveShadow = true;
      sphere.userData = { id: realm.id };
      nodeGroup.add(sphere);

      // Orbital Halo Ring
      const ringMat = new THREE.MeshBasicMaterial({
        color: realm.colorHex,
        transparent: true,
        opacity: 0.4
      });
      const ring = new THREE.Mesh(orbitRingGeo, ringMat);
      ring.rotation.x = Math.PI / 4;
      nodeGroup.add(ring);

      constellationGroup.add(nodeGroup);

      nodeMeshes.push({
        id: realm.id,
        mesh: nodeGroup,
        sphereMesh: sphere,
        basePos: pos.clone(),
        targetPos: pos.clone(),
        mat,
        ringMat
      });
    });

    // Connecting Energy Filaments between nodes and nucleus
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.25
    });

    const linePositions: number[] = [];
    nodePositions.forEach((pos) => {
      linePositions.push(0, 0, 0);
      linePositions.push(pos.x, pos.y, pos.z);
    });

    // Edge connections between adjacent nodes
    for (let i = 0; i < nodePositions.length; i++) {
      const nextIdx = (i + 1) % nodePositions.length;
      linePositions.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z);
      linePositions.push(nodePositions[nextIdx].x, nodePositions[nextIdx].y, nodePositions[nextIdx].z);
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    constellationGroup.add(linesMesh);

    // Pointer Raycasting and Orbit Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let hoveredId: string | null = null;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0.2;

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
        targetRotationY += dx * 0.007;
        targetRotationX = Math.max(-0.4, Math.min(0.6, targetRotationX + dy * 0.006));
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
        targetRotationY += 0.0015;
      }

      constellationGroup.rotation.y = THREE.MathUtils.damp(
        constellationGroup.rotation.y,
        targetRotationY,
        4,
        delta
      );
      constellationGroup.rotation.x = THREE.MathUtils.damp(
        constellationGroup.rotation.x,
        targetRotationX,
        4,
        delta
      );

      // Rotate nucleus gently
      nucleusMesh.rotation.y += 0.003;
      innerTorus.rotation.z += 0.005;

      raycaster.setFromCamera(mouse, camera);
      const targets = nodeMeshes.map((n) => n.sphereMesh);
      const intersects = raycaster.intersectObjects(targets);

      if (intersects.length > 0) {
        hoveredId = intersects[0].object.userData.id;
        container.style.cursor = "pointer";
      } else {
        hoveredId = null;
        container.style.cursor = isDragging ? "grabbing" : "grab";
      }

      nodeMeshes.forEach((item) => {
        const isActive = item.id === activeIdRef.current;
        const isHovered = item.id === hoveredId;

        const targetScale = isActive ? 1.35 : isHovered ? 1.18 : 1.0;
        item.mesh.scale.setScalar(
          THREE.MathUtils.damp(item.mesh.scale.x, targetScale, 8, delta)
        );

        const targetEmissive = isActive ? 0.6 : isHovered ? 0.35 : 0.15;
        item.mat.emissiveIntensity = THREE.MathUtils.damp(
          item.mat.emissiveIntensity,
          targetEmissive,
          7,
          delta
        );

        item.ringMat.opacity = THREE.MathUtils.damp(
          item.ringMat.opacity,
          isActive ? 0.9 : isHovered ? 0.6 : 0.3,
          6,
          delta
        );
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
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 pointer-events-none whitespace-nowrap">
        <Grip size={13} />
        <span>Drag to orbit constellation &middot; Click node to select realm</span>
      </div>
    </div>
  );
}
