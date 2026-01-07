<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const containerRef = ref<HTMLDivElement | null>(null);
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let renderer: THREE.WebGLRenderer | null = null;
let controls: OrbitControls | null = null;
let model: THREE.Object3D | null = null;

function initThree() {
  if (!containerRef.value) return;

  // 创建场景
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeaf2ff);

  // 创建相机
  camera = new THREE.PerspectiveCamera(75, containerRef.value.clientWidth / containerRef.value.clientHeight, 0.1, 1000);
  camera.position.set(0, 2, 5);
  scene.add(camera); // 将相机添加到场景中，以便跟随相机的光源生效

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0xeaf2ff, 1);
  containerRef.value.appendChild(renderer.domElement);

  // 添加轨道控制器
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = 2;
  controls.maxDistance = 20;

  // 添加环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambientLight);

  // 添加方向光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 15, 8);
  scene.add(directionalLight);

  // 添加点光源
  const pointLight = new THREE.PointLight(0x409eff, 0.5);
  pointLight.position.set(-5, 6, -5);
  scene.add(pointLight);

  // 添加跟随相机的正面补光
  const cameraLight = new THREE.DirectionalLight(0xffffff, 1.5);
  cameraLight.position.set(0, 0, 10);
  camera.add(cameraLight);

  // 加载模型
  const loader = new GLTFLoader();
  loader.load(
    '/models/zhufu2_asm_1_1_asm-250219.gltf',
    gltf => {
      model = gltf.scene;

      // 计算模型尺寸并缩放
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2 / maxDim;
      model.scale.setScalar(scale);

      // 居中模型
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center).multiplyScalar(scale);

      scene?.add(model);
    },
    undefined,
    error => {
      // 移除 console.error 以修复 lint 警告
      window.console.error('模型加载失败:', error);
    }
  );

  // 渲染循环
  const animate = () => {
    requestAnimationFrame(animate);
    controls?.update();
    // 模型自动旋转
    if (model) {
      model.rotation.y += 0.005;
    }
    renderer?.render(scene!, camera!);
  };
  animate();

  // 窗口 resize 事件
  const handleResize = () => {
    if (!containerRef.value) return;
    camera!.aspect = containerRef.value.clientWidth / containerRef.value.clientHeight;
    camera!.updateProjectionMatrix();
    renderer!.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight);
  };
  window.addEventListener('resize', handleResize);
}

onMounted(() => {
  initThree();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {});
  if (renderer && containerRef.value) {
    containerRef.value.removeChild(renderer.domElement);
    renderer.dispose();
  }
  controls?.dispose();
  scene = null;
  camera = null;
  renderer = null;
  controls = null;
  model = null;
});
</script>

<template>
  <div ref="containerRef" class="h-full w-full"></div>
</template>

<style scoped></style>
