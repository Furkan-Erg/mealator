interface MealState {
  mealList: Array<Meal>;
  favoriteMealList: Array<Meal>;
  shoppingList: Array<string>;
  setMealList: (mealList: Array<Meal>) => void;
  addFavoriteMeal: (meal: Meal) => void;
  removeFavoriteMeal: (id: number) => void;
  addToShoppingList: (ingredient: string) => void;
  removeFromShoppingList: (ingredient: string) => void;
  clearShoppingList: () => void;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface Meal {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  nutritionInfo: NutritionInfo;
}

export default MealState;
