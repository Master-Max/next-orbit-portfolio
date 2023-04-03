import React from "react";
// import Jupiter from "./Jupiter";
import JupiterMoon from "./JupiterMoon";
import { useRef } from "react"; 
import { useFrame } from "@react-three/fiber";
import { Object3D } from "three";

export default function AsteroidBeltOrbit(props) {  
  
  const ceresOrbitRef = useRef();
  const vestaOrbitRef = useRef();
  // const jMoon2OrbitRef = useRef();
  // const jMoon3OrbitRef = useRef();
  // const jMoon4OrbitRef = useRef();

  useFrame((state, delta) => {
    ceresOrbitRef.current.rotation.y += (0.005);
    vestaOrbitRef.current.rotation.y += (0.005);
    // jMoon2OrbitRef.current.rotation.y += (0.05);
    // jMoon3OrbitRef.current.rotation.y += (0.0333);
    // jMoon4OrbitRef.current.rotation.y += (0.025);
  })

  return(
    <mesh {...props}>
      <object3D>
      {/* Ceres */}
      <object3D >
        <object3D ref={ceresOrbitRef}  >
          <object3D position={[30,0,0]}>
            <JupiterMoon scale={[0.25,0.25,0.25]}/>
          </object3D>
        </object3D>
      </object3D >
      {/* Vesta */}
      <object3D >
        <object3D ref={vestaOrbitRef} >
          <object3D  position={[-30,0,0]}>  
            <JupiterMoon scale={[0.25,0.25,0.25]}/>
          </object3D>
        </object3D>
      </object3D >
      </object3D>
    </mesh>
  )
}


  // return(
  //   <mesh {...props}>
  //     <object3D>
  //       <object3D ref={ceresOrbitRef} >
  //         <object3D  position={[30,0,0]}>
  //           <JupiterMoon scale={[0.25,0.25,0.25]}/>
  //         </object3D>
  //       <object3D/>

  //         <object3D ref={vestaOrbitRef} >
  //           <object3D  position={[-30,0,0]}>
  //             <JupiterMoon scale={[0.25,0.25,0.25]}/>
  //           </object3D>
  //         <object3D/>
  //         </object3D> 
  //       </object3D> 
  //     </object3D>
  //   </mesh>
  // )