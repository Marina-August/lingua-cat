import { createSlice,configureStore } from '@reduxjs/toolkit';

const initialVocabularyCatState = {counter: 0, isAwake: false, allWords:[]};

const vocabularyCatSlice = createSlice({
    name: "vocabulary",
    initialState: initialVocabularyCatState,
    reducers:{
        increment(state){              // Increment counter when add new word to deal with Hunger element
            state.counter++;
        },
        reset(state){
            state.counter = 0;
        },
        setCounter(state, action){         // Set counter meaning after reload page to the counter meaning before reloading  
            state.counter = action.payload
        },
        trueAwakeHandler(state){
            state.isAwake = true;
        },
        falseAwakeHandler(state){
            state.isAwake = false;
        },
        setAllWords(state, action){
            state.allWords = action.payload
        }
    }
})

const store = configureStore({
    reducer: vocabularyCatSlice.reducer
})

export const vocabularyCatActions = vocabularyCatSlice.actions;

export default store;