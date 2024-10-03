import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const ThemeView = ({ children }) => (
  <SafeAreaView className="bg-primary h-full">
    {children}
    <StatusBar style="light" backgroundColor="#161621" />
  </SafeAreaView>
);

export default ThemeView;
