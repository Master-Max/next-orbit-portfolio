import React from "react";

export default function Mars(props) {  
  return(
    <mesh {...props}>
      <meshPhongMaterial 
        color={'red'} 
        emissive={'#191AFF'}
        flatShading 
      />
      <sphereGeometry />
    </mesh>
  )
}