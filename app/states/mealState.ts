interface MealState {
  mealList:Array<Meal>;
  favoriteMealList:Array<Meal>;
  setMealList: (mealList: Array<Meal>) => void;
  addFavoriteMeal: (meal: Meal) => void;
  removeFavoriteMeal: (mealName: string) => void;
}



interface Meal{
  name:string,
  description:string,
  ingredients:Array<string>
}