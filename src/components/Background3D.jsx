import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Background3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

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

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // ── Luminous Cyan Sphere ───────────────────────────────
    const sphereGeometry = new THREE.SphereGeometry(4, 64, 64);
    const sphereMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00bfff,          // Slightly deeper cyan base
      emissive: 0x0022ff,       // Inner blue glow
      emissiveIntensity: 0.15,  // Reduced so it's not blown out in the middle
      metalness: 0.1,
      roughness: 0.1,           // Crisper highlights
      transmission: 0.9,        // Glass-like
      thickness: 2.0,
      ior: 1.5,
      iridescence: 1.0,
      iridescenceIOR: 1.3,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(12, 4, -5);
    
    // Add a light INSIDE the sphere to create that bright white/cyan glowing core
    const coreLight = new THREE.PointLight(0xe0ffff, 200, 20);
    sphere.add(coreLight); // adding it to the sphere makes it move with the sphere

    scene.add(sphere);

    // ── Animated Wireframe Wave Grid ───────────────────────
    const gridWidth = 60;
    const gridDepth = 60;
    const waveGeometry = new THREE.PlaneGeometry(60, 40, gridWidth, gridDepth);
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
    const particlesCount = 200;
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

    // ── Mouse Parallax ─────────────────────────────────────
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.001;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.001;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Animation Loop ─────────────────────────────────────
    const clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth parallax camera rotation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      camera.position.x = targetX * 5;
      camera.position.y = 5 + targetY * 5;
      camera.lookAt(scene.position);

      // Sphere float + rotate
      sphere.rotation.x = t * 0.2;
      sphere.rotation.y = t * 0.3;
      sphere.position.y = 4 + Math.sin(t * 1.5) * 0.8;

      // Wave vertex animation
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

      // Particle drift
      particles.rotation.y = t * 0.03;

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
      sphereGeometry.dispose();
      sphereMaterial.dispose();
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
