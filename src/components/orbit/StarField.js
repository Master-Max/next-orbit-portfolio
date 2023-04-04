import React, { useEffect } from "react";
import { useRef } from "react"; 
import { useFrame } from "@react-three/fiber";
import StarFieldObject from "./StarFieldObject";

export default function StarField(props) {  
  
  const starFieldOrbitRef = useRef();

  useFrame((state, delta) => {
    // starFieldOrbitRef.current.rotation.y += 0.0001
  }) 

  // useFrame((state, delta) => {
  //   mercuryOrbitRef.current.rotation.y += (0.03);
  // })
  let count = 0;

  let foo = () =>{
    let tmp = (Math.trunc(Math.random() * 10) % 2);
    //Math.trunc(Math.random() * 10) % 2
    //Number(`${Date.now()}`[12]) % 2
    let ear = Math.trunc(Math.random() * 500) + 10;
    if(tmp === 1){
        ear *= 1;
    } else {
        ear *= -1;
    }
    
   return(
        ear
    )
  }

  let bar = () => {
    // console.log(foo())
    

    // const [x,y,z] = Array(3).fill().map(() => foo())
    const x = foo();
    const y = foo();
    const z = foo();
    count += 1;

    return(
      <StarFieldObject 
        key={`SFO-${count}`}
        position={[x,y,z]}
        scale={[0.5,0.5,0.5]}
      />
    )

  }

  const NumObjectsArr = Array(300);
  for(let i = 0; i<NumObjectsArr.length; i++){
    NumObjectsArr[i] = bar();
  }
  
  // console.log(NumObjectsArr)
  
  return(
    <mesh {...props}>
      <object3D ref={starFieldOrbitRef}>
        {NumObjectsArr}
      </object3D>
    </mesh>
  )
}