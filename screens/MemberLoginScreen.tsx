import * as React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Login } from "../Login";
import { User } from "../models/User";
import { Credentials } from "../models/Credentials";
import { config } from "../config";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../context";
import { Button } from "react-native-paper";

export const MemberLoginScreen = ({ navigation }) => {
  const { signInAsMember, signOut, setError } = React.useContext(AuthContext);

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Login
        getUserUri={`${config.baseUrl}/authentication/member`}
        loginUri={`${config.baseUrl}/authentication/member/login`}
        signIn={signInAsMember}
        signOut={signOut}
        setError={setError}
      />
      <Button onPress={() => navigation.push("Member signup")}>Sign up</Button>
    </SafeAreaView>
  );
};
