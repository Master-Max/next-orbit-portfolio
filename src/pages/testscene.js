import { useRef, useState } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import Floor from "@/components/tests/Floor";
import Box from "@/components/tests/Box";
import LightBulb from "@/components/tests/LightBulb";
import OrbitControls from "@/components/tests/OrbitControls";

export default function TestScene() {

    return(
        <>
            <div className="fixed top-0 left-0 z-0 h-full w-full">
                <Canvas
                    shadows
                    className="bg-white"
                    camera={{
                        position: [-6,7,7]
                    }}
                >
                    <ambientLight color={"white"} intensity={0.3} />
                    <LightBulb position={[0,3,0]}/>
                    <Box position={[0,1,0]} />
                    <OrbitControls />
                    <Floor position={[0, -1, 0]} />

                </Canvas>
            </div>
        
        </>
    )
}