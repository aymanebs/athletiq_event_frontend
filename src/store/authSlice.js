import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState: { 
        isAuthenticated: localStorage.getItem('isAuthenticated') || false,
        acces_token: localStorage.getItem('acces_token') || null, 
    },

    reducers:{
        setLogin:(state,action) =>{
            state.isAuthenticated = true;
            state.acces_token = action.payload.acces_token;
            localStorage.setItem('isAuthenticated',state.isAuthenticated);
            localStorage.setItem('acces_token',state.acces_token);
        },
        setLogout:(state)=>{
            state.isAuthenticated = false;
            state.acces_token = null;
            localStorage.removeItem('acces_token');
            localStorage.removeItem('isAuthenticated');
        }
    }
})




export const {setLogin, setLogout} = authSlice.actions;
export default authSlice.reducer;