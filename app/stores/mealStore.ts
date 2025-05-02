import { create } from "zustand";
import { meals } from "../data/mealData";
import MealState from "../states/mealState";

const useMealStore = create<MealState>((set) => ({
  mealList: [],
  favoriteMealList: [],
  shoppingList: [],
  setMealList: (mealList) => set({ mealList }),
  addFavoriteMeal: (meal) =>
    set((state) => {
      if (state.favoriteMealList.some((m) => m.name === meal.name)) {
        return state;
      }
      return {
        favoriteMealList: [...state.favoriteMealList, meal],
      };
    }),
  removeFavoriteMeal: (id) =>
    set((state) => ({
      favoriteMealList: state.favoriteMealList.filter((meal) => meal.id !== id),
    })),
  addToShoppingList: (ingredient) =>
    set((state) => {
      if (state.shoppingList.includes(ingredient)) {
        return state;
      }
      return {
        shoppingList: [...state.shoppingList, ingredient],
      };
    }),
  removeFromShoppingList: (ingredient) =>
    set((state) => ({
      shoppingList: state.shoppingList.filter((i) => i !== ingredient),
    })),
  clearShoppingList: () => set({ shoppingList: [] }),
}));

export default useMealStore;
