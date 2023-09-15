"use client";

import { useSelector, useDispatch } from 'react-redux';
import { vocabularyCatActions } from '@/redux/store';
import { useEffect, useState} from 'react';

const Cat =()=>{
    const [food1, setFood1] = useState('');
    const [food2, setFood2] = useState('');
    const [food3, setFood3] = useState('');
    const [food4, setFood4] = useState('');
    const [food5, setFood5] = useState('');

    const isAwake = useSelector((state)=>state.isAwake)
    const counter = useSelector((state)=>state.counter);
    const dispatch = useDispatch();

    const food = ["/assets/images/donut.png", "/assets/images/cake.png","/assets/images/cheese.png", 
    "/assets/images/dish.png", "/assets/images/drink.png", "/assets/images/ice-cream.png","/assets/images/milk.png",
     "/assets/images/milkshake.png", "/assets/images/sausage.png","/assets/images/piece-pizza.png"]

    const positionHandler =()=>{
        const num1 = Math.floor(Math.random() * food.length);
        let num2 = 0;
        let num3 = 0;
        let num4 = 0;
        let num5 = 0;

        do{
            num2 = Math.floor(Math.random() * food.length);
        } while(num1 === num2);
    
        do{
            num3 = Math.floor(Math.random() * food.length);
        } while(num3 === num1 || num3 === num2 );
    
        do{
            num4 = Math.floor(Math.random() * food.length);
        } while(num4 === num1 || num4 === num2 || num4 === num3 );
    
        do{
            num5 = Math.floor(Math.random() * food.length);
        } while(num5 === num1 || num5 === num2 || num5 === num3 || num5 === num4 );

        setFood1(food[num1]);
        setFood2(food[num2]);
        setFood3(food[num3]);
        setFood4(food[num4]);
        setFood5(food[num5]);
    }

    useEffect (()=>{
        positionHandler();
    }, [])

   useEffect(()=>{
    if(isAwake===true){
       dispatch(vocabularyCatActions.trueAwakeHandler())
    }else{
       dispatch(vocabularyCatActions.falseAwakeHandler())
    }
   },[])



    const wakeUpHandler =()=>{
        dispatch(vocabularyCatActions.trueAwakeHandler());
        
    }
    

    return (
        <>
        {isAwake && 
            <div className='hunger'>
                {counter<1 && <img className ='food1' src={food1}/>}
                {counter<2 && <img className = 'food2' src={food2}/>}
                {counter<3 && <img className = 'food3' src={food3}/>}
                {counter<4 && <img className = 'food4' src={food4}/>}
                {counter<5 && <img className = 'food5' src={food5}/>}
            </div>
            }
        <div className="container" onClick={wakeUpHandler}>
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
                   {counter <4 && <p className="text font-dog">{!isAwake? "Wake Me Up":"Feed Me"}</p>}
                   {counter>=4 && <p className="text font-dog">Thank you!</p>}
                    </div>
            </div>
        </div>
        </>
    )

}

export default Cat;