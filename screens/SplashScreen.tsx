import React from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import { Button, Colors } from "react-native-paper";

export const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Welcome</Text>
      </View>
      <View style={styles.footer}>
        <Button onPress={() => navigation.push("User login")}>
          Enter as customer
        </Button>
        <Button onPress={() => navigation.push("Member login")}>
          Enter as member
        </Button>
      </View>
    </View>
  );
};

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.purple100,
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});
