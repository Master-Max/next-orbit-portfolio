import React from "react";
import {useFrame} from "@react-three/fiber";
// import { Camera } from "@react-three/fiber";
import { Camera } from "three";

export default function CustomCamera(props){
  
useFrame((state, delta) => {
  console.log('Hiii UseFrame')
  // console.log(getCameraPos());
})

return(
  <Camera
    props={
      position=[0,0,50]
    }
  >

  </Camera>
)

}


