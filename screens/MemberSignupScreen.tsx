import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button, TextInput } from "react-native-paper";
import { Cloneable, CloneableArgs, clone } from "cloneable-ts";
import { signup } from "../calls";
import { User } from "../models/User";
import { config } from "../config";
import { AuthContext } from "../context";
import { stringify } from "json-js";

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
    getVendors().then((vendors) => {
      setVendors(vendors);
      pickVendor(vendors[0]);
      setCreds(clone(creds, { vendorId: vendors[0].id }));
    });
  }, []);

  if (vendor == null) return null;

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
      <Picker
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
      <Button
        onPress={async () => {
          await signup(
            creds,
            `${config.baseUrl}/authentication/member/register`
          )
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
    alignItems: "center",
  },
  textInput: {},
});
