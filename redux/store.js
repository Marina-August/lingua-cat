import { createSlice,configureStore } from '@reduxjs/toolkit';

const initialVocabularyCatState = {counter: 0, isAwake: false, allWords:[], wordsForTable:[], 
    testAllWords:false, countQuestions:0, quantityRightAnswers:0, sourceLanguage: 'Finnish', targetLanguage:'English'};

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
        },
        setWordsForTable(state, action){
            state.wordsForTable = action.payload
        },
        falseTestAllWords(state){
            state.testAllWords = false
        },
        trueTestAllWords(state){
            state.testAllWords = true
        },
        incrementCountQuestions(state){
            state.countQuestions++
        },
        incrementQuantityRightAnswers(state){
            state.quantityRightAnswers++
        },
        setSourceLanguage(state, action){
            state.sourceLanguage = action.payload
        },
        setTargetLanguage(state, action){
            state.targetLanguage = action.payload
        },

    }
})

const store = configureStore({
    reducer: vocabularyCatSlice.reducer
})

export const vocabularyCatActions = vocabularyCatSlice.actions;

export default store;