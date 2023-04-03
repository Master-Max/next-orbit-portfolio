import React from "react";
import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";


function Box(props) {

    const ref = useRef();

    useFrame((state, delta) => {
        ref.current.rotation.y += delta/2;
        ref.current.rotation.x += delta;
    })

    return (
        <mesh 
            {...props} 
            receiveShadow={true} 
            castShadow
            ref={ref}
        >
            <boxBufferGeometry />
            <meshPhysicalMaterial color={"red"} />
        </mesh>
    );
}

export default Box;