import { useContext } from "react";
import CartContext from "../store/cartContext";
import { currencyFormatter } from "../util/formating";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/userProgressContext";
import Modal from "./UI/Modal";
import useHttp from "./hooks/useHttp";
import Error from "./Error.jsx";

const config = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

export default function Checkout() {
  const cart = useContext(CartContext);
  const userProgress = useContext(UserProgressContext);
  const { data, loading, error, sendRequest, clearData } = useHttp(
    "https://lzpklg-3000.csb.app/orders",
    config
  );

  const cartPrice = cart.items.reduce((prev, item) => {
    return prev + item.quantity * item.price;
  }, 0);

  function handleClose() {
    userProgress.hideCheckout();
  }

  function handleFinish() {
    userProgress.hideCheckout();
    clearData();
    cart.clearCart();
  }

  async function handleSubmit(e) {
    // console.log("submitting.....");
    e.preventDefault();
    // console.log(e.target);
    const form = e.target; // Get the form element
    const data = new FormData(form); // Create FormData from the form element
    const userData = Object.fromEntries(data.entries());

    sendRequest(
      JSON.stringify({ order: { items: cart.items, customer: userData } })
    );
  }

  if (data && !error) {
    return (
      <Modal open={userProgress.progress === "checkout"} onClose={handleClose}>
        {" "}
        <h2>Success</h2>
        <p>Your order has been submitted successfully</p>
        <p>
          {" "}
          We will get back with more details via email within the next minutes
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>{" "}
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgress.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amout: {currencyFormatter.format(cartPrice)} </p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="Email Addres" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error title="Failed to submit order" message={error} />}
        <div className="modal-actions">
          {loading ? (
            <p>Sending order data...</p>
          ) : (
            <>
              <Button type="button" text onClick={handleClose}>
                {" "}
                Close{" "}
              </Button>
              <Button type="submit"> Submit Order </Button>
            </>
          )}
        </div>
      </form>
    </Modal>
  );
}
