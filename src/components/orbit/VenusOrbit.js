import React from "react";
import { useRef } from "react"; 
import { useFrame } from "@react-three/fiber";
import Venus from "./Venus";

export default function VenusOrbit(props) {  
  
  const venusOrbitRef = useRef();

  useFrame((state, delta) => {
    venusOrbitRef.current.rotation.y += (0.02);
  })
  
  return(
    <mesh {...props}>
      <object3D ref={venusOrbitRef}>
        <Venus position={[10,0,0]} scale={[0.95,0.95,0.95]}/>
      </object3D>
    </mesh>
  )
}