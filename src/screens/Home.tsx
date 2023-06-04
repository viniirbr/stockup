import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Card } from "../components/Card";
import { Product } from "../interfaces/Product";
import { useState, useEffect } from "react";
import { Filter, ToBuyButton } from "../components/Filter";
import { Category } from "../interfaces/Category";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = DrawerScreenProps<RootDrawerParamList, "Home">;

export default function Home({ navigation }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [toBuyActive, setToBuyActive] = useState<boolean>(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await AsyncStorage.getItem("products");
        const productsObject: Product[] = JSON.parse(products as string);
        if (productsObject) {
          setProducts(productsObject);
        }
      } catch (error) {
        console.log(error);
      }
    }
    navigation.addListener("focus", () => {
      fetchProducts();
    });

    return () => navigation.removeListener("focus", () => {});
  }, []);

  function toggleFilter(name: string) {
    setFilters((prev) => {
      if (prev.includes(name)) {
        return prev.filter((filter) => filter !== name);
      }
      return [...prev, name];
    });
  }

  async function changeItemState(name: string) {
    const newProducts = products.map((product) => {
      if (
        product.name.localeCompare(name, undefined, {
          sensitivity: "accent",
        }) === 0
      ) {
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

  function filterProductsByCategory(product: Product) {
    if (filters.length === 0) {
      return true;
    }

    if (filters.includes(product.category as string)) {
      return true;
    }

    return false;
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <ToBuyButton toBuyActive={toBuyActive} setActive={setToBuyActive} />
        <Filter
          handlePress={toggleFilter}
          filters={filters}
          navigation={navigation}
        />
      </View>
      <FlatList
        fadingEdgeLength={150}
        style={styles.flat}
        data={
          toBuyActive
            ? products
                .filter((item) => item.checked === false)
                .filter((item) => filterProductsByCategory(item))
            : products.filter((item) => filterProductsByCategory(item))
        }
        keyExtractor={(item) => item.name}
        renderItem={(product) => (
          <Card changeItemState={changeItemState} product={product.item} />
        )}
        ListEmptyComponent={() => <Text>Nothing to show</Text>}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  flat: {
    marginTop: 20,
  },
  filterContainer: {
    height: 140,
    marginTop: 30,
    paddingHorizontal: 5,
    width: "100%",
  },
});
