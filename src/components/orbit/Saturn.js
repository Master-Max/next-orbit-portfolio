import React from "react";

export default function Saturn(props) {  
  return(
    <mesh {...props}>
      <meshPhongMaterial 
        color={'#5F940B'} 
        emissive={'#895C3D'}
        flatShading  
      />
      <sphereGeometry args={[1,12,12]}/>
    </mesh>
  )
}