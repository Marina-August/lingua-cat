"use client";

import Cat from "./Cat";
import CatWithLaptop from "./CatWithLaptop";
import { useSelector } from 'react-redux';


const CatAction =()=>{
    const counter = useSelector((state)=>state.counter);

    return(
        <>
            {counter <5 && <Cat/>}
            {counter >= 5 && <CatWithLaptop/>}
        </>

    )
}

export default CatAction;