import React, { useEffect, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Stage } from '@react-three/drei';
import * as THREE from 'three';

const Model = () => {
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}cbd.glb`);
  
  // Auto-center and scale model logic could go here, 
  // but Stage handles a lot of this.
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
        case 'rotate-left':
            // OrbitControls handles rotation by dragging, 
            // programmatically we can adjust azimuthal angle
            controls.setAzimuthalAngle(controls.getAzimuthalAngle() + rotateStep);
            break;
        case 'rotate-right':
            controls.setAzimuthalAngle(controls.getAzimuthalAngle() - rotateStep);
            break;
        case 'rotate-up':
            controls.setPolarAngle(Math.max(0, controls.getPolarAngle() - rotateStep));
            break;
        case 'rotate-down':
            controls.setPolarAngle(Math.min(Math.PI, controls.getPolarAngle() + rotateStep));
            break;
        case 'zoom-in':
            camera.zoom = Math.min(camera.zoom + 0.1, 5);
            camera.updateProjectionMatrix();
            break;
        case 'zoom-out':
            camera.zoom = Math.max(camera.zoom - 0.1, 0.1);
            camera.updateProjectionMatrix();
            break;
        case 'reset':
            controls.reset();
            camera.zoom = 1;
            camera.updateProjectionMatrix();
            break;
        // Move up/down logic is a bit more complex with OrbitControls
        // as it orbits around a target. We can move the target.
        case 'move-up':
            controls.target.y += step;
            camera.position.y += step;
            break;
        case 'move-down':
            controls.target.y -= step;
            camera.position.y -= step;
            break;
        default:
            break;
      }
      controls.update();
    };

    window.addEventListener('city-camera-control', handleControl as EventListener);
    return () => window.removeEventListener('city-camera-control', handleControl as EventListener);
  }, [camera, gl]);

  return <OrbitControls ref={controlsRef} makeDefault />;
};

export const CityModel = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [100, 100, 100], fov: 45 }}>
        <Stage environment="city" intensity={0.5}>
            <Model />
        </Stage>
        <CameraController />
      </Canvas>
    </div>
  );
};

useGLTF.preload(`${import.meta.env.BASE_URL}cbd.glb`);
