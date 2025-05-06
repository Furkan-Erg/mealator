import { NutritionInfoModel } from "./NutritionInfoModel";

export interface MealModel {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  //nutritionInfo: NutritionInfoModel;
}
