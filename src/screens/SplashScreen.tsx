import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { AuthButton } from "../components/AuthButton";
import { colors } from "../utils/config";
import { FooterHeader } from "../templates/FooterHeader";

export const SplashScreen = ({ navigation }) => {
  const header = <Text style={styles.title}>Welcome</Text>;
  const footer = (
    <>
      <AuthButton
        text="Enter as customer"
        onPress={() => navigation.push("User login")}
      />
      <AuthButton
        text="Enter as member"
        onPress={() => navigation.push("Member login")}
      />
    </>
  );

  return (
    <FooterHeader
      headerComponent={header}
      footerComponent={footer}
      footerFlex={1}
      headerFlex={2}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
  },
  title: {
    color: colors.secondary,
    fontSize: 30,
    fontWeight: "bold",
  },
});
