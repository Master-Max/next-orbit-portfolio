import React from "react";

export default function SaturnRing(props) {  
  return(
    <mesh {...props}>
      <meshPhongMaterial 
        color={'#F3F1C3'} 
        emissive={'#F3F1C3'}
        flatShading  
      />
      <torusGeometry
        args={[1.8, .15, 16, 100 ]}
      />
    </mesh>
  )
}