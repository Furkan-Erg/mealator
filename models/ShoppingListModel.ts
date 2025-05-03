import { IngredientModel } from "./IngredientModel";

export interface ShoppingListModel {
  id: number;
  name: string;
  ingredientList: IngredientModel[];
}
