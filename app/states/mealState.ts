import { MealModel } from "@/models/MealModel";

interface MealState {
  mealList: Array<MealModel>;
  favoriteMealList: Array<MealModel>;
  shoppingList: Array<string>;
  setMealList: (mealList: Array<MealModel>) => void;
  addFavoriteMeal: (meal: MealModel) => void;
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

export default MealState;
