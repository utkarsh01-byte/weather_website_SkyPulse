import * as THREE from "three";
import { useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Lights from "../assets/earthlights1k.jpg";
import Earth from "../assets/earthmap1k.jpg";
import Clouds from "../assets/earthcloudmap.jpg";
import Bump from "../assets/earthbump1k.jpg";
import Spec from "../assets/earthspec1k.jpg";
import CloudsAlpha from "../assets/earthcloudmaptrans.jpg";
const EarthCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = (-23.4 * Math.PI) / 180;
    scene.add(earthGroup);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(-2, 0.5, 1.5);
    scene.add(sunLight);

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    const loader = new THREE.TextureLoader();
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshPhongMaterial({
      map: loader.load(Earth),
      specularMap: loader.load(Spec),
      bumpMap: loader.load(Bump),
      bumpScale: 0.04,
    });
    const earthMesh = new THREE.Mesh(geometry, material);
    earthGroup.add(earthMesh);

    const lightsMat = new THREE.MeshBasicMaterial({
      map: loader.load(Lights),
      blending: THREE.AdditiveBlending,
    });

    const lightsMesh = new THREE.Mesh(geometry, lightsMat);
    earthGroup.add(lightsMesh);

    const cloudsMat = new THREE.MeshStandardMaterial({
      map: loader.load(Clouds),
      alphaMap: loader.load(CloudsAlpha),
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
    cloudsMesh.scale.setScalar(1.003);
    earthGroup.add(cloudsMesh);

    const controls = new OrbitControls(camera, renderer.domElement);

    controls.enableZoom = false;

    const animate = () => {
      earthMesh.rotation.y += 0.002;
      lightsMesh.rotation.y += 0.002;
      cloudsMesh.rotation.y += 0.0023;
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "32px",
      }}
    />
  );
};
export default EarthCanvas;
