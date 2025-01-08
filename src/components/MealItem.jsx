import { useContext } from "react";
import { currencyFormatter } from "../util/formating.js";
import Button from "./UI/Button.jsx";
import CartContext from "../store/cartContext.jsx";

export default function MealItem({ meal }) {
  const context = useContext(CartContext);

  function handleAddMeal() {
    context.addItem(meal);
  }

  return (
    <li className="meal-item">
      <article className="meal-item-article ">
        <img src={`http://localhost:3000/${meal.image}`} />
        <div>
          <h3> {meal.name} </h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description"> {meal.description} </p>
        </div>
        <p className="meal-item-actions">
          <Button text={false} onClick={handleAddMeal}>
            {" "}
            Add to Cart{" "}
          </Button>
        </p>
      </article>
    </li>
  );
}
