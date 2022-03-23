import * as React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Login } from "../Login";
import { User } from "../models/User";
import { Credentials } from "../models/Credentials";
import { config } from "../config";
import * as SecureStore from "expo-secure-store";
import { Button } from "react-native-paper";
import { AuthContext } from "../context";

export const UserLoginScreen = ({ navigation }) => {
  const { signInAsUser, signOut, setError } = React.useContext(AuthContext);

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Login
        getUserUri={`${config.baseUrl}/authentication/user`}
        loginUri={`${config.baseUrl}/authentication/user/login`}
        signIn={signInAsUser}
        signOut={signOut}
        setError={setError}
      />
      <Button onPress={() => navigation.push("User signup")}>Sign up</Button>
    </SafeAreaView>
  );
};
