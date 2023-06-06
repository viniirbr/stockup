export interface Product {
  id: number | string;
  name: string;
  quantity?: number;
  category: string;
  lastPrice?: number;
  checked: boolean;
}
