"use client";

import { useSelector, useDispatch } from 'react-redux';
import { vocabularyCatActions } from '@/redux/store';
import { useEffect } from 'react';

const Cat =()=>{
    const isAwake = useSelector((state)=>state.isAwake)
    const counter = useSelector((state)=>state.counter);
    const dispatch = useDispatch();

   useEffect(()=>{
    // const awake = localStorage.getItem('info');
    if(isAwake===true){
       dispatch(vocabularyCatActions.trueAwakeHandler())
    }else{
       dispatch(vocabularyCatActions.falseAwakeHandler())
    }
   },[])

   //----- Set Interval for the cat to fall asleep in 30 seconds------

   useEffect(()=>{
    const intervalId = setInterval(() => {
        dispatch(vocabularyCatActions.falseAwakeHandler()) ; 
      }, 60000); 
  
      return () => {
        clearInterval(intervalId);
      };
   },[])


   //-----------Set reset counter to show hunger------------------
//    useEffect(()=>{
//     const intervalId = setInterval(() => {
//         dispatch(vocabularyCatActions.reset()) ; 
//       }, 3600000); 
  
//       return () => {
//         clearInterval(intervalId);
//       };
//    },[])

    
   // set localstorage to be cat awake after page reloading
    const wakeUpHandler =()=>{
        dispatch(vocabularyCatActions.trueAwakeHandler());
        // localStorage.setItem('awake', true);
    }
    //----------------------------------------------------

    return (
        <>
        {isAwake && <div className="hunger">
            {counter<1 && <div className="h">100%</div>}
            {counter<2 && <div className="u">80%</div>}
            {counter<3 && <div className="n">60%</div>}
            {counter<4 && <div className="g">40%</div>}
            {counter<5 && <div className="e">20%</div>}
            {/* {counter<6 && <div className="r">0%</div>} */}
            </div>}
        <div className="container" onClick={wakeUpHandler}>
            <div className={!isAwake ? "hadow":''}></div>

            <div className="cat">
                <div className="ear"></div>
                <div className={!isAwake? "eye":"eyeOpen"}></div>
                {counter <5 &&<div className="mouth"></div>}
                {counter >=5 && <div className="mouthNotHunger"></div>}
                <div className= "nose"></div>
                <div className={!isAwake? "tailAction":"tailUpDown"}></div>
                <div className={!isAwake? "body": "bodyAwake"}></div>
                {!isAwake && <div className="bubble"></div>}
                <div className="bubbleWithText">
                   {counter <5 && <p className="text">{!isAwake? "Wake Me Up":"Feed Me"}</p>}
                   {counter>=5 && <p className="text">Thank you!</p>}
                    </div>
            </div>
        </div>
        </>
    )

}

export default Cat;