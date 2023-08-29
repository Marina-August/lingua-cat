"use client";

import { useState } from "react";

const CatWithLaptop = ()=>{
   const [isBubble, setIsBubble] = useState(true); 

   const bubbleHandler = ()=>{
     setIsBubble(false);
   }

    return(
        <div className="container-kitty">
      <div className="kitty">
        <div className="face">
          <div className="ear-kitty"></div>
          <div className="eye-kitty"></div>
          <div className="mouth-noseKitty">
            <div className="nose-kitty"></div>
            <div className="whisker-1"></div>
            <div className="whisker-2"></div>
          </div>
          <div className="body-kitty">
            <div className="hand">
              <div className="hand-l"></div>
              <div className="hand-r"></div>
            </div>
          </div>
          <div className="tail-kitty"></div>
        </div>
        {isBubble && <div className="bubbleWithWords" onClick={bubbleHandler}>
            <p className="textKissa">Kissa - Cat</p>
        </div>}
        <div className="laptop">
          <div className="logo"></div>
        </div>
      </div>
    </div>
    )
}

export default CatWithLaptop;