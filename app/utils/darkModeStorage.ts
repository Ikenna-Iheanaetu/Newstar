import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to set the dark mode preference
export const setIsDarkModeTrue = async (enabled: boolean) => {
  try {
    await AsyncStorage.setItem("darkMode", JSON.stringify(enabled));
  } catch (e) {
    console.error("Error saving dark mode preference:", e);
  }
};

export const getIsDarkModeTrue = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem("darkMode");
    if (value !== null) {
      return JSON.parse(value); // Parse the stored string back to a boolean
    }
    return false;
  } catch (e) {
    console.error("Error reading dark mode preference:", e);
    return false;
  }
};
