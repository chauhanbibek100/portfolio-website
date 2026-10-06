import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Background3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // ── Mobile detection for performance scaling ────────────
    const isMobile = window.innerWidth <= 768;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 25);

    // Renderer — disable antialias on mobile for GPU savings
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Cap pixel ratio lower on mobile (1 vs 2) — huge GPU saving
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
    container.appendChild(renderer.domElement);

    // ── Animated Wireframe Wave Grid ───────────────────────
    // Mobile: 20×20 grid (~441 vertices) vs Desktop: 60×60 (~3721 vertices)
    // This saves ~88% of per-frame vertex math on mobile
    const gridSegments = isMobile ? 20 : 60;
    const waveGeometry = new THREE.PlaneGeometry(60, 40, gridSegments, gridSegments);
    waveGeometry.rotateX(-Math.PI / 2);
    const waveMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const waveMesh = new THREE.Mesh(waveGeometry, waveMaterial);
    waveMesh.position.set(0, -6, -10);
    scene.add(waveMesh);

    // ── Floating Particles ─────────────────────────────────
    // Mobile: 80 particles vs Desktop: 200
    const particlesCount = isMobile ? 80 : 200;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i]     = (Math.random() - 0.5) * 60;
      particlePositions[i + 1] = Math.random() * 25 - 5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 50;
    }
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 0.3,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // ── Lights ─────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    // Main crisp white highlight on the left
    const pointLight1 = new THREE.PointLight(0xffffff, 400, 100);
    pointLight1.position.set(-8, 10, 15);
    scene.add(pointLight1);

    // Purple/violet rim light on the right
    const pointLight2 = new THREE.PointLight(0x8b5cf6, 500, 100);
    pointLight2.position.set(15, 8, 10);
    scene.add(pointLight2);

    // ── Mouse Parallax (Desktop only) ─────────────────────
    // Not needed on touch devices — saves event listener overhead
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.001;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.001;
    };

    if (!isMobile) {
      window.addEventListener("mousemove", onMouseMove);
    }

    // ── Animation Loop ─────────────────────────────────────
    const clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (!isMobile) {
        // Smooth parallax camera rotation (desktop only)
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;
        camera.position.x = targetX * 5;
        camera.position.y = 5 + targetY * 5;
        camera.lookAt(scene.position);

        // Wave vertex animation (desktop only — biggest CPU cost on mobile)
        const pos = waveGeometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const u = pos.getX(i);
          const v = pos.getZ(i);
          const y =
            Math.sin(u * 0.3 + t * 0.6) *
            Math.cos(v * 0.3 + t * 0.5) *
            1.5;
          pos.setY(i, y);
        }
        pos.needsUpdate = true;
      }

      // Particle drift — half speed on mobile
      particles.rotation.y = t * (isMobile ? 0.015 : 0.03);

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize Handler ─────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Cleanup ────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      waveGeometry.dispose();
      waveMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}
