import { createContext, ReactNode, useState, useEffect } from "react";
import { Product } from "../shared/interfaces/Product";
import { Category } from "../shared/interfaces/Category";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getItemFromStorage } from "../shared/helpers/getItemFromStorage";
import Toast from "react-native-toast-message";

interface ProductsContextData {
  products: Product[];
  categories: Category[];
  updateProducts: () => void;
  updateCategories: () => void;
  addProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: number | string) => Promise<void>;
  toggleProductState: (productId: number | string) => void;
  addCategory: (category: Category) => Promise<void>;
  editProduct: (productToEdit: Product) => Promise<void>;
  toggleCategoryActivate: (categoryId: number | string) => Promise<void>;
  editCategory: (categoryToEdit: Category) => Promise<void>;
  clearShoppingList: (exceptions: number[]) => Promise<void>;
}

export const ProductsContext = createContext<ProductsContextData>({
  products: [],
  categories: [],
  updateProducts: () => {},
  updateCategories: () => {},
  addProduct: async () => {},
  deleteProduct: async () => {},
  toggleProductState: async () => {},
  addCategory: async () => {},
  editProduct: async () => {},
  toggleCategoryActivate: async () => {},
  editCategory: async () => {},
  clearShoppingList: async () => {},
});

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await getItemFromStorage<Product>("products");
        setProducts(products);
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchCategories() {
      try {
        const categories = await getItemFromStorage<Category>("categories");
        setCategories(categories);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
    fetchCategories();
  }, []);

  async function updateProducts() {
    try {
      const products = await getItemFromStorage<Product>("products");
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateCategories() {
    try {
      const products = await getItemFromStorage<Product>("products");
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  }

  async function addProduct(product: Product) {
    try {
      const newProducts = [...products, product];
      setProducts(newProducts);
      AsyncStorage.setItem("products", JSON.stringify(newProducts));
    } catch (error) {
      console.log(error);
    }
  }

  async function editProduct(productToEdit: Product) {
    try {
      const newProducts = products.map((product) => {
        if (product.id === productToEdit.id) {
          return productToEdit;
        }
        return product;
      });

      setProducts(newProducts);
      AsyncStorage.setItem("products", JSON.stringify(newProducts));
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProduct(productId: number | string) {
    const newProducts = products.filter((product) => {
      if (product.id !== productId) {
        return product;
      }
    });
    setProducts(newProducts);
    try {
      AsyncStorage.setItem("products", JSON.stringify(newProducts));
      Toast.show({
        type: "success",
        text1: "Product deleted",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function addCategory(category: Category) {
    try {
      const newcategories = [...categories, category];
      setCategories(newcategories);
      AsyncStorage.setItem("categories", JSON.stringify(newcategories));
    } catch (error) {
      console.log(error);
    }
  }
  async function toggleProductState(productId: number | string) {
    const newProducts = products.map((product) => {
      if (product.id === productId) {
        product.checked = !product.checked;
      }

      return product;
    });
    setProducts(newProducts);
    try {
      await AsyncStorage.setItem("products", JSON.stringify(newProducts));
    } catch (error) {
      console.log(error);
    }
  }

  async function toggleCategoryActivate(categoryId: number | string) {
    const newCategories = categories.map((category) => {
      if (category.id === categoryId) {
        return { ...category, active: !category.active };
      }
      return category;
    });

    try {
      await AsyncStorage.setItem("categories", JSON.stringify(newCategories));
      setCategories(newCategories);
    } catch (error) {
      console.log(error);
    }
  }

  async function editCategory(categoryToEdit: Category) {
    try {
      const newCategories = categories.map((category) => {
        if (category.id === categoryToEdit.id) {
          return categoryToEdit;
        }
        return category;
      });

      setCategories(newCategories);
      AsyncStorage.setItem("categories", JSON.stringify(newCategories));
    } catch (error) {
      console.log(error);
    }
  }

  async function clearShoppingList(exceptions: number[]) {
    const productsToChangeState = products.filter(
      (product) =>
        product.checked === false && !exceptions.includes(product.id as number)
    );
    const newStateProducts = products.map((product) => {
      if (
        productsToChangeState.map((product) => product.id).includes(product.id)
      ) {
        product.checked = true;
      }
      return product;
    });
    try {
      await AsyncStorage.setItem("products", JSON.stringify(newStateProducts));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        categories,
        updateProducts,
        updateCategories,
        addProduct,
        deleteProduct,
        toggleProductState,
        addCategory,
        editProduct,
        toggleCategoryActivate,
        editCategory,
        clearShoppingList
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
