import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { WastedButton } from "../components/WastedButton";
import { colors } from "../utils/config";
import { FooterHeader } from "../templates/FooterHeader";

export const SplashScreen = () => {
  const header = <Text style={styles.title}>Loading</Text>;
  const footer = <></>;

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
