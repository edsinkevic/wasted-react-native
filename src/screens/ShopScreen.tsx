import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Login } from '../components/Login';
import { User } from '../models/User';
import { useEffect, useState } from 'react';
import { colors, config } from '../utils/config';
import {
  ActivityIndicator,
  Button,
  Colors,
  TextInput,
} from 'react-native-paper';
import { OfferEntry } from '../models/OfferEntry';
import { ShopListing } from '../components/ShopListing';
import { AuthContext } from '../utils/context';
import { FooterHeader } from '../templates/FooterHeader';
import { getEntries as getOfferEntries } from '../utils/calls';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../models/ErrorResponse';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import { BackpackItem } from '../models/BackpackItem';
import { clone } from 'cloneable-ts';

export const ShopScreen = ({ navigation }) => {
  const [entries, setEntries] = useState<Array<OfferEntry>>([]);

  const { setError } = React.useContext(AuthContext);

  const getEntries = () => {
    getOfferEntries()
      .then(setEntries)
      .catch((e: AxiosError<ErrorResponse>) => {
        setError(e.response.data);
      });
  };

  useEffect(getEntries, []);

  useEffect(() => navigation.addListener('focus', getEntries), [navigation]);

  const renderEntry = ({ item }: { item: OfferEntry }) => (
    <ShopListing item={item} onPress={() => {}} />
  );

  const header = <Text style={styles.text_header}>The shop</Text>;
  const footer = (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={entries}
        renderItem={renderEntry}
        keyExtractor={(item) => item.id}
        onRefresh={getEntries}
      />
    </SafeAreaView>
  );

  return (
    <FooterHeader
      footerComponent={footer}
      headerComponent={header}
      headerFlex={1}
      footerFlex={4}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
  },
  text_header: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 30,
  },
});
