import React from "react";

export default function StarFieldObject(props) {  

  const getRandStarColor = () => {

    let OStar = '#121177';
    let BStar = '#317db1';
    let AStar = '#9cd0da';
    let FStar = '#f0f5f2';
    let KStar = '#fd7e10';
    let GStar = '#F0E668';
    let MStar = '#fb0f08';



    let rand = Math.random() * 100;
    if(rand > 95){
      return(OStar);
    }else if(rand > 90){
      return(BStar);
    }else if(rand > 80){
      return(AStar);
    }else if(rand > 65){
      return(FStar);
    }else if(rand > 55){
      return(KStar);
    }else if(rand > 40){
      return(GStar);
    }else if(rand > 20){
      return(MStar);
    }
  }

  let tmpNewColor = getRandStarColor();

  return(
    <mesh {...props}>
      {/* <pointLight color={'#ffffff'} /> */}
      <meshPhongMaterial 
        color={getRandStarColor()}
        emissive={'#333333'} 
        flatShading
      />
      <sphereGeometry />
      
    </mesh>
  )
}