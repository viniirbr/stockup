import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./src/screens/Home";
import { CreateProduct } from "./src/screens/CreateProduct";
import { CreateCategory } from "./src/screens/CreateCategory";
import { Product } from "./src/shared/interfaces/Product";
import { ProductsProvider } from "./src/contexts/ProductsContext";
import Toast from "react-native-toast-message";
import { Category } from "./src/shared/interfaces/Category";

export type RootDrawerParamList = {
  Home: undefined;
  CreateProduct: undefined | { product: Product };
  CreateCategory: undefined | { category: Category };
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function App() {
  return (
    <>
      <ProductsProvider>
        <NavigationContainer>
          <Drawer.Navigator
            useLegacyImplementation={false}
            initialRouteName="Home"
            backBehavior="history"
          >
            <Drawer.Screen
              name="Home"
              component={Home}
              options={{ headerTitle: "" }}
            />
            <Drawer.Screen
              name="CreateProduct"
              component={CreateProduct}
              options={{
                title: "Create a new product",
              }}
            />
            <Drawer.Screen
              name="CreateCategory"
              component={CreateCategory}
              options={{
                title: "Create a new category",
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </ProductsProvider>
      <Toast />
    </>
  );
}
