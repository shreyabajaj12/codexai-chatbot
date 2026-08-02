import { createSlice } from "@reduxjs/toolkit";

const messageSlice =createSlice({
    name:"message",
    initialState:{
        message:[],
        artifacts:[]
    },
    reducers:{
        setMessage:(state,action)=>{
            state.message=action.payload
        },
        addMessage:(state,action)=>{
            state.message.push(action.payload)
        },
        setArtifacts:(state,action)=>{
            state.artifacts=action.payload
        },

    }
})
export const {setMessage,addMessage,setArtifacts}=messageSlice.actions 
export default messageSlice.reducer