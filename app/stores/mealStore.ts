import { create } from 'zustand';

export const useMealStore = create<MealState>((set) => ({
  mealList:[],
  favoriteMealList:[],
  setMealList: (mealList) => set({ mealList }),
  addFavoriteMeal: (meal) => set((state) => ({
    favoriteMealList: [...state.favoriteMealList, meal]
  })),
  removeFavoriteMeal: (mealName) =>
    set((state) => ({
      favoriteMealList: state.favoriteMealList.filter(
        (meal) => meal.name !== mealName
      ),
    })),
 
}));
