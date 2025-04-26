interface MealState {
  mealList: Array<Meal>;
  favoriteMealList: Array<Meal>;
  shoppingList: Array<string>;
  setMealList: (mealList: Array<Meal>) => void;
  addFavoriteMeal: (meal: Meal) => void;
  removeFavoriteMeal: (mealName: string) => void;
  addToShoppingList: (ingredient: string) => void;
  removeFromShoppingList: (ingredient: string) => void;
  clearShoppingList: () => void;
}

export interface Meal {
  id: number;
  name: string;
  description: string;
  ingredients: Array<string>;
}

export default MealState;
