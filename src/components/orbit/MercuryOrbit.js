import React from "react";
import { useRef } from "react"; 
import { useFrame } from "@react-three/fiber";
import Mercury from "./Mercury";

export default function MercuryOrbit(props) {  
  
  const mercuryOrbitRef = useRef();

  useFrame((state, delta) => {
    mercuryOrbitRef.current.rotation.y += (0.03);
  })
  
  return(
    <mesh {...props}>
      <object3D ref={mercuryOrbitRef}>
        <Mercury 
          position={[6,0,0]} 
          scale={[0.45,0.45,0.45]}
        />
      </object3D>
    </mesh>
  )
}