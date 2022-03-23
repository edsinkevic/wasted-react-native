import * as React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Login } from "../components/Login";
import { User } from "../models/User";
import { Credentials } from "../models/Credentials";
import { colors, config } from "../utils/config";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../utils/context";
import { Button } from "react-native-paper";
import { FooterHeader } from "../templates/FooterHeader";
import { AuthButton } from "../components/AuthButton";

export const MemberLoginScreen = ({ navigation }) => {
  const { signInAsMember, signOut, setError } = React.useContext(AuthContext);

  const header = <Text style={styles.text_header}>Welcome!</Text>;
  const footer = (
    <>
      <Login
        getUserUri={`${config.baseUrl}/authentication/member`}
        loginUri={`${config.baseUrl}/authentication/member/login`}
        signIn={signInAsMember}
        signOut={signOut}
        setError={setError}
      />
      <AuthButton
        onPress={() => navigation.push("Member signup")}
        text="Sign up"
      />
    </>
  );

  return (
    <FooterHeader
      headerComponent={header}
      footerComponent={footer}
      headerFlex={1}
      footerFlex={2}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  text_header: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 30,
  },
  footer: {
    flex: 2,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
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
    color: colors.darkerMain,
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
