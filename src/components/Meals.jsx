import Error from "./Error.jsx";
import MealItem from "./MealItem.jsx";
import useHttp from "./hooks/useHttp.js";

const initialConfig = {};

export default function Meals() {
  // const [meals, setMeals] = useState([]);
  const {
    data: meals,
    loading,
    error,
  } = useHttp("http://localhost:3000/meals", initialConfig, []);

  if (loading) {
    return <p className="center">Fetching available meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <ul id="meals">
      {meals.length > 0 &&
        meals.map((meal) => {
          return <MealItem key={meal.id} meal={meal} />;
        })}
    </ul>
  );
}
