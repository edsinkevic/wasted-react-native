import React, { useContext, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button, Colors, TextInput } from "react-native-paper";
import { Cloneable, CloneableArgs, clone } from "cloneable-ts";
import { User } from "../models/User";
import { colors, config } from "../utils/config";
import { AuthContext } from "../utils/context";
import { SignupBase } from "../components/SignupBase";
import { FooterHeader } from "../templates/FooterHeader";
import { WastedButton } from "../components/WastedButton";
import { signup } from "../utils/calls";

interface Signup {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export const UserSignupScreen = ({ navigation }) => {
  const [creds, setCreds] = useState<Signup>({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const { setError } = useContext(AuthContext);

  const header = <Text style={styles.title}>Welcome</Text>;

  const footer = (
    <>
      <SignupBase creds={creds} setCreds={setCreds} />
      <WastedButton
        text="Sign up"
        onPress={async () => {
          await signup(creds, `${config.baseUrl}/authentication/user/register`)
            .then((user) => navigation.pop())
            .catch((e) => setError(e));
        }}
      />
    </>
  );

  return (
    <FooterHeader
      headerComponent={header}
      footerComponent={footer}
      headerFlex={1}
      footerFlex={3}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.purple100,
  },
  textInput: {
    backgroundColor: colors.secondary,
    width: 200,
    alignSelf: "center",
    borderRadius: 30,
  },
  input_label: {
    color: colors.darkerMain,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  title: {
    color: colors.secondary,
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
