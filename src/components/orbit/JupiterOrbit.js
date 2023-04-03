import React from "react";
import Jupiter from "./Jupiter";
import JupiterMoon from "./JupiterMoon";
import { useRef } from "react"; 
import { useFrame } from "@react-three/fiber";

export default function JupiterOrbit(props) {  
  
  const jupiterOrbitRef = useRef();
  const jMoon1OrbitRef = useRef();
  const jMoon2OrbitRef = useRef();
  const jMoon3OrbitRef = useRef();
  const jMoon4OrbitRef = useRef();

  useFrame((state, delta) => {
    jupiterOrbitRef.current.rotation.y += (0.0005);
    jMoon1OrbitRef.current.rotation.y += (0.1);
    jMoon2OrbitRef.current.rotation.y += (0.05);
    jMoon3OrbitRef.current.rotation.y += (0.0333);
    jMoon4OrbitRef.current.rotation.y += (0.025);
  })
  
  return(
    <mesh {...props}>
      <object3D ref={jupiterOrbitRef} >
        <object3D  position={[50,0,0]}>
          <Jupiter scale={[2,2,2]} />
          <object3D ref={jMoon1OrbitRef} >
            <object3D position={[3,0,0]}>
              <JupiterMoon scale={[0.25,0.25,0.25]}/>
            </object3D>
          </object3D>
          <object3D ref={jMoon2OrbitRef} >
            <object3D position={[5,0,0]}>
              <JupiterMoon scale={[0.30,0.30,0.30]}/>
            </object3D>
          </object3D>
          <object3D ref={jMoon3OrbitRef} >
            <object3D ref={jMoon3OrbitRef} position={[7,0,0]}>
              <JupiterMoon scale={[0.35,0.35,0.35]}/>
            </object3D>
          </object3D>
          <object3D ref={jMoon4OrbitRef} >
            <object3D ref={jMoon4OrbitRef} position={[9,0,0]}>
              <JupiterMoon scale={[0.2,0.2,0.2]}/>
            </object3D>
          </object3D>  
        </object3D>
      </object3D>
    </mesh>
  )
}