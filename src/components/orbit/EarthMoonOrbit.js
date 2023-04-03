import React from "react";
import Earth from "./Earth";
import Moon from "./Moon";
import { useRef } from "react"; 
import { useFrame } from "@react-three/fiber";

export default function EarthMoonOrbit(props) {  
  
  const earthOrbitRef = useRef();
  const moonOrbitRef = useRef();

  useFrame((state, delta) => {
    earthOrbitRef.current.rotation.y += (0.01);
    moonOrbitRef.current.rotation.y += (0.01);
  })
  
  return(
    <mesh {...props}>
      <object3D ref={earthOrbitRef}>
        <object3D ref={moonOrbitRef} position={[16,0,0]}>
          <Earth />
          <object3D position={[2,0,0]}>
            <Moon scale={[0.35,0.35,0.35]}/>
          </object3D>
        </object3D>
      </object3D>
    </mesh>
  )
}