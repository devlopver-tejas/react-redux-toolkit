import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import cartItems from "../../../cartItems"

const url = 'https://course-api.com/react-useReducer-cart-project';


const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true,
  };


  export const getCartItems = createAsyncThunk(
    'cart/getCartItems',
    
    async (name,thunkApi) => {

      console.log("name :",name)
      console.log("thunkApi :",thunkApi)
      try {
       
        const reponse = await fetch(url)
    
        const data = await reponse.json();
    
        return data
    
      } catch (error) {
        console.log(error)
      }
    }
  );
  

const cartSlice = createSlice({
    name :'cart',
    initialState,
    reducers:{
      clearCart : (state)=>{
        state.cartItems = [];
        state.amount =0;  
      },
      removeItem : (state,action)=>{
      let itemId = action.payload;
      state.cartItems = state.cartItems.filter((item)=> item.id != itemId);
      state.amount =   state.amount-1
      },
      increaseAmount : (state,action)=>{
        let itemId = action.payload;
        state.cartItems= state.cartItems.map((item)=>{
          if(item.id == itemId){
            item.amount +=1;
            state.amount +=1;
          }
          return item; });
      },
      decreaseAmount : (state,action)=>{
        let itemId = action.payload;


        state.cartItems= state.cartItems.map((item)=>{
          if(item.id == itemId){
            item.amount -=1;
            state.amount -=1;
            if(item.amount == 0){
              removeItem(item.id);
            }
          }
          return item; });

        
      },
      calculateTotals: (state) => {
        let amount = 0;
        let total = 0;
        state.cartItems.forEach((item) => {
          amount += item.amount;
          total += item.amount * item.price;
        });
        state.amount = amount;
        state.total = total;
      },

    },
    extraReducers: {
      [getCartItems.pending]: (state) => {
        state.isLoading = true;
      },
      [getCartItems.fulfilled]: (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.cartItems = action.payload;
      },
      [getCartItems.rejected]: (state, action) => {
        console.log(action);
        state.isLoading = false;
      },
    },

  
})

console.log("CARTsLICE :",cartSlice)




export const {clearCart,removeItem,increaseAmount,decreaseAmount,calculateTotals} =cartSlice.actions

export default cartSlice.reducer;