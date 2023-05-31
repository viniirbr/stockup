import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, View } from "react-native";
import { Card } from "../components/Card";
import { ItemToBuy } from "../interfaces/ItemToBuy";
import { useState } from "react";
import { Filter } from "../components/Filter";
import { Category } from "../interfaces/Category";

const itemsToBuy: ItemToBuy[] = [
  {
    id: 1,
    name: "Milk",
    quantity: 1,
    lastPrice: 1.5,
    checked: true,
    category: {
      id: 3,
      name: "Dairy",
      color: "red",
    },
  },
  {
    id: 2,
    name: "Bread",
    quantity: 2,
    lastPrice: 1.2,
    checked: true,
  },
  {
    id: 3,
    name: "Butter",
    quantity: 1,
    lastPrice: 2.5,
    checked: true,
    category: {
      id: 3,
      name: "Dairy",
      color: "red",
    },
  },
  {
    id: 4,
    name: "Eggs",
    quantity: 12,
    lastPrice: 3.5,
    checked: true,
  },
  {
    id: 5,
    name: "Cheese",
    quantity: 1,
    lastPrice: 2.5,
    checked: true,
    category: {
      id: 3,
      name: "Dairy",
      color: "red",
    },
  },
  {
    id: 6,
    name: "Ham",
    quantity: 1,
    lastPrice: 2.5,
    checked: true,
  },
  {
    id: 7,
    name: "Water",
    quantity: 6,
    lastPrice: 1.5,
    checked: true,
    category: {
      id: 2,
      name: "Veggie",
      color: "green",
    },
  },
  {
    id: 8,
    name: "Coke",
    quantity: 2,
    lastPrice: 1.5,
    checked: true,
  },
];

export default function Home() {
  const [items, setItems] = useState<ItemToBuy[]>(itemsToBuy);
  const [filters, setFilters] = useState<
    { category: Category; active: boolean }[]
  >([
    { category: { id: 2, name: "Veggie", color: "green" }, active: false },
    { category: { id: 3, name: "Dairy", color: "red" }, active: false },
  ]);
  const [toBuyActive, setToBuyActive] = useState<boolean>(false);

  function addFilter(id: number) {
    if (id === 1) {
      setToBuyActive(!toBuyActive);
      return;
    }
    const newFilters = filters.map((filter) => {
      if (filter.category.id === id) {
        filter.active = !filter.active;
      }
      return filter;
    });
    setFilters(newFilters);
  }

  function changeItemState(id: number) {
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.checked = !item.checked;
      }
      return item;
    });
    setItems(newItems);
  }

  function filterItemsByCategory(itemToBuy: ItemToBuy) {
    if (filters.every((filter) => filter.active === false)) {
      return true;
    }

    if (
      filters
        .filter((filter) => filter.active === true)
        .map((filter) => filter.category.id)
        .includes(itemToBuy.category?.id as number)
    ) {
      return true;
    }

    return false;
  }

  return (
    <View style={styles.container}>
      <Filter
        categories={filters}
        handlePress={addFilter}
        toBuyActive={toBuyActive}
      />
      <FlatList
        fadingEdgeLength={150}
        style={styles.flat}
        data={itemsToBuy
          .filter((item) => filterItemsByCategory(item))
          .filter((item) => item.checked === !toBuyActive)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(itemToBuy) => (
          <Card changeItemState={changeItemState} itemToBuy={itemToBuy.item} />
        )}
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
});
