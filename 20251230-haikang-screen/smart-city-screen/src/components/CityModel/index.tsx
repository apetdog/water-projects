import React, { useEffect, useRef, Suspense, useState } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Stage,
  Html,
  useProgress,
} from "@react-three/drei";
import { getCachedModelUrl, clearModelCache } from "@/utils/modelCache";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div
        style={{
          color: "white",
          textAlign: "center",
          fontFamily: "sans-serif",
        }}>
        <div style={{ marginBottom: 10, fontSize: 14, letterSpacing: 2 }}>
          LOADING MODEL
        </div>
        <div
          style={{
            width: 200,
            height: 4,
            background: "rgba(255,255,255,0.2)",
            borderRadius: 2,
            overflow: "hidden",
          }}>
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "#50e3c2",
              transition: "width 0.3s ease-out",
              boxShadow: "0 0 10px #50e3c2",
            }}
          />
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 12,
            color: "rgba(255,255,255,0.6)",
          }}>
          {progress.toFixed(0)}%
        </div>
      </div>
    </Html>
  );
}

const MODEL_URL = "https://chaomei-1259670296.cos.ap-guangzhou.myqcloud.com/moodlink/smart-city.gltf";

// Preload the model to prevent flickering and enable caching
// We can't preload the blob URL here because it's async. 
// Instead, we rely on the component to handle loading and caching.

class ErrorBoundary extends React.Component<{ children: React.ReactNode, onRetry?: () => void }, { hasError: boolean }> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_error: any) {
    return { hasError: true };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentDidCatch(error: any, errorInfo: any) {
    console.error("Model loading error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Html center>
          <div style={{ 
            background: 'rgba(0, 20, 40, 0.9)', 
            padding: '24px', 
            borderRadius: '8px', 
            border: '1px solid #50e3c2',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            minWidth: '200px',
            pointerEvents: 'auto'
          }}>
            <div style={{ color: '#ff4d4f', fontSize: '16px', fontWeight: 'bold' }}>⚠️ 模型加载失败</div>
            <div style={{ color: '#aaa', fontSize: '12px', textAlign: 'center' }}>可能是网络波动或资源跨域</div>
            <button 
              onClick={() => {
                this.setState({ hasError: false });
                if (this.props.onRetry) this.props.onRetry();
              }}
              style={{
                background: 'linear-gradient(90deg, #50e3c2 0%, #29a08e 100%)',
                border: 'none',
                padding: '8px 24px',
                borderRadius: '4px',
                cursor: 'pointer',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '14px',
                boxShadow: '0 0 10px rgba(80, 227, 194, 0.4)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              重新加载
            </button>
          </div>
        </Html>
      );
    }

    return this.props.children;
  }
}

const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  console.log("Loading model from:", url);

  useEffect(() => {
    if (scene) {
      console.log("Scene loaded:", scene);
      // Auto-scale and center the model
      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      console.log("Model Box Size:", size);
      console.log("Model Box Center:", center);

      // Reset position to center
      // scene.position.x += (scene.position.x - center.x);
      // scene.position.y += (scene.position.y - center.y);
      // scene.position.z += (scene.position.z - center.z);

      // Scale to fit
      // const maxDim = Math.max(size.x, size.y, size.z);
      // if (maxDim > 0) {
      //   const scale = 5 / maxDim; // Adjust 5 based on desired size
      //   console.log('Scaling model by:', scale);
      //   scene.scale.setScalar(scale);
      // }
    }
  }, [scene]);

  return <primitive object={scene} />;
};

const CameraController = () => {
  const { camera, gl } = useThree();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null);
  

  useEffect(() => {
    // Updated camera settings based on model size and user request
    camera.position.set(383.57, -162.34, 197.25);
    // camera.rotation.set(-0.77, 0.05, 0.05); // Let OrbitControls handle rotation via target
    camera.zoom = 1.6;
    camera.updateProjectionMatrix();

    const handleControl = (event: CustomEvent) => {
      const { action } = event.detail;
      if (!controlsRef.current) return;

      const controls = controlsRef.current;
      const step = 0.5;
      const rotateStep = Math.PI / 12;

      switch (action) {
        case "rotate-left":
          // OrbitControls handles rotation by dragging,
          // programmatically we can adjust azimuthal angle
          controls.setAzimuthalAngle(controls.getAzimuthalAngle() + rotateStep);
          break;
        case "rotate-right":
          controls.setAzimuthalAngle(controls.getAzimuthalAngle() - rotateStep);
          break;
        case "rotate-up":
          controls.setPolarAngle(
            Math.max(0, controls.getPolarAngle() - rotateStep)
          );
          break;
        case "rotate-down":
          controls.setPolarAngle(
            Math.min(Math.PI, controls.getPolarAngle() + rotateStep)
          );
          break;
        case "zoom-in":
          camera.zoom = Math.min(camera.zoom + 0.1, 5);
          camera.updateProjectionMatrix();
          break;
        case "zoom-out":
          camera.zoom = Math.max(camera.zoom - 0.1, 0.1);
          camera.updateProjectionMatrix();
          break;
        case "reset":
          controls.reset();
          camera.zoom = 1;
          camera.updateProjectionMatrix();
          break;
        // Move up/down logic is a bit more complex with OrbitControls
        // as it orbits around a target. We can move the target.
        case "move-up":
          controls.target.y += step;
          camera.position.y += step;
          break;
        case "move-down":
          controls.target.y -= step;
          camera.position.y -= step;
          break;
        default:
          break;
      }
      controls.update();
    };

    window.addEventListener(
      "city-camera-control",
      handleControl as EventListener
    );

    let onControlsChange;

    if (controlsRef.current) {
      controlsRef.current.target.set(-3.5437712085504316, -7.527547177687339, -2.655221688055306);
      controlsRef.current.update();
      
      onControlsChange = () => {
        console.log("Camera Position:", camera.position);
        console.log("Camera Rotation:", camera.rotation);
        console.log("Camera Zoom:", camera.zoom);
        // Also log target to help debug center
        console.log("Controls Target:", controlsRef.current.target);
      };

      controlsRef.current.addEventListener('change', onControlsChange);
    }
      
    // Cleanup listener
    return () => {
      if (controlsRef.current && onControlsChange) {
        controlsRef.current.removeEventListener('change', onControlsChange);
      }
      window.removeEventListener(
        "city-camera-control",
        handleControl as EventListener
      );
    };

  }, [camera, gl]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
    />
  );
};

export const CityModel = () => {
  const [modelUrl, setModelUrl] = useState<string | null>(null);

  useEffect(() => {
    getCachedModelUrl(MODEL_URL).then(url => {
      setModelUrl(url);
      useGLTF.preload(url);
    }).catch(err => {
      console.error("Failed to load cached model:", err);
      // Fallback to direct URL if cache fails (though getCachedModelUrl handles fetch)
      setModelUrl(MODEL_URL);
    });
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: "0 auto auto",
        zIndex: 1,
      }}>
      <Canvas
        shadows
        dpr={[1, 2]}
        resize={{ offsetSize: true }}
        camera={{ position: [-50, 85, 25], fov: 30 }}>
        <color
          attach="background"
          args={["#333"]}
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <ErrorBoundary onRetry={() => {
          if (modelUrl) {
            useGLTF.clear(modelUrl);
            clearModelCache(MODEL_URL).then(() => {
                setModelUrl(null); // Trigger re-fetch
                getCachedModelUrl(MODEL_URL).then(url => setModelUrl(url));
            });
          } else {
             getCachedModelUrl(MODEL_URL).then(url => setModelUrl(url));
          }
        }}>
          <Suspense fallback={<Loader />}>
            {modelUrl && (
              <Stage
                adjustCamera={false}
                environment={null}
                intensity={0.5}>
                <Model url={modelUrl} />
              </Stage>
            )}
          </Suspense>
        </ErrorBoundary>
        <CameraController />
      </Canvas>
    </div>
  );
};

useGLTF.preload(MODEL_URL);
