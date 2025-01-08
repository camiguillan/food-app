import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/cartContext";
import { currencyFormatter } from "../util/formating.js";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/userProgressContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
  const cart = useContext(CartContext);
  const userProgress = useContext(UserProgressContext);

  const cartPrice = cart.items.reduce((prev, item) => {
    return prev + item.quantity * item.price;
  }, 0);

  function handleClose() {
    userProgress.hideCart();
  }

  function handleCheckout() {
    userProgress.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userProgress.progress === "cart"}
      onClose={userProgress.progress === "cart" ? handleClose : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cart.items.map((item) => {
          return (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={() => cart.addItem(item)}
              onDecrease={() => cart.removeItem(item.id)}
            />
          );
        })}
      </ul>
      <p className="cart-total">
        Total Price: {currencyFormatter.format(cartPrice)}
      </p>
      <p className="modal-actions">
        <Button text onClick={handleClose}>
          {" "}
          Close
        </Button>
        {cart.items.length > 0 && (
          <Button onClick={handleCheckout}> Go to Checkout </Button>
        )}
      </p>
    </Modal>
  );
}
