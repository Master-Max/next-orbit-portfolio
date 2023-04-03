import React from "react";

export default function Sun(props) {  
  return(
    <mesh {...props}>
      <pointLight color={"#ffffff"} />
      <meshPhongMaterial 
        color={'#005500'} 
        emissive={'#ffdd2f'} />
      <sphereGeometry args={[1,12,12]}/>
    </mesh>
  )
}