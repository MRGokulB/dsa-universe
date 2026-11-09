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
  complexity: string;
  memory: string;
}

export const MODULE_SYSTEMS: AlgorithmModuleMeta[] = [
  {
    id: "arrays",
    index: "01",
    name: "Contiguous RAM & Arrays",
    category: "Linear",
    tagline: "Sequential cache lines & two-pointer convergence",
    url: "https://arrays-rho.vercel.app",
    accent: "#38bdf8", // Sky blue
    complexity: "Access O(1) · Search O(N)",
    memory: "Flat Contiguous 64-bit Buffer"
  },
  {
    id: "linked-lists",
    index: "02",
    name: "Linked Lists & Pointers",
    category: "Linear",
    tagline: "Dispersed heap nodes & Floyd cycle isolation",
    url: "https://linked-lists-xi.vercel.app/",
    accent: "#c084fc", // Lilac purple
    complexity: "Insert O(1) · Traversal O(N)",
    memory: "Heap Allocated Pointer Chain"
  },
  {
    id: "stacks-queues",
    index: "03",
    name: "Call Stacks & Buffers",
    category: "Linear",
    tagline: "LIFO execution frames & circular ring queues",
    url: "https://stacks-queues.vercel.app",
    accent: "#34d399", // Emerald
    complexity: "Push/Pop O(1) · Enqueue O(1)",
    memory: "RSP Stack Register / Ring Array"
  },
  {
    id: "trees",
    index: "04",
    name: "Binary Trees & BSTs",
    category: "Hierarchical",
    tagline: "Balanced BST invariants & lowest common ancestors",
    url: "https://trees-eight-omega.vercel.app",
    accent: "#fbbf24", // Amber gold
    complexity: "Balanced O(log N) · Worst O(N)",
    memory: "Recursive Node Hierarchy"
  },
  {
    id: "graphs",
    index: "05",
    name: "Graph Networks & Dijkstra",
    category: "Topological",
    tagline: "Adjacency matrix traversal & min-heap shortest paths",
    url: "https://graphs-steel.vercel.app",
    accent: "#fb7185", // Rose
    complexity: "BFS O(V+E) · Dijkstra O(E log V)",
    memory: "Sparse Matrix / Heap Node Graph"
  },
  {
    id: "dp",
    index: "06",
    name: "Dynamic Programming",
    category: "Topological",
    tagline: "DAG state lattices & 1D rolling tabulation",
    url: "https://dp-sigma-one.vercel.app",
    accent: "#818cf8", // Indigo
    complexity: "Pseudo-polynomial O(N * W)",
    memory: "Contiguous DP Tabulation Cache"
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

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 5.2, 7.8);
    camera.lookAt(0, -0.4, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. Lighting Rig (Directional + Point Lights for Specular highlights)
    const ambientLight = new THREE.AmbientLight(0x222430, 1.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.8);
    dirLight.position.set(4, 9, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 25;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    const rimLight = new THREE.PointLight(0x38bdf8, 3.5, 12);
    rimLight.position.set(-4, 2, -3);
    scene.add(rimLight);

    const goldLight = new THREE.PointLight(0xfbbf24, 2.5, 12);
    goldLight.position.set(4, 1.5, 3);
    scene.add(goldLight);

    // 3. Central Silicon Die Substrate (Layered metallic slab)
    const dieGroup = new THREE.Group();
    scene.add(dieGroup);

    // Base die slab
    const baseGeo = new THREE.BoxGeometry(6.6, 0.28, 4.4);
    const baseMat = new THREE.MeshPhysicalMaterial({
      color: 0x0c0e15,
      metalness: 0.9,
      roughness: 0.24,
      clearcoat: 0.4,
      clearcoatRoughness: 0.2
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.14;
    baseMesh.receiveShadow = true;
    dieGroup.add(baseMesh);

    // Substrate border trim
    const trimGeo = new THREE.BoxGeometry(6.75, 0.12, 4.55);
    const trimMat = new THREE.MeshStandardMaterial({
      color: 0x181c2a,
      metalness: 0.8,
      roughness: 0.3
    });
    const trimMesh = new THREE.Mesh(trimGeo, trimMat);
    trimMesh.position.y = -0.22;
    dieGroup.add(trimMesh);

    // Ground plane for soft contact shadow
    const groundGeo = new THREE.PlaneGeometry(16, 16);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.45 });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -0.32;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // 4. Photonic Interconnect Circuit Traces (ThreeUI-style glowing paths)
    const traceMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35
    });

    const tracePoints: THREE.Vector3[][] = [
      [new THREE.Vector3(-2.2, 0.02, -1.2), new THREE.Vector3(0, 0.02, -1.2), new THREE.Vector3(2.2, 0.02, -1.2)],
      [new THREE.Vector3(-2.2, 0.02, 1.2), new THREE.Vector3(0, 0.02, 1.2), new THREE.Vector3(2.2, 0.02, 1.2)],
      [new THREE.Vector3(-2.2, 0.02, -1.2), new THREE.Vector3(-2.2, 0.02, 1.2)],
      [new THREE.Vector3(0, 0.02, -1.2), new THREE.Vector3(0, 0.02, 1.2)],
      [new THREE.Vector3(2.2, 0.02, -1.2), new THREE.Vector3(2.2, 0.02, 1.2)]
    ];

    tracePoints.forEach((pts) => {
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const line = new THREE.Line(geo, traceMat);
      dieGroup.add(line);
    });

    // 5. 6 Hardware Memory Module Blocks
    const blockMeshes: {
      id: string;
      mesh: THREE.Mesh;
      baseY: number;
      targetY: number;
      mat: THREE.MeshPhysicalMaterial;
      color: THREE.Color;
      accentColor: THREE.Color;
    }[] = [];

    const positions = [
      { x: -2.1, z: -1.1 },
      { x: 0.0, z: -1.1 },
      { x: 2.1, z: -1.1 },
      { x: -2.1, z: 1.1 },
      { x: 0.0, z: 1.1 },
      { x: 2.1, z: 1.1 }
    ];

    const blockGeo = new THREE.BoxGeometry(1.65, 0.42, 1.55);

    MODULE_SYSTEMS.forEach((mod, idx) => {
      const pos = positions[idx];
      const accent = new THREE.Color(mod.accent);

      const mat = new THREE.MeshPhysicalMaterial({
        color: 0x131724,
        metalness: 0.85,
        roughness: 0.22,
        clearcoat: 0.8,
        clearcoatRoughness: 0.15,
        emissive: accent,
        emissiveIntensity: 0.08
      });

      const mesh = new THREE.Mesh(blockGeo, mat);
      mesh.position.set(pos.x, 0.21, pos.z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { id: mod.id };
      dieGroup.add(mesh);

      // Top silicon core cap for high-tech look
      const capGeo = new THREE.BoxGeometry(1.4, 0.05, 1.3);
      const capMat = new THREE.MeshStandardMaterial({
        color: 0x1e2438,
        metalness: 0.95,
        roughness: 0.15
      });
      const capMesh = new THREE.Mesh(capGeo, capMat);
      capMesh.position.y = 0.22;
      mesh.add(capMesh);

      // Micro LED dot on each block
      const ledGeo = new THREE.SphereGeometry(0.06, 16, 16);
      const ledMat = new THREE.MeshBasicMaterial({ color: accent });
      const ledMesh = new THREE.Mesh(ledGeo, ledMat);
      ledMesh.position.set(0.55, 0.26, -0.5);
      mesh.add(ledMesh);

      blockMeshes.push({
        id: mod.id,
        mesh,
        baseY: 0.21,
        targetY: 0.21,
        mat,
        color: new THREE.Color(0x131724),
        accentColor: accent
      });
    });

    // 6. Interactive Raycasting & Pointer Tracking
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let hoveredId: string | null = null;

    // Drag rotation controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = -0.25;
    let targetRotationX = 0.35;

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
        targetRotationX = Math.max(0.1, Math.min(0.65, targetRotationX + dy * 0.005));
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

    // 7. Render Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Gentle auto-rotation drift when not actively dragging
      if (!isDragging) {
        targetRotationY += 0.0015;
      }

      dieGroup.rotation.y = THREE.MathUtils.damp(dieGroup.rotation.y, targetRotationY, 4, delta);
      dieGroup.rotation.x = THREE.MathUtils.damp(dieGroup.rotation.x, targetRotationX, 4, delta);

      // Raycast test
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(blockMeshes.map((b) => b.mesh));

      if (intersects.length > 0) {
        hoveredId = intersects[0].object.userData.id;
        container.style.cursor = "pointer";
      } else {
        hoveredId = null;
        container.style.cursor = isDragging ? "grabbing" : "grab";
      }

      // Update block elevations & physical specular emission
      blockMeshes.forEach((item) => {
        const isActive = item.id === activeIdRef.current;
        const isHovered = item.id === hoveredId;

        // Elevation on Z/Y axis
        item.targetY = isActive ? item.baseY + 0.38 : isHovered ? item.baseY + 0.18 : item.baseY;
        item.mesh.position.y = THREE.MathUtils.damp(item.mesh.position.y, item.targetY, 8, delta);

        // Dynamic physical material response
        const targetEmissive = isActive ? 0.75 : isHovered ? 0.35 : 0.08;
        item.mat.emissiveIntensity = THREE.MathUtils.damp(
          item.mat.emissiveIntensity,
          targetEmissive,
          7,
          delta
        );

        if (isActive) {
          item.mat.color.setHex(0x1a2135);
        } else {
          item.mat.color.setHex(0x131724);
        }
      });

      // Pulse trace lines
      traceMat.opacity = 0.25 + Math.sin(elapsed * 2.5) * 0.12;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      container.removeEventListener("click", onClick);

      // Dispose Three.js resources
      scene.clear();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[460px] sm:h-[520px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#0a0c12] via-[#090b10] to-[#07080b] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full select-none" />

      {/* Floating 3D Navigation Hint */}
      <div className="absolute bottom-4 left-6 pointer-events-none flex items-center gap-2 font-mono text-[11px] text-zinc-500">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
        <span>THREE.JS WEBGL RENDERER &middot; DRAG TO ORBIT &middot; CLICK BLOCK TO FOCUS</span>
      </div>
    </div>
  );
}
