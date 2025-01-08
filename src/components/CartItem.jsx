import { currencyFormatter } from "../util/formating";

export default function CartItem({ item, onIncrease, onDecrease }) {
  return (
    <li className="cart-item">
      <p>
        {item.name} - {currencyFormatter.format(item.price)} X {item.quantity}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span> {item.quantity} </span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}
