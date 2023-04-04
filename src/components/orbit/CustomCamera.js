import React from "react";
import {useFrame, useThree} from "@react-three/fiber";
// import { Camera } from "@react-three/fiber";
// import { Camera } from "three";

export default function CustomCamera({getCameraPos}){
  
  let deltaTotal = 0;

  useFrame((state, delta) => {
    // console.log('Hiii UseFrame')
    // console.log(delta);
    // deltaTotal += delta;
    // console.log(deltaTotal);
    // console.log(getCameraPos())
    

    // Slow zoom out;
    // camera.position.z = deltaTotal;

    let tmpPos = getCameraPos();

    camera.position.z = getCameraPos();

    camera.position.y = tmpPos[1];
    camera.position.z = tmpPos[2];
    camera.lookAt(0,0,0)


    // camera.position = getCameraPos();
    // console.log(getCameraPos());
  })

  const {camera, gl} = useThree();

  // camera.position.z = 50;

  return(
    <>
    </>
  )

}


