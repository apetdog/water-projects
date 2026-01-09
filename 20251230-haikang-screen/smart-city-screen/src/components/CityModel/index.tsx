import { useEffect, useRef, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Stage, Html, useProgress } from "@react-three/drei";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: 'white', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <div style={{ marginBottom: 10, fontSize: 14, letterSpacing: 2 }}>LOADING MODEL</div>
        <div style={{ 
          width: 200, 
          height: 4, 
          background: 'rgba(255,255,255,0.2)', 
          borderRadius: 2,
          overflow: 'hidden'
        }}>
          <div 
            style={{ 
              width: `${progress}%`, 
              height: '100%', 
              background: '#50e3c2', 
              transition: 'width 0.3s ease-out',
              boxShadow: '0 0 10px #50e3c2'
            }} 
          />
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{progress.toFixed(0)}%</div>
      </div>
    </Html>
  );
}

const Model = () => {
  const { scene } = useGLTF(
    `${import.meta.env.BASE_URL}imaginary_city_i/scene.gltf`
  );

  return <primitive object={scene} />;
};

const CameraController = () => {
  const { camera, gl } = useThree();
  const controlsRef = useRef<any>(null);

  useEffect(() => {
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
    return () =>
      window.removeEventListener(
        "city-camera-control",
        handleControl as EventListener
      );
  }, [camera, gl]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
    />
  );
};

export const CityModel = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 140,
        margin: "0 auto auto",
        zIndex: 1,
      }}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [-50, 85, 25], fov: 30 }}>
        <color
          attach="background"
          args={["#000"]}
        />
        <Suspense fallback={<Loader />}>
          <Stage
            environment="city"
            intensity={0.5}
            adjustCamera={false}>
            <Model />
          </Stage>
        </Suspense>
        <CameraController />
      </Canvas>
    </div>
  );
};

useGLTF.preload(`${import.meta.env.BASE_URL}imaginary_city_i/scene.gltf`);
