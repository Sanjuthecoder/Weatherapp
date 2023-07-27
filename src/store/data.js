import { createSlice} from "@reduxjs/toolkit";

const initialState={
    data:null
}
const createdata=createSlice({
    name:'data',
    initialState:initialState,
    reducers:{
        setdata(state,action){
            state.data=action.payload
        }
    }
})

export const { setdata } = createdata.actions

export default createdata