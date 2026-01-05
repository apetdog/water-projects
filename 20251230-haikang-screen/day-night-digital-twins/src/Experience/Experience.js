import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Pane } from "tweakpane";

import Time from "./Utils/Time.js";
import Sizes from "./Utils/Sizes.js";
import Stats from "./Utils/Stats.js";

import Resources from "./Resources.js";
import Renderer from "./Renderer.js";
import Camera from "./Camera.js";
import World from "./World.js";

import assets from "./assets.js";

export default class Experience {
  static instance;

  constructor(_options = {}) {
    // 这一步骤是关键，可是实现一个实例对象
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;

    // Options
    this.targetElement = _options.targetElement;

    if (!this.targetElement) {
      console.warn("Missing 'targetElement' property");
      return;
    }

    this.time = new Time();
    this.sizes = new Sizes();
    this.setConfig(); // 设置配置
    this.setStats(); // 设置帧速率
    this.setDebug(); // 设置debug ui
    this.setScene(); // 设置场景
    this.setCamera(); // 设置相机
    this.setRenderer(); // 设置渲染器
    this.setResources(); // 设置资源
    this.setWorld(); // 设置世界
    this.setControls(); // 控制器

    // window.resize
    this.sizes.on("resize", () => {
      this.resize();
    });

    this.resources.on("groupEnd", () => {
      document.querySelector(".loading").style.display = "none";
      this.resize();
    });

    this.update(); // 更新渲染
  }
  static getInstance(_options = {}) {
    if (Experience.instance) {
      return Experience.instance;
    }

    Experience.instance = new Experience(_options);

    return Experience.instance;
  }

  setConfig() {
    this.config = {};

    // Pixel ratio
    this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2);

    // Width and height
    const boundings = this.targetElement.getBoundingClientRect();
    this.config.width = boundings.width;
    this.config.height = boundings.height || window.innerHeight;
    this.config.smallestSide = Math.min(this.config.width, this.config.height);
    this.config.largestSide = Math.max(this.config.width, this.config.height);

    // Debug
    // this.config.debug = window.location.hash === '#debug'
    this.config.debug = this.config.width > 420;
  }

  setStats() {
    if (this.config.debug) {
      this.stats = new Stats(true);
    }
  }

  setDebug() {
    if (this.config.debug) {
      this.debug = new Pane();
      this.debug.containerElem_.style.width = "320px";
    }
  }

  setScene() {
    this.scene = new THREE.Scene();
  }

  setCamera() {
    this.camera = new Camera();
  }

  setRenderer() {
    this.renderer = new Renderer({ rendererInstance: this.rendererInstance });

    // 添加到dom
    this.targetElement.appendChild(this.renderer.instance.domElement);
  }

  setControls() {
    this.controls = new OrbitControls(
      this.camera.instance,
      this.renderer.instance.domElement
    );
    this.controls.enableDamping = true;
    this.controls.maxDistance = 400;
    this.controls.minDistance = 4;
    this.controls.update();

    window.addEventListener("message", (event) => {
      const { type, action } = event.data;
      if (type === "camera-control") {
        const moveStep = 10;
        const rotateStep = 0.1;
        
        // Get camera direction for movement
        const direction = new THREE.Vector3();
        this.camera.instance.getWorldDirection(direction);
        direction.y = 0;
        direction.normalize();

        if (action === "rotate-up") {
             // Rotate up around target (decrease polar angle)
             // We can manipulate the camera position relative to target
             const offset = new THREE.Vector3().subVectors(this.camera.instance.position, this.controls.target);
             const spherical = new THREE.Spherical().setFromVector3(offset);
             spherical.phi = Math.max(0.1, spherical.phi - rotateStep); // Prevent going below 0
             offset.setFromSpherical(spherical);
             this.camera.instance.position.copy(this.controls.target).add(offset);
        } else if (action === "rotate-down") {
             // Rotate down around target (increase polar angle)
             const offset = new THREE.Vector3().subVectors(this.camera.instance.position, this.controls.target);
             const spherical = new THREE.Spherical().setFromVector3(offset);
             spherical.phi = Math.min(Math.PI - 0.1, spherical.phi + rotateStep); // Prevent going above PI
             offset.setFromSpherical(spherical);
             this.camera.instance.position.copy(this.controls.target).add(offset);
        } else if (action === "move-forward") {
            this.controls.target.addScaledVector(direction, moveStep);
            this.camera.instance.position.addScaledVector(direction, moveStep);
        } else if (action === "move-backward") {
            this.controls.target.addScaledVector(direction, -moveStep);
            this.camera.instance.position.addScaledVector(direction, -moveStep);
        } else if (action === "move-up") {
            this.controls.target.y += moveStep;
            this.camera.instance.position.y += moveStep;
        } else if (action === "move-down") {
            this.controls.target.y -= moveStep;
            this.camera.instance.position.y -= moveStep;
        } else if (action === "rotate-left") {
             const axis = new THREE.Vector3(0, 1, 0);
             this.camera.instance.position.sub(this.controls.target);
             this.camera.instance.position.applyAxisAngle(axis, rotateStep);
             this.camera.instance.position.add(this.controls.target);
        } else if (action === "rotate-right") {
             const axis = new THREE.Vector3(0, 1, 0);
             this.camera.instance.position.sub(this.controls.target);
             this.camera.instance.position.applyAxisAngle(axis, -rotateStep);
             this.camera.instance.position.add(this.controls.target);
        } else if (action === "zoom-in") {
            // Move camera closer to target
            const distance = this.camera.instance.position.distanceTo(this.controls.target);
            if (distance > this.controls.minDistance + moveStep) {
                 const zoomDir = new THREE.Vector3().subVectors(this.controls.target, this.camera.instance.position).normalize();
                 this.camera.instance.position.addScaledVector(zoomDir, moveStep);
            }
        } else if (action === "zoom-out") {
             const zoomDir = new THREE.Vector3().subVectors(this.camera.instance.position, this.controls.target).normalize();
             this.camera.instance.position.addScaledVector(zoomDir, moveStep);
        } else if (action === "reset") {
            this.controls.reset();
        }
        
        this.controls.update();
      }
    });
  }

  setResources() {
    this.resources = new Resources(assets);
  }

  setWorld() {
    this.world = new World();
  }

  update() {
    this.controls.update();
    if (this.stats) this.stats.update();

    if (this.renderer) this.renderer.update();

    window.requestAnimationFrame(() => {
      this.update();
    });
  }

  resize() {
    // Config
    const boundings = this.targetElement.getBoundingClientRect();
    this.config.width = boundings.width;
    this.config.height = boundings.height;
    this.config.smallestSide = Math.min(this.config.width, this.config.height);
    this.config.largestSide = Math.max(this.config.width, this.config.height);

    this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2);

    if (this.camera) this.camera.resize();

    if (this.renderer) this.renderer.resize();
  }

  destroy() {}
}
