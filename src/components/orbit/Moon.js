import React from "react";

export default function Moon(props) {  
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