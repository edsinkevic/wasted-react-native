import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Button } from "react-native-paper";
import { AuthContext } from "../utils/context";
import { WastedButton } from "./WastedButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../utils/config";

export const MemberDrawer = (props) => {
  const { signOut, member } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.name}>Hey {member.firstName}!</Text>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <WastedButton text="Log out" onPress={signOut} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    paddingLeft: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: colors.darkerMain,
    opacity: 70,
  },
});
