import { Button, Colors, TextInput } from "react-native-paper";
import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import { User } from "../models/User";
import { colors, config } from "../utils/config";
import { Credentials } from "../models/Credentials";
import { getUser, login } from "../utils/calls";
import { AuthContext } from "../utils/context";
import React from "react";
import { AuthButton } from "./AuthButton";

export const Login = ({ getUserUri, loginUri, signIn, signOut, setError }) => {
  const [state, setState] = useState<Credentials>({
    username: "",
    password: "",
  });
  return (
    <>
      <TextInput
        style={styles.input}
        label={<Text style={styles.input_label}>Username</Text>}
        onChangeText={(input) =>
          setState({ username: input, password: state.password })
        }
      />
      <TextInput
        style={styles.input}
        label={<Text style={styles.input_label}>Password</Text>}
        onChangeText={(input) =>
          setState({ username: state.username, password: input })
        }
      />
      <AuthButton
        onPress={async () => {
          signOut();
          await login(state, loginUri)
            .then((token) =>
              getUser(getUserUri, token).then((user) => [user, token])
            )
            .then(([user, token]) => signIn(user, token))
            .catch((e) => setError(e));
        }}
        text="Log in"
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.white,
    width: 200,
    alignSelf: "center",
  },
  input_label: {
    color: colors.darkerMain,
  },
});
