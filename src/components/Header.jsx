import { useContext } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button.jsx";
import CartContext from "../store/cartContext.jsx";
import UserProgressContext from "../store/userProgressContext.jsx";

export default function Header() {
  const context = useContext(CartContext);
  const totalcartItems = context.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const userProgress = useContext(UserProgressContext);

  function handleShowCart() {
    userProgress.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button text className="" onClick={handleShowCart}>
          Cart ({totalcartItems})
        </Button>
      </nav>
    </header>
  );
}
