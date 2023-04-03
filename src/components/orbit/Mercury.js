import React from "react";

export default function Mercury(props) {  
  return(
    <mesh {...props}>
      <meshPhongMaterial 
        emissive={'#591A5F'} 
        flatShading
      />
      <sphereGeometry />
    </mesh>
  )
}