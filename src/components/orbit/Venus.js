import React from "react";

export default function Earth(props) {  
  return(
    <mesh {...props}>
      <meshPhongMaterial 
        color={'#D2B48C'} 
        emissive={'#3f2234'} 
        flatShading 
      />
      <sphereGeometry />
    </mesh>
  )
}