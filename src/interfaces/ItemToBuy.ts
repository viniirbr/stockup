import { Category } from "./Category";

export interface ItemToBuy {
  id: number;
  name: string;
  quantity?: number;
  category?: Category;
  lastPrice?: number;
  checked: boolean;
}
