import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getItemFromStorage<T>(key: string): Promise<T[]> {
  const items = await AsyncStorage.getItem(key);
  if (items) {
    const itemsObject: T[] = JSON.parse(items);
    return itemsObject;
  } else {
    await AsyncStorage.setItem(key, JSON.stringify([]));
    return [];
  }
}
