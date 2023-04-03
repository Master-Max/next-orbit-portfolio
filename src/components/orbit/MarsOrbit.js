import React from "react";
import { useRef } from "react"; 
import { useFrame } from "@react-three/fiber";
import Mars from "./Mars";

export default function MarsOrbit(props) {  
  
  const marsOrbitRef = useRef();

  useFrame((state, delta) => {
    marsOrbitRef.current.rotation.y += (0.007);
  })
  
  return(
    <mesh {...props}>
      <object3D ref={marsOrbitRef}>
        <Mars 
          position={[22,0,0]} 
          scale={[0.5,0.5,0.5]}
        />
      </object3D>
    </mesh>
  )
}