import React from "react";

export default function Earth(props) {  
  return(
    <mesh {...props}>
      <meshPhongMaterial 
        color={'#2050FF'}
        emissive={'#3f2234'} 
        flatShading 
      />
      <sphereGeometry />
      
    </mesh>
  )
}