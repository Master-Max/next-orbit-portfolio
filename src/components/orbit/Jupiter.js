import React from "react";

export default function Jupiter(props) {  
  return(
    <mesh {...props}>
      <meshPhongMaterial 
        color={'#F92E09'} 
        emissive={'#F71700'} 
        flatShading 
      />
      <sphereGeometry />
      
    </mesh>
  )
}