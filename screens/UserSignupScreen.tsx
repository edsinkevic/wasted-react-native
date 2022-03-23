import React, { useContext, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Cloneable, CloneableArgs, clone } from "cloneable-ts";
import { User } from "../models/User";
import { config } from "../config";
import { AuthContext } from "../context";

interface Signup {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const signup = (creds: Signup, uri: string): Promise<User> => {
  return fetch(uri, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  }).then((response) => {
    console.log(response.status);
    switch (response.status) {
      case 200:
        return response.json();
      case 400:
        return response.json().then((json) => {
          if (json.message) return Promise.reject(json.message);
          else return Promise.reject("Unknown");
        });
      default:
        return null;
    }
  });
};

export const UserSignupScreen = ({ navigation }) => {
  const [creds, setCreds] = useState<Signup>({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const { setError, signInAsUser, error } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        mode="outlined"
        label="User name"
        onChangeText={(input) => setCreds(clone(creds, { username: input }))}
      />
      <TextInput
        mode="outlined"
        label="First name"
        onChangeText={(input) => setCreds(clone(creds, { firstname: input }))}
      />
      <TextInput
        mode="outlined"
        label="Last name"
        onChangeText={(input) => setCreds(clone(creds, { lastname: input }))}
      />
      <TextInput
        placeholder="jeremy.holston@gmail.com"
        mode="outlined"
        label="Email"
        onChangeText={(input) => setCreds(clone(creds, { email: input }))}
      />
      <TextInput
        mode="outlined"
        label="Password"
        onChangeText={(input) => setCreds(clone(creds, { password: input }))}
      />
      <Button
        onPress={async () => {
          await signup(creds, `${config.baseUrl}/authentication/user/register`)
            .then((user) => navigation.pop())
            .catch((e) => setError(e));
        }}
      >
        Sign up
      </Button>
      {error != null ? <Text>{error}</Text> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
