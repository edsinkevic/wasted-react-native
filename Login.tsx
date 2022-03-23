import { Button, TextInput } from "react-native-paper";
import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import { User } from "./models/User";
import { config } from "./config";
import { Credentials } from "./models/Credentials";
import { getUser, login } from "./calls";
import { AuthContext } from "./context";
import React from "react";

export const Login = ({ getUserUri, loginUri, signIn, signOut, setError }) => {
  const [state, setState] = useState<Credentials>({
    username: "",
    password: "",
  });
  return (
    <>
      <TextInput
        style={styles.input}
        onChangeText={(input) =>
          setState({ username: input, password: state.password })
        }
      />
      <TextInput
        style={styles.input}
        onChangeText={(input) =>
          setState({ username: state.username, password: input })
        }
      />
      <Button
        onPress={async () => {
          signOut();
          await login(state, loginUri)
            .then((token) =>
              getUser(getUserUri, token).then((user) => [user, token])
            )
            .then(([user, token]) => signIn(user, token))
            .catch((e) => setError(e));
        }}
      >
        Log in
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: 200,
  },
});
