import { clone } from 'cloneable-ts';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { colors } from '../utils/config';

export const SignupBase = ({ creds, setCreds }) => (
  <>
    <TextInput
      {...inputProps('User name')}
      onChangeText={(input) => setCreds(clone(creds, { username: input }))}
    />
    <TextInput
      {...inputProps('First name')}
      onChangeText={(input) => setCreds(clone(creds, { firstname: input }))}
    />
    <TextInput
      {...inputProps('Last name')}
      onChangeText={(input) => setCreds(clone(creds, { lastname: input }))}
    />
    <TextInput
      {...inputProps('Email')}
      onChangeText={(input) => setCreds(clone(creds, { email: input }))}
    />
    <TextInput
      {...inputProps('Password')}
      secureTextEntry={true}
      onChangeText={(input) => setCreds(clone(creds, { password: input }))}
    />
  </>
);

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
