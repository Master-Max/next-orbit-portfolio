import { Canvas, useFrame } from "@react-three/fiber";


// const mainLight = new THREE.PointLight(0xffffff, 22.0)
import Sun from "@/components/orbit/Sun";
import Earth from "@/components/orbit/Earth";
import Moon from "@/components/orbit/Moon";
import EarthMoonOrbit from "@/components/orbit/EarthMoonOrbit";
import MercuryOrbit from "@/components/orbit/MercuryOrbit";
import VenusOrbit from "@/components/orbit/VenusOrbit";
import MarsOrbit from "@/components/orbit/MarsOrbit";
import AsteroidBeltOrbit from "@/components/orbit/AsteroidBeltOrbit";
import JupiterOrbit from "@/components/orbit/JupiterOrbit";
import SaturnOrbit from "@/components/orbit/SaturnOrbit";
import StarField from "@/components/orbit/StarField";
import CustomCamera from "@/components/orbit/CustomCamera";
import OrbitControls from "@/components/tests/OrbitControls";
// import { Camera } from "three";
import { useState, useEffect } from "react";

// import { camera } from "three";

export default function SolarSystemBg({getCameraPos}) {

  // const [cpos, setCpos] = useState([0, 0, 25]);
  // let test111 = getCameraPos();
  // console.log(test111);
  // console.log('TTT:', t);
  const cpos = [0,0,25]


  // document.body.onscroll = moveCamera;

  // thisWindow.addEventListener('scroll', moveCamera)

  // useEffect(() => {
  //   const onScroll = () => moveCamera();
  //   // clean up code
  //   window.removeEventListener('scroll', onScroll);
  //   window.addEventListener('scroll', onScroll, { passive: true });
  //   return () => window.removeEventListener('scroll', onScroll);
  // }, []);




  return(
    <>
      {/* <div className="h-[200vh z-20" onScroll={moveCamera}>
        <p className="h-50 text-white font-bold text-2xl"> Test </p>
      </div> */}

      <div className="fixed top-0 left-0 z-0 h-full w-full" >
      <Canvas
        shadows
        className="bg-black"
        camera={{
          position: cpos
          
        }}
        // linear



      
      >
        <Sun scale={[5,5,5]}/>
        <StarField />
        <CustomCamera getCameraPos={getCameraPos}/>
        {/* <OrbitControls /> */}
        
        <MercuryOrbit />
        <VenusOrbit />
        <EarthMoonOrbit />
        <MarsOrbit />
        <AsteroidBeltOrbit />
        <JupiterOrbit />
        <SaturnOrbit />


      </Canvas>
    </div>
    </>
  )
}