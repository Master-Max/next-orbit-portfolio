import React from "react";
import Saturn from "./Saturn";
import SaturnRing from "./SaturnRing";
import { useRef } from "react"; 
import { useFrame } from "@react-three/fiber";

export default function SaturnOrbit(props) {  
  
  const saturnOrbitRef = useRef();
  // const moonOrbitRef = useRef();

  useFrame((state, delta) => {
    saturnOrbitRef.current.rotation.y += (0.00025);
    // moonOrbitRef.current.rotation.y += (delta);
  })
  
  return(
    <mesh {...props}>
      <object3D ref={saturnOrbitRef}>
        <object3D position={[75,0,0]}>
          <Saturn />
          <object3D position={[0,0,0]}>
            <SaturnRing rotation={[1.3,0,0]} tgArgs={[1.8, .15, 16, 100 ]} />
            <SaturnRing rotation={[1.3,0.1,0]} tgArgs={[2.2, .15, 4, 100 ]} />
            <SaturnRing rotation={[1.5,-0.1,0]} tgArgs={[1.4, .1, 4, 100 ]} />
          </object3D>
        </object3D>
      </object3D>
    </mesh>
  )
}