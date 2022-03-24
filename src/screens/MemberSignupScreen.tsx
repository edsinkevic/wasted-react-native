import React, { useContext, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button, TextInput } from "react-native-paper";
import { Cloneable, CloneableArgs, clone } from "cloneable-ts";
import { signup } from "../utils/calls";
import { User } from "../models/User";
import { colors, config } from "../utils/config";
import { AuthContext } from "../utils/context";
import { stringify } from "json-js";
import { SignupBase } from "../components/SignupBase";
import { FooterHeader } from "../templates/FooterHeader";
import { AuthButton } from "../components/AuthButton";

interface Signup {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  vendorId: string;
}

interface Vendor {
  id: string;
  name: string;
}

const getVendors = () =>
  fetch(`${config.baseUrl}/vendor`).then((response) => {
    if (response.status != 200) return Promise.reject("Could not get");
    return response.json();
  });

export const MemberSignupScreen = ({ navigation }) => {
  const [creds, setCreds] = useState<Signup>({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    vendorId: "",
  });
  const [vendors, setVendors] = useState<Array<Vendor>>([]);
  const [vendor, pickVendor] = useState<Vendor>(null);

  const { setError, error } = useContext(AuthContext);

  useEffect(() => {
    getVendors().then((newVendors) => {
      setVendors(newVendors);
      if (vendors.length > 0) {
        pickVendor(vendors[0]);
        setCreds(clone(creds, { vendorId: vendors[0].id }));
      }
    });
  }, []);

  if (vendor == null)
    return (
      <FooterHeader
        headerComponent={
          <Text style={styles.title}>
            Sorry there are no vendors in the system. Please message
            Professional Amateurs.
          </Text>
        }
        footerComponent={<></>}
        headerFlex={1}
        footerFlex={0}
      />
    );

  const header = () => <Text style={styles.title}>Welcome</Text>;

  const footer = () => (
    <>
      <SignupBase creds={creds} setCreds={setCreds} />
      <Picker
        style={styles.input_label}
        selectedValue={vendor}
        onValueChange={(value, itemIndex) => {
          pickVendor(value);
          setCreds(clone(creds, { vendorId: value.id }));
        }}
      >
        {vendors.map((vendor) => (
          <Picker.Item key={vendor.id} label={vendor.name} value={vendor} />
        ))}
      </Picker>
      <AuthButton
        text="Sign up"
        onPress={async () => {
          await signup(
            creds,
            `${config.baseUrl}/authentication/member/register`
          )
            .then((user) => navigation.pop())
            .catch((e) => setError(e));
        }}
      />
    </>
  );

  return (
    <FooterHeader
      headerComponent={header()}
      footerComponent={footer()}
      headerFlex={1}
      footerFlex={3}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
  },
  textInput: {
    backgroundColor: colors.secondary,
    width: 350,
    alignSelf: "center",
  },
  input_label: {
    color: colors.darkerMain,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colors.secondary,
    fontSize: 30,
    fontWeight: "bold",
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.purple100,
//   },

//   text: {
//     color: "grey",
//     marginTop: 5,
//   },
//   button: {
//     alignItems: "flex-end",
//     marginTop: 30,
//   },
//   signIn: {
//     width: 150,
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 50,
//     flexDirection: "row",
//   },
//   textSign: {
//     color: "white",
//     fontWeight: "bold",
//   },
// });
