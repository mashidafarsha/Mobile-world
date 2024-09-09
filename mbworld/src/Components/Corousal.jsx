
import React from "react";
import { Carousel } from "flowbite-react";
import 'flowbite/dist/flowbite.css';

export function Corousal() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 overflow-hidden">
    <Carousel slide={false}>
      <img
        className="w-full h-full object-cover"
        src="https://i.pinimg.com/564x/f2/38/e7/f238e7f0432ed999eb4f4a50e963b56d.jpg" 
        alt="Carousel Image 1"
      />
      <img
        className="w-full h-full object-cover"
        src="https://i.pinimg.com/564x/f1/31/27/f13127a3b727ea34d8520da411630570.jpg"
        alt="Carousel Image 2"
      />
      
     
    </Carousel>
  </div>

     
  )
}

