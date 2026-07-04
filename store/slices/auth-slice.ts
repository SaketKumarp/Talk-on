import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface User {
    _id:string;
    name:string;
    email:string
}

interface AuthState {
    user : User | null;
    token : string | null
    loading : boolean
}
const initialState : AuthState ={
    user : null,
    token: null,
    loading : true
}

const AuthSlice= createSlice({
    name: "auth",
    initialState ,
    reducers : {
        setUser : (state,action : PayloadAction<{
            user :User,
            token : string,
            loading : boolean
        }>)=> {
                state.user=action.payload.user;
                state.token=action.payload.token
                state.loading=action.payload.loading
        }

        , logout : (state)=>{
            state.user=null;
            state.token=null;
        }

    
    }
})
export const {setUser,logout}= AuthSlice.actions
export default AuthSlice.reducer;