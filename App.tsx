import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./src/screens/Home";
import { CreateProduct } from "./src/screens/CreateProduct";
import { CreateCategory } from "./src/screens/CreateCategory";

export type RootDrawerParamList = {
  Home: undefined;
  CreateProduct: undefined;
  CreateCategory: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator useLegacyImplementation={true}>
          <Drawer.Screen name="Home" component={Home} />
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
    </>
  );
}
