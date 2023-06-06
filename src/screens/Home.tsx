import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Card } from "../components/Card";
import { Product } from "../shared/interfaces/Product";
import { useState, useEffect } from "react";
import { Filter, ToBuyButton } from "../components/Filter";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../App";
import { ProductsContext } from "../contexts/ProductsContext";
import { useContext } from "react";
import { EmptyProductList } from "../components/EmptyProductList";
import { Button } from "../components/UI/Button";
import { ProductsToCheckModal } from "../components/ProductsToCheckModal";

type Props = DrawerScreenProps<RootDrawerParamList, "Home">;

export default function Home({ navigation }: Props) {
  const { products, updateProducts, deleteProduct } =
    useContext(ProductsContext);
  const [filters, setFilters] = useState<string[]>([]);
  const [toBuyActive, setToBuyActive] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      updateProducts();
    });

    return unsubscribe;
  }, [navigation]);

  function toggleFilter(name: string) {
    setFilters((prev) => {
      if (prev.includes(name)) {
        return prev.filter((filter) => filter !== name);
      }
      return [...prev, name];
    });
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
        contentContainerStyle={{
          flexGrow: 1,
        }}
        data={
          toBuyActive
            ? products
                .filter((item) => item.checked === false)
                .filter((item) => filterProductsByCategory(item))
            : products.filter((item) => filterProductsByCategory(item))
        }
        keyExtractor={(item) => item.id.toString()}
        renderItem={(product) => (
          <Card product={product.item} navigation={navigation} />
        )}
        ListEmptyComponent={
          <EmptyProductList
            filters={filters}
            toBuyActive={toBuyActive}
            navigation={navigation}
          />
        }
      />
      <StatusBar style="auto" />
      {toBuyActive &&
        products.filter((item) => item.checked === false).length !== 0 && (
          <Button
            text="Clear shopping list"
            style={styles.clearListButton}
            textStyle={{ fontSize: 16, color: "white" }}
            onPress={() => setModalVisible(true)}
          />
        )}
      <ProductsToCheckModal
        close={() => setModalVisible(false)}
        visible={modalVisible}
      />
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
  clearListButton: {
    position: "absolute",
    bottom: 40,
    right: 20,
    backgroundColor: "green",
    width: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
