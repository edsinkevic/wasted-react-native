import React, { useContext, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button, TextInput } from 'react-native-paper';
import { Cloneable, CloneableArgs, clone } from 'cloneable-ts';
import { signup, signupWithVendorCreate } from '../utils/calls';
import { User } from '../models/User';
import { colors, config } from '../utils/config';
import { AuthContext } from '../utils/context';
import { stringify } from 'json-js';
import { SignupBase } from '../components/SignupBase';
import { FooterHeader } from '../templates/FooterHeader';
import { WastedButton } from '../components/WastedButton';
import { SplashScreen } from './SplashScreen';
import { AxiosError } from 'axios';

export const MemberSignupWithVendorScreen = ({ navigation }) => {
  const [creds, setCreds] = useState<SignupWithVendor>({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    vendorName: '',
  });
  const { setError } = useContext(AuthContext);

  const header = () => <Text style={styles.title}>Welcome</Text>;

  const footer = () => (
    <>
      <SignupBase creds={creds} setCreds={setCreds} />
      <TextInput
        {...inputProps('Vendor name')}
        secureTextEntry={false}
        onChangeText={(input) => setCreds({ vendorName: input, ...creds })}
      />
      <WastedButton
        text="Sign up"
        onPress={() =>
          signupWithVendorCreate(creds)
            .then((_) => navigation.pop())
            .catch((error: AxiosError) => setError(error.response.data))
        }
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

const inputProps = (labelString: string) => ({
  underlineColor: colors.main,
  activeUnderlineColor: colors.main,
  style: styles.textInput,
  label: <Text style={styles.input_label}>{labelString}</Text>,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
  },
  textInput: {
    backgroundColor: colors.secondary,
    width: 350,
    alignSelf: 'center',
  },
  input_label: {
    color: colors.darkerMain,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.secondary,
    fontSize: 30,
    fontWeight: 'bold',
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
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
