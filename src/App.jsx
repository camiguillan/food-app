import { useEffect } from "react";
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import { CartProvider } from "./store/cartContext.jsx";
import { UserProgressContextProvider } from "./store/userProgressContext.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";

function App() {
  // useEffect(() => {
  //   fetch("http://localhost:3000/meals").then((res) => res.json());
  // }, []);

  return (
    <CartProvider>
      <UserProgressContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </UserProgressContextProvider>
    </CartProvider>
  );
}

export default App;
