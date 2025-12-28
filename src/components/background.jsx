import * as THREE from "three";
import { useEffect, useRef } from "react";
const Background = () => {
  const containerRef = useRef(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      color: 0x4a9fff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    const cloudGeometry = new THREE.SphereGeometry(1, 32, 32);
    const cloudMaterial = new THREE.MeshBasicMaterial({
      color: 0x888888,
      transparent: true,
      opacity: 0.1,
    });

    const clouds = [];
    for (let i = 0; i < 15; i++) {
      const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
      cloud.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 50
      );
      cloud.scale.set(
        Math.random() * 3 + 2,
        Math.random() * 1.5 + 1,
        Math.random() * 3 + 2
      );
      clouds.push(cloud);
      scene.add(cloud);
    }

    camera.position.z = 30;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      requestAnimationFrame(animate);

      particlesMesh.rotation.y += 0.0002;
      particlesMesh.rotation.x += 0.0001;

      clouds.forEach((cloud, index) => {
        cloud.rotation.y += 0.001;
        cloud.position.x += Math.sin(Date.now() * 0.0001 + index) * 0.002;
        cloud.position.y += Math.cos(Date.now() * 0.0001 + index) * 0.002;
      });

      camera.position.x += (mouseX * 5 - camera.position.x) * 0.01;
      camera.position.y += (mouseY * 5 - camera.position.y) * 0.01;

      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="three-bg" />;
};

export default Background;
