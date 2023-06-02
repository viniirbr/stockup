import { Category } from "./Category";

export interface Product {
  name: string;
  quantity?: number;
  category?: string;
  lastPrice?: number;
  checked: boolean;
}
