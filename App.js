import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import NgheNhac from "./LAB4/NgheNhac";
import ChupAnh from "./LAB4/ChupAnh";
import ChonAnh from "./LAB4/ChonAnh";

export default function App() {
  return (
    // <NgheNhac />
    // <ChupAnh />
    <ChonAnh />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
