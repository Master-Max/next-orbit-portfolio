import React from "react";

export default function StarFieldObject(props) {  
  return(
    <mesh {...props}>
      <meshPhongMaterial 
        emissive={'#191A5F'} 
        flatShading
      />
      <sphereGeometry />
      
    </mesh>
  )
}