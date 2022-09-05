import React from "react";
import Navbar from "./component/Navbar";
import Cartcontiner from "./component/Cartcontiner";
import { useEffect } from "react";
import { calculateTotals, getCartItems } from "./redux/features/cart/CartSlice";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./component/Modal";

const App = () => {
  const { cartItems, isLoading } = useSelector((state) => state.cart);

  const { isModalOpen } = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems("random url"));
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      {isModalOpen && <Modal />}

      <Navbar />
      <Cartcontiner />
    </main>
  );
};

export default App;
